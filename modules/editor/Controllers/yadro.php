<?php
/*
* Fayl menjr Akbarali tomonidan yozildi.
* Johncms Profile Link: https://johncms.com/profile/?user=38217
* Those who want to sponsor: Webmoney WMR: R853215959425, Webmoney WMZ: Z401474330355, Webmoney WMY: Y194307290426
*/
defined('_IN_JOHNCMS') || die('Error: restricted access');
define('V', '2.1 | Akbarali');
define('DEMO_VERSION', false);
define('DEMO_TEXT_ERROR', 'This action cannot be performed in the demo version');
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
