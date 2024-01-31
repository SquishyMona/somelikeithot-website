"use client";

import { useState, useEffect } from 'react'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { firestore_db } from '@/firebase/config'
import styles from './page.module.css'

const dbInstance = collection(firestore_db, 'rep');

function Song({title, introduced, arranger, photo}) {
    return (
        <div className={styles.rep}>
            <img className={styles.song} src={photo} />
            <h2>{title}</h2><br/>
            <h3>Introduced in {introduced}</h3>
            <h3>Arranged by {arranger}</h3>
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

            <div className={styles.currentrep}>
                {rep.map((rep) => {
                    return <Song 
                    photo={rep.photo}
                    title={rep.title}
                    introduced={rep.introduced}
                    arranger={rep.arranger} />
                })}
            </div>

            <h1 className="category" style={{marginTop: '50px'}}>Retired Songs</h1>
            <div className={styles.currentrep} style={{marginTop: '20px', marginBottom: '30px'}}>
                {retired.map((rep) => {
                    return ( 
                        <>
                            <div className={styles.retired}>
                                <span style={{fontSize: '20px', textAlign: 'center', fontWeight: 'bold', fontFamily: 'Quicksand'}}>
                                    {rep.title}
                                </span>
                                <span>: Introduced in&nbsp;{rep.introduced}, arranged by {rep.arranger} </span>
                                <br/>
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}