"use client";

import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { firestore_db } from "@/firebase/config";
import styles from "./page.module.css";
import { UUID } from "crypto";

export default function Media() {
    const [media, setMedia] = useState<{ id: string; }[]>([]);
    const getMedia = async () => {
        getDocs(collection(firestore_db, "media")).then((data) => {
            setMedia(data.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            }));
        })
    }
    useEffect(() => {
        getMedia();
    }, []);

    return (
        <>
            <div className="header">
                <h1>Media</h1>
            </div>

            <h1 className="category" style={{marginTop: '20px'}}>Our Latest Performance</h1>
            <h2 style={{color: 'white', textAlign: 'center', fontFamily: 'Quicksand', margin: '10px 20px'}}>
                To watch more of our performances, check out our YouTube!
            </h2>

            <iframe
                className={styles.ytvideo}
                id="video"
                src="https://www.youtube.com/embed?max-results=1&controls=0&showinfo=0&rel=0&listType=user_uploads&list=FredSLIH" 
                frameBorder="0" 
                allowFullScreen></iframe>

            <h1 className="category" style={{marginTop: '20px'}}>Photos</h1>

            <div className={styles.mediacontainer}>
                {media.map((item) => {
                    return <img className={styles.photo} key={item.id} src={item.url}></img>
                })}
            </div>
        </>
    )
}