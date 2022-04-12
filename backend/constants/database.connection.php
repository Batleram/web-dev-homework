<?php

foreach (["DBHOST", "DBUSER", "DBPASS", "DB"] as $variable) {
    if (!isset($_ENV[$variable])) {
        error_log("$variable is misisng in env variables");
        return;
    }
}

$DBHOST = $_ENV['DBHOST'];
$DBNAME = $_ENV["DB"];
define(
    "DB_DSN",
    "mysql:host=$DBHOST;dbname=$DBNAME;port=3306"
);
define("DB_USER", $_ENV["DBUSER"]);
define("DB_PASS", $_ENV["DBPASS"]);
