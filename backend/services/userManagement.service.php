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

    // set basic read permission to new user
    $statement  = $db_connection->prepare("call add_user_permission(:username, \"READ_CARD\");");
    $statement->bindParam(':username', $username, PDO::PARAM_STR);
    $statement->execute();

    // set basic create permission to new user
    $statement  = $db_connection->prepare("call add_user_permission(:username, \"CREATE_CARD\");");
    $statement->bindParam(':username', $username, PDO::PARAM_STR);
    $statement->execute();

    // set basic modify permission to new user
    $statement  = $db_connection->prepare("call add_user_permission(:username, \"MODIFY_CARD\");");
    $statement->bindParam(':username', $username, PDO::PARAM_STR);
    $statement->execute();

    // set basic delete permission to new user
    $statement  = $db_connection->prepare("call add_user_permission(:username, \"DELETE_CARD\");");
    $statement->bindParam(':username', $username, PDO::PARAM_STR);
    $statement->execute();
}

function getUserFromName($username)
{
    $db_connection = new PDO(DB_DSN, DB_USER, DB_PASS);
    $statement  = $db_connection->prepare("SELECT * from `users` where `username` = :username LIMIT 1;");
    $statement->bindParam(':username', $username, PDO::PARAM_STR);
    $statement->execute();
    return $statement->fetchAll();
}

function getUserPermissions($username)
{
    $db_connection = new PDO(DB_DSN, DB_USER, DB_PASS);
    $statement  = $db_connection->prepare("call get_user_permissions(:username);");
    $statement->bindParam(':username', $username, PDO::PARAM_STR);
    $statement->execute();
    return $statement->fetchAll();
}

function doesUserHavePermission($username, $permission)
{
    $permissions = getUserPermissions($username);

    foreach($permissions as $p){
        if($p["permission"] == $permission){
            return true;
        }
    }

    return false;

}
