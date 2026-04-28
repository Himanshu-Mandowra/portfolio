import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import sideimage from '../assets/1st.png'
import Typed from 'typed.js';

function HeroSection() {


    useEffect(() => {
        // Options for the Typed instance
        const options = {
            strings: ['Web Developer', 'Python',  'HTML, CSS, Tailwind CSS', 'front-end Developer', 'JavaScript', 'React JS', 'Node Js', 'MongoDB, Git, Figma'],
            typeSpeed: 60,
            loop: true
        };

        // Initialize the Typed instance
        const typed = new Typed('#element', options);

        // Cleanup function to destroy the Typed instance on component unmount
        return () => {
            typed.destroy();
        };
    }, []); // Empty dependency array means this effect runs once on mount
     // Function to scroll to the Contact section
     const scrollToContact = () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="section1" id="section1">
            <div className="hero">
                <div className="hero-text">
                    <span id="web-top"> Web Developer </span>
                    <h1 data-text='Himanshu Mandowra...'>Himanshu Mandowra</h1>
                    <span id="element"></span>
                    <p>Passionate web developer with experience in designing and implementing dynamic websites and applications.</p>
                    <a href="./assets/Resume - Himanshu.docx" download>
                        <button className="one btn">Download CV</button>
                    </a>
                    <Link onClick={scrollToContact} to="/"><button className="two btn">Hire Me Now</button></Link>
                </div>
                <div className="hero-image">
                    <img src={sideimage} alt="Himanshu-Mandowra" />
                </div>
            </div>
            <div className="share">
                {/* <p>check out my:</p> */}

                <div className="social">
                    <a href="/" target="_blank" rel="noopener noreferrer">
                        <i className='bx bxl-instagram'></i>
                    </a>
                    <a href="https://x.com/Gentle_Himanshu" target="_blank" rel="noopener noreferrer">
                        <i className='bx bxl-twitter'></i>
                    </a>
                    <a href="http://www.linkedin.com/in/himanshu-mandowra" target="_blank" rel="noopener noreferrer">
                        <i className='bx bxl-linkedin'></i>
                    </a>
                    <a href="https://github.com/Himanshu-Mandowra" target="_blank" rel="noopener noreferrer">
                        <i className='bx bxl-github'></i>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
