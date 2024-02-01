"use client";

import { useState, useEffect } from 'react'
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'
import { AuthContext, useAuthContext } from '@/context/authcontext'
import { useRouter } from 'next/navigation'
import styles from '../contentform.module.css'

export default function ChangePassword() {
    const {user} = useAuthContext();
    const router = useRouter();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    
    const changePassword = async () => {
        const auth = getAuth();
        const credential = EmailAuthProvider.credential(user.email, oldPassword);
        await reauthenticateWithCredential(user, credential).then(() => {
            updatePassword(user, newPassword).then(() => {
                router.push('/admin');
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        if (user === null) {
            router.push("/signin");
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
        { user ? 
            <>
                <div className="header">   
                    <h1>Change Password</h1>
                </div>

                <div className={styles.contentForm}>
                    <p>Old Password</p>
                    <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                    <p>New Password</p>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <button onClick={changePassword}>Save</button>
                </div>
            </>
        : null }
        </AuthContext.Provider>
    )
}