import styles from './page.module.css'

export default function Events() {
    return (
        <>
            <div className="header">   
                <h1>News</h1>
            </div>

            <div className={styles.container}>
                <div className={styles.event}>
                    <img src="/Images/SLIHLogo.png"></img>
                    <div className={styles.details}>
                        <h2>Acafest</h2><br/>
                        <h3>April 16th @ 7PM</h3>
                        <h3>McEwen Hall 209</h3>
                        <br/><p>
                            Some Like It Hot presents our annual Acafest invitational, with performances from all our Fredonia groups, as well as RIT's Vocal Accent and UB's Buffalo Chips!
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}