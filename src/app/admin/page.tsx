"use client";

import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/authcontext";
import { useRouter } from "next/navigation";

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
            <div>
                <h2>Welcome, {user?.displayName}</h2>
            </div>
        </>
    )
}