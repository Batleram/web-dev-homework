<?php

// hashes a given password
function hashPassword($password)
{
    return password_hash($password, PASSWORD_ARGON2ID);
}

// compares a hash to a password
function comparePasswordHash($password, $hashed_password)
{
    return password_verify($password, $hashed_password);
}
