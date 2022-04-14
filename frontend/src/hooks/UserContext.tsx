import { createContext } from "react"

export const UserContext = createContext<UserContext>({ user: null, setUser: () => { } })

