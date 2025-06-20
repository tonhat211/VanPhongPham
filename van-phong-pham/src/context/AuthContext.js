import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));
    const [permissions, setPermissions] = useState(() => JSON.parse(localStorage.getItem('permissions') || '[]'));

    //   const [user, setUser] = useState(null);
    // const [permissions, setPermissions] = useState(['ADMIN']); // ← mảng rỗng mặc định

    useEffect(() => {
        console.log('AuthProvider: ' + JSON.stringify(permissions, null, 2));
    }, [permissions]);

    const login = (u, perms) => {
        setUser(u);
        setPermissions(perms);
        localStorage.setItem('user', JSON.stringify(u));
        localStorage.setItem('permissions', JSON.stringify(perms));
    };

    const logout = () => {
        setUser(null);
        setPermissions([]);
        localStorage.clear();
    };

    const value = useMemo(() => ({ user, permissions, login, logout }), [user, permissions]);

    return <AuthContext.Provider value={{ user, permissions, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
