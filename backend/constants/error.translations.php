<?php

$errors = array(
    "SHORT_MISSING_USER" => array(
        "FRENCH" => "Nom d'utilisateur de 4 caractères ou plus requis!"
    ),
    "INVALID_USER_CHARS" => array(
        "FRENCH" => "Caractères invalides dans le nom d'utilisateur!"
    ),
    "MISSING_USER_IN_BODY" =>array(
    "FRENCH" => "Le champ 'username' est manquant dans la requête"
),
    "INVALID_USER_CONTENTS" => array(
        "FRENCH" => "Le nom d'utilisteur doit commencer avec une lettre et ne peux pas utiliser de caractères spéciaux!"
    ),
    "INVALID_EMAIL_CHARS" => array(
        "FRENCH" => "Caractères invalides dans le couriel"
    ),
    "INVALID_EMAIL" => array(
        "FRENCH" => "Couriel invalide"
    )
);

define("errors", $errors);
