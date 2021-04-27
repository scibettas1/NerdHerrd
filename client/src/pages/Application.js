import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { store } from 'react-notifications-component';
import UserContext from "../utils/UserContext";
import { socketContext } from "../utils/socketContext";
import Nav from "../components/Nav"
import Footer from "../components/Footer"

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import PasswordReset from "./PasswordReset";

import Search from "./Search";
import Dashboard from "./Dashboard"
import Home from "./Home"
import OtherProfile from "./OtherProfile";
import Trade from "./Trade";
import Messages from "./Messages";

function Application() {
  const user = useContext(UserContext);
  const socket= useContext(socketContext);

  useEffect(() => {
    socket.on("notification", data => {
      console.log("noti received!", "logging data: " + data.sender, data.sentTo, data.type);
      if (data.sentTo === user.displayName) {
          switch(data.type) {
            case "msg":
              store.addNotification({
                title: "New Message!",
                message: ( 
                  <>
                  <p>You have a new message from {data.sender}</p>
                  <a className="noti-link" href="/messages">Go To Messages</a>
                  </>
                 ),
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true,
                  pauseOnHover: true,
                  click: false,
                  showIcon: true
                }
              });
              break;
            case "newTrade":
              store.addNotification({
                title: "New Trade Offer!",
                message: ( 
                  <>
                  <p>You've received a trade offer from {data.sender}</p>
                  <a className="noti-link" href="/">Go To Dashboard</a>
                  </>
                 ),
                type: "info",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true,
                  pauseOnHover: true,
                  click: false,
                  showIcon: true
                }
              });
              break;
            case "accepted":
              store.addNotification({
                title: "Trade Accepted!",
                message: ( 
                  <>
                  <p>{data.sender} has accepted your trade offer!</p>
                  <a className="noti-link" href="/">Go To Dashboard</a>
                  </>
                 ),
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true,
                  pauseOnHover: true,
                  click: false,
                  showIcon: true
                }
              });
              break;
            case "declined":
              store.addNotification({
                title: "Trade Declined.",
                message: ( 
                  <>
                  <p>{data.sender} has declined your trade offer.</p>
                  <a className="noti-link" href="/">Go To Dashboard</a>
                  </>
                 ),
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true,
                  pauseOnHover: true,
                  click: false,
                  showIcon: true
                }
              });
              break;
          }
      }
    });

    return function cleanup() {socket.off("notification")}
  })
 


  return (
    user ?
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/profile/:id">
            <OtherProfile />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route exact path="/messages">
            <Messages />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route>
            <Trade exact path="/trade"/>
          </Route>
        </Switch>
        <Footer />
      </Router>
      :
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Switch>
          <Route exact path="/signUp">
            <SignUp />
          </Route>
          <Route exact path="/signIn">
            <SignIn />
          </Route>
          <Route exact path="/passwordReset">
            <PasswordReset />
          </Route>
        </Switch>
      </Router>
  );
}



export default Application;