<?php
include_once "../root-dir.php";
include_once ROOT . '/controllers/attributes.controller.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        attributesGet();
        break;
    default:
        echo "unimplemented";
        break;
}
