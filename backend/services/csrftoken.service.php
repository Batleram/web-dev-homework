<?php
function validateCSRFToken()
{

    if(!isset($_SERVER["HTTP_X_CSRF_TOKEN"])){
        return false;
    }

    return  $_SERVER["HTTP_X_CSRF_TOKEN"] == $_SESSION["CSRF_TOKEN"];

}
