import React, { createContext, useState } from 'react'

export const AuthContext = createContext(null) /* {provider, consumer} */

export default function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    return (<AuthContext.Provider value={{ token, setToken }}>
        {children}
    </AuthContext.Provider>
    )
}