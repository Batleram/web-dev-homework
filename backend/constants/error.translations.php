<?php

$errors = array(
    "SHORT_MISSING_USER" => array(
        "FRENCH" => "Nom d'utilisateur de 4 caractères ou plus requis!"
    ),
    "INVALID_USER_CHARS" => array(
        "FRENCH" => "Caractères invalides dans le nom d'utilisateur!"
    ),
    "MISSING_USER_IN_BODY" => array(
        "FRENCH" => "Le champ 'username' est manquant dans la requête"
    ),
    "MISSING_PASS_IN_BODY" => array(
        "FRENCH" => "Le champ 'password' est manquant dans la requête"
    ),
    "MISSING_PASS_CONFIRM_IN_BODY" => array(
        "FRENCH" => "Le champ 'password_confirm' est manquant dans la requête"
    ),
    "PASSWORD_CONFIRM_DIFFERENT" => array(
        "FRENCH" => "Les mots de passe ne sont pas identiques"
    ),
    "SHORT_PASSWORD" =>array(
        "FRENCH" => "Le mot de passe doit avoir une longeur de 8 ou plus"
    ),
    "SHORT_CARDNAME" =>array(
        "FRENCH" => "Le nom de carte doit avoir une longeur de 8 ou plus"
    ),
    "INVALID_USER_CONTENTS" => array(
        "FRENCH" => "Le nom d'utilisteur doit commencer avec une lettre et ne peux pas utiliser de caractères spéciaux!"
    ),
    "INVALID_CARDNAME_CONTENTS" => array(
        "FRENCH" => "Le nom de carte doit commencer avec une lettre et ne peux pas utiliser de caractères spéciaux!"
    ),
    "INVALID_EMAIL_CHARS" => array(
        "FRENCH" => "Caractères invalides dans le couriel"
    ),
    "INVALID_CARDNAME_CHARS" => array(
        "FRENCH" => "Caractères invalides dans le nom de carte"
    ),
    "INVALID_EMAIL" => array(
        "FRENCH" => "Couriel invalide"
    ),
    "INVALID_CREDENTIALS" => array(
        "FRENCH" => "Le nom d'utilisateur ou le mot de passe sont invalides"
    ),
    "USER_ALREADY_TAKEN" => array(
        "FRENCH" => "Le nom d'utilisateur est déjà utilisé"
    ),
    "INVALID_SESSION" => array(
        "FRENCH" => "La session est invalide, veuillez vous connecter"
    ),
    "MISSING_PERMISSION" => array(
        "FRENCH" => "Vous n'avez pas la permission d'effectuer cette action"
    ),
    "MISSING_CARDNAME" => array(
        "FRENCH" => "Vous devez specifier un nom de carte"
    ),
    "MISSING_ATTRIBUTE_PARAMETER" => array(
        "FRENCH" => "Vous devez specifier un nom d'attribut et une valeur"
    ),
    "INVALID_ATTRIBUTE_NAME" => array(
        "FRENCH" => "Nom d'attribut invalide"
    ),
    "INVALID_ATTRIBUTE_VALUE" => array(
        "FRENCH" => "Valeur d'attribute doit etre un entier entre 1 et 5 inclusivement"
    ),
    "CARDID_MISSING" => array(
        "FRENCH" => "Vous devez specifier un Id de carte"
    ),
    "UNOWNED_CARD" => array(
        "FRENCH" => "Cette carte ne vous appartient pas"
    ),
    "NO_ATTRIBUTE_POINTS" => array(
        "FRENCH" => "Vous n'avez plus de points d'attribut"
    ),
    "WTF" => array(
        "FRENCH" => "WTF???"
    ),

);

define("errors", $errors);
