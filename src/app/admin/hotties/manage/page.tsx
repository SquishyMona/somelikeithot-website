// @ts-nocheck

"use client";

import { useState, useEffect } from 'react'
import { getDocs, getDoc, setDoc, collection, doc, deleteDoc, query, where, orderBy } from 'firebase/firestore'
import { getDownloadURL, uploadBytes, getStorage, ref, deleteObject } from 'firebase/storage';
import { firebase_app, firestore_db } from '@/firebase/config'
import { useRouter } from 'next/navigation'
import { AuthContext, useAuthContext } from '@/context/authcontext'
import { BarLoader } from 'react-spinners';
import styles from '@/app/admin/manageform.module.css'

function Hottie({name, position, img, solos, joined, alumni, bio, tiktok, instagram, id}) {
    const router = useRouter();
    const hottieID = id;

    const [loading, setLoading] = useState(false);

    const [newName, setNewName] = useState(name);
    const [newPosition, setNewPosition] = useState(position);
    const [newImg, setNewImg] = useState(null);
    const [newSolos, setNewSolos] = useState(solos);
    const [newJoined, setNewJoined] = useState(joined);
    const [newAlumni, setNewAlumni] = useState(alumni);
    const [newTikTok, setNewTikTok] = useState(tiktok);
    const [newBio, setNewBio] = useState(bio);
    const [newInstagram, setNewInstagram] = useState(instagram);


    const saveHottie = async () => {
        var sortNum;
        if (newPosition === "") {
            sortNum = 9;
        }
        else {
            if (newPosition === "President") {
                sortNum = 1;
            }
            if (newPosition === "Vice President") {
                sortNum = 2;
            }
            if (newPosition === "Music Director") {
                sortNum = 3;
            }
            if (newPosition === "Assistant Music Director") {
                sortNum = 4;
            }
            if (newPosition === "Secretary") {
                sortNum = 5;
            }
            if (newPosition === "Treasurer") {
                sortNum = 6;
            }
            if (newPosition === "Social Chair") {
                sortNum = 7;
            }
            if (newPosition === "Marketing Chair") {
                sortNum = 8;
            }
        }
        setLoading(true);
        const colRef = collection(firestore_db, 'slihsters');
        const storageRef = getStorage(firebase_app);
        const logoRef = ref(storageRef, `slihsters/${hottieID}`);
        const docSnap = await getDoc(doc(colRef, hottieID));
        try {
            var soloList = newSolos.split(",");
        }
        catch {
            var soloList = newSolos;
        }
        if (newImg === null){
            var imgURL = docSnap.data().photo;
            setDoc(doc(colRef, hottieID), {
                name: newName,
                eboard: newPosition,
                solos: soloList,
                joinyear: newJoined,
                alumni: newAlumni,
                priority: sortNum,
                photo: imgURL,
                bio: newBio,
                tiktok: newTikTok,
                instagram: newInstagram
            }, { merge: true }).then(() => {
                setLoading(false);
            });
        }
        else {
            uploadBytes(logoRef, newImg).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    var imgURL = url;
                    setDoc(doc(colRef, hottieID), {
                        name: newName,
                        eboard: newPosition,
                        solos: soloList,
                        joinyear: newJoined,
                        alumni: newAlumni,
                        priority: sortNum,
                        photo: imgURL,
                        bio: newBio,
                        tiktok: newTikTok,
                        instagram: newInstagram
                    }, { merge: true }).then(() => {
                        img = imgURL;
                        setLoading(false);
                    });
                });
            });
        }
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
        setDoc(doc(colRef, hottieID), { alumni: newAlumni === false ? true: false, alumniTime: new Date(Date.now()) }, { merge: true }).then(() => {
            window.location.reload();
        });
    }

    return (
        <div className={styles.item}>
            {loading ? <BarLoader color={'#000000'} loading={loading} /> : 
            <>
                <div className={styles.imageArea}>
                    <img src={img} />
                    <input type="file" id="logo" onChange={(e) => setNewImg(e.target.files[0])}/>
                </div>
                <div className={styles.details}>
                    <input type="text" placeholder={'Name'} value={newName} onChange={(e) => setNewName(e.target.value)} />
                    <input type="text" placeholder={'Joined In'} value={newJoined} onChange={(e) => setNewJoined(e.target.value)} />
                    <input type="text" placeholder={'Solos'} value={newSolos} onChange={(e) => setNewSolos(e.target.value)} />
                    <p style={{textAlign: 'center'}}>Seperate each solo with a comma (Ex: Solo1,Solo 2,Solo3)</p>
                    <input type="text" placeholder={'Eboard Position'} value={newPosition} onChange={(e) => setNewPosition(e.target.value)} />
                    { position != '' ? 
                        <>
                            <input type="text" placeholder='TikTok Username' value={newTikTok} onChange={(e) => setNewTikTok(e.target.value)} />
                            <input type="text" placeholder='Instagram Username' value={newInstagram} onChange={(e) => setNewInstagram(e.target.value)} />
                            <textarea placeholder='Bio' value={newBio} onChange={(e) => setNewBio(e.target.value)} />
                        </>
                        : null
                    }
                    <div className={styles.actions}>
                        <button onClick={saveHottie}>Save</button>
                        <button onClick={deleteHottie}>Delete</button>
                        <button onClick={convertAlumni}>Switch Alumni Status</button>
                    </div>
                </div>
            </>
            }
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
        try {
            const memberQuery = query(collection(firestore_db, 'slihsters'), where('joinTime', '!=', null), where('eboard', '==', ''), where('alumni', '==', false), orderBy('joinTime'));
            getDocs(memberQuery).then((data) => {
                setHotties(data.docs.map((doc) => {
                    return {...doc.data(), id: doc.id}
                }));
            });
        }
        catch(error) {
            console.error(error.message);
        }
    }

    const getEboard = async () => {
        try {
            const eboardQuery = query(collection(firestore_db, 'slihsters'), where('priority', '!=', 9), where('alumni', '==', false), orderBy('priority'));
            getDocs(eboardQuery).then((data) => {
                setEboard(data.docs.map((doc) => {
                    return {...doc.data(), id: doc.id}
                }));
            });
        }
        catch(error) {
            console.error(error.message);
        }
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
        if (user === null) {
            router.push("/signin");
        }
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
                        bio={hottie.bio}
                        tiktok={hottie.tiktok}
                        instagram={hottie.instagram}
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
                        bio={hottie.bio}
                        tiktok={hottie.tiktok}
                        instagram={hottie.instagram}
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
                        bio={hottie.bio}
                        tiktok={hottie.tiktok}
                        instagram={hottie.instagram}
                        id={hottie.id} />
                    })}
                </div>
            </div>
        </AuthContext.Provider>
    )
}