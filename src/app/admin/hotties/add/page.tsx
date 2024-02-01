"use client";

import { useState, useEffect } from "react";
import { AuthContext, useAuthContext } from "@/context/authcontext";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, setDoc } from "firebase/firestore";
import { firestore_db } from "@/firebase/config";
import { useRouter } from "next/navigation";
import styles from "@/app/admin/contentform.module.css";

export default function AddHottie() {
    const { user } = useAuthContext();
    const router = useRouter();
    const [name, setName] = useState("");
    const [eboard, setPosition] = useState("");
    const [photo, setImg] = useState(null);
    const [solos, setSolos] = useState("");
    const [joinyear, setJoined] = useState("");
    const [alumni, setAlumni] = useState(null);

    const addHottie = async () => {
        const storage = getStorage();

        const isAlumni = alumni === "on" ? true : false;
        const solosList = solos === "" ? [] : solos.split(",");

        const colRef = collection(firestore_db, 'slihsters');
        await addDoc(colRef, {
            name: name,
            eboard: eboard,
            solos: solosList,
            joinyear: joinyear,
            alumni: isAlumni,
            photo: "placeholder"
        }).then((doc) => {
            const storageRef = ref(storage, `slihsters/${doc.id}`);
            uploadBytes(storageRef, photo).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setDoc(doc, { photo: url }, { merge: true }).then(() => {
                        router.push("/admin/hotties/manage");
                    });
                });
            });
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
                    <h1>Add Hottie</h1>
                </div>

                <div className={styles.contentForm}>
                    <p>Image</p>
                    <input type="file" onChange={(e) => setImg(e.target.files[0])} />
                    <p>Name</p>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <p>Joined</p>
                    <input type="text" value={joinyear} onChange={(e) => setJoined(e.target.value)} />
                    <p>Solos</p>
                    <p style={{fontWeight: 'bold'}}>Seperate each solo with a comma (Ex: Solo1,Solo 2,Solo3)</p>
                    <input type="text" value={solos} onChange={(e) => setSolos(e.target.value)} />
                    <p>Position</p>
                    <input type="text" value={eboard} onChange={(e) => setPosition(e.target.value)} />
                    <p>Alumni</p>
                    <input type="checkbox" value={alumni} onChange={(e) => setAlumni(e.target.value)} />
                    <button onClick={addHottie}>Add</button>
                </div>
            </>
        : null }
        </AuthContext.Provider>
    )
}