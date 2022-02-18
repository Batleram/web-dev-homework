<!DOCTYPE html>
<html>

<head>
    <title>References</title>
    <link rel="stylesheet" href="./index.css" />
    <link rel="stylesheet" href="./references.css" />
</head>

<body>
    <?php include "navbar.php"; ?>
    <div id="references">
        <h1>References: </h1>
        <?php
        $reference_list = array(
            "https://stackoverflow.com/questions/4575826/how-to-push-a-footer-to-the-bottom-of-page-when-content-is-short-or-missing",
            "https://www.php.net/manual/en/control-structures.foreach.php",
            "https://www.php.net/manual/en/control-structures.for.php",
            "https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene",
            "https://hub.docker.com/_/nginx",
            "http://geekyplatypus.com/dockerise-your-php-application-with-nginx-and-php7-fpm/",
            "https://www.lipsum.com/",
            "https://coolors.co/",
            "https://www.w3schools.com/cssref/sel_after.asp",
            "https://www.alt-codes.net/trademark_alt_code.php"
        );
        foreach ($reference_list as $reference) {

            echo "
    <ul id=\"list-references\">
            <li class=\"reference\"><a href=\"$reference\">$reference</a></li>
        </ul>";
        }
        ?>
    </div>
    <?php include "footer.php"; ?>
</body>

</html>
