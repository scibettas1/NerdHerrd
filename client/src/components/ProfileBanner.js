import React from "react";
import "../styles/style.css";
import { Button } from "react-bootstrap";
import { auth } from "../utils/firebase";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CustomLink from "../components/customLink";
import avatar from "../images/avatar.png";

function ProfileBanner(props) {
  const location = useLocation();

  return (
    <div>
      <div className="banner">
        <div className="container">
          <div className="row">
            <h1 className="pageTitle">{props.pageTitle}</h1>
          </div>
          <div className="row">
            <div className="col-md-5">
              <img
                className="profile"
                src={
                  props.fbImage && props.fbImage.length ? props.fbImage : avatar
                }
                alt="profile"
              ></img>
            </div>
            <div className="col-md-7 profileInfo">
              <div className="row">
                {location.pathname === "/profile" ? (
                  <>
                    <Button
                      className="sign-outBtn mr-2"
                      onClick={() => {
                        props.updatePicButton();
                      }}
                    >
                      Update Profile Pic
                    </Button>
                    <Link to="/">
                      <Button
                        className="btn btn-primary sign-outBtn"
                        onClick={() => {
                          auth.signOut();
                        }}
                      >
                        Sign Out
                      </Button>
                    </Link>
                  </>
                ) : location.pathname === "/" ? (
                  <>
                    <Link to="/">
                      <Button
                        className="btn btn-primary sign-outBtn"
                        onClick={() => {
                          auth.signOut();
                        }}
                      >
                        Sign Out
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <CustomLink
                      to="/messages"
                      children={
                        <button
                          onClick={props.handleChat}
                          className="btn btn-primary mr-2"
                        >
                          Chat
                        </button>
                      }
                    />

                    <Link
                      to="/trade"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <button
                        className="btn btn-other"
                        onClick={props.setLocalTrade}
                      >
                        Propose Trade
                      </button>
                    </Link>
                  </>
                )}
              </div>
              <div className="row mt-3">
                <h5>{props.email}</h5>
              </div>
              <div className="row">
                <h5>ID: {props.userId}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileBanner;
