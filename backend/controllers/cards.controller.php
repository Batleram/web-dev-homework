<?php
include_once "../root-dir.php";
include_once ROOT . "/services/userManagement.service.php";
include_once ROOT . "/services/sessionManagement.service.php";
include_once ROOT . "/services/cardManagement.service.php";
include_once ROOT . "/helpers/error.decoder.php";
include_once ROOT . "/validations/cardName.validation.php";
include_once ROOT . "/models/card.php";

function cardsGet() // to get all cards
{
    if (!validateSession()) {
        decode_error("INVALID_SESSION");
        return;
    }

    // check for permission to read card
    if (!doesUserHavePermission($_SESSION["username"], "READ_CARD")) {
        decode_error("MISSING_PERMISSION");
        return;
    }

    $cards = formatCardFromSql(getUserCards($_SESSION["username"]));

    header("Content-Type: application/json");
    echo json_encode($cards);
}

function cardsPost() // to generate a new card
{
    $json_body = json_decode(file_get_contents("php://input"), true);

    // check user is signed in
    if (!validateSession()) {
        decode_error("INVALID_SESSION");
        return;
    }

    // check user permission
    if (!doesUserHavePermission($_SESSION["username"], "CREATE_CARD")) {
        decode_error("MISSING_PERMISSION");
        return;
    }

    // check a cardname was supplied
    if (!isset($json_body["card_name"])) {
        decode_error("MISSING_CARDNAME");
        return;
    }

    // check that the cardname is valid
    $validated_cardname = validateCardName($json_body["card_name"]);
    if ($validated_cardname[1] != null) {
        decode_error($validated_cardname[1]);
        return;
    }
    $validated_cardname = $validated_cardname[0];

    $card = generateCard($validated_cardname);

    $user = getUserFromName($_SESSION["username"]);

    if (!isset($user[0])) {
        decode_error("WTF");
        return;
    }

    $card["userid"] = $user[0]["userid"];

    /* // write the card to the database */
    writeCardToDatabase($card);

    header("Content-Type: application/json");
    echo json_encode($card);
}

function cardsPatch() // to add an attribute
{
    $json_body = json_decode(file_get_contents("php://input"), true);

    // check user is signed in
    if (!validateSession()) {
        decode_error("INVALID_SESSION");
        return;
    }

    // check user permission
    if (!doesUserHavePermission($_SESSION["username"], "MODIFY_CARD")) {
        decode_error("MISSING_PERMISSION");
        return;
    }

    // check that an attribute was passed
    if (!isset($json_body["attribute_name"]) || !isset($json_body["attribute_value"])) {
        decode_error("MISSING_ATTRIBUTE_PARAMETER");
        return;
    }

    // check if attribute_name is a valid attribute name
    if (!in_array(strtoupper($json_body["attribute_name"]), POSSIBLE_CARD_ATTRIBUTES)) {
        decode_error("INVALID_ATTRIBUTE_NAME");
        return;
    }

    // check if attribute_value is in a valid range
    if (!is_int($json_body["attribute_value"]) || $json_body["attribute_value"] <= 0 || $json_body["attribute_value"] > 5) {
        decode_error("INVALID_ATTRIBUTE_VALUE");
        return;
    }

    // check that a card id was passed
    if (!isset($json_body["cardid"]) || !is_int($json_body["cardid"])) {
        decode_error("CARDID_MISSING");
        return;
    }

    $card_for_attribute = formatCardFromSql(getUserCard($_SESSION["username"], $json_body["cardid"]));
    if (count($card_for_attribute) == 0) {
        decode_error("UNOWNED_CARD");
        return;
    }

    // check that the card has attribute slots left
    if ($card_for_attribute[array_keys($card_for_attribute)[0]]["attribute_points"] <= 0) {
        decode_error("NO_ATTRIBUTE_POINTS");
        return;
    }

    addAttribute(array_keys($card_for_attribute)[0], $json_body["attribute_name"], $json_body["attribute_value"]);
}
