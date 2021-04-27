import React, { useState } from "react";
import { Link, useHistory} from "react-router-dom";
import API from "../utils/API";
import { auth, signInWithGoogle, generateUserDocument } from "../utils/firebase";
import Banner from "../components/Banner";
import "../styles/style.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, { displayName });
      API.createUser({
        displayName: displayName,
        email: email
      }).then(res => { console.log(res.data) });
    }
    catch (error) {
      setError('Error Signing up with email and password');
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  const handleSC = (event) => {

    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }

  }

  return (
    <div>
      <Nav/>
      <Banner pageTitle="Sign Up" />
      <div className="container">
        <br />
          <div className="card shadow spacing">
            {error !== null && (
              <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
                {error}
              </div>
            )}
            <form>
              <div className="row">
              <div className="col-md-4">
              <label htmlFor="displayName" className="block">
                Display Name: 
              </label>
              <input
                type="text"
                className="my-1 p-1 w-full "
                name="displayName"
                value={displayName}
                placeholder="E.g: Faruq"
                id="displayName"
                onChange={event => onChangeHandler(event)}
                onKeyPress={event => handleSC(event)}

              /></div>
              <div className="col-md-4">
              <label htmlFor="userEmail" className="block">
                Email: 
              </label>
              <input
                type="email"
                className="my-1 p-1 w-full"
                name="userEmail"
                value={email}
                placeholder="E.g: faruq123@gmail.com"
                id="userEmail"
                onChange={event => onChangeHandler(event)}
              /></div>
              <div className="col-md-4">
              <label htmlFor="userPassword" className="block">
                Password: 
              </label>
              <input
                type="password"
                className="mt-1 mb-3 p-1 w-full"
                name="userPassword"
                value={password}
                placeholder="Your Password"
                id="userPassword"
                onChange={event => onChangeHandler(event)}
              /></div></div>
              <div className="row">

              <button
                className="btn btn-primary"
                onClick={event => {
                  createUserWithEmailAndPasswordHandler(event, email, password);
                  history.push("/")
                }}
              >
                
                  Sign up
           

              </button></div>
            </form>
            <p className="text-center my-3">or</p>
            <div className="row">
            <button
              onClick={() => {
                try {
                  signInWithGoogle();
                } catch (error) {
                  console.error("Error signing in with Google", error);
                }
              }}
              className="btn btn-primary"
            >
              Sign In with Google
            </button></div>
            <p className="text-center my-3">
              Already have an account?{" "}
              <Link className="link" to="/">
                Sign in here
              </Link>{" "}
            </p>
          </div>
          <br />
        </div>
      <Footer />
    </div>
  );
};

export default SignUp;