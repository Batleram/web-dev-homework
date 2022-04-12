<?php

function startSession()
{
    ini_set("session.cookie_lifetime", 0);
    ini_set("session.use_cookies", 1);
    ini_set("session.use_only_cookies", 1);
    ini_set("session.use_strict_mode", 1);
    ini_set("session.cookie_httponly", 1);
    /* ini_set("session.cookie_secure", 1); */ // we don't have https so it won't work
    ini_set("session.cookie_samesite", "Strict");
    ini_set("session.cache_limiter", "nocache");
    ini_set("session.sid_length", 48);
    ini_set("session.sid_bits_per_character", 6);
    ini_set("session.hash_function", "sha256");

    session_name("auth");
    session_start();
}

function setSessionData($key, $value)
{
    $_SESSION[$key] = $value;
}

function validateSession()
{
    return isset($_SESSION["username"]) && !empty($_SESSION["username"]);
}

function destroySession()
{
    session_destroy();
    setcookie('auth', null, -1, "/");
}
