import React from 'react'
import "../styles/References.page.css"

export const References = () => {
    const reference_list = [
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
    ]

    return (
        <div>
            {reference_list.map((val, id) => (
                <ul id="list-references" key={id}>
                    <li className="reference">
                        <a href={val}>{val}</a>
                    </li >
                </ul >
            ))}
        </div >
    )
}

