// @ts-nocheck

"use client";

import { useState, useEffect } from "react";
import { getDocs, collection, query, where, orderBy } from "firebase/firestore";
import { firestore_db } from "@/firebase/config";
import styles from "./page.module.css";

const dbInstance = collection(firestore_db, "slihsters");

function Hottie({ name, joinyear, photo, solos }) {
    return (
        <div className={styles.hottie}>
            <img src={photo}></img>
            <div className={styles.details}>
                <h2>{name}</h2>
                <p style={{marginBottom: '10px'}}>Joined {joinyear}</p>
                {solos.length ?
                    <span style={{fontWeight: 'bold', textDecoration: 'underline'}}>
                        Solos<br/>
                    </span>
                        : null
                }
                {solos.map((solo: any) => {
                    return <p key={solo.id}>{solo}<br/></p>
                }
                )}
            </div>
        </div>
    )
}

function Eboard({ name, joinyear, photo, solos, eboard }) {
    return (
        <div className={styles.hottie}>
            <img src={photo}></img>
            <div className={styles.details}>
                <h2>{name}</h2>
                <p className={styles.eboard}>{eboard}</p>
                <p style={{marginBottom: '10px'}}>Joined {joinyear}</p>
                {solos.length !== 0 ?
                    <span style={{fontWeight: 'bold', textDecoration: 'underline'}}>
                        Solos<br/>
                    </span>
                        : null
                }
                {solos.map((solo: any) => {
                    return <p key={solo.id}>{solo}<br/></p>
                }
                )}
            </div>
        </div>
    )
}

export default function CurrentHotties() {
    const [hotties, setHotties] = useState<{ id: string; }[]>([]);
    const [eboard, setEboard] = useState<{ id: string; }[]>([]);

    const hottieQuery = query(dbInstance, where('eboard', '==', ''), where('alumni', '==', false));
    const getHotties = async () => {
        getDocs(hottieQuery).then((data) => {
            setHotties(data.docs.map((doc) => {
                return {...doc.data(), id: doc.id}
            }));
        })
    }

    const eboardQuery = query(dbInstance, where('eboard', '!=', ''), where('alumni', '==', false), orderBy('eboard'), orderBy('priority'));
    const getEboard = async () => {
        getDocs(eboardQuery).then((data) => {
            setEboard(data.docs.map((doc) => {
                return {...doc.data(), id: doc.id}
            }));
        })
    }

    useEffect(() => {
        getHotties();
        getEboard();
    }, []);

    return (
        <>
            <div className="header">   
                <h1>Current Hotties</h1>
            </div>

            <h1 className="category" style={{marginTop: '20px'}}>Eboard</h1>
            <h2 style={{fontFamily: 'Quicksand', color: 'white', textAlign: 'center', marginTop: '10px'}}>
                
            </h2>
            <div className={styles.hottiecontainer}>
                    {eboard.map((hottie) => {
                        return <Eboard 
                        key={hottie.id}
                        name={hottie.name}
                        joinyear={hottie.joinyear}
                        photo={hottie.photo}
                        solos={hottie.solos}
                        eboard={hottie.eboard} />
                    })}
            </div>
            <h1 className='category' style={{marginTop: '20px'}}>Members</h1>
            <div className={styles.hottiecontainer}>
                    {hotties.map((hottie) => {
                        return <Hottie 
                        key={hottie.id}
                        name={hottie.name}
                        joinyear={hottie.joinyear}
                        photo={hottie.photo}
                        solos={hottie.solos} />
                    })}
            </div>
        </>
    )
}