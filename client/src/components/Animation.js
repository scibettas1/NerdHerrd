import React from "react";
import "../styles/style.css";
import "../styles/animations.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { gsap } from "gsap";


//==================Images====================

import pika from "../images/pv-2.png";
import yugi from "../images/yugi-main.png";
import mtg from "../images/planeswalker.png";
import card1 from "../images/animate1.png";
import card2 from "../images/animate2.png";
import card3 from "../images/animate3.png";

//============================================


function Animation() {

    if (window.matchMedia('(max-device-width: 480px)').matches)  {
        //character animations
        gsap.from(".pika", { x: -3000 });
        gsap.to(".pika", { rotation: 387, duration: 1, x: "50%" });
        gsap.from(".yugi", { x: -3000 });
        gsap.to(".yugi", { duration: 2, x: -100 });
        gsap.from(".mtg", { x: -3000 });
        gsap.to(".mtg", { duration: 2, x: "50%" });

        //card animations
        gsap.from(".card1", { delay: 2, x: 3000 });
        gsap.to(".card1", { delay: 2, rotation: 360, duration: 2, x: -75 , ease: "bounce" });
        gsap.from(".card2", { delay: 3, x: 3000 });
        gsap.to(".card2", { delay: 3, rotation: 360, duration: 2, x: 60, ease: "bounce" });
        gsap.from(".card3", { delay: 4, x: 3000 });
        gsap.to(".card3", { delay: 4, rotation: 360, duration: 2, x: 195, ease: "bounce" });
    } else {
        //character animations
        gsap.from(".pika", { x: -3000 });
        gsap.to(".pika", { rotation: 387, duration: 1, x: "155%" });
        gsap.from(".yugi", { x: -3000 });
        gsap.to(".yugi", { duration: 2, x: "-100" });
        gsap.from(".mtg", { x: -3000 });
        gsap.to(".mtg", { duration: 2, x: 400 });

        //card animations
        gsap.from(".card1", { delay: 2, x: 3000 });
        gsap.to(".card1", { delay: 2, rotation: 360, duration: 2, x: 300, ease: "bounce" });
        gsap.from(".card2", { delay: 3, x: 3000 });
        gsap.to(".card2", { delay: 3, rotation: 360, duration: 2, x: 500, ease: "bounce" });
        gsap.from(".card3", { delay: 4, x: 3000 });
        gsap.to(".card3", { delay: 4, rotation: 360, duration: 2, x: 700, ease: "bounce" });
    }

    gsap.to(".animation-box", { delay: 8, duration: 1, width: "200%" })
    gsap.to(".animation-box", { delay: 8, duration: 1, opacity: 0 })

    return (
        <div className="animation-box">
            <div className="yugi"><img className="img-fluid shadow-png" src={yugi} alt="" /></div>
            <div className="pika"><img className="img-fluid shadow-png" src={pika} alt="" /></div>
            <div className="mtg"><img className="img-fluid shadow-png" src={mtg} alt="" /></div>
            <div className="card1"><img className="img-fluid shadow-png" src={card1} alt="" /></div>
            <div className="card2"><img className="img-fluid shadow-png" src={card2} alt="" /></div>
            <div className="card3"><img className="img-fluid shadow-png" src={card3} alt="" /></div>
        </div>
    );
}


export default Animation;