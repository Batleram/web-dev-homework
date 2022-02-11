<html>

<head>
    <title>Cards</title>
    <link rel="stylesheet" href="./index.css" />
    <link rel="stylesheet" href="./cards.css" />
</head>

<body>
    <?php include "navbar.php"; ?>
    <div class="card-container">
        <?php
        function cardGenerator()
        {
            $card = "<div class=\"card\">";

            $card .= "<h1>Some Content</h1>";
            $card .= "<div class=\"card-image\"></div>";

            $card .= "<b>Description</b>";
            $card .= "<p>lorem ipsum some bullshit that ill replace later lalalalalalalalala fuck bitch </p>";

            $card .= "<b>Stats</b>";
            $stats = array("Cheap money", "Stole my heart", "Bing Chilling");
            $card .= "<ul>";
    foreach ($stats as $stat){
                $card .= "<li>$stat</li>";
        }
            $card .= "</ul>";


            $card .= "</div>";
            echo $card;
        }
        for ($i = 0; $i < 7; $i++) {
            cardGenerator();
        }
        ?>
    </div>
    <footer>Copyright Big balls 2069</footer>
    <script src="cards.js" type="module"></script>
</body>

</html>
