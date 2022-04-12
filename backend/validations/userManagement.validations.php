<?php

function validateUserName($username)
{
    if ($username == null || strlen($username) < 4) {
        return array(null, "SHORT_MISSING_USER");
    }

    $sanitizedUsername = filter_var($username, FILTER_SANITIZE_SPECIAL_CHARS);
    if ($sanitizedUsername != $username) { // if it contains wierd chars, return
        return array(null, "INVALID_USER_CHARS");
    }

    if (!preg_match("/[a-zA-Z_]+[a-zA-Z0-9_]*/", $username)) { // if it doesn't start with a letter or underscore, or contains wierd characters, return
        return array(null, "INVALID_USER_CONTENTS");
    }

    return array($username, null);
}

function validateEmail($email)
{
    $sanitizedEmail = filter_var($email, FILTER_SANITIZE_EMAIL);

    if ($sanitizedEmail != $email) { // if not a valid email by default, return
        return array(null, "INVALID_EMAIL_CHARS");
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) // if not a valid email by default, return
    {
        return array(null, "INVALID_EMAIL");
    }

    return array($email, null);
}
