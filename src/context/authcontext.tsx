"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import { firebase_app } from "@/firebase/config";
import { BarLoader } from "react-spinners";

const auth = getAuth(firebase_app);

export const AuthContext = createContext<{ user: User | null }>({
    user: null,
  });

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: any) => {
    const [user, setUser] = useState< User | null >(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);
    
    return (
        <AuthContext.Provider value={{ user }}>
            { loading ? 
                <div style={{display: "flex", justifyContent: "center", marginTop: "50vh", flexDirection: "column", alignItems: "center"}}>
                    <BarLoader height='6px' width='200px'/>
                </div> 
                : children
            }
        </AuthContext.Provider>
    );
}