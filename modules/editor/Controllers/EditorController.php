<?php
/*
* Fayl menjr Akbarali tomonidan yozildi.
* Johncms Profile Link: https://johncms.com/profile/?user=38217
* Those who want to sponsor: Webmoney WMR: R853215959425, Webmoney WMZ: Z401474330355, Webmoney WMY: Y194307290426
*/

namespace Editor\Controllers;

use Johncms\Controller\BaseController;

require 'yadro.php';

class EditorController extends BaseController
{
    protected $module_name = 'editor';

    public function index()
    {
        $title = 'Johncms File Commander';
        // Устанавливаем заголовок страницы в теге title и h1
        $this->render->addData(
            [
                'title'      => $title,
            ]
        );
        // Добавляем страницу в цепочку навигации
        $this->nav_chain->add($title, '/editor/');

        return $this->render->render('editor::index', ['title' => $title]);
    }
    public function scan()
    {
        $dir = MAIN_DIR;
        $response = scan($dir);
        // Output the directory listing as JSON
        header('Content-type: application/json');
        return json_encode(
            array(
                "name" => $dir,
                "type" => "folder",
                "path" => $dir,
                "items" => $response
            ),
            JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT
        );
    }
    public function api()
    {
        header('Content-type: application/json');

        switch ($_POST['action']) {
            case 'open-file':
                if (isset($_POST['faylyoli'])) {
                    $faylyoli = $_POST['faylyoli'];
                    if (file_exists($faylyoli)) {
                        $file = file_get_contents($faylyoli);
                    } else {
                        return json_error('Bunday fayl yo`q');
                    }
                    $faylturi = pathinfo($faylyoli);
                    if ($faylturi['extension'] == 'zip') {
                        $falext = 'zip';
                    } elseif ($faylturi['extension'] == 'ico') {
                        $falext = 'ico';
                    } elseif ($faylturi['extension'] == 'jpg') {
                        $falext = 'jpg';
                    } elseif ($faylturi['extension'] == 'png') {
                        $falext = 'png';
                    } elseif ($faylturi['extension'] == 'gif') {
                        $falext = 'gif';
                    }
                    if (isset($falext)) {
                        return json_success('OK', ['data' => array('boshqacha' => 'boshqacha', 'fayl_yoli' => $faylyoli),]);
                    }
                    if ($faylturi['extension'] == 'html') {
                        $falext = 'html';
                    } elseif ($faylturi['extension'] == 'css') {
                        $falext = 'css';
                    } elseif ($faylturi['extension'] == 'js') {
                        $falext = 'javascript';
                    } elseif ($faylturi['extension'] == 'json') {
                        $falext = 'json';
                    } elseif ($faylturi['extension'] == 'sass') {
                        $falext = 'sass';
                    } elseif ($faylturi['extension'] == 'xml') {
                        $falext = 'xml';
                    } elseif ($faylturi['extension'] == 'php') {
                        $falext = 'php';
                    } elseif ($faylturi['extension'] == 'phtml') {
                        $falext = 'php';
                    } else {
                        $falext = 'text';
                    }
                    return json_success('OK', ['data' => array('file' => $file, 'fayl_yoli' => $faylyoli, 'faylturi' => $falext)]);
                }
                break;
        }
        //Demo versiyada ishlamaydigan narsalar
        if (DEMO_VERSION === true) {
            return json_error(DEMO_TEXT_ERROR);
        }
        switch ($_POST['action']) {
            case 'dellete-file':
                if (isset($_POST['fayl'])) {
                    $fl = $_POST['fayl'];
                    if (file_exists($fl)) {
                        unlink($fl);
                        return json_success('OK');
                    } else {
                        return json_error('Bunday fayl yo`q');
                    }
                }
                break;
            case 'dellete-folder':
                if (isset($_POST['folder'])) {
                    $folder = $_POST['folder'];
                    if (is_dir($folder)) {
                        array_map('unlink', glob($folder . "/*.*"));
                        deleteDirectory($folder);
                        return json_success('OK');
                    } else {
                        return json_error('Bunday nomda papka mavjud emas');
                    }
                }
                break;
            case 'rename':
                $oldfilename = $_POST['oldfilename'];
                $newname = $_POST['newname'];
                if (isset($oldfilename)) {
                    if (file_exists($oldfilename)) {
                        rename($oldfilename, $newname);
                        return json_success('OK');
                    } else  if (is_dir($oldfilename)) {
                        rename($oldfilename, $newname);
                        return json_success('OK');
                    } else {
                        return json_error('Bunday nomdagi fayl ham papka ham yo`q');
                    }
                }
                break;
            case 'new-file':
                if (isset($_POST['filename'])) {
                    $filename = $_POST['filename'];
                    $foldername = $_POST['foldername'];
                    $faylyoli = $foldername . "/" . $filename;
                    if (!file_exists($faylyoli)) {
                        $fp = fopen($faylyoli, 'wb');
                        fwrite($fp, "Akbarali");
                        fclose($fp);
                        $filetext = file_get_contents($faylyoli);
                        return json_success('OK', ['data' => array('fileopen' => $filetext, 'faylyoli' => $faylyoli)]);
                    } else {
                        return json_error('There is a file with this name');
                    }
                }
                break;
            case 'new-folder':
                if (isset($_POST['folder'])) {
                    $foldernamenew = $_POST['folder'];
                    $foldername = $_POST['foldername'];
                    $papkayoli = $foldername . "/" . $foldernamenew;
                    if (!is_dir($papkayoli)) {
                        mkdir($papkayoli, 0755);
                        return json_success('The folder was created successfully');
                    } else {
                        return json_error('There is a folder with this name');
                    }
                }
                break;
            case 'backup':
                if (!empty($_POST['contents'])) {
                    $fayl_yoli = $_POST['fayl_yoli'];
                    $faylturi = pathinfo($fayl_yoli);
                    $contents = $_POST['contents'];
                    $yangifayl = $faylturi['dirname'] . '/' . date("G-i-s_d-m-y") . '-' . $faylturi['filename'] . '.' . $faylturi['extension'];
                    $fp = fopen($yangifayl, 'wb');
                    fwrite($fp, $contents);
                    fclose($fp);
                    return json_success('OK');
                } else {
                    return json_error('Saqlash uchun fayl ochilmagan');
                }
                break;
            case 'save-file':
                if (!empty($_POST['contents'])) {
                    $fayl_yoli = $_POST['fayl_yoli'];
                    $contents = $_POST['contents'];
                    file_put_contents($fayl_yoli, $contents);
                    return json_success('File saved successfully');
                } else {
                    return json_error('Saqlash uchun fayl ochilmagan');
                }
                break;
        }
    }
}
