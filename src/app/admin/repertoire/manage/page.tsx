// @ts-nocheck

"use client";

import { useState, useEffect } from 'react'
import { getDocs, getDoc, setDoc, collection, doc, deleteDoc, query, where } from 'firebase/firestore'
import { getDownloadURL, uploadBytes, getStorage, ref, deleteObject } from 'firebase/storage';
import { firebase_app, firestore_db } from '@/firebase/config'
import { useRouter } from 'next/navigation'
import { AuthContext, useAuthContext } from '@/context/authcontext'
import { BarLoader } from 'react-spinners';
import styles from '@/app/admin/manageform.module.css'

const dbInstance = collection(firestore_db, "rep");

function Song({ title, photo, introduced, artist, arranger, soloist, retired, videoURL, id }) {
    const [loading, setLoading] = useState(false);

    const [newTitle, setNewTitle] = useState(title);
    const [newPhoto, setNewPhoto] = useState(null);
    const [newIntroduced, setNewIntroduced] = useState(introduced);
    const [newArranger, setNewArranger] = useState(arranger);
    const [newSoloist, setNewSoloist] = useState(soloist);
    const [newArtist, setNewArtist] = useState(artist);
    const [newRetired, setNewRetired] = useState(retired);
    const [newVideoURL, setNewVideoURL] = useState(videoURL);

    const saveSong = async () => {
        setLoading(true);
        const colRef = collection(firestore_db, "rep");
        const storageRef = getStorage(firebase_app);
        const photoRef = ref(storageRef, `rep/${id}`);
        const docSnap = await getDoc(doc(colRef, id));

        if (newPhoto === null) {
            var imgURL = docSnap.data().photo;
        }
        else {
            const file = newPhoto;
            const snapshot = await uploadBytes(photoRef, file);
            var imgURL = await getDownloadURL(snapshot.ref);
        }

        try {
            var soloList = newSoloist.split(",");
        }
        catch {
            var soloList = newSoloist;
        }

        await setDoc(doc(colRef, id), {
            title: newTitle,
            photo: imgURL,
            introduced: newIntroduced,
            arranger: newArranger,
            soloist: soloList,
            artist: newArtist,
            retired: newRetired,
            videoURL: newVideoURL,
        }).then(() => {
            setLoading(false);
        });
    };

    const deleteSong = async () => {
        setLoading(true);
        const colRef = collection(firestore_db, "rep");
        try {
            const storageRef = getStorage(firebase_app);
            const photoRef = ref(storageRef, `rep/${id}`);    
            await deleteObject(photoRef);
        }
        catch (error) {
            console.log("No photo to delete", error);
        }
        await deleteDoc(doc(colRef, id)).then(() => {
            window.location.reload();
        });
    };

    const convertRetired = async () => {
        setLoading(true);
        const colRef = collection(firestore_db, "rep");
        await setDoc(doc(colRef, id), {
            retired: newRetired === false ? true : false,
        }, { merge: true }).then(() => {
            window.location.reload();
        });
    };

    return (
        <div className={styles.item}>
            { loading ? <BarLoader color={'#000000'} loading={loading} /> : 
                <>
                    <div className={styles.imageArea}>
                        <img src={photo} />
                        <input
                            type="file"
                            id="photo"
                            onChange={(e) => setNewPhoto(e.target.files[0])}
                        />
                    </div>
                    <div className={styles.details}>
                        <input
                            type="text"
                            placeholder='Title'
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder='Artist'
                            value={newArtist}
                            onChange={(e) => setNewArtist(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder='Arranger'
                            value={newArranger}
                            onChange={(e) => setNewArranger(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder='Soloist(s)'
                            value={newSoloist}
                            onChange={(e) => setNewSoloist(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder='Introduced'
                            value={newIntroduced}
                            onChange={(e) => setNewIntroduced(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder='Music Video URL'
                            value={newVideoURL}
                            onChange={(e) => setNewVideoURL(e.target.value)}
                        />
                        <div className={styles.actions}>
                            <button onClick={saveSong}>Save</button>
                            <button onClick={deleteSong}>Delete</button>
                            <button onClick={convertRetired}>Change Retirement Status</button>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default function ManageRepertoire() {
    const { user } = useAuthContext();
    const router = useRouter();
    const [rep, setRep] = useState<{ id: string; }[]>([]);
    const [retired, setRetired] = useState<{ id: string; }[]>([]);
    const getRep = async () => {
        const q = query(dbInstance, where("retired", "==", false));
        getDocs(q).then((data) => {
            setRep(data.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            }));
        });
    };
    const getRetired = async () => {
        const q = query(dbInstance, where("retired", "==", true));
        getDocs(q).then((data) => {
            setRetired(data.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            }));
        });
    }

    useEffect(() => {
        if (user === null) {
            router.push("/signin");
        }
        getRep();
        getRetired();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            { user ? 
                <div className={styles.manageForm}>
                    <h1>Manage Repertoire</h1>
                    <button onClick={() => { router.push("/admin/repertoire/add") }}>Add Song</button>
                    <h1>Current Repertoire</h1>
                    <div className={styles.container}>
                        {rep.map((rep) => {
                            return (
                                <Song
                                    key={rep.id}
                                    id={rep.id}
                                    title={rep.title}
                                    photo={rep.photo}
                                    introduced={rep.introduced}
                                    artist={rep.artist}
                                    arranger={rep.arranger}
                                    soloist={rep.soloist}
                                    retired={rep.retired}
                                    videoURL={rep.videoURL}
                                />
                            );
                        })}
                    </div>
                    <h1>Retired Repertoire</h1>
                    <div className={styles.container}>
                        {retired.map((rep) => {
                            return (
                                <Song
                                    key={rep.id}
                                    id={rep.id}
                                    title={rep.title}
                                    photo={rep.photo}
                                    introduced={rep.introduced}
                                    artist={rep.artist}
                                    arranger={rep.arranger}
                                    soloist={rep.soloist}
                                    retired={rep.retired}
                                    videoURL={rep.videoURL}
                                />
                            );
                        })}
                    </div>
                </div>
            : null }
        </AuthContext.Provider>
    );
}