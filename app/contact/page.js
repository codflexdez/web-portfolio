"use client";
import React, { useState } from "react";
import classes from "@styles/contact.module.css";
import { sendContactForm } from "@lib/mailApi";
//import Image from "@node_modules/next/image";
//import contactImg from "../../public/assets/img/0019666-road.jpg";

const initValues = { name: "", email: "", subject: "", message: "" };
const initState = {
  values: initValues,
  isLoading: false,
  errors: {},
  touched: {},
};

export default function Contact() {
  const [state, setState] = useState(initState);
  const { values, isLoading, errors, touched, isFormSubmitted } = state;

  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;

  const handleChange = ({ target }) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
      touched: {
        ...prev.touched,
        [target.name]: true,
      },
      errors: {
        ...prev.errors,
        [target.name]: "", // Clear the error when the user starts typing again
      },
    }));

  const onBlur = ({ target }) =>
    setState((prev) => ({
      ...prev,
      errors: {
        ...prev.errors,
        [target.name]: validateField(target.name, prev.values[target.name]),
      },
    }));

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "name":
        return value.trim() ? "" : "*Please enter your name";
      case "email":
        return emailRegex.test(value)
          ? ""
          : "*Please enter a valid email address";
      case "subject":
        return value.trim() ? "" : "*Please enter the subject";
      case "message":
        return value.trim() ? "" : "*Please enter your message";
      default:
        return "";
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    const fieldErrors = Object.keys(values).reduce((acc, fieldName) => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) acc[fieldName] = error;
      return acc;
    }, {});

    if (Object.keys(fieldErrors).length > 0) {
      // If there are validation errors, update the state to display them
      setState((prev) => ({ ...prev, errors: fieldErrors }));
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      await sendContactForm(values);
      setState((prev) => ({ ...prev, ...initState, isFormSubmitted: true }));

    } catch (error) {
      console.error("Error submitting form:", error);

      setState((prev) => ({
        ...prev,
        isLoading: false,
        errors: { general: "Failed to send message. Please try again later." },
      }));
    }
  };

  const btnDisabled =
    Object.values(values).some((value) => !value.trim()) || isLoading;

  return (
    <section className={classes.container}>
      <h2>Contact Me</h2>
      <form
        id="email_form"
        className={classes.form}
        method="POST"
        onSubmit={onSubmit}
      >
        <label className={classes.label}>
          Name *
          <input
            className={`${classes.input} ${
              touched.name && !values.name ? classes.isInvalid : ""
            }`}
            type="text"
            name="name"
            value={values.name}
            placeholder="name"
            onChange={handleChange}
            onBlur={onBlur}
          />
        </label>
        <label className={classes.label}>
          Email *
          <input
            className={
              errors.email && touched.email
                ? `${classes.input} ${classes.isInvalid}`
                : classes.input
            }
            type="text"
            name="email"
            value={values.email}
            placeholder="email"
            onChange={handleChange}
            onBlur={onBlur}
          />
        </label>
        <label className={classes.label}>
          Subject *
          <input
            className={
              errors.subject && touched.subject
                ? `${classes.input} ${classes.isInvalid}`
                : classes.input
            }
            type="text"
            name="subject"
            value={values.subject}
            placeholder="subject"
            onChange={handleChange}
            onBlur={onBlur}
          />
        </label>
        <label className={classes.label}>
          Message *
          <textarea
            type="text"
            name="message"
            rows={4}
            className={
              errors.message && touched.message
                ? `${classes.input} ${classes.isInvalid}`
                : classes.input
            }
            value={values.message}
            placeholder="Type your message please"
            onChange={handleChange}
            onBlur={onBlur}
          ></textarea>
        </label>
        {/* Display specific error messages for each field */}
        <div className={classes.err_box}>
          {Object.keys(errors).map((fieldName) => (
            <span key={fieldName} style={{ color: "red", fontSize: "small" }}>
              {errors[fieldName]}
            </span>
          ))}
        </div>
        {isFormSubmitted && (
          <div style={{ color: "green", fontSize: "small" }}>
            Form submitted successfully!
          </div>
        )}
        <button disabled={btnDisabled} type="submit">
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
      <aside className={classes.aside}>
        
        <p>
          Your journey starts here. I would love to hear more about you and your
          photo request. Please take your time and send me as much information
          as possible about you and your future photo session. I will make sure
          to provide you with all you need for you photo shoot, including
          package pricing and preparation details. See you soon!
        </p>
      </aside>
    </section>
  );
}
