"use client";

import React from "react";
import { AuthContext } from "@/context/authcontext";
import { useAuthContext } from "@/context/authcontext";
import { useRouter } from "next/navigation";
import styles from './page.module.css'

export default function AdminHelp() {
    const { user } = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/signin")
    }, [])

    return (
        <AuthContext.Provider value={{ user }}>
            { user ? 
                <div className={styles.adminHelp}>
                    <h1>Admin Dashboard Guide</h1>
                    <div className={styles.dashboardUsage}>
                        <h2>Dashboard</h2>
                        <h3>What Is This Dashboard?</h3>
                        <p>
                            The admin dashboard is available for permitted members
                            of the group to edit pages of the website. This page
                            will be updated as new features are added and more
                            components and pages become editable. Should anything
                            not be working as expected, or something is broken, please
                            reach out to Ian Cioppa at&nbsp;
                            <a href="mailto:ian.cioppa@gmail.com">ian.cioppa@gmail.com</a>
                        </p>
                        <h3>Managing Access to the Dashboard</h3>
                        <p>
                            Access to the website dashboard is managed through Firebase
                            Authentication. Access to managing users is available through
                            the Firebase Admin Console. To add a new admin, login to the
                            Firebase Admin Console with the SLIH Google Account<span> </span>
                            <a href='https://console.firebase.google.com/u/0/project/slihnextwebsite/authentication/users' target="_blank">
                                through this link.
                            </a><span> </span>
                            On this page, you&apos;ll see a list of all users who currently have
                            access to the web dashboard. To add a new user, click the add
                            user button in the top right corner, and enter an email and password
                            for the user. This user will now be able to login to the dashboard
                            
                        </p>
                        <h2>Profile</h2>
                        <h3>What is my Profile?</h3>
                        <p>
                            Your profile consists of your email, display name, and photo. Your
                            email is only viewable by you. Your display name and photo will be
                            displayed next to posts you create. Your profile is also used to
                            identify you when you login to the dashboard and will be logged when
                            you make changes to the website.
                        </p>
                        <h3>Editing Your Profile</h3>
                        <p>
                            To edit your profile, click the &quot;Edit Profile&quot; button on the
                            dashboard. From here, you can change your display name, and
                            upload a profile picture. This picture will be displayed on
                            posts you create. Please note that leaving the profile picture
                            field blank will replace your profile photo with a blank image.
                            If you want to update only your display name, you&apos;ll need to
                            upload your profile photo again. This is currently being worked
                            on.
                        </p>
                        <h2>Events</h2>
                        <h3>What are Events?</h3>
                        <p>
                            Events will be displayed on the &quot;Events&quot; page of the website.
                            You are able to add a title, description, date and time, location,
                            and a livestream link. You can also upload a cover photo for the event.
                            You can add as many events as you&apos;d like to this page.
                        </p>
                        <h3>Managing Events</h3>
                        <p>
                            You can manage all the active events on the website by clicking the
                            &quot;Manage&quot; button below the events section on the dashboard. From here,
                            you&apos;ll see a list of all events currently on the website. You can
                            edit an event by editing any of the available fields, or you can delete
                            it with the &quot;Delete&quot; button. There is currently no confirmation for deletions,
                            so please be careful.
                        </p>
                        <h3>Adding an Event</h3>
                        <p>
                            To add an event, click the &quot;Add&quot; button under the Events category on the 
                            dashboard. From here, you can enter a title, description, date and time,
                            location, and a livestream link. You can also upload a cover photo for the
                            event. Once you&apos;re done, click the &quot;Add Event&quot; button, and the new event will
                            be added to the website.
                        </p>
                        <h2>Hotties</h2>
                        <h3>Types of Hotties</h3>
                        <p>
                            Each group member can be classified as a member, alumni, or eboard member.
                            When adding a new member, you can select which type they are. All members,
                            regardless of type, will have a name, join year, photo, and a list of solos,
                            if applicable. Eboard members will also have a position assosciated with them.
                            Alumni members will have all these fields, with any past eboard position they 
                            held listed as well. You can convert any member to an eboard role or alumni, 
                            but not the reverse way.
                            
                        </p>
                        <h3>Managing Hotties</h3>
                        <p>
                            To manage members, click the &quot;Manage&quot; button under the Hotties category. From
                            here, you&apos;ll see a list of all members currently on the website. You can edit
                            a member by editing an editable field, or delete them by clicking the &quot;Delete&quot;.
                            There is currently no confirmation for deletions, so please be careful.
                        </p>
                        <h3>Converting a Hottie</h3>
                        <p>
                            To convert a member to an alumni or eboard member, click the &quot;Convert to Alumni&quot;
                            or &quot;Convert to Eboard&quot; button on the dashboard. From here, you can select a member
                            to convert, fill in the applicable information, and they will be moved to the 
                            appropriate section of the website.
                        </p>
                        <h2>Repertoire</h2>
                        <h3>What is Repertoire?</h3>
                        <p>
                            The Repertoire page is where you can find all songs that are currently in the
                            group&apos;s repertoire. This page is also where you can find retired songs. Each song
                            will have a title, arranger, a photo, and the semester the song was introduced.
                        </p>
                        <h3>Managing Repertoire</h3>
                        <p>
                            To manage the repertoire section, click the &quot;Manage&quot; button under the Repertoire
                            category. From here, you&apos;ll see a list of all the songs currently on the website.
                            You can add and remove items on this page.
                        </p>
                        <h3>Retiring a Song</h3>
                        <p>
                            To retire a song, click the &quot;Retire Song&quot; button on the dashboard. From here, you
                            can select a song to retire, and it will be moved to the retired section of the
                            repertoire page.
                        </p>
                        <h2>Media</h2>
                        <h3>What is Media?</h3>
                        <p>
                            The Media page is where you can feature photos of the group. This page also
                            will have the latest upload on the SLIH YouTube channel on the top of the
                            page.
                        </p>
                        <h3>Managing Media</h3>
                        <p>
                            To manage the media section, click the &quot;Manage&quot; button under the Media category.
                            From here, you&apos;ll see a list of all the photos currently on the website. You can
                            add and remove items on this page.
                        </p>
                        <h2>Slides</h2>
                        <h3>What are Slides?</h3>
                        <p>
                            The slides section is located at the top of the home page of the website. This
                            is a section where you can highlight photos of the group. There are 12 slides
                            on the page that you can customize.
                        </p>
                        <h3>Managing Slides</h3>
                        <p>
                            To manage and edit the currently active slides, click the &quot;Manage&quot; button under
                            the Slides category. From here, you&apos;ll see a list of all the slides currently
                            on the website. You can edit a slide by uploadng a new photo into any of the slots.

                        </p>
                        <h2>Features in Progress</h2>
                        <p>
                            In the future, you&apos;ll also be able to edit information about a specific brother 
                            after they&apos;ve been added to the website. When these features are added, this page 
                            will be updated with instructions on how to use them. If you&apos;d like any features
                            added, or would like a specific aspect of the website to become editable, please
                            let the website admins know.
                        </p>
                    </div>
                </div>

                :

                <></>
            }
        </AuthContext.Provider>
    )               
}