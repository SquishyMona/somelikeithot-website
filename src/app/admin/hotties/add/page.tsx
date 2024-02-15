// @ts-nocheck

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
        var sortNum;

        const colRef = collection(firestore_db, 'slihsters');
        if (eboard === "") {
            sortNum = 9;
        }
        else {
            if (eboard === "President") {
                sortNum = 1;
            }
            if (eboard === "Vice President") {
                sortNum = 2;
            }
            if (eboard === "Music Director") {
                sortNum = 3;
            }
            if (eboard === "Assistant Music Director") {
                sortNum = 4;
            }
            if (eboard === "Secretary") {
                sortNum = 5;
            }
            if (eboard === "Treasurer") {
                sortNum = 6;
            }
            if (eboard === "Public Relations") {
                sortNum = 7;
            }
        }
        await addDoc(colRef, {
            name: name,
            eboard: eboard,
            solos: solosList,
            joinyear: joinyear,
            alumni: isAlumni,
            photo: "placeholder",
            priority: sortNum
        }).then((doc) => {
            const storageRef = ref(storage, `slihsters/${doc.id}`);
            if (document.getElementById('photo').files.length === 0 ){
                console.log("No photo");
                router.push("/admin/hotties/manage");
            }
            else {
                uploadBytes(storageRef, photo).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        setDoc(doc, { photo: url }, { merge: true }).then(() => {
                            router.push("/admin/hotties/manage");
                        });
                    });
                });
            }
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
                    <input type="file" id="photo" onChange={(e) => setImg(e.target.files[0])} />
                    <p>Name</p>
                    <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    <p>Joined</p>
                    <input type="text" placeholder='Joined In' value={joinyear} onChange={(e) => setJoined(e.target.value)} />
                    <p>Solos</p>
                    <p style={{fontWeight: 'bold', textAlign: "center"}}>Seperate each solo with a comma (Ex: Solo1,Solo 2,Solo3)</p>
                    <input type="text" placeholder='Solos' value={solos} onChange={(e) => setSolos(e.target.value)} />
                    <p>Position</p>
                    <input type="text" placeholder='Eboard Position' value={eboard} onChange={(e) => setPosition(e.target.value)} />
                    <p>Alumni</p>
                    <input type="checkbox" value={alumni} onChange={(e) => setAlumni(e.target.value)} />
                    <button onClick={addHottie}>Add</button>
                </div>
            </>
        : null }
        </AuthContext.Provider>
    )
}