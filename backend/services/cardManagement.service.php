<?php
include_once "../root-dir.php";
include_once ROOT . "/constants/database.connection.php";

function getUserCards($username)
{
    $request_query = "
        select 
            cards.cardid, 
            cards.userid,
            cards.card_name,
            attribute_points, 
            stat as stat, 
            value as stat_value, 
            null as attribute, 
            null as attribute_value,
            null as point_order,
            null as point_x,
            null as point_y
        from cards 
            left join card_stats 
            on 
                cards.cardid=card_stats.cardid 
            where 
                cards.userid=(select userid from users where username=:username)
            and 
                cards.deleted=0 
        union all 
        select 
            cards.cardid,
            cards.userid,
            cards.card_name,
            attribute_points,
            null as stat,
            null as stat_value,
            attribute as attribute,
            value as atttribute_value,
            null as point_order,
            null as point_x,
            null as point_y
        from cards 
            left join card_attributes 
            on 
                cards.cardid=card_attributes.cardid 
            where 
                cards.userid=(select userid from users where username=:username) 
            and cards.deleted=0
        union all
        select 
            cards.cardid,
            cards.userid,
            cards.card_name,
            attribute_points,
            null as stat,
            null as stat_value,
            null as attribute,
            null as atttribute_value,
            point_order as point_order,
            point_x as point_x,
            point_y as point_y
        from cards 
            left join card_points
            on 
                cards.cardid=card_points.cardid 
            where 
                cards.userid=(select userid from users where username=:username) 
            and cards.deleted=0;
            ";
    $db_connection = new PDO(DB_DSN, DB_USER, DB_PASS);
    $statement  = $db_connection->prepare($request_query);
    $statement->bindParam(':username', $username, PDO::PARAM_STR);
    $statement->execute();
    return $statement->fetchAll();
}

function getUserCard($username, $cardid)
{
    $request_query = "
        select 
            cards.cardid, 
            cards.userid,
            cards.card_name,
            attribute_points, 
            stat as stat, 
            value as stat_value, 
            null as attribute, 
            null as attribute_value,
            null as point_order,
            null as point_x,
            null as point_y
        from cards 
            left join card_stats 
            on 
                cards.cardid=card_stats.cardid 
            where 
                cards.userid=(select userid from users where username=:username)
            and 
                cards.deleted=0 
            and
                cards.cardid=:cardid
        union all 
        select 
            cards.cardid,
            cards.userid,
            cards.card_name,
            attribute_points,
            null as stat,
            null as stat_value,
            attribute as attribute,
            value as atttribute_value,
            null as point_order,
            null as point_x,
            null as point_y
        from cards 
            left join card_attributes 
            on 
                cards.cardid=card_attributes.cardid 
            where 
                cards.userid=(select userid from users where username=:username) 
            and 
                cards.deleted=0
            and
                cards.cardid=:cardid
        union all
        select 
            cards.cardid,
            cards.userid,
            cards.card_name,
            attribute_points,
            null as stat,
            null as stat_value,
            null as attribute,
            null as atttribute_value,
            point_order as point_order,
            point_x as point_x,
            point_y as point_y
        from cards 
            left join card_points
            on 
                cards.cardid=card_points.cardid 
            where 
                cards.userid=(select userid from users where username=:username) 
            and 
                cards.deleted=0
            and
                cards.cardid=:cardid;
            ";
    $db_connection = new PDO(DB_DSN, DB_USER, DB_PASS);
    $statement  = $db_connection->prepare($request_query);
    $statement->bindParam(':username', $username, PDO::PARAM_STR);
    $statement->bindParam(':cardid', $cardid, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetchAll();
}

function addAttribute($card, $attribute, $value)
{
    // add attribute
    $db_connection = new PDO(DB_DSN, DB_USER, DB_PASS);
    $statement  = $db_connection->prepare("INSERT INTO card_attributes values (:cardid,:attribute,:value);");
    $statement->bindParam(':cardid', $card["cardid"], PDO::PARAM_INT);
    $statement->bindParam(':attribute', $attribute, PDO::PARAM_STR);
    $statement->bindParam(':value', $value, PDO::PARAM_INT);
    $statement->execute();

    // decrement remaining attribute slots
    $statement  = $db_connection->prepare("UPDATE cards SET attribute_points = attribute_points-1 WHERE cardid = :cardid and attribute_points > 0;");
    $statement->bindParam(':cardid', $cardid, PDO::PARAM_INT);
    $statement->execute();

    // log card edit
    $statement = $db_connection->prepare("INSERT INTO card_logs VALUES (:userid, :cardid, \"MODIFY\", now());");
    $statement->bindParam(':userid', $card["userid"], PDO::PARAM_INT);
    $statement->bindParam(':cardid', $card["cardid"], PDO::PARAM_INT);
    $statement->execute();
}

function addStat($cardid, $stat, $value)
{
    $db_connection = new PDO(DB_DSN, DB_USER, DB_PASS);
    $statement  = $db_connection->prepare("INSERT INTO card_stats values (:cardid,:stat,:value);");
    $statement->bindParam(':cardid', $cardid, PDO::PARAM_INT);
    $statement->bindParam(':stat', $stat, PDO::PARAM_STR);
    $statement->bindParam(':value', $value, PDO::PARAM_INT);
    $statement->execute();
}

function writeCardToDatabase($card)
{
    $db_connection = new PDO(DB_DSN, DB_USER, DB_PASS);
    $statement = $db_connection->prepare("INSERT INTO cards values (null, :cardname,:userid, :attribute_points, 0);");
    $statement->bindParam(':cardname', $card["name"], PDO::PARAM_STR);
    $statement->bindParam(':userid', $card["userid"], PDO::PARAM_INT);
    $statement->bindParam(':attribute_points', $card["attribute_points"], PDO::PARAM_INT);
    $statement->execute();

    // get the id of the card
    $statement = $db_connection->prepare("SELECT cardid from cards order by cardid desc limit 1;");
    $statement->execute();
    $cardid = $statement->fetch()["cardid"];

    // write the points for each card
    foreach ($card["points"] as $index => $point) {
        $statement = $db_connection->prepare("INSERT INTO card_points values (:cardid, :point_order, :point_x, :point_y);");
        $statement->bindParam(':cardid', $cardid, PDO::PARAM_INT);
        $statement->bindParam(':point_order', $index, PDO::PARAM_INT);
        $statement->bindParam(':point_x', $point["point_x"], PDO::PARAM_INT);
        $statement->bindParam(':point_y', $point["point_y"], PDO::PARAM_INT);
        $statement->execute();
    }

    // write the stats for each card
    foreach ($card["stats"] as $stat) {
        $statement = $db_connection->prepare("INSERT INTO card_stats values (:cardid, :stat, :value);");
        $statement->bindParam(':cardid', $cardid, PDO::PARAM_INT);
        $statement->bindParam(':stat', $stat["stat"], PDO::PARAM_STR);
        $statement->bindParam(':value', $stat["value"], PDO::PARAM_INT);
        $statement->execute();
    }

    // log creation of card
    $statement = $db_connection->prepare("INSERT INTO card_logs VALUES (:userid, :cardid, \"CREATE\", now());");
    $statement->bindParam(':userid', $card["userid"], PDO::PARAM_INT);
    $statement->bindParam(':cardid', $cardid, PDO::PARAM_INT);
    $statement->execute();
}

function deleteCard($card)
{
    $db_connection = new PDO(DB_DSN, DB_USER, DB_PASS);
    $statement = $db_connection->prepare("UPDATE cards SET deleted=1 WHERE cardid=:cardid;");
    $statement->bindParam(':cardid', $card["cardid"], PDO::PARAM_STR);
    $statement->execute();


    // log creation of card
    $statement = $db_connection->prepare("INSERT INTO card_logs VALUES (:userid, :cardid, \"DELETE\", now());");
    $statement->bindParam(':userid', $card["userid"], PDO::PARAM_INT);
    $statement->bindParam(':cardid', $card["cardid"], PDO::PARAM_INT);
    $statement->execute();
}
