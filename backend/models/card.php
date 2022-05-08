<?php
include_once "../root-dir.php";
include_once ROOT . "/constants/card.constants.php";

function generateCard($name)
{
    // generate the base card
    $card = array(
        "name" =>$name,
        "attribute_points"=> rand(0,5),
        "stats" => array(),
        "points"=>array()
    );

    // generate the stats
    $rand_keys = array_rand(POSSIBLE_CARD_STATS, rand(2,count(POSSIBLE_CARD_STATS)));
    foreach($rand_keys as $key){
        array_push($card["stats"], array(
            "stat" => POSSIBLE_CARD_STATS[$key],
            "value" => rand(0,100)
        ));
    }

    // generate the points
    for($i=0;$i<rand(3,10); $i++){
        array_push($card["points"], array(
            "point_x" => rand(-20, 20),
            "point_y" => rand(-20, 20),
        ));
    }


    return $card;
}

function formatCardFromSql($raw_data)
{
    // turns a flat sql table with nulls into a nested object
    $card_data_parsed = array();

    // format the cards so the returned json looks nice
    foreach ($raw_data as $card_stat) {
        // add the card to the array if it doesn't exist
        if (!isset($card_data_parsed[$card_stat["cardid"]])) {
            $card_data_parsed[$card_stat["cardid"]] = array(
                "cardid" => $card_stat["cardid"],
                "name" => $card_stat["card_name"],
                "userid" => $card_stat["userid"],
                "attribute_points" => $card_stat["attribute_points"],
                "attributes" => array(),
                "stats" => array(),
                "points" => []
            );
        }

        // add the attributes to the card if exists
        if (isset($card_stat["attribute"])) {
            array_push(
                $card_data_parsed[$card_stat["cardid"]]["attributes"],
                array(
                    "name" => $card_stat["attribute"],
                    "value" => $card_stat["attribute_value"]
                )
            );
        }

        // add the stats to the card if exists
        if (isset($card_stat["stat"])) {
            array_push(
                $card_data_parsed[$card_stat["cardid"]]["stats"],
                array(
                    "name" => $card_stat["stat"],
                    "value" => $card_stat["stat_value"]
                )
            );
        }

        // add the points to the card if exists
        if (isset($card_stat["point_order"])) {
            array_push(
                $card_data_parsed[$card_stat["cardid"]]["points"],
                array(
                    "x" => $card_stat["point_x"],
                    "y" => $card_stat["point_y"]
                )
            );
        }
    }
    return $card_data_parsed;
}
