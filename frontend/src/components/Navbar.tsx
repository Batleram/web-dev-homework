import React from "react"
import "../styles/Navbar.component.css"
import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <nav id="navigation-bar">
            <Link to="/" className="navigation-link">
                <h3>Home</h3>
            </Link>
            <Link to="/cards" className="navigation-link">
                <h3>Cards</h3>
            </Link>
            <Link to="wiki" className="navigation-link">
                <h3>Wiki</h3>
            </Link>
            <Link to="references" className="navigation-link">
                <h3>References</h3>
            </Link>
        </nav>
    )
}
