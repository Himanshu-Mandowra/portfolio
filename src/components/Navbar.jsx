import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import Newsvg from './New';
import { motion } from 'framer-motion';
import logo from '../assets/Logo.svg'



function Navbar() {
    const dropdownRef = useRef(null);
    const profilePicRef = useRef(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                profilePicRef.current &&
                !profilePicRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dropdownOpen]);


    // Function to scroll to the Section1 section
    const scrollToSec1 = () => {
        document.getElementById('section1').scrollIntoView({ behavior: 'smooth' });
    };
    // Function to scroll to the About section
    const scrollToAbout = () => {
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    };

    // Function to scroll to the Contact section
    const scrollToContact = () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    };

    // Function to scroll to the Service section
    const scrollToService = () => {
        document.getElementById('Service').scrollIntoView({ behavior: 'smooth' });
    };
    // Function to scroll to the Prject section
    const scrollToFuture = () => {
        document.getElementById('Project').scrollIntoView({ behavior: 'smooth' });
    };
    // State to track if the navbar is responsive
    const [isResponsive, setIsResponsive] = useState(false);

    // Function to toggle the responsive class
    const toggleResponsive = () => {
        setIsResponsive(!isResponsive);
    };

    return (
        <nav id="navbar">
            <motion.div
                className="logo"
            // whileHover={{ scale: 0.5 }}

            >
                <div className="title">
                    <h2 className="letter" style={{ color: 'yellow' }}>Port</h2>
                    <h2 className="letter">folio</h2>
                </div>
            </motion.div>

            <div className="nav-links hide-on-small" id="navbarSupportedContent">
                <Link to="/" id="section-link">Home</Link>
                <Link onClick={scrollToAbout} to="/" id="about-link">About</Link>
                <Link onClick={scrollToService} to="/">Service</Link>
                <Link onClick={scrollToFuture} to="/">Future</Link>
                <Link to="/">Blog</Link>
                <Link onClick={scrollToContact} to="/">Contacts</Link>
            </div>

            {/* <Newsvg/> */}

            {/* dropdown menu */}

            <div>
                <div
                    // onClick={handleProfileClick}
                    ref={profilePicRef}
                    className=' text-3xl cursor-pointer relative'
                // onClick={toggleResponsive}
                >
                    <a class=" res-menu icon " data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                        &#9776;
                    </a>


                    {/* Use your own condition and profile picture logic here */}
                </div>

                <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasExampleLabel">Menu</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <div>
                            {/* Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc. */}
                        </div>
                        <div className="nav-mob" id="navbarSupportedContent">
                            <Link onClick={scrollToSec1} data-bs-dismiss="offcanvas" to="#nav" className='HomeNav' id="section-link">Home</Link>
                            <Link onClick={scrollToAbout} data-bs-dismiss="offcanvas" to="#nav" className='AboutNav' id="about-link">About</Link>

                            <Link onClick={scrollToService} data-bs-dismiss="offcanvas" to="#nav" className='ServiceNav' >Service</Link>


                            <Link data-bs-dismiss="offcanvas" to="#nav" className='BlogNav' >Blog</Link>
                            <Link onClick={scrollToContact} data-bs-dismiss="offcanvas" to="#nav" className='ContactNav' >Contacts</Link>
                        </div>
                    </div>
                </div>
            </div>

        </nav>
    );
}

export default Navbar;
