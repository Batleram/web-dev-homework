import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Footer, Navbar } from './components';
import { Cards, Landing, References, Wiki, Login, Signup, Logout } from './pages';
import { Routes, Route, Navigate } from "react-router-dom"
import { UserContext } from "./hooks";

export const App = () => {
    const [user, setUser] = useState<UserState>({
        username: null,
        isLoggedIn: false
    })

    const value = useMemo(() => ({ user, setUser }), [user, setUser])


    useEffect(() => {
        fetch("/api/v1/isloggedin.php", { method: "GET" })
            .then(res => {
                return res.json()
            }).then((data: { LOGIN_STATE: boolean, USERNAME: string }) => {
                if (data?.LOGIN_STATE) {
                    setUser({
                        username: data?.USERNAME,
                        isLoggedIn: true
                    })
                }
            }).catch(err => {
                console.error(err)
            })

    }, [])

    return (
        <div className="App">
            <UserContext.Provider value={value}>
                <Navbar />
                <Routes>
                    <Route path="/wiki" element={<Wiki />} />
                    <Route path="/cards" element={<Cards />} />
                    <Route path="/references" element={<References />} />

                    {user?.isLoggedIn ?
                        <>
                            <Route path="/logout" element={<Logout />} />
                        </> :
                        <>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                        </>
                    }
                    <Route path="*" element={<Navigate to="/" />} />
                    <Route path="/" element={<Landing />} />
                </Routes>
            </UserContext.Provider>
            <Footer />
        </div >
    );
}

