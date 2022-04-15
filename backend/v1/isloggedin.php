<?php
include_once "../root-dir.php";
include_once ROOT . '/controllers/isloggedin.controller.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        isLoggedIn();
        break;
    default:
        echo "unimplemented";
        break;
}
