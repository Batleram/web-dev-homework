<?php
include_once "../root-dir.php";
include_once ROOT . '/controllers/trade.controller.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        tradePost();
        break;
    default:
        echo "unimplemented";
        break;
}
