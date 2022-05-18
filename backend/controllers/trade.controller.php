<?php
include_once "../root-dir.php";
include_once ROOT . '/helpers/error.handler.php';
include_once ROOT . "/services/sessionManagement.service.php";
include_once ROOT . "/services/cardManagement.service.php";
include_once ROOT . "/services/userManagement.service.php";
include_once ROOT . "/services/csrftoken.service.php";
include_once ROOT . "/models/card.php";


function tradePost()
{
    $json_body = json_decode(file_get_contents("php://input"), true);

    if (!validateSession()) {
        handle_error("INVALID_SESSION");
        return;
    }

    // check csrf
    if(!validateCSRFToken()){
        handle_error("INVALID_CSRF_TOKEN");
        return;
    }

    // check for permission to read card
    if (!doesUserHavePermission($_SESSION["username"], "DELETE_CARD")) {
        handle_error("MISSING_PERMISSION");
        return;
    }
    
    // check for permission to delete card
    if (!doesUserHavePermission($_SESSION["username"], "CREATE_CARD")) {
        handle_error("MISSING_PERMISSION");
        return;
    }

    $cooldown = 5*60;
    // check if user is on cooldown
    $actions = getLastUserActions($_SESSION["username"]);
    foreach($actions as $action){
        if($action["action"] == "TRADE"){
            if(time() - strtotime($action["time"])<= $cooldown){
                handle_error("ACTION_COOLDOWN");
                return;
            }
            
        }
    }

    // check if a card to trade is passed
    if(!isset($json_body["cardid"])){
        handle_error("CARDID_MISSING");
        return;
    }


    // check a cardname was supplied
    if (!isset($json_body["card_name"])) {
        handle_error("MISSING_CARDNAME");
        return;
    }

    // check that you own the card
    $card_for_trade = formatCardFromSql(getUserCard($_SESSION["username"], $json_body["cardid"]));
    if (count($card_for_trade) == 0) {
        handle_error("UNOWNED_CARD");
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
