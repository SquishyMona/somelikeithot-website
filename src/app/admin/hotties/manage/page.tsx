"use client";

import { useState, useEffect } from 'react'
import { getDocs, getDoc, setDoc, collection, doc, deleteDoc, query, where } from 'firebase/firestore'
import { getDownloadURL, uploadBytes, getStorage, ref, deleteObject } from 'firebase/storage';
import { firebase_app, firestore_db } from '@/firebase/config'
import { useRouter } from 'next/navigation'
import { AuthContext, useAuthContext } from '@/context/authcontext'
import styles from '@/app/admin/manageform.module.css'
import { get } from 'http';

function Hottie({name, position, img, solos, joined, alumni, id}) {
    const router = useRouter();
    const hottieID = id;

    const [newName, setNewName] = useState(name);
    const [newPosition, setNewPosition] = useState(position);
    const [newImg, setNewImg] = useState(img);
    const [newSolos, setNewSolos] = useState(solos);
    const [newJoined, setNewJoined] = useState(joined);
    const [newAlumni, setNewAlumni] = useState(alumni);

    const saveHottie = async () => {
        const colRef = collection(firestore_db, 'slihsters');
        const storageRef = getStorage(firebase_app);
        const logoRef = ref(storageRef, `slihsters/${hottieID}`);
        const docSnap = await getDoc(doc(colRef, hottieID));
        if (document.getElementById('logo').files.length === 0 ){
            var imgURL = docSnap.data().photo;
        }
        else {
            const file = document.getElementById('logo').files[0];
            const snapshot = await uploadBytes(logoRef, file);
            var imgURL = await getDownloadURL(snapshot.ref);
        }

        try {
            var soloList = newSolos.split(",");
        }
        catch {
            var soloList = newSolos;
        }

        setDoc(doc(colRef, hottieID), {
            name: newName,
            eboard: newPosition,
            solos: soloList,
            joinyear: newJoined,
            alumni: newAlumni,
            photo: imgURL
        }).then(() => {
            window.location.reload();
        });
    }

    const deleteHottie = async () => {
        const colRef = collection(firestore_db, 'slihsters');
        const storageRef = getStorage(firebase_app);
        const logoRef = ref(storageRef, `slihsters/${hottieID}`);
        const hottieRef = doc(colRef, `${hottieID}`);
        await deleteDoc(hottieRef);
        await deleteObject(logoRef);
        window.location.reload();
    }

    const convertAlumni = async () => {
        const colRef = collection(firestore_db, 'slihsters');
        setDoc(doc(colRef, hottieID), { alumni: newAlumni === false ? true: false }, { merge: true }).then(() => {
            window.location.reload();
        });
    }

    return (
        <div className={styles.item}>
            <div className={styles.imageArea}>
                <img src={img} />
                <input type="file" id="logo" />
            </div>
            <div className={styles.details}>
                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
                <input type="text" value={newJoined} onChange={(e) => setNewJoined(e.target.value)} />
                <input type="text" value={newSolos} onChange={(e) => setNewSolos(e.target.value)} />
                <p>Seperate each solo with a comma (Ex: Solo1,Solo 2,Solo3)</p>
                <input type="text" value={newPosition} onChange={(e) => setNewPosition(e.target.value)} />
                <div className={styles.actions}>
                    <button onClick={saveHottie}>Save</button>
                    <button onClick={deleteHottie}>Delete</button>
                    <button onClick={convertAlumni}>Switch Alumni Status</button>
                </div>
            </div>
        </div>
    )
}

export default function Manage() {
    const [hotties, setHotties] = useState<{ id: string; }[]>([]);
    const [eboard, setEboard] = useState<{ id: string; }[]>([]);
    const [alumni, setAlumni] = useState<{ id: string; }[]>([]);
    const { user } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (user === null) {
            router.push("/signin");
        }
    }, [user]);

    const getHotties = async () => {
        const memberQuery = query(collection(firestore_db, 'slihsters'), where('eboard', '==', ''), where('alumni', '==', false));
        getDocs(memberQuery).then((data) => {
            setHotties(data.docs.map((doc) => {
                return {...doc.data(), id: doc.id}
            }));
        });
    }

    const getEboard = async () => {
        const eboardQuery = query(collection(firestore_db, 'slihsters'), where('eboard', '!=', ''), where('alumni', '==', false));
        getDocs(eboardQuery).then((data) => {
            setEboard(data.docs.map((doc) => {
                return {...doc.data(), id: doc.id}
            }));
        });
    }

    const getAlumni = async () => {
        const alumniQuery = query(collection(firestore_db, 'slihsters'), where('alumni', '==', true));
        getDocs(alumniQuery).then((data) => {
            setAlumni(data.docs.map((doc) => {
                return {...doc.data(), id: doc.id}
            }));
        });
    }

    useEffect(() => {
        getHotties();
        getEboard();
        getAlumni();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            <div className={styles.manageForm}>
                <h1>Manage Hotties</h1>
                <button onClick={() => router.push("/admin/hotties/add")}>Add Hottie</button>
                <h1>Eboard Members</h1>
                <div className={styles.container}>
                    {eboard.map((hottie) => {
                        return <Hottie 
                        key={hottie.id} 
                        name={hottie.name} 
                        position={hottie.eboard} 
                        img={hottie.photo} 
                        solos={hottie.solos} 
                        joined={hottie.joinyear} 
                        alumni={hottie.alumni}
                        id={hottie.id} />
                    })}
                </div>
                <h1>Members</h1>
                <div className={styles.container}>
                    {hotties.map((hottie) => {
                        return <Hottie 
                        key={hottie.id} 
                        name={hottie.name} 
                        position={hottie.eboard} 
                        img={hottie.photo} 
                        solos={hottie.solos} 
                        joined={hottie.joinyear} 
                        alumni={hottie.alumni}
                        id={hottie.id} />
                    })}
                </div>
                <h1>Alumni</h1>
                <div className={styles.container}>
                    {alumni.map((hottie) => {
                        return <Hottie 
                        key={hottie.id} 
                        name={hottie.name} 
                        position={hottie.eboard} 
                        img={hottie.photo} 
                        solos={hottie.solos} 
                        joined={hottie.joinyear} 
                        alumni={hottie.alumni}
                        id={hottie.id} />
                    })}
                </div>
            </div>
        </AuthContext.Provider>
    )
}