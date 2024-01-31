"use client";

import { useState, useEffect } from "react";
import { AuthContext, useAuthContext } from "@/context/authcontext"
import Link from "next/link";

export default function Navigation() {
    const { user } = useAuthContext();
    const [isOpen, setIsOpen] = useState(true);
    const toggleMenu = () => {
          setIsOpen(!isOpen);
          console.log(isOpen);
          if (isOpen) {
            document.getElementById('dropdown').style.top = '0';
            if (user) {
              document.getElementById('navbar').style.height = '660px';
            }
            else {
              document.getElementById('navbar').style.height = '600px';
            }
          }
          else {
            document.getElementById('dropdown').style.top = '-100vh';
            document.getElementById('navbar').style.height = '60px';
          }
      }
  
    return (
        <AuthContext.Provider value={{ user }}>
            <nav id="navbar">
                <div className="hamburger-lines" onClick={toggleMenu}>
                    <span className="line line1"></span>
                    <span className="line line2"></span>
                    <span className="line line3"></span>
                </div>  
                <div className="homelink">
                    <img src="/Images/logo.png"></img>
                    <Link className="slihText" href="/" style={{display: 'inline-block', margin: '0'}}>Some Like It Hot</Link>
                </div>
                <ul id="dropdown">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About Us</Link></li>
                    <li><Link href="/events">Events</Link></li>
                    <li><Link href="/currenthotties">Current Hotties</Link></li>
                    <li><Link href="/repertoire">Repertoire</Link></li>
                    <li><Link href="/alumni">Alumni</Link></li>
                    <li><Link href="/media">Media</Link></li>
                    <li><Link href="https://www.bonfire.com/store/some-like-it-hot/" target="_blank">Merch</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                    {
                        user ? <li><Link href="/admin">Admin</Link></li> : null
                    }
                </ul>
            </nav>
        </AuthContext.Provider>
    );
}