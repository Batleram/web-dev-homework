<?php
include_once "../root-dir.php";
include_once ROOT . "/constants/database.connection.php";

function addUser($username, $password_hash)
{
    $db_connection = new PDO(DB_DSN, DB_USER, DB_PASS);
    $statement  = $db_connection->prepare("INSERT into `users` VALUES (null, :username, :password_hash, now());");
    $statement->bindParam(':username', $username, PDO::PARAM_STR);
    $statement->bindParam(':password_hash', $password_hash, PDO::PARAM_STR);
    $statement->execute();
}
