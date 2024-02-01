// @ts-nocheck

"use client";

import { useState, useEffect } from "react";
import { firestore_db } from "@/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
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
                    return <p key={solo.id}>{solo}<br /></p>
                }
                )}
            </div>
        </div>
    )
}

export default function Alumni() {
    const [alumni, setAlumni] = useState<{ id: string; }[]>([]);

    const alumniQuery = query(dbInstance, where('alumni', '==', true));
    const getAlumni = async () => {
        getDocs(alumniQuery).then((data) => {
            setAlumni(data.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            }));
        })
    }
    useEffect(() => {
        getAlumni();
    }, []);

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