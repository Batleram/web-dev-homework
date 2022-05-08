<?php
include_once "../root-dir.php";
include_once ROOT . '/controllers/cards.controller.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        cardsGet();
        break;
    case 'POST':
        cardsPost();
        break;
    case 'PATCH':
        cardsPatch();
        break;
    default:
        echo "unimplemented";
        break;
}
