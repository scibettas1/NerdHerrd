import React from "react";
import "../styles/style.css";
import "../styles/animations.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from "../components/SignIn";
import Animation from "../components/Animation";
import { gsap } from "gsap";


//==================Images====================
import logo from "../images/logo74KB.png"
//============================================

function Hero() {

  gsap.to(".home-box", { delay: 10, duration: 2, opacity: 1 });

  return (
    <div>
      <div className="hero">
        <Animation/>
        <div className="home-box">
          <div className="row">
            <div className="col-md-9">
              <img src={logo} alt="nerd herred logo" className="logo"/>
              <h1>Trading Community</h1>
              <br /><br /><br /><br />
              <h3>Your place to meet and trade with other nerds.</h3>
              <h5>Currently supporting trades for Pokémon Trading Card Game, Magic: The Gathering, and Yu-Gi-Oh! Trading Card Game. More card series coming soon!</h5>
            </div>
            <div className="col-md-3">
              <div className="card sign-inCard" style={{ width: "18rem" }}>
                <div className="card-body">
                  <SignIn />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;