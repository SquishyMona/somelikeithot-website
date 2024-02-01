//@ts-nocheck

"use client";

import { useState, useEffect } from 'react'
import { getDocs, getDoc, setDoc, collection, doc, deleteDoc } from 'firebase/firestore'
import { getDownloadURL, uploadBytes, getStorage, ref, deleteObject } from 'firebase/storage';
import { firebase_app, firestore_db } from '@/firebase/config'
import { useRouter } from 'next/navigation'
import { AuthContext, useAuthContext } from '@/context/authcontext'
import styles from '@/app/admin/manageform.module.css'

function Event({title, time, location, description, livelink, img, id}) {
    const router = useRouter();
    const eventID = id;

    const [newTitle, setNewTitle] = useState(title);
    const [newTime, setNewTime] = useState(time);
    const [newLocation, setNewLocation] = useState(location);
    const [newDescription, setNewDescription] = useState(description);
    const [newLivelink, setNewLivelink] = useState(livelink);
    const [newImg, setNewImg] = useState(img);

    const saveEvent = async () => {
        const colRef = collection(firestore_db, 'events');
        const storageRef = getStorage(firebase_app);
        const logoRef = ref(storageRef, `events/${eventID}`);
        const docSnap = await getDoc(doc(colRef, eventID));
        console.log(docSnap.data())
        if (document.getElementById('logo').files.length === 0 ){
            var imgURL = docSnap.data().logo;
        }
        else {
            const file = document.getElementById('logo').files[0];
            const snapshot = await uploadBytes(logoRef, file);
            var imgURL = await getDownloadURL(snapshot.ref);
        }

        setDoc(doc(colRef, eventID), {
            title: newTitle,
            datetime: newTime,
            location: newLocation,
            description: newDescription,
            livelink: newLivelink,
            logo: imgURL
        }).then(() => {
            window.location.reload();
        });
    }

    const deleteEvent = async () => {
        const colRef = collection(firestore_db, 'events');
        const storageRef = getStorage(firebase_app);
        const logoRef = ref(storageRef, `events/${eventID}`);
        const eventRef = doc(colRef, `${eventID}`);
        await deleteDoc(eventRef);
        await deleteObject(logoRef);
        window.location.reload();
    }

    return (
        <div className={styles.item}>
            <div className={styles.imageArea}>
                <img src={img}></img>
                <input type="file" id="logo" onChange={(e) => {
                    const file = e.target.files[0];
                    const storageRef = ref(getStorage(firebase_app), `events/${eventID}`);
                    uploadBytes(storageRef, file).then((snapshot) => {
                        getDownloadURL(snapshot.ref).then((url) => {
                            setNewImg(url);
                        })
                    })
                }} />
            </div>
            <div className={styles.details}>
                <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                <input type="text" value={newTime} onChange={(e) => setNewTime(e.target.value)}/>
                <input type="text" value={newLocation} onChange={(e) => setNewLocation(e.target.value)}/>
                <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)}/>
                <input type="text" value={newLivelink} onChange={(e) => setNewLivelink(e.target.value)}/>
                <div className={styles.actions}>
                    <button onClick={() => saveEvent()}>Save</button>
                    <button onClick={() => deleteEvent()}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default function ManageEvents() {
    const router = useRouter();
    const { user } = useAuthContext();
    const [events, setEvents] = useState<{ id: string; }[]>([]);
    const getEvents = async () => {
        getDocs(collection(firestore_db, 'events')).then((data) => {
            setEvents(data.docs.map((doc) => {
                return {...doc.data(), id: doc.id}
            }));
        })
    }
    useEffect(() => {
        if (user === null) {
            router.push("/signin");
        }
        getEvents();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            { user ?
                <div className={styles.manageForm}>
                    <h1>Manage Events</h1>
                    <button onClick={() => console.log('add event')}>Add Event</button>
                    <div className={styles.container}>
                        {events.map((event) => {
                            return <Event 
                            title={event.title}
                            time={event.datetime}
                            location={event.location}
                            description={event.description}
                            livelink={event.livelink}
                            img={event.logo}
                            id={event.id}
                            key={event.id} />
                        })}
                    </div>
                </div>
                : <div>Loading...</div>
            }
        </AuthContext.Provider>
    )
}