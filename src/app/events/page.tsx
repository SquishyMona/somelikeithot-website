// @ts-nocheck

import { getDocs, collection } from 'firebase/firestore'
import { firestore_db } from '@/firebase/config'
import styles from './page.module.css'

const dbInstance = collection(firestore_db, 'events');

function Event({title, time, location, description, livelink, img}) {
    return (
        <div className={styles.event}>
            <img src={img}></img>
            <div className={styles.details}>
                <h2>{title}</h2><br/>
                <h3>{time}</h3>
                <h3>{location}</h3>
                <br/><p>{description}</p>
                <br/><a href={livelink}>Watch the livestream</a>
            </div>
        </div>
    )
}

export default async function Events() {
	const docs = await getDocs(dbInstance)
	const events = docs.docs.map((doc) => {
		return {...doc.data(), id: doc.id}
	})

    return (
        <>
            <div className="header">   
                <h1>News</h1>
            </div>

            <div className={styles.container}>
                {events.map((event) => {
                    return <Event 
                    key={event.id}
                    title={event.title}
                    time={event.datetime}
                    location={event.location}
                    description={event.description}
                    livelink={event.livelink}
                    img={event.logo} />
                })}
            </div>
        </>
    )
}