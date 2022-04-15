import React, { SyntheticEvent, useContext, useState } from 'react'
import { UserContext } from "../hooks/UserContext";
import "../styles/Login.page.css"

export const Login = (props: {}) => {
    const { user, setUser } = useContext(UserContext);
    const [error, setError] = useState<String>("");

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            username: { value: string };
            password: { value: string };
        }

        let csrf_token: { CSRF_TOKEN: string } = await fetch("/api/v1/getcsrftoken.php", { method: "GET" }).then(res => res.json()).catch(e => console.error(e))
        let request_body = {
            "csrf_token": csrf_token.CSRF_TOKEN,
            "username": target.username.value,
            "password": target.password.value,
        }

        fetch("/api/v1/login.php",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request_body)
            }).then(res => {
                if (res.status === 403) {
                    return res.text()
                } else if (res.status === 200) {
                    setUser({
                        username: target.username.value,
                        isLoggedIn: true
                    })
                }
                throw new Error("Exception occured")
            }).then(err => {
                setError(err + "")
            }).catch(err => {
                console.error(err);
            })
    }

    return (
        <div className="login-wrapper" onSubmit={handleSubmit}>
            <form className="login-form">
                <input type="text" name="username" placeholder="Nom d'utilisateur" />
                <input type="password" name="password" placeholder="Mot de passe" />
                <button type="submit">Connexion</button>
                <p id="login-error-message">{error}</p>
            </form>
        </div>
    )
}
