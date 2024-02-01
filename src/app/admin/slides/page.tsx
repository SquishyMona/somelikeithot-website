// @ts-nocheck

"use client";

import { useState, useEffect, use } from 'react'
import { getDocs, getDoc, setDoc, collection, doc, deleteDoc, query, where } from 'firebase/firestore'
import { getDownloadURL, uploadBytes, getStorage, ref, deleteObject } from 'firebase/storage';
import { firebase_app, firestore_db } from '@/firebase/config'
import { useRouter } from 'next/navigation'
import { AuthContext, useAuthContext } from '@/context/authcontext'
import styles from '@/app/admin/manageform.module.css'

function Slide({imgURL, id}) {
    const router = useRouter();
    const slideID = id;
    const [img, setImg] = useState(null)

    const saveSlide = async () => {
        const colRef = collection(firestore_db, 'slides');
        const storageRef = getStorage(firebase_app);
        const slideRef = ref(storageRef, `slides/${slideID}`);
        const docSnap = await getDoc(doc(colRef, slideID));
        if (img === null){
            var imgURL = docSnap.data().photo;
        }
        else {
            const file = img;
            const snapshot = await uploadBytes(slideRef, file);
            var imgURL = await getDownloadURL(snapshot.ref);
        }

        setDoc(doc(colRef, slideID), {
            imgURL: imgURL
        }).then(() => {
            window.location.reload();
        });
    }

    return (
        <div className={styles.slide}>
            <img src={imgURL} alt="slide" />
            <input type="file" id="slide" name="slide" accept="image/*" onChange={(e) => setImg(e.target.files[0])}/>
            <button onClick={saveSlide}>Save</button>
        </div>
    )
}

export default function ManageSlides() {
    const { user } = useAuthContext();
    const router = useRouter();
    const [slides, setSlides] = useState([]);

    const getSlides = async () => {
        const colRef = collection(firestore_db, 'slides');
        getDocs(colRef).then((querySnapshot) => {
            setSlides(querySnapshot.docs.map((doc) => {
                return ({...doc.data(), id: doc.id});
            }));
        });
    }

    useEffect(() => {
        if (user === null) {
            router.push("/signin");
        }
    }, []);

    useEffect(() => {
        getSlides();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
        { user ? 
            <>
                <div className="header">   
                    <h1>Manage Slides</h1>
                </div>

                <div className={styles.manageForm}>
                    {slides.map((slide) => {
                        return <Slide key={slide.id} imgURL={slide.imgURL} id={slide.id} />
                    })}
                </div>
            </>
        : null }
        </AuthContext.Provider>
    )
}