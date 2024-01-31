"use client";

import { useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { firestore_db } from '@/firebase/config'
import styles from '@/app/admin/manageform.module.css'

function Event({title, time, location, description, livelink, img, id}) {
    const eventID = id;

    const [newTitle, setNewTitle] = useState(title);
    const [newTime, setNewTime] = useState(time);
    const [newLocation, setNewLocation] = useState(location);
    const [newDescription, setNewDescription] = useState(description);
    const [newLivelink, setNewLivelink] = useState(livelink);
    const [newImg, setNewImg] = useState(img);


    return (
        <div className={styles.event}>
            <img src={img}></img>
            <div className={styles.details}>
                <input type="text" value={title} onChange={(e) => setNewTitle(e.target.value)} />
                <input type="text" value={time} onChange={(e) => setNewTime(e.target.value)}/>
                <input type="text" value={location} onChange={(e) => setNewLocation(e.target.value)}/>
                <textarea value={description} onChange={(e) => setNewDescription(e.target.value)}/>
                <input type="text" value={livelink} onChange={(e) => setNewLivelink(e.target.value)}/>
                <button onClick={() => console.log('save')}>Save</button>
                <button onClick={() => console.log('delete')}>Delete</button>
            </div>
        </div>
    )
}

export default function ManageEvents() {
    const [events, setEvents] = useState<{ id: string; }[]>([]);
    const getEvents = async () => {
        getDocs(collection(firestore_db, 'events')).then((data) => {
            setEvents(data.docs.map((doc) => {
                return {...doc.data(), id: doc.id}
            }));
        })
    }
    useEffect(() => {
        getEvents();
    }, []);

    return (
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
    )
}