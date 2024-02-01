import { useState, useEffect } from 'react';
import styles from './page.module.css' 

export default function AboutUs() {
    return (
        <>
            <div className="header">   
                <h1>About Us</h1>
            </div>

            <div className={styles.container}>
                <div className={styles.aboutText}>Based in Fredonia, NY, the group was founded in 2001 under the name &quot;Out of the Blue&quot;. This name didn&apos;t stick like the founding members had hoped, so in 2002 the group started fresh with the new name Some Like it Hot and the rest is history! All of our songs performed live or on our CDs have been arranged by past and present singers of SLIH, or other members of the Fredonia A Cappella community. The &quot;Hotties&quot;, a term coined decades ago by audience members around NY, perform genres from pop and rock all the way to RnB and hip-hop. Some Like it Hot has performed in numerous universities, high schools and middle schools throughout New York State. SLIH also hosts their annual &quot;Acafest&quot; invitational every Spring Semester. SLIH has competed in previous ICCAs and often performs at charitable events throughout the year around Fredonia. To book SLIH for upcoming gigs in Fredonia or around New York State, please visit the &quot;Contact Us&quot; page on this website!  </div>
            </div>
        </>
    )
}