<?php
/*
* Fayl menjr Akbarali tomonidan yozildi.
* Johncms Profile Link: https://johncms.com/profile/?user=38217
*/

declare(strict_types=1);
if ($user->rights >= 9 && $user->isValid()) {
    $map->addRoute(['GET', 'POST'], '/editor/[{action}/]', 'modules/editor/index.php'); // Модуль изображений кода Акбарали
}
