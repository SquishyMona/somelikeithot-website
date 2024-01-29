"use client"

import { useState, useEffect } from "react";
//import { AuthContext, useAuthContext } from "@/context/AuthContext"
import Link from "next/link";

export default function Navigation() {
    return (
        <>
            <nav id="navbar" style="max-height: 48px;" class="nav">
                <a class="icon" href="javascript:void(0)" onclick="hamburgerClick()"></a>
                    <i class="fa fa-bars"></i>
                </a>
                <img src="Images/SLIHLogo.png">
                <a class="slihText" href="index.html" style="display: inline-block; margin: 0;">Some Like It Hot</a>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about-us.html">About Us</a></li>
                    <li><a href="news.html">News</a></li>
                    <li><a href="current-hotties.html">Current Hotties</a></li>
                    <li><a href="repertoire.html">Repertoire</a></li>
                    <li><a href="alumni.html">Alumni</a></li>
                    <li><a href="media.html">Media</a></li>
                    <li><a href="https://www.bonfire.com/store/some-like-it-hot/" target="_blank">Merch</a></li>
                    <li><a href="contact-us.html">Contact</a></li>
                </ul>
            </nav>
        </>
    );
}