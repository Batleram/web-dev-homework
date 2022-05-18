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
