import React, { useContext } from 'react'
import { UserContext } from "../hooks/UserContext";
import "../styles/Login.page.css"

export const Login = (props: {}) => {
    const { user, setUser } = useContext(UserContext);

    return (
        <div className="login-wrapper">
            <form className="login-form">
                <input type="text" name="username" placeholder="Nom d'utilisateur" />
                <input type="password" name="password" placeholder="Mot de passe" />
                <button type="submit">Connexion</button>
            </form>
        </div>
    )
}
