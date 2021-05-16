<?php
/*
* Fayl menjr Akbarali tomonidan yozildi.
* Johncms Profile Link: https://johncms.com/profile/?user=38217
* Those who want to sponsor: Webmoney WMR: R853215959425, Webmoney WMZ: Z401474330355, Webmoney WMY: Y194307290426
*/
defined('_IN_JOHNCMS') || die('Error: restricted access');
define('V', '2.5 | Akbarali');
define('DEMO_VERSION', false);
define('DEMO_TEXT_ERROR', 'This action cannot be performed in the demo version');
define('SHOW_PHP_SELF', false);
define('SHOW_HIDDEN_FILES', false);
define('PATTERN_FILES', '/^[A-Za-z0-9-_.\/]*\.(txt|php|htm|phtml|html|js|css|tpl|md|xml|json)$/i'); // empty means no pattern
define('PATTERN_DIRECTORIES', '/^((?!backup).)*$/i'); // empty means no pattern
define('MAIN_DIR', '.');

function json_error($message, $params = [])
{
    return json_encode(array_merge([
        'error' => true,
        'message' => $message,
    ], $params), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}

function json_success($message, $params = [])
{
    return json_encode(array_merge([
        'success' => true,
        'message' => $message,
    ], $params), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}

function deleteDirectory($dir)
{
    if (!file_exists($dir)) {
        return true;
    }
    if (!is_dir($dir)) {
        return unlink($dir);
    }
    foreach (scandir($dir) as $item) {
        if ($item == '.' || $item == '..') {
            continue;
        }
        if (!deleteDirectory($dir . DIRECTORY_SEPARATOR . $item)) {
            return false;
        }
    }
    return rmdir($dir);
}

function scan($dir)
{
    $files = array();
    if (file_exists($dir)) {
        foreach (scandir($dir) as $f) {
            if (!$f || $f[0] == '.') {
                continue; // Ignore hidden files
            }
            if (is_dir($dir . '/' . $f)) {
                // The path is a folder
                $files[] = array(
                    "name" => $f,
                    "type" => "folder",
                    "path" => $dir . '/' . $f,
                    "time" => date("d F Y H:i", filectime($dir . '/' . $f)),
                    "items" => scan($dir . '/' . $f) // Recursively get the contents of the folder
                );
            } else {
                // It is a file
                $files[] = array(
                    "name" => $f,
                    "type" => "file",
                    "path" => $dir . '/' . $f,
                    "time" => date("d F Y H:i", filectime($dir . '/' . $f)),
                    "size" => filesize($dir . '/' . $f) // Gets the size of this file
                );
            }
        }
    }
    return $files;
}

function files($dir, $first = true)
{
    $data = '';
    if ($first === true) {
        $data .= '<ul><li data-jstree=\'{ "opened" : true }\'><a href="#" class="open-dir" data-dir="' . MAIN_DIR . '">'
            . basename($dir) . '</a>';
    }
    $data .= '<ul class="files">';
    $files = array_slice(scandir($dir), 2);
    asort($files);
    foreach ($files as $key => $file) {
        if ((SHOW_PHP_SELF === false && $dir . DS . $file == __FILE__) || (SHOW_HIDDEN_FILES === false && substr($file, 0, 1) === '.')) {
            continue;
        }
        if (is_dir($dir . DS . $file) && (empty(PATTERN_DIRECTORIES) || preg_match(PATTERN_DIRECTORIES, $file))) {
            $dir_path = str_replace(MAIN_DIR . DS, '', $dir . DS . $file);
            $data .= '<li class="dir">'
                . '<a akbarali href="#' . MAIN_DIR . $dir_path . '/" class="open-dir" data-dir="./' . $dir_path . '/">' . $file . '</a>' . files($dir . DS . $file, false) . '</li>';
        } else if (empty(PATTERN_FILES) || preg_match(PATTERN_FILES, $file)) {
            $file_path = str_replace(MAIN_DIR . DS, '', $dir . DS . $file);
            $data .= '<li class="file ' . (is_writable($file_path) ? 'editable' : null) . '" data-jstree=\'{ "icon" : "jstree-file" }\'>'
                . '<a href="#' . MAIN_DIR . $file_path . '" data-file="./' . $file_path . '" class="open-file">' . $file . '</a></li>';
        }
    }
    $data .= '</ul>';
    if ($first === true) {
        $data .= '</li></ul>';
    }
    return $data;
}

function passwordchange($password)
{
    if (isset($password) && empty($password) === false) {
        $contents = file(__FILE__);
        foreach ($contents as $key => $line) {
            if (strpos($line, 'define(\'PASSWORD\'') !== false) {
                $contents[$key] = "define('PASSWORD', '" . md5(md5($password)) . "');\n";
                break;
            }
        }
        if (is_writable(__FILE__) === false) {
            die(json_error('File is not writable'));
        }
        file_put_contents(__FILE__, implode($contents));
        return json_success('Password changed successfully');
    }
}
