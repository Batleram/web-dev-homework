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

            $card .= "<h1>Nom Carte</h1>";
            $card .= "<div class=\"card-image\"></div>";

            $card .= "<b>Description</b>";
            $card .= "<p style=\"text-align: justify; margin: auto 4px ;\">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur cumque voluptatum aliquid totam fugiat nulla rem quam, quo, mollitia earum eius iusto fuga. Quo cupiditate odio at quam, beatae fugiat.</p>";

            $card .= "<b>Infos</b>";
            $stats = array("Attaque: ", "Defense: ", "Intelligence: ");
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
    <?php include "footer.php"; ?>
    <script src="cards.js" type="module"></script>
</body>

</html>
