<?php
/*
* Fayl menjr Akbarali tomonidan yozildi.
* Johncms Profile Link: https://johncms.com/profile/?user=38217
* Those who want to sponsor: Webmoney WMR: R853215959425, Webmoney WMZ: Z401474330355, Webmoney WMY: Y194307290426
*/
$dir = MAIN_DIR;
// Run the recursive function
$response = scan($dir);
// This function scans the files folder recursively, and builds a large array
function scan($dir)
{
    $files = array();
    // Is there actually such a folder/file?
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
// Output the directory listing as JSON
header('Content-type: application/json');
echo json_encode(array("name" => $dir, "type" => "folder", "path" => $dir, "items" => $response));
