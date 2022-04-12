<?php
include_once "../root-dir.php";
include_once ROOT . '/controllers/csrftoken.controller.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        getCSRFToken();
        break;
    default:
        echo "unimplemented";
        break;
}
