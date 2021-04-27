import React, { useState } from "react";
import { auth } from "../utils/firebase";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

//==================Images====================
import pikachu from "../images/pv-2.png"
//============================================

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    }
  };

  const sendResetEmail = event => {
    event.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailHasBeenSent(true);
        setTimeout(() => { setEmailHasBeenSent(false) }, 3000);
      })
      .catch(() => {
        setError("Error resetting password");
      });
  };
  return (
    <div>
      <Nav />
      <Banner pageTitle="Password Reset" />
      <div className="container">
        <div className="row mt-8">
          <div className="col-md-2"></div>
          <div className="card myCard shadow p-3 rounded col-md-4">
            <form action="">
              {emailHasBeenSent && (
                <div className="py-3 bg-green-400 w-full text-white text-center mb-3">
                  An email has been sent to you!
                </div>
              )}
              {error !== null && (
                <div className="py-3 bg-red-600 w-full text-white text-center mb-3">
                  {error}
                </div>
              )}
              <div className="row">
                <label htmlFor="userEmail" className="w-full block">
                  Email:
                </label>
                <input
                  type="email"
                  name="userEmail"
                  id="userEmail"
                  value={email}
                  placeholder="Input your email"
                  onChange={onChangeHandler}
                  className="mb-3 w-full px-1 py-2"
                /></div>
              <div className="row">
                <button
                  className="btn btn-primary"
                  onClick={event => {
                    sendResetEmail(event);
                  }}
                >
                  Send me a reset link
          </button></div>
            </form>
            <br /><br />
            <Link
              to="/"
              className="text-center block"
            >
              &larr; back to sign in page
        </Link>
          </div>
          <img src={pikachu} alt="excited pikachu" className="pika"/>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PasswordReset;