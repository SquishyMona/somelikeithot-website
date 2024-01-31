"use client";

import { useState, useEffect } from "react";
import { AuthContext, useAuthContext } from "@/context/authcontext";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { updateProfile } from "firebase/auth";
import { firebase_app } from "@/firebase/config";
import styles from "../contentform.module.css";

export default function EditProfile() {
    const { user } = useAuthContext();
    const router = useRouter();
    const [name, setName] = useState(user?.displayName);
    const [photo, setPhoto] = useState(null);
    const setProfileInfo = async () => {
        const storage = getStorage(firebase_app);
        const storageRef = ref(storage, `profiles/${user?.uid}`);
        const snapshot = await uploadBytes(storageRef, photo);
        if (photo === null)
        {
            var imgURL = user?.photoURL;
            console.log("No photo uploaded");
        }
        else
        {
            var imgURL = await getDownloadURL(snapshot.ref);
        }

        updateProfile(user, {
            displayName: name,
            photoURL: imgURL
        }).then(() => {
            console.log(user?.photoURL);
            router.push("/admin");
        }).catch((error) => {
            console.log(error);
        });
    }

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
                    <h1>Edit Profile</h1>
                </div>

                <div className={styles.contentForm}>
                    <p>Name</p>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <p>Photo</p>
                    <input type="file" id="photo" onChange={(e) => setPhoto(e.target.files[0])} />
                    <button onClick={setProfileInfo}>Save</button>
                </div>
            </>
            : <div>Loading...</div>
        }
        </AuthContext.Provider>
    );
}