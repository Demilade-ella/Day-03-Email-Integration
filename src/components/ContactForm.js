import React, { useState } from "react";
import "../styles/ContactForm.css";

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleClear = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const isFirstNameValid = formData.firstName.length > 2;
  const isLastNameValid = formData.lastName.length > 2;
  const isEmailValid = /\S+@\S+\.\S+/.test(formData.email);
  const phoneRegex = /^\d{10,11}$/;
  const isPhoneNumberValid = phoneRegex.test(formData.phone);

  const isFormValid =
    isFirstNameValid && isLastNameValid && isEmailValid && isPhoneNumberValid;

  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);

    setTimeout(() => {
      setIsSent(false);
      handleClear();
    }, 5000);
  };

  return (
    <section className="contact-section">
      {isSent ? (
        <div className="success-container">
          <svg
            className="checkmark"
            xmlns="https://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark-check"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark-check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
          <h2 className="success-text"> Message Sent! </h2>
          <p className="success-subtext"> I'll get back to you soon. </p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                placeholder="Jonathan"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                placeholder="James"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                placeholder="Jonathan2718@gmail.com"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone number</label>
              <input
                type="tel"
                id="phone"
                value={formData.phonenumber}
                placeholder="123-456-7890"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row full-width">
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                type="text"
                id="message"
                value={formData.message}
                placeholder="Your message"
                onChange={handleChange}
                rows="4"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={isFormValid ? "send-btn active" : "send-btn disabled"}
          >
            {isFormValid ? "Send message" : "Please fill all fields"}
          </button>

          <button type="button" onClick={handleClear} className="clear-btn">
            Clear Form
          </button>
        </form>
      )}
    </section>
  );
}

export default ContactForm;
