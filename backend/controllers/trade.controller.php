<?php
include_once "../root-dir.php";
include_once ROOT . '/helpers/error.decoder.php';
include_once ROOT . "/services/sessionManagement.service.php";
include_once ROOT . "/services/cardManagement.service.php";
include_once ROOT . "/services/userManagement.service.php";
include_once ROOT . "/models/card.php";


function tradePost()
{
    $json_body = json_decode(file_get_contents("php://input"), true);

    if (!validateSession()) {
        decode_error("INVALID_SESSION");
        return;
    }

    // check for permission to read card
    if (!doesUserHavePermission($_SESSION["username"], "DELETE_CARD")) {
        decode_error("MISSING_PERMISSION");
        return;
    }
    //
    // check for permission to delete card
    if (!doesUserHavePermission($_SESSION["username"], "CREATE_CARD")) {
        decode_error("MISSING_PERMISSION");
        return;
    }

    // check if a card to trade is passed
    if(!isset($json_body["cardid"])){
        decode_error("CARDID_MISSING");
        return;
    }


    // check a cardname was supplied
    if (!isset($json_body["card_name"])) {
        decode_error("MISSING_CARDNAME");
        return;
    }

    // check that you own the card
    $card_for_trade = formatCardFromSql(getUserCard($_SESSION["username"], $json_body["cardid"]));
    if (count($card_for_trade) == 0) {
        decode_error("UNOWNED_CARD");
        return;
    }
    $card_for_trade = $card_for_trade[array_keys($card_for_trade)[0]];

    // trade the card
    tradeCard($card_for_trade);

    // generate a new card for user
    $trade_result = generateCard($json_body["card_name"]);
    $trade_result["userid"] = $card_for_trade["userid"];

    writeCardToDatabase($trade_result);

    header("Content-Type: application/json");
    echo json_encode($trade_result);

}
