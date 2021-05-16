<?php
/*
* Fayl menjr Akbarali tomonidan yozildi.
* Johncms Profile Link: https://johncms.com/profile/?user=38217
*/

declare(strict_types=1);

use Editor\Controllers\EditorController;
use Editor\Controllers\VsCodeEditorController;

if ($user->rights >= 9 && $user->isValid()) {

    $map->addRoute(['GET'], '/editor/', [EditorController::class, 'index']); // Akbarali yozgan Johncms Controller 
    $map->addRoute(['GET', 'POST'], '/editor/scan/', [EditorController::class, 'scan']); // Folder all file and folder scan 
    $map->addRoute(['POST'], '/editor/api/', [EditorController::class, 'api']); // Api  
    $map->addRoute(['GET', 'POST'], '/editor/vscode/', [VsCodeEditorController::class, 'index']); // VScode clon controller

    //$map->addRoute(['GET', 'POST'], '/editor/[{action}/]', 'modules/editor/index.php'); // Модуль изображений кода Акбарали
}
