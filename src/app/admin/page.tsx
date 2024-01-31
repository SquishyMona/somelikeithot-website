"use client";

import { useState, useEffect } from "react";
import { AuthContext, useAuthContext } from "@/context/authcontext";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import styles from "./page.module.css";
import { getAuth } from "firebase/auth";


export default function Admin() {
    const { user } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (user === null) {
            router.push("/signin");
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user }}>
        { user ? 
            <>
                <div className="header">   
                    <h1>Admin</h1>
                </div>
                <div className={styles.profile}>
                    <img src={user?.photoURL} />
                    <h2>Welcome, {user?.displayName}</h2>
                    <p>The name and photo displayed will be used to identify you in posts and changes you make to the website.</p>
                    <p>Looking to add a new admin user? Please visit the <a href="https://console.firebase.google.com/project/slihnextwebsite/authentication/users">Firebase Admin Console</a>.</p>
                    <div className={styles.profileActions}>
                        <button onClick={() => router.push('/admin/editprofile')}>Edit Profile</button>
                        <button onClick={() => router.push('/admin/changepassword')}>Change Password</button>
                        <button onClick={() => signOut(getAuth()).then(router.push('/'))}>Sign Out</button>
                        <button onClick={() => router.push('/admin/adminguide')}>Admin Guide</button>
                    </div>
                </div>
                <div className={styles.dashboard}>
                    <div className={styles.actions}>
                        <h3>Events</h3>
                        <button onClick={() => router.push('/admin/events/manage')}>Manage</button>
                        <button onClick={() => router.push('/admin/events/add')}>Add</button>
                    </div>
                    <div className={styles.actions}>
                        <h3>Hotties</h3>
                        <button onClick={() => router.push('/admin/hotties/manage')}>Manage</button>
                        <button onClick={() => router.push('/admin/hotties/add')}>Add</button>
                    </div>
                    <div className={styles.actions}>
                        <h3>Repertoire</h3>
                        <button onClick={() => router.push('/admin/repertoire/manage')}>Manage</button>
                        <button onClick={() => router.push('/admin/repertoire/add')}>Add</button>
                    </div>
                    <div className={styles.actions}>
                        <h3>Media</h3>
                        <button onClick={() => router.push('/admin/media/manage')}>Manage</button>
                        <button onClick={() => router.push('/admin/media/add')}>Add</button>
                    </div>
                    <div className={styles.actions}>
                        <h3>Slides</h3>
                        <button onClick={() => router.push('/admin/slides')}>Manage</button>
                    </div>
                </div>
            </>
        : null
        }
        </AuthContext.Provider>
    )
}