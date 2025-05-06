// @ts-nocheck

import { firestore_db } from "@/firebase/config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import styles from "./page.module.css";

const dbInstance = collection(firestore_db, "slihsters");

function Hottie({ name, joinyear, photo, solos, eboard }) {
    return (
        <div className={styles.hottie}>
            <img src={photo}></img>
            <div className={styles.details}>
                <h2>{name}</h2>
                {eboard != '' ? <p className={styles.eboard}>Former {eboard}</p> : null}
                <p style={{ marginBottom: '10px' }}>Joined {joinyear}</p>
                {solos.length ?
                    <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                        Solos<br />
                    </span>
                    : null
                }
                {solos.map((solo: any) => {
                    return <p key={solo}>{solo}<br /></p>
                }
                )}
            </div>
        </div>
    )
}

export default async function Alumni() {
    const alumniQuery = query(dbInstance, where('alumniTime', '!=', null), where('alumni', '==', true), orderBy('alumniTime', 'desc'));
	const docs = await getDocs(alumniQuery)
    const alumni = docs.docs.map((doc) => {
		return { ...doc.data(), id: doc.id }
	});

    return (
        <>
            <div className="header">
                <h1>Alumni</h1>
            </div>

            <div className={styles.hottiecontainer}>
                {alumni.map((hottie) => {
                    return <Hottie
                        key={hottie.id}
                        name={hottie.name}
                        joinyear={hottie.joinyear}
                        photo={hottie.photo}
                        solos={hottie.solos}
                        eboard={hottie.eboard} />
                })}
            </div>
        </>
    )
}