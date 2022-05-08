<?php

function formatCardFromSql($raw_data)
{
    // turns a flat sql table with nulls into a nested object
    $card_data_parsed = array();

    // format the cards so the returned json looks nice
    foreach ($raw_data as $card_stat) {
        // add the card to the array if it doesn't exist
        if (!isset($card_data_parsed[$card_stat["cardid"]])) {
            $card_data_parsed[$card_stat["cardid"]] = array(
                "name" => $card_stat["card_name"],
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
