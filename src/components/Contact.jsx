import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function Contact() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const [responseMessage, setResponseMessage] = useState('');
  const formRef = useRef(null); // Create a ref for the form element

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const copyrightText = `© ${currentYear} by Himanshu Mandowra. All rights reserved.`;
    const copyrightElement = document.getElementById('copyright');
    if (copyrightElement) {
      copyrightElement.textContent = copyrightText;
    }
  }, []); // Empty dependency array means this effect runs once after the initial render

  const submitTemp = async (data) => {
    try {
      if (formRef.current) {
        // Pass the form element reference to emailjs
        await emailjs.sendForm('service_2nib78g', 'template_bo3vf4i', formRef.current, 'LQvI0NJt-BCDntiHf');
        setResponseMessage('Message sent successfully.');
      }
    } catch (error) {
      console.error(error);
      setResponseMessage('Failed to send message.');
    }

    // Example condition for blocked user
    if (data.username === 'Jatin') {
      setError('blocked', { message: 'Sorry, user Jatin is blocked!' });
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="top-bar">
        <div className="top-bar-one">Contact</div>
        <div className="underline"></div>
      </div>

      <div className="middle-bar">
        <div className="left">
          <div className="social">
            <div className="i-one">
              <Link to="/https://x.com/Himshu_Mandowra?t=v99mUW0-63kJSzYymIbSnA&s=09"><i className='bx bxl-twitter'></i> Twitter</Link>
              <Link to="/http://www.linkedin.com/in/himanshu-mandowra"><i className='bx bxl-linkedin'></i> LinkedIn</Link>
              <Link to="/https://github.com/Himanshu-Mandowra"><i className='bx bxl-github'></i> GitHub</Link>
            </div>
          </div>
        </div>

        <div className="line2"></div>
        <div className="right">
          <form ref={formRef} onSubmit={handleSubmit(submitTemp)}>
            <label htmlFor="name">Name:</label>
            <br />
            <input
              placeholder="username"
              {...register("username", {
                required: { value: true, message: "Username is required" },
                minLength: { value: 3, message: "Minimum length should be 3" },
                maxLength: { value: 16, message: "Maximum length should be 16" }
              })}
              type="text"
              id="username"
            />
            <br />
            {errors.username && <span className="text-red-700">{errors.username.message}</span>}
            <br />

            <label htmlFor="email">Email:</label>
            <br />
            <input
              placeholder="email"
              {...register("email", {
                required: { value: true, message: "Email is required" },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address"
                }
              })}
              type="email"
              id="email"
            />
            <br />
            {errors.email && <span className="text-red-700">{errors.email.message}</span>}
            <br />

            <label htmlFor="message">Message:</label>
            <br />
            <textarea
              placeholder="Enter Your Message"
              id="message"
              {...register("message", { required: { value: true, message: "Message is required" } })}
            ></textarea>
            <br />
            {isSubmitting && <div>Loading...</div>}
            <input disabled={isSubmitting} type="submit" value="Send" />
            <br />
            {errors.blocked && <span className="text-red-700">{errors.blocked.message}</span>}
          </form>
          {responseMessage && <p>{responseMessage}</p>}
        </div>
      </div>

      <div className="footer">
        <div className="Email">
          <Link to="#"><i className='bx bxl-gmail no-underline'></i> -/ Email - himanshu.mandowra1234@gmail.com /-</Link>
          <div className="copy">
            <p id="copyright">© 2024 by Himanshu Mandowra. All rights reserved.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
