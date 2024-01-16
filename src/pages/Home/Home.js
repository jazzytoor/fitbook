import React, { Component } from "react"
import "./Home.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserAlt } from "@fortawesome/free-solid-svg-icons"
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons"
import { faTasks } from "@fortawesome/free-solid-svg-icons"

class Home extends Component {
  render() {
    return (
      <div>
        <div className="header-section">
          <h1>FitBook</h1>
        </div>
        <div className="about-us-section">
          <div className="about-us-header">
            <p>What We Do</p>
          </div>
          <div className="about-us-content">
            <h2>
              Welcome to your fitness booking needs! We assist and provide a
              booking system for personal trainers and their clients.
            </h2>
          </div>
          <div className="about-us-service-container">
            <div className="about-us-service">
              <div className="about-us-service-content">
                <FontAwesomeIcon icon={faCalendarAlt} className="fa-class" />
                <h3>Booking System</h3>
                <p>
                  FitBook provides a booking system where you can book, edit and
                  delete any sessions.
                </p>
              </div>
            </div>
            <div className="about-us-service">
              <div className="about-us-service-content">
                <FontAwesomeIcon icon={faUserAlt} className="fa-class" />
                <h3>My Profile Section</h3>
                <p>
                  FitBook provides a profile section where you can update your
                  profile when required.
                </p>
              </div>
            </div>
            <div className="about-us-service">
              <div className="about-us-service-content">
                <FontAwesomeIcon icon={faTasks} className="fa-class" />
                <h3>Upload Session Training Plans</h3>
                <p>
                  FitBook will provide the option where training sessions plan
                  can be uploaded to the booked session.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="about-me-section">
          <div className="about-me-header">
            <h2>Background Around FitBook</h2>
          </div>
          <div className="about-me-content">
            <div className="about-me-details">
              <p>
                FitBook is a project developed for my final year project at
                <br></br>
                university. Fitness is my hobby and throughout my time going
                <br></br>
                to the gym, I have seen personal trainers and their clients
                <br></br>
                struggle with managing sessions. Thus, this arrived.<br></br>
              </p>
            </div>
          </div>
        </div>
        <div className="pt-section">
          <div className="pt-header">
            <h2>Want to become a personal trainer?</h2>
          </div>
          <div className="pt-content">
            <p>Get In Touch!</p>
          </div>
          <div className="pt-form">
            <form
              onSubmit={e => e.preventDefault() && false}
              className="contact"
              method="post"
              id="form"
            >
              <div className="field">
                <input type="text" placeholder="Your Name" id="name" />
              </div>
              <div className="field">
                <input type="text" placeholder="Email" id="email" />
              </div>
              <div className="field">
                <textarea placeholder="Message" id="message"></textarea>
              </div>
              <div className="field">
                <p id="info_message"></p>
              </div>
              <div className="btn">
                <input type="submit" className="submit" value="Send Message" />
              </div>
            </form>
          </div>
        </div>
        <div className="footer-section">
          <div className="footer-header">
            <h2>Developed by Jazz Toor</h2>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
