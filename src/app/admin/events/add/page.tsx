"use client";

import { useState, useEffect } from "react";
import { AuthContext, useAuthContext } from "@/context/authcontext";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, setDoc } from "firebase/firestore";
import { firestore_db } from "@/firebase/config";
import { useRouter } from "next/navigation";
import styles from "@/app/admin/contentform.module.css";

export default function AddEvent() {
    const { user } = useAuthContext();
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [livelink, setLivelink] = useState("");
    const [logo, setLogo] = useState(null);

    const addEvent = async () => {
        const storage = getStorage();

        const colRef = collection(firestore_db, 'events');
        await addDoc(colRef, {
            title: title,
            datetime: time,
            location: location,
            description: description,
            livelink: livelink,
        }).then((doc) => {
            const storageRef = ref(storage, `events/${doc.id}`);
            uploadBytes(storageRef, logo).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setDoc(doc, { logo: url }, { merge: true });
                });
            });
            router.push("/admin/events/manage");
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
                    <h1>Add Event</h1>
                </div>

                <div className={styles.contentForm}>
                    <p>Title</p>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <p>Date and Time</p>
                    <input value={time} onChange={(e) => setTime(e.target.value)} />
                    <p>Location</p>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                    <p>Description</p>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    <p>Live Link</p>
                    <input type="text" value={livelink} onChange={(e) => setLivelink(e.target.value)} />
                    <p>Logo</p>
                    <input type="file" id="logo" onChange={(e) => setLogo(e.target.files[0])} />
                    <button onClick={addEvent}>Add</button>
                </div>
            </>
        : null }
        </AuthContext.Provider>
    );
}