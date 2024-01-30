"use client";

import { useState, useEffect } from 'react'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { firestore_db } from '@/firebase/config'
import styles from './page.module.css'

const dbInstance = collection(firestore_db, 'rep');

function Song({title, introduced, arranger}) {
    return (
        <div className={styles.rep}>
            <div className={styles.details}>
                <h2>{title}</h2><br/>
                <h3>{introduced}</h3>
                <h3>{arranger}</h3>
            </div>
        </div>
    )
}

export default function Repertoire() {
    const [rep, setRep] = useState<{ id: string; }[]>([]);
    const [retired, setRetired] = useState<{ id: string; }[]>([]);
    const getRep = async () => {
        const q = query(dbInstance, where("retired", "==", false));
        getDocs(q).then((data) => {
            setRep(data.docs.map((doc) => {
                return {...doc.data(), id: doc.id}
            }));
        })
    }

    const getRetired = async () => {
        const q = query(dbInstance, where("retired", "==", true));
        getDocs(q).then((data) => {
            setRetired(data.docs.map((doc) => {
                return {...doc.data(), id: doc.id}
            }));
        })
    }
    useEffect(() => {
        getRep();
        getRetired();
    }, []);

    return (
        <>
            <div className="header">   
                <h1>Repertoire</h1>
            </div>

            <div className={styles.container}>
                {rep.map((rep) => {
                    return <Song 
                    title={rep.title}
                    introduced={rep.introduced}
                    arranger={rep.arranger} />
                })}
            </div>

            <h1 className="category" style={{marginTop: '20px'}}>Retired Songs</h1>
            <div className={styles.container}>
                {retired.map((rep) => {
                    return <Song 
                    title={rep.title}
                    introduced={rep.introduced}
                    arranger={rep.arranger} />
                })}
            </div>
        </>
    )
}