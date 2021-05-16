<?php
/*
* Fayl menjr Akbarali tomonidan yozildi.
* Johncms Profile Link: https://johncms.com/profile/?user=38217
* Those who want to sponsor: Webmoney WMR: R853215959425, Webmoney WMZ: Z401474330355, Webmoney WMY: Y194307290426
*/

namespace Editor\Controllers;

use Johncms\Controller\BaseController;

require 'vsconfig.php';

class VsCodeEditorController extends BaseController
{
    protected $module_name = 'editor';

    public function index()
    {
        if (isset($_POST['action'])) {
            switch ($_POST['action']) {
                case 'reload':
                    return json_success('OK', [
                        'data' => files(MAIN_DIR),
                    ]);
                    exit;
                    break;
            }
        }

        $title = 'Vs Code Editor Clone';
        // Устанавливаем заголовок страницы в теге title и h1
        $this->render->addData(
            [
                'title'      => $title,
            ]
        );

        // Добавляем страницу в цепочку навигации
        $this->nav_chain->add($title, '/editor/');

        return $this->render->render('editor::vscode', ['title' => $title, 'main_dir' => files(MAIN_DIR)]);
    }
}
