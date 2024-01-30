"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import signin from "@/firebase/auth/signin";
import styles from "./page.module.css";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignIn = async (event) => {
        event.preventDefault();
        const { result, error } = await signin(email, password);
        
        if (error) {
            console.error(error);
        } else {
            router.push("/admin");
        }
    }

    return (
        <>
            <div className="header">
                <h1>Sign In</h1>
            </div>

            <div className={styles.formbox}>
                <form className={styles.signin} onSubmit={handleSignIn}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} required></input>
                    <br/>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} required></input>
                    <br/>
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </>
    )
}