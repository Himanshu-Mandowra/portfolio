import React, { useState, useEffect } from 'react';

function About() {

    useEffect(() => {
        // Add 'visible' class to the 'about' and 'section1' sections
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.classList.add('visible');
        }
    }, []);

    // State to manage the expanded/collapsed state
    const [isExpanded, setIsExpanded] = useState(false);

    // Function to toggle the expanded/collapsed state
    const myFunction = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <section className="about" id="about"  data-aos="zoom-in">
      <div className="top-bar">
        <div className="top-bar-one">About</div>
        <div className="underline"></div>
      </div>

      <div className="middle-bar">
        <div className="text-1">
          <div className="heading">
            <div className="line"></div>
            <div className="head">About me</div>
          </div>
          <div className="para">
            <div className="abc1">
              Hello, I'm Himanshu Mandowra, a dedicated web developer and emerging content creator. With
              expertise in web development and a deep interest in technology and DevOps, I specialize in
              crafting dynamic, high-performance digital solutions that merge creativity with technical
              precision.
            </div>

            <div className="abc2">
              <p>
                I specialize in front-end web development, with strong proficiency in HTML, CSS, JavaScript,
                and React.js. My technical skills are complemented by a keen eye for design, enabling me to
                create seamless, user-friendly websites. Additionally,{' '}
                <span id="dots">{isExpanded ? '' : '...'}</span>{' '}
                <span id="more" style={{ display: isExpanded ? 'inline' : 'none' }}>
                  I have experience with both SQL and NoSQL databases, ensuring efficient data management and retrieval. I am also currently expanding my expertise by learning DevOps to enhance my development workflow and deployment processes.
                </span>
                <button onClick={myFunction} className="btn" id="myBtn">
                  {isExpanded ? 'Read less' : 'Read more'}
                </button>
              </p>
            </div>
          </div>
        </div>
        <div className="line"></div>
        <div className="text-2" data-aos="zoom-in">
          <div className="heading">
            <div className="line"></div>
            <div className="head">My work</div>
          </div>
          <div className="para" data-aos="zoom-in">
            <div className="abc1">
              Cell (Central Electronics Limited) 
              <br />
              <b> Duration: </b> One Month
              <br />
              <br />
              <b> Discription: </b>
              <br />
              Designed a highly engaging and user-friendly website.
              Created an attractive UI and worked on both front-end and back-end development.
              <br />
              Managed the database to ensure seamless functionality.
              This experience honed my skills in full-stack development and allowed me to contribute effectively to a live project.
            </div>
            <div className="abc2">
              {/* Add any additional content or remove if not needed */}
            </div>
          </div>
        </div>
      </div>
      <div className="fotter" data-aos="fade-right">
        <div className="connect">
          <div className="text">
            <div>CHECK OUT MY :</div>
          </div>

          <div className="social">
            <a href="#" target="_blank" rel="noopener noreferrer">
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
      </div>
    </section>
    );
}

export default About;
