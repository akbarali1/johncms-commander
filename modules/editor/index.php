<?php
/*
* Fayl menjr Akbarali tomonidan yozildi.
* Johncms Profile Link: https://johncms.com/profile/?user=38217
* Those who want to sponsor: Webmoney WMR: R853215959425, Webmoney WMZ: Z401474330355, Webmoney WMY: Y194307290426
*/

declare(strict_types=1);
defined('_IN_JOHNCMS') || die('Error: restricted access');
require 'includes/yadro.php';

use Johncms\System\Http\Request;
use Johncms\System\View\Render;
use Johncms\NavChain;

/** @var Render $view */
$view = di(Render::class);

/** @var NavChain $nav_chain */
$nav_chain = di(NavChain::class);

/** @var Request $request */
$request = di(Request::class);

$config = di('config')['johncms'];
$route = di('route');
// Register Namespace for module templates
$view->addFolder('editor', __DIR__ . '/templates/');

$act = $route['action'] ?? '';

// echo $request->getQueryString();

switch ($act) {

  case 'api':
    require 'includes/api.php';
    break;

  case 'scan':
    require 'includes/scan.php';
    break;

  default:
    require 'includes/index.php';
    break;
}
