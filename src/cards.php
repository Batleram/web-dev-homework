<html>

<head>
    <title>Cards</title>
    <link rel="stylesheet" href="./index.css" />
</head>

<body>
    <?php include "navbar.php"; ?>
    <div class="card-container">
        <?php
        function cardGenerator()
        {
            $card = "<div class=\"card\">";

            $card .= "<h1>Some Content</h1>";

            $card .= "</div>";
            echo $card;
        }
        for ($i = 0; $i < 4; $i++) {
            cardGenerator();
        }
        ?>
    </div>
    <footer>Copyright Big balls 2069</footer>
    <style>
        .card-container {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
        }

        .card {
            width: 30%;
            height: 500px;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin: 30px 10px;
            border: solid var(--color4) 1.5px;
            border-radius: 10px;
            padding: 5px;
        }
    </style>
</body>

</html>
