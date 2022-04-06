import React from "react"
import "../styles/Navbar.component.css"

export const Navbar = () => {
    return (
        <nav id="navigation-bar">
            <a className="navigation-link" href="index.php">
                <h3>Home</h3>
            </a>
            <a className="navigation-link" href="cards.php">
                <h3>Cards</h3>
            </a>
            <a className="navigation-link" href="wiki.php">
                <h3>Wiki</h3>
            </a>
            <a className="navigation-link" href="references.php">
                <h3>References</h3>
            </a>
        </nav>
    )
}
