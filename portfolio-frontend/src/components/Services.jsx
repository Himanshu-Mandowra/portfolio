import React from 'react';

function Services() {
    return (
        <section className="Service" id="Service">
            <div className="top-bar">
                <div className="top-bar-one">Service</div>
                <div className="underline"></div>
            </div>

            <div className="middle-bar">
                <div className="Webb">
                    <div className="web-one">Web development Service</div>
                    <div className="web-two">Front-End Development:</div>
                    <div className="para">
                        Creating responsive and visually appealing websites using HTML, CSS, and JavaScript.
                        <br />
                        Building interactive user interfaces with React.js.
                    </div>
                </div>
                <div style={{ backgroundColor: 'grey' }} className="line2"></div>
                <div className="content">
                    <div className="web-one">Content Creation Services</div>
                    <div className="web-two">Social Media Content:</div>
                    <div className="para">
                        Creating engaging content for Instagram, YouTube, and other social media platforms.
                        <br />
                        Designing graphics, videos, and promotional materials.
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;
