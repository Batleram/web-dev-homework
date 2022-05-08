<?php

function validateCardName($cardName)
{
    if ($cardName == null || strlen($cardName) < 4) {
        return array(null, "SHORT_MISSING_CARDNAME");
    }

    $sanitizedUsername = filter_var($cardName, FILTER_SANITIZE_SPECIAL_CHARS);
    if ($sanitizedUsername != $cardName) { // if it contains wierd chars, return
        return array(null, "INVALID_CARDNAME_CHARS");
    }

    if (!preg_match("/[a-zA-Z_]+[a-zA-Z0-9_]*/", $cardName)) { // if it doesn't start with a letter or underscore, or contains wierd characters, return
        return array(null, "INVALID_CARDNAME_CONTENTS");
    }

    return array($cardName, null);
}
