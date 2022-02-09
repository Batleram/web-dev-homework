<html>
    <head>
        <link rel="stylesheet" href="./index.css">
    </head>
    <body>
        <nav class="navigation-bar">
            <a class="navigation-link" href="index.php"><h3>Home</h3></a>
            <a class="navigation-link" href="cards.php"><h3>Cards</h3></a>
            <a class="navigation-link" href="wiki.php"><h3>Wiki</h3></a>
        </nav>
    </body>
    <style>
        .navigation-bar{
            height: 3.5rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
            background: var(--color1);
        }

        .navigation-link:nth-child(1){
            margin-left: 10px;
            margin-right: auto;
        }

        .navigation-link{
            margin: 10px;
            text-decoration: none;
            color: white;
            transition:ease-in-out 100ms;
            filter: brightness(1);
            font-size: 1rem;
        }

        .navigation-link:hover{
            filter: brightness(0.8);
            font-size: 1.1rem;
        }

    </style>
</html>
