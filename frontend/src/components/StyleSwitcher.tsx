import React, { useEffect, useState } from 'react'
import { styles } from "../constants"

export const StyleSwitcher = (props: {}) => {
    const [isLight, setIsLight] = useState<boolean | null>(null);

    useEffect( // gets the current theme or sets default theme in localStorage
        () => {
            const currenttheme = localStorage.getItem("theme")
            if (currenttheme == null) {
                localStorage.setItem("theme", 'light')
                setIsLight(true)
                return;
            }
            if (currenttheme == "dark") {
                setIsLight(false)
                return
            }
            setIsLight(true)
        }, []
    )

    useEffect(() => {// applies theme on theme change
        if(isLight == null)
            return
        const currenttheme = isLight ? "light":"dark"
        localStorage.setItem("theme",currenttheme)

        const root = document.documentElement;

        for (const cssColour in styles[currenttheme]){
            root.style.setProperty(cssColour, styles[currenttheme][cssColour])
        }

    }, [isLight])
    return (
        <h3 onClick={()=>setIsLight(!isLight)}>{isLight ? "Theme sombre" : "Theme clair"}</h3>
    )
}
