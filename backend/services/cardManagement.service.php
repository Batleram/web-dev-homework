<?php
include_once "../root-dir.php";
include_once ROOT . "/constants/database.connection.php";

function getUserCards($username)
{
    $request_query = "
        select 
            cards.cardid, 
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
