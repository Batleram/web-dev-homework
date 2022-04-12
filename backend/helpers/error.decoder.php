<?php
include_once "../root-dir.php";
include_once ROOT . "/constants/config.php";
include_once ROOT . "/constants/error.translations.php";

function decode_error($error)
{
    $json_body = json_decode(file_get_contents("php://input"), true);

    // check if the user wants a specific language
    if (isset($json_body["ERROR_LANG"])) {

        // check if that required error exists
        if (isset(errors[$error][$json_body["ERROR_LANG"]])) {
            echo errors[$error][$json_body["ERROR_LANG"]];
            return;
        }

        // fallback error
        echo "Une exception est arrivée, réessayez plus tard";
        return;
    }

    // check if the required error exists in default langauge
    if (isset(errors[$error][DEFAULT_ERROR_LANG])) {
        echo errors[$error][DEFAULT_ERROR_LANG];
        return;
    }

    // fallback fallback error
    echo "Une exception est arrivée, réessayez plus tard";
}