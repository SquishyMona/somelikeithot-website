"use client";

import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/authcontext";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Admin() {
    const { user } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (user === null) {
            router.push("/admin/login");
        }
    }, [user]);

    return (
        <>
            <div className="header">   
                <h1>Admin</h1>
            </div>
            <div className={styles.profile}>
                <img src={user?.photoURL} />
                <h2>Welcome, {user?.displayName}</h2>
                <p>The name and photo displayed will be used to identify you in posts and changes you make to the website</p>
            </div>
        </>
    )
}