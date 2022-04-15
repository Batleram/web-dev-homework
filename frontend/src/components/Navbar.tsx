import React, { useContext } from "react"
import "../styles/Navbar.component.css"
import { Link } from "react-router-dom"
import { UserContext } from "../hooks"

export const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    return (
        <nav id="navigation-bar">
            <Link to="/" className="navigation-link">
                <h3>Acceuil</h3>
            </Link>
            {user?.isLoggedIn &&
                <Link to="/cards" className="navigation-link">
                    <h3>Cartes</h3>
                </Link>
            }
            <Link to="wiki" className="navigation-link">
                <h3>Wiki</h3>
            </Link>
            <Link to="references" className="navigation-link">
                <h3>References</h3>
            </Link>

            {user?.isLoggedIn ?
                <>
                    <Link to="logout" className="navigation-link">
                        <h3>Deconnexion</h3>
                    </Link>
                </> : <>
                    <Link to="login" className="navigation-link">
                        <h3>Connexion</h3>
                    </Link>
                    <Link to="signup" className="navigation-link">
                        <h3>Creer un compte</h3>
                    </Link>
                </>
            }
        </nav>
    )
}
