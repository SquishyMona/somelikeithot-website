// @ts-nocheck

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
                    key={rep.id}
                    photo={rep.photo}
                    title={rep.title}
                    introduced={rep.introduced}
                    arranger={rep.arranger} />
                })}
            </div>
            <h1 className="category" style={{marginTop: '50px'}}>Retired Songs</h1><br/>
            <div class={styles.pastrep}>
            {retired.map((rep) => {
                    return ( 
                        <>
                            <div className={styles.pastrep}>
                                <p>{rep.title} by {rep.artist}: {rep.soloist}</p>
                            </div>
                    )
                })}
                <p>Traitor by Olivia Rodrigo: Emma</p>
                <p>Rumor Has It by Adele: Alli</p>
                <p>Boys Like You By dodie: Jenna</p>
                <p>Silly Love Songs by Wings: Katherine</p>
                <p>Cherry Wine by Hozier: Grace</p>
                <p>Sweet But Psycho by Ava Max: Maria, Leah</p>
                <p>Here by Alessia Cara: Katie, Leah</p>
                <p>Down by Jay Sean: Sam, Maddi, Maeve</p>
                <p>Little Lies by Fleetwood Mac: Maddi, Maeve</p>
                <p>Say Something by A Great Big World</p>
                <p>Beatles Medley by The Beatles: Leah, Morgan, Erin, Liv, Keara</p>
                <p>Dancing Queen by ABBA: Brynna, Zoe</p>
                <p>Britney Medley by Britney Spears: Erin, Morgan, Maeve, Brynna</p>
                <p>Livin&apos; On A Prayer by Bon Jovi: Keara, Maeve</p>
                <p>Million Reasons by Lady Gaga: Abby</p>
                <p>Scars to Your Beautiful by Alessia Cara: Leah</p>
                <p>Jolene by Dolly Parton: Morgan</p>
                <p>Boy by Little Mix: Jess</p>
                <p>Beyoncé Medley: Allison</p>
                <p>Hold My Hand by Jess Glynne: Hayley</p>
                <p>Water Under the Bridge by Adele: Maddi</p>
                <p>Let it Go by James Bay: Zoe, Julia </p>
                <p>Lean On Dream On by Major Lazer and Aerosmith: Natalie, Lara, Holly, Deanna</p>
                <p>Same Old Love by Selena Gomez: Lara</p>
                <p>Nobody Love by Tori Kelly: Jess</p>
                <p>Fleetwood Mac Medley: Allison, Julia</p>
                <p>Drops of Jupiter by Train: Sarah, Samantha</p>
                <p>Hide and Seek by Imogen Heap</p>
                <p>***Dessert by Dawin: Meghan, Francesca</p>
                <p>I Choose You by Sara Bareilles: Allison</p>
                <p>Something by The Beatles: Sophie</p>
                <p>Rather Be by Clean Bandit: Sierra</p>
                <p>Save My Life by ZZ Ward: Meghan</p>
                <p>***Fergalicious by Fergie: Deanna, Sierra</p>
                <p>What Now by Rihanna: Brooklynn</p>
                <p>You Make My Dreams Come True by Hall and Oats: Francesca</p>
                <p>All of Me by John Legend: Michelle, Karissa</p>
                <p>***Crazy in Love by Beyonce: Michelle, Brooklynn</p>
                <p>Miley Cyrus Medley: Deanna, Emily, Samantha</p>
                <p>Cry Me A River by Justin Timberlake: Sierra</p>
                <p>Dark Horse by Katy Perry: Deanna</p>
                <p>Fix You by Coldplay: Stephanie</p>
                <p>Survivor by Destiny&apos;s Child: Emily, Alyssa</p>
                <p>Closing Time by Semisonic: Julia</p>
                <p>Unpretty by TLC: Michelle, Karissa</p>
                <p>***Gold Digger by Kanye West</p>
                <p>I Knew You Were Trouble by Taylor Swift: Annie</p>
                <p>Not Ready To Make Nice by The Dixie Chicks: Tara</p>
                <p>Mumford Medley: Michelle, Emily, Julia</p>
                <p>Heart Skips A Beat by Olly Murs: Deanna</p>
                <p>I Want U Back by Cher Lloyd: Alyssa</p>
                <p>Sweet Home Alabama by Lynyrd Skynyrd: Sara, Mallory</p>
                <p>Lego House by Ed Sheeran: Kaliegh</p>
                <p>The Story by Brandie Carlile: Caitlin</p>
                <p>Like A Prayer: Michelle/Brittany</p>
                <p>Strangers Like Me by Phil Collins: Saia</p>
                <p>Old School Medley by Various Artists: Annie, Alyssa, Jordan, Kaliegh, Sara, Jen, Kerry, Katlyn, Becca, Adrian, Mary, Mallory</p>
                <p>Can You Feel The Love Tonight? From &quot;The Lion King&quot;: Emma, Caitlin, Erica</p>
                <p>Born This Way/When Love Takes Over by Lady Gaga/Kelly Rowland: Michelle, Emma</p>
                <p>I&apos;ll Be Seeing You by Billie Holiday</p>
                <p>Barton Hollow/Rumor Has It by The Civil Wars/ADELE: Emily, Kaliegh, Sara</p>
                <p>Breakeven by The Script: Kerry</p>
                <p>Domino by Jessie J: Erica</p>
                <p>We Found Love by Rihanna: Brooklynn</p>
                <p>F****** Perfect by P!nk: Tara, Caitlin</p>
                <p>Moondance by Van Morrison: Heather</p>
                <p>Say by John Mayer: Julia, Kayla</p>
                <p>Bad Romance by Lady Gaga: Sara, Stephanie, Mackenzie</p>
                <p>Can&apos;t Hurry Love by The Supremes: Caitlin</p>
                <p>1000 Miles by Vanessa Carlton: Diana, Adrian</p>
                <p>I&apos;m Walking on Sunshine by Katrina & the Waves: Becca</p>
                <p>No Rain by Blind Melon: Kylie, Stephanie, Stephanie</p>
                <p>Swing Swing by All American Rejects: Katlyn</p>
                <p>Suddenly I See by KT Tunstall: Kayla</p>
                <p>Heaven Is A Place On Earth by Belinda Carlisle: Mary, Colleen</p>
                <p>Hey Ya by Outkast</p>
                <p>Cherish by Madonna</p>
                <p>**Maneater by Nelly Furtado</p>
                <p>When You Say Nothing At All by Allison Krause: Jordan, Shina</p>
                <p>Disturbia/Please Don&apos;t Stop The Music by Rihanna: Maggie, Adrian, Maria, Kayla, Mackenzie</p>
                <p>Annie Waits by Ben Folds: Maggie, Kristen</p>
                <p>She Works Hard For The Money by Disco Ladies: Jen</p>
                <p>Zak & Sara by Ben Folds: Maria</p>
                <p>Crash by DMB: Sarah, Kristina</p>
                <p>**Down by Jay Sean</p>
                <p>Love Song by Sara Bareilles: Maggie</p>
                <p>Danny Boy: Jordan</p>
                <p>I&apos;m Yours by Jason Mraz: Katlyn</p>
                <p>Shoebox by Barenaked Ladies: Jen</p>
                <p>The Sign by Ace Of Base: Jordan, Diana</p>
                <p>**Shoop by Salt & Peppa</p>
                <p>**Video Killed The Radio Star by The Buggles</p>
                <p>Joy To The World by Three Dog Night: Sara, Kayla</p>
                <p>**Babylon by David Gray: Sarah</p>
                <p>Island In The Sun by Weezer: Mary, Colleen, Mallory</p>
                <p>Jumper by Third Eye Blind: Colleen, Kristina</p>
                <p>The Luckiest by Ben Folds</p>
                <p>Lovefool by The Cardigans: Kelly</p>
                <p>**Lean On Me by Bill Withers</p>
                <p>Killing Me Softly by Lauryn Hill: Stephanie</p>
                <p>Obladi, Oblada by The Beatles: Stephanie</p>
                <p>Standing Still by Jewel: Falynn</p>
                <p>Freefalling by Tom Petty</p>
                <p>I Will Survive: Jauneice</p>
                <p>Imagine by John Lennon</p>
                <p>500 Miles by The Proclaimers: Kristen</p>
                <p>Since U Been Gone by Kelly Clarkson: Melinda</p>
                <p>Sunday Morning by Maroon 5</p>
                <p>**I&apos;m The Only One by Melissa Etheridge: Kristen</p>
                <p>Don&apos;t Know Why by Norah Jones: Kristina</p>
                <p>Respect by Aretha Franklin: Melissa</p>
                <p>Look What You&apos;ve Done by Jet: Jayanthi, Kristina</p>
                <p>Steal My Kisses by Ben Harper: Sara</p>

                <p>** = RAP CRAP</p>
                <br/>
            </div>
        </>
    )
}