import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../hooks'

export const Logout = (props: {}) => {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate();
    useEffect(() => {
        fetch("/api/v1/logout.php", { method: "GET" }).then(res => {
            if (res.status === 200) {
                setUser({ username: null, isLoggedIn: false })
                return;
            }
            throw new Error("Erreur dans la déconnection")


        }).catch(e => {
            console.error(e);
            navigate("/");

        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (<h1>Logging out</h1>)
}
