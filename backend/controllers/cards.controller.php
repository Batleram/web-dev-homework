<?php
include_once "../root-dir.php";
include_once ROOT . "/services/userManagement.service.php";
include_once ROOT . "/services/sessionManagement.service.php";
include_once ROOT . "/services/cardManagement.service.php";
include_once ROOT . "/helpers/error.decoder.php";
include_once ROOT . "/helpers/cards.formatter.php";

function cardsGet()
{
    if (!validateSession()) {
        decode_error("INVALID_SESSION");
        return;
    }


    // check for permission to read card
    $permissions = getUserPermissions($_SESSION["username"]);
    if (count($permissions) == 0 || !in_array("READ_CARD", $permissions[0])) {
        decode_error("MISSING_PERMISSION");
        return;
    }

    $cards = formatCardFromSql(getUserCards($_SESSION["username"]));

    header("Content-Type: application/json");
    echo json_encode($cards);

}
