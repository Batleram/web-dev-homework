import React, { SyntheticEvent, useContext, useState } from 'react'
import { UserContext } from '../hooks';
import "../styles/Login.page.css"

export const Signup = (props: {}) => {
    const { user, setUser } = useContext(UserContext)
    const [error, setError] = useState<String>("");

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            username: { value: string };
            password: { value: string };
            password_confirm: { value: string };
        }

        let csrf_token: { CSRF_TOKEN: string } = await fetch("/api/v1/getcsrftoken.php", { method: "GET" }).then(res => res.json()).catch(e => console.error(e))
        let request_body = {
            "csrf_token": csrf_token.CSRF_TOKEN,
            "username": target.username.value,
            "password": target.password.value,
            "password_confirm": target.password_confirm.value
        }

        fetch("/api/v1/signup.php",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request_body)
            }).then(res => {
                console.log(res.status)
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
        <div className="login-wrapper">
            <form className="login-form" onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Nom d'utilisateur" />
                <input type="password" name="password" placeholder="Mot de passe" />
                <input type="password" name="password_confirm" placeholder="Confirmez votre mot de passe" />
                <button type="submit">Créez votre compte</button>
                <p id="login-error-message">{error}</p>
            </form>
        </div>
    )
}
