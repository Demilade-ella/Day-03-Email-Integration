import emailjs from "@emailjs/browser";
import React, { useState, useEffect } from "react";
import "../styles/ContactForm.css";

function ContactForm() {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("contactFormData");
    return savedData
      ? JSON.parse(savedData)
      : {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        };
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    localStorage.setItem("contactFormData", JSON.stringify(formData));
  }, [formData]);

  const validateField = (id, value) => {
    let errorMsg = "";

    switch (id) {
      case "firstName":
      case "lastName":
        if (value.length <= 2) errorMsg = "Must be at least 3 characters";
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(value))
          errorMsg = "Please enter a valid email";
        break;
      case "phone":
        if (value.length <= 10) errorMsg = "Please enter a valid phone number";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [id]: errorMsg }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData({
      ...formData,
      [id]: value,
    });

    if (touched[id]) {
      validateField(id, value);
    }
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    setTouched((prev) => ({ ...prev, [id]: true }));
    validateField(id, value);
  };

  const handleClear = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
    setErrors({});
    setTouched({});
    localStorage.removeItem("contactFormData");
  };

  const isFirstNameValid = formData.firstName.length > 2;
  const isLastNameValid = formData.lastName.length > 2;
  const isEmailValid = /\S+@\S+\.\S+/.test(formData.email);
  const isPhoneNumberValid = formData.phone.length > 10;

  const isFormValid =
    isFirstNameValid && isLastNameValid && isEmailValid && isPhoneNumberValid;

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    const templateParams = {
      from_name: `${formData.firstName} ${formData.lastName}`,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        console.log(
          "Public Key check:",
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        );
        setIsSent(true);
        setIsLoading(false);

        setTimeout(() => {
          setIsSent(false);
          handleClear();
        }, 5000);
      })
      .catch((err) => {
        console.error("FAILED...", err);
        setIsLoading(false);
        alert("Error: " + JSON.stringify(err));
      });
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
                onBlur={handleBlur}
                className={
                  touched.firstName && errors.firstName ? "input-error" : ""
                }
              />
              {touched.firstName && errors.firstName && (
                <span className="error-msg"> {errors.firstName} </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                placeholder="James"
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  touched.lastName && errors.lastName ? "input-error" : ""
                }
              />
              {touched.lastName && errors.lastName && (
                <span className="error-msg"> {errors.lastName} </span>
              )}
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
                onBlur={handleBlur}
                className={touched.email && errors.email ? "input-error" : ""}
              />
              {touched.email && errors.email && (
                <span className="error-msg"> {errors.email} </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone number</label>
              <input
                type="number"
                id="phone"
                value={formData.phone}
                placeholder="123-456-7890"
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.phone && errors.phone ? "input-error" : ""}
              />
              {touched.phone && errors.phone && (
                <span className="error-msg"> {errors.phone} </span>
              )}
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
            disabled={!isFormValid || isLoading}
            className={
              isFormValid && !isLoading
                ? "send-btn active"
                : "send-btn disabled"
            }
          >
            {isLoading
              ? "Sending..."
              : isFormValid
              ? "Send message"
              : "Please fill all fields"}
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="clear-btn"
            disabled={isLoading}
          >
            Clear Form
          </button>
        </form>
      )}
    </section>
  );
}

export default ContactForm;
