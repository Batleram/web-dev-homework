<?php
include_once "../root-dir.php";
include_once ROOT . '/validations/userManagement.validations.php';
include_once ROOT . '/helpers/error.decoder.php';

function loginPost()
{
    $json_body = json_decode(file_get_contents("php://input"), true)["test"];

    // make sure that a user is passed
    if (!isset($json_body["username"])) {
        echo decode_error("MISSING_USER_IN_BODY");
        return;
    }
}
