'use client';

import { useState, useEffect } from "react"
import { getDoc, doc } from "firebase/firestore"
import { firestore_db } from "@/firebase/config"
import styles from "./page.module.css"

export default function Page({ params }: { params: { id: string } }) {
  const [hottie, setHottie] = useState(null)

  useEffect(() => {
    getDoc(doc(firestore_db, "slihsters", params.id)).then((doc) => {
      console.log(doc)  
      if (doc.exists()) {
        setHottie(doc.data())
      } else {
        console.log("No such document!")
      }
    }).catch((error) => {
      console.log("Error getting document:", error)
    })
  }, [])

  return (
    <div className={styles.eboardPage}>
      <img className={styles.photo} src={hottie?.eboardphoto ? hottie?.eboardphoto : hottie?.photo} alt={hottie?.name} />
      <div className={styles.details}>
        <h1>{hottie?.name}</h1>
        <h2>{hottie?.eboard}</h2>
        <p>{hottie?.bio}</p>
        {hottie?.solos.length !== 0 ? 
            <>
                <p style={{fontWeight: 'bold', textDecoration: 'underline'}}>Solos</p> 
                {hottie?.solos.map((solo: any) => {
                    return <p key={solo.id}>{solo}</p>
                })}
            </>
            : null
        }
        <div className={styles.socials}>
            {hottie?.instagram ? <a href={"https://instagram.com/" + hottie?.instagram} target="_blank"><img className={styles.socialicon} src="/Images/instagram.png"></img></a> : null}
            {hottie?.tiktok ? <a href={"https://tiktok.com/@" + hottie?.tiktok} target="_blank"><img className={styles.socialicon} src="/Images/tiktok.png"></img></a> : null}
        </div>
      </div>
    </div>

  )
}