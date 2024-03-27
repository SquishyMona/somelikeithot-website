//@ts-nocheck

"use client";

import { useState, useEffect } from "react";
import { AuthContext, useAuthContext } from "@/context/authcontext";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, setDoc } from "firebase/firestore";
import { firestore_db } from "@/firebase/config";
import { useRouter } from "next/navigation";
import styles from "@/app/admin/contentform.module.css";

export default function AddRepertoire() {
    const { user } = useAuthContext();
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [photo, setPhoto] = useState(null);
    const [introduced, setIntroduced] = useState("");
    const [artist, setArtist] = useState("");
    const [arranger, setArranger] = useState("");
    const [soloist, setSoloist] = useState([""]);
    const [videoURL, setVideoURL] = useState("");
    const [retired, setRetired] = useState(null);

    const addSong = async () => {
        const storage = getStorage();

        const isRetired = retired === 'on' ? true : false;

        const soloistList = soloist === "" ? [] : soloist.split(",");

        const colRef = collection(firestore_db, 'rep');
        await addDoc(colRef, {
            title: title,
            introduced: introduced,
            artist: artist,
            arranger: arranger,
            retired: isRetired,
            soloist: soloistList,
            videoURL: videoURL,
            photo: "placeholder"
        }).then((doc) => {
            const storageRef = ref(storage, `rep/${doc.id}`);
            if (photo === null){
                console.log("No photo");
            }
            else {
                uploadBytes(storageRef, photo).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        setDoc(doc, { photo: url }, { merge: true });
                    });
                });
            }
            router.push("/admin/repertoire/manage");
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
                    <h1>Add Song</h1>
                </div>

                <div className={styles.contentForm}>
                    <p>Image</p>
                    <input type="file" id="photo" onChange={(e) => setPhoto(e.target.files[0])} />
                    <p>Title</p>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} />
                    <p>Introduced</p>
                    <input type="text" onChange={(e) => setIntroduced(e.target.value)} />
                    <p>Artist</p>
                    <input type="text" onChange={(e) => setArtist(e.target.value)} />
                    <p>Arranger</p>
                    <input type="text" onChange={(e) => setArranger(e.target.value)} />
                    <p>Soloist</p>
                    <p style={{fontWeight: 'bold', textAlign: "center"}}>Seperate each soloist with a comma (Ex: Soloist 1,Soloist2,Soloist3)</p>
                    <input type="text" onChange={(e) => setSoloist(e.target.value)} />
                    <p>Music Video URL</p>
                    <p style={{fontWeight: 'bold', textAlign: "center"}}>Optional: Will make the photo link to the URL provided</p>
                    <input type="text" onChange={(e) => setVideoURL(e.target.value)} />
                    <p>Retired</p>
                    <input type="checkbox" onChange={(e) => setRetired(e.target.checked)} />
                    <button onClick={addSong}>Add Song</button>
                </div>
            </>
            : null
        }
        </AuthContext.Provider>
    )
}
