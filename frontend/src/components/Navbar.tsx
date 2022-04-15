import React, { useContext } from "react"
import "../styles/Navbar.component.css"
import { Link } from "react-router-dom"
import { UserContext } from "../hooks"

export const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    return (
        <nav id="navigation-bar">
            <Link to="/" className="navigation-link">
                <h3>Home</h3>
            </Link>
            {user?.isLoggedIn &&
                <Link to="/cards" className="navigation-link">
                    <h3>Cards</h3>
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
                        <h3>Logout</h3>
                    </Link>
                </> : <>
                    <Link to="login" className="navigation-link">
                        <h3>Login</h3>
                    </Link>
                    <Link to="signup" className="navigation-link">
                        <h3>SignUp</h3>
                    </Link>
                </>
            }
        </nav>
    )
}
