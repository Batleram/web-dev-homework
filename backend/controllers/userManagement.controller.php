<?php
include_once "../root-dir.php";
include_once ROOT . '/validations/userManagement.validations.php';
include_once ROOT . '/helpers/error.decoder.php';
include_once ROOT . "/services/userManagement.service.php";
include_once ROOT ."/services/hashing.service.php";

function loginPost()
{
    $json_body = json_decode(file_get_contents("php://input"), true);

    // make sure that a user is passed
    if (!isset($json_body["username"])) {
        echo decode_error("MISSING_USER_IN_BODY");
        return;
    }

    // make sure that a password is passed
    if (!isset($json_body["password"])) {
        echo decode_error("MISSING_PASS_IN_BODY");
        return;
    }

    $validated_username = validateUserName($json_body["username"]);
    // if there was an error in the validation
    if ($validated_username[1] != null) {
        echo decode_error($validated_username[1]);
        return;
    }
    // reasign it so we have an apropriately named username variable to work with
    $validated_username = $validated_username[0];
}

function signupPost()
{
    $json_body = json_decode(file_get_contents("php://input"), true);

    // make sure that a user is passed
    if (!isset($json_body["username"])) {
        echo decode_error("MISSING_USER_IN_BODY");
        return;
    }

    // make sure that a password is passed
    if (!isset($json_body["password"])) {
        echo decode_error("MISSING_PASS_IN_BODY");
        return;
    }

    // make sure that a password is passed
    if (!isset($json_body["password_confirm"])) {
        echo decode_error("MISSING_PASS_CONFIRM_IN_BODY");
        return;
    }

    // if password and password confirmations are different
    if ($json_body["password" != $json_body["password_confirm"]]) {
        echo decode_error("PASSWORD_CONFIRM_DIFFERENT");
        return;
    }

    $validated_username = validateUserName($json_body["username"]);
    // if there was an error in the validation
    if ($validated_username[1] != null) {
        echo decode_error($validated_username[1]);
        return;
    }
    // reasign it so we have an apropriately named username variable to work with
    $validated_username = $validated_username[0];

    addUser($validated_username, hashPassword($json_body["password"]));
}
