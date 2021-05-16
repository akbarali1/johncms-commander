<?php
/*
* Fayl menjr Akbarali tomonidan yozildi.
* Johncms Profile Link: https://johncms.com/profile/?user=38217
* Those who want to sponsor: Webmoney WMR: R853215959425, Webmoney WMZ: Z401474330355, Webmoney WMY: Y194307290426
*/

declare(strict_types=1);
define('SHOW_PHP_SELF', false);
define('SHOW_HIDDEN_FILES', false);
define('PATTERN_FILES', '/^[A-Za-z0-9-_.\/]*\.(txt|php|htm|phtml|html|js|css|tpl|md|xml|json)$/i'); // empty means no pattern
define('PATTERN_DIRECTORIES', '/^((?!backup).)*$/i'); // empty means no pattern

function files($dir, $first = true)
{
  $data = '';
  if ($first === true) {
    $data .= '
    <div class="row">
      
    </div>

    ';
    $data .= '<ul><li data-jstree=\'{ "opened" : true }\'><a href="#" class="open-dir" data-dir="' . MAIN_DIR . '">' . basename($dir) . '</a>';
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
        . '<a akbarali href="#' . MAIN_DIR . $dir_path . '/" class="open-dir" data-dir="../' . $dir_path . '/">' . $file . '</a>' . files($dir . DS . $file, false) . '</li>';
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
if (isset($_POST['action'])) {
  switch ($_POST['action']) {
    case 'reload':
      echo json_success('OK', [
        'data' => files(MAIN_DIR),
      ]);
      exit;
      break;
  }
}

echo $view->render(
  'editor::vscode',
  [
    'title'    => V,
    'main_dir' => files(MAIN_DIR),

  ]
);
