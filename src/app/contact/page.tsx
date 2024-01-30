import styles from './page.module.css'

export default function ContactUs() {
    return (
            <>
            <div className="header">   
                <h1>Contact Us</h1>
            </div>

            <div className={styles.contact}>
                <h2>For gig proposals and other buisness inquires, send us an email!</h2>
                <p>
                    <br/>
                    Katie Schaefer | President:&nbsp;
                    <a href="mailto:krschaefer@fredonia.edu">
                        krschaefer@fredonia.edu
                    </a>
                    <br/>
                    Emma Rask | Vice President:&nbsp;
                    <a href="mailto:erask@fredonia.edu">
                        erask@fredonia.edu
                    </a>
                    <br/><br/>
                    You can also reach us at&nbsp;
                    <a href="mailto:fredoniasomelikeithot@gmail.com">
                        fredoniasomelikeithot@gmail.com
                    </a>
                </p>

                <p>or by sending us a message on our socials!</p>
                <div className={styles.socials}>
                    <a href="https://www.facebook.com/fredoniaslih/">
                        <img src="Images/facebook.png"></img>
                    </a>
                    <a href="https://www.instagram.com/fredslih//">
                        <img src="Images/instagram.png"></img>
                    </a>
                    <a href="https://www.tiktok.com/@slihacappella">
                        <img src="Images/tiktok.png"></img>
                    </a>
                </div>
            </div>
        </>
    )

}