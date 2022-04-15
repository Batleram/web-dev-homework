import React from 'react'
import "../styles/References.page.css"

export const References = () => {
    const reference_list = [
        "------------------REFERENCE ARTICLES-----------",
        "https://stackoverflow.com/questions/4575826/how-to-push-a-footer-to-the-bottom-of-page-when-content-is-short-or-missing",
        "https://www.php.net/manual/en/control-structures.foreach.php",
        "https://www.php.net/manual/en/control-structures.for.php",
        "https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene",
        "https://hub.docker.com/_/nginx",
        "http://geekyplatypus.com/dockerise-your-php-application-with-nginx-and-php7-fpm/",
        "https://www.lipsum.com/",
        "https://coolors.co/",
        "https://www.w3schools.com/cssref/sel_after.asp",
        "https://www.alt-codes.net/trademark_alt_code.php",
        "https://hub.docker.com/_/mariadb",
        "https://reactrouter.com/docs/en/v6/upgrading/v5",
        "https://reactjs.org/docs/hooks-reference.html",
        "https://stackoverflow.com/questions/5061675/emulate-a-403-error-page",
        "https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/",
        "https://www.mariadbtutorial.com/mariadb-basics/mariadb-insert-into-select/",
        "https://stackoverflow.com/questions/12890071/select-from-multiple-tables-mysql",
        "------------FRONTEND DEPENDANCIES-------------",
        "@react-three/fiber V8.0.10",
        "react v18.0.0",
        "react-dom v6.3.0",
        "react-router-dom v6.3.0",
        "react-scripts v5.0.0",
        "three v0.139.2",
        "typescript v4.6.3",
        "nodejs V17.8.0",
        "--- frontend dev dependancies ------",
        "@types/three v0.130.0",
        "@types/node 16.11.26",
        "@types/react v17.0.43",
        "@types/react-dom v17.0.14",
        "@types/react-router-dom v5.3.3",
        "npm v8.5.5",
        "---------- BACKEND DEPENDANCIES-------------",
        "nginx v1.21.6",
        "mariadb v10.6.7",
        "pdo latest",
        "pdo_mysql latest",
        "php:7-fpm v7.4.27",
        "curl v7.74.0",
        "libxml v2.9.10",
        "mbstring v1.3.2",
        "mysqlnd v7.4.27",
        "phar v1.1.1 ",
        "readline v8.1",
        "sodium v1.0.18 ",
        "sqlite3 v3.34.1 ",
        "xml v2.9.10 ",
        'zlib v1.2.11 ',

    ]

    return (
        <div>
            {reference_list.map((val, id) => (
                <ul id="list-references" key={id}>
                    <li className="reference">
                        {val.includes("http") ?
                            <a href={val}>{val}</a>
                            :
                            <p>{val}</p>
                    }
                    </li >
                </ul >
            ))}
        </div >
    )
}

