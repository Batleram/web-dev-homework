<?php
include_once "../root-dir.php";
include_once ROOT . "/constants/card.constants.php";

function attributesGet(){

    header("Content-Type: application/json");
    echo json_encode(POSSIBLE_CARD_ATTRIBUTES);
}
