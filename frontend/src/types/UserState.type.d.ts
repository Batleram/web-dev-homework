interface UserState {
    username: string | null;
    isLoggedIn: bool;
}

interface UserContext {
    user: UserState | null,
    setUser: (u: UserState) => void
}
