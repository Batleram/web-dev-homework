<!DOCTYPE html>
<html>

<head>
    <title>Wiki</title>
    <link rel="stylesheet" href="./index.css" />
    <link rel="stylesheet" href="./wiki.css" />
</head>

<body>
    <?php include "navbar.php"; ?>
    <div id="wiki">
        <?php
        for ($i = 0; $i < 10; $i++) {
            echo "<section class=\"wiki-section\">
        <h1>Info sur truc dans l'affaire</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur cumque voluptatum aliquid totam fugiat nulla rem quam, quo, mollitia earum eius iusto fuga. Quo cupiditate odio at quam, beatae fugiat. 
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur cumque voluptatum aliquid totam fugiat nulla rem quam, quo, mollitia earum eius iusto fuga. Quo cupiditate odio at quam, beatae fugiat. 
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur cumque voluptatum aliquid totam fugiat nulla rem quam, quo, mollitia earum eius iusto fuga. Quo cupiditate odio at quam, beatae fugiat. 
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur cumque voluptatum aliquid totam fugiat nulla rem quam, quo, mollitia earum eius iusto fuga. Quo cupiditate odio at quam, beatae fugiat.</p>
    </section>";
        }
        ?>
    </div>
    <?php include "footer.php"; ?>
</body>

</html>
