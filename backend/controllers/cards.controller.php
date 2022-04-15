<?php
include_once "../root-dir.php";
include_once ROOT . "/services/userManagement.service.php";
include_once ROOT . "/services/sessionManagement.service.php";
include_once ROOT . "/helpers/error.decoder.php";

function cardsGet()
{
    if (!validateSession()) {
        decode_error("INVALID_SESSION");
        return;
    }
    $cards = array(
        array(
            "positions" => [
                [-20, -20], [-20, 20], [20, 20], [20, -20],
            ],
        ),
        array(
            "positions" => [
                [-20, -20], [-20, 20], [20, 20], [20, -20],
            ],
        ),
        array(
            "positions" => [
                [-20, -20], [-20, 20], [20, 20], [20, -20],
            ],
        )
    );

    $cards_json = json_encode($cards);
    $permissions = getUserPermissions($_SESSION["username"]);
    if (count($permissions) > 0 && in_array("READ_CARD", $permissions[0])) {
        echo $cards_json;
        return;
    }
    decode_error("MISSING_PERMISSION");
}
