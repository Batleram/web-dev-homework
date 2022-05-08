<?php
include_once "../root-dir.php";
include_once ROOT . "/services/sessionManagement.service.php";

function getCSRFToken()
{
    startSession();

    $CSRF_TOKEN = md5(uniqid(mt_rand(), true));
    $_SESSION["CSRF_TOKEN"] = $CSRF_TOKEN;
    echo json_encode(array("CSRF_TOKEN" => $CSRF_TOKEN));
}

function validateCSRFToken()
{
    startSession();
    $json_body = json_decode(file_get_contents("php://input"), true);

    if(!isset($json_body["CSRF_TOKEN"])){
        return false;
    }

    return $json_body["CSRF_TOKEN"] == $_SESSION["CSRF_TOKEN"];

}
