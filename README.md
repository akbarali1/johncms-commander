# [JohnCMS](https://johncms.com)

File view editing module for Johncms 9

The file editor allows you to quickly write the most commonly used codes of johncms.

# All abbreviations:

1. `jcmsrequest`
   Result:
   `/** @var \Johncms\System\Http\Request $request */ $request = di(\Johncms\System\Http\Request::class);`
2. `jcmsqueryint`
   Result: `$query = $request->getQuery('query', 0, FILTER_VALIDATE_INT);`
3. `jcmspoststr`
   Result: `$query = $request->getPost('query', '', FILTER_SANITIZE_STRING);`
4. `jcmspostint`
   Result: `$query = $request->getPost('query', '', FILTER_VALIDATE_INT);`
5. `jcmscontroller`
   Result:
   `namespace Controllar_name\Controllers; use Johncms\Controller\BaseController; class Controllar_nameController extends BaseController { public function index() { } }`
6. `DB:`
   Result: `$connection = \Illuminate\Database\Capsule\Manager::connection();`
7. `DB:get`
   Result: `$table_name = $connection->table('table_name')->get();`
8. `DB:first`
   Result: `$table_name = $connection->table('table_name')->where('colum', 'value')->first();`
9. `DB:paginate`
   Result:
   `$table_name = $connection->table('table_name')->paginate(page_size); $table_name_pagination = $table_name->render();`
10. `DB:descget`
    Result: `$table_name = $connection->table('table_name')->orderByDesc('colum')->get();`
11. `DB:descpaginate`
    Result:
    `$table_name = $connection->table('table_name')->orderByDesc('colum')->paginate(page_size); $table_name_pagination = $table_name->render();`
12. `DB:asccget`
    Result: `$table_name = $connection->table('table_name')->orderBy('colum', 'asc')->get();`
13. `DB:ascpaginate`
    Result:
    `$table_name = $connection->table('table_name')->orderBy('colum', 'asc')->paginate(page_size); $table_name_pagination = $table_name->render();`
14. `DB:insert`
    Result:
    `$connection->table('table_name')->insert( [ 'colum' => 'value', ] );`
15. `DB:insertGetId`
    Result:
    `$id_table_name = $connection->table('table_name')->insertGetId( [ 'colum' => 'value', ] );`
16. `DB:insertarray`
    Result:
    `$id_table_name = $connection->table('table_name')->insertGetId( [ 'colum' => 'value', ], [ 'colum' => 'value', ], [ 'colum' => 'value', ], );`
17. `DB:update`
    Result:
    `$connection->table('table_name')->where('colum', '=', value) ->update( [ '' => '', ] );`
18. `DB:updateOrInsert`
    Result:
    `$connection->table('table_name') ->updateOrInsert( [ 'colum' => 'value', ], [ 'colum' => 'colum', ] );`
19. `DB:delete`
    Result: `$connection->table('table_name')->where('colum', '=', 'value')->delete();`
20. `DB:truncate`
    Result: `$connection->table('table_name')->truncate();`
21. `jcmsuser`
    Result: `$user = di(Johncms\Users\User::class);`
22. `jcmsusername`
    Result: `$user->name`
23. `jcmsuserid`
    Result: `$user->id`
24. `isValid`
    Result:
    `if ($user->isValid()) { // code... }`
25. `rights` and `admin`
    Result:
    `if ($user->rights >= darjasi && $user->isValid()) { // code... }`
26. `cssasset`
    Result: `<link rel="stylesheet" href="<?= $this->asset('css/css_name.css', true) ?>">`
27. `jsasset`
    Result: `<script src="<?= $this->asset('js/js_name.js', true) ?>"></script>`
28. `render`
    Result:
    `echo $view->render('name::index', [ 'key' => $value ] );`
29. `jcmsact`
    Result: `$act = $route['action'] ?? '';`
30. `route`
    Result: `$route = di('route');`
31. `config`
    Result: `$config = di('config')['johncms'];`
32. `view`
    Result: `$view = di(Johncms\System\View\Render::class);`
33. `NavChain`
    Result: `$nav_chain = di(Johncms\NavChain::class);`
34. `viewfolder`
    Result: `$view->addFolder('folder_name', __DIR__ . '/templates/');`
35. `NavChainadd`
    Result: `$nav_chain->add('name', '/folder_link/');`

Additional abbreviations are added slowly
