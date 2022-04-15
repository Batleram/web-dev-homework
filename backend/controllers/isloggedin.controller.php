<?php
include_once "../root-dir.php";
include_once ROOT . "/services/sessionManagement.service.php";

function isLoggedIn()
{
    if (validateSession()) {
        echo json_encode(
            array(
                "LOGIN_STATE" => true,
                "USERNAME" => $_SESSION["USERNAME"]
            )
        );
        return;
    }
    echo json_encode(
        array(
            "LOGIN_STATE" => false,
            "USERNAME" => null
        )
    );
}
