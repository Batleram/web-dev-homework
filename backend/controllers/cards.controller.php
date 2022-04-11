<?php

function cardsGet()
{
    $cards = array(
        array(
            "positions" => [
                [-20, -20], [-20, 20], [20, 20], [20, -20],
            ],
        ),
        array(
            "positions" => [
                [-20, -20], [-20, 20], [20, 20], [20, -20],
            ],
        ),
        array(
            "positions" => [
                [-20, -20], [-20, 20], [20, 20], [20, -20],
            ],
        )
    );

    $cards_json = json_encode($cards);

    echo $cards_json;
}
