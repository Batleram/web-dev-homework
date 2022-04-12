
<?php
include_once "../root-dir.php";
include_once ROOT . '/controllers/userManagement.controller.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        signupPost();
        break;
    default:
        echo "unimplemented";
        break;
}
