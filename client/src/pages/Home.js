import React from "react";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Nav from "../components/Nav"
import Section1 from "../components/Section1";
import Section2 from "../components/Section2";
import WorksCited from "../components/WorksCited"
import "../styles/animations.css";

// =================Images=================
import mtg from "../images/mtg.png"
import poke from "../images/poke.png"
import yugi from "../images/yugioh2.png"
// ========================================

//animation is currently in testing

function Home() {

    return (
    <div>
            <Nav />
            <Hero/>
            <Section1 series="Pokémon Trading Card Game" image={poke} alt="pokemon card back" link="https://en.wikipedia.org/wiki/Pok%C3%A9mon_Trading_Card_Game" cite="1" anchor="#1"
            description="The Pokémon Trading Card Game, abbreviated to PTCG or Pokémon TCG, is a collectible card game, based on Nintendo's Pokémon franchise of video 
            games and anime, first published in October 1996 by Media Factory in Japan (One Month after Bandai Pokemon Carddass Part 1 Green and Part 2 red, September 
            1996 - which although is not part of the TCG, is regarded to be the first Pokemon Card set released). In the US, it was initially published by Wizards of 
            the Coast; Nintendo eventually transferred the rights to The Pokémon Company which has published the game since June 2003. In 2016, it was the year's 
            top-selling toy in the strategic card game subclass. In 2017, it had an 82% share of Europe's strategic card game market. As of March 2020, the game 
            has sold over 30.4 billion cards worldwide." />
            <Section2 series="Magic: The Gathering" image={mtg} alt="magic the gathering card back" link="https://en.wikipedia.org/wiki/Magic:_The_Gathering" cite="2" anchor="#2"
            description="Magic: The Gathering (colloquially known as Magic or MTG) is a collectible and digital collectible card game created by Richard Garfield. 
            Released in 1993 by Wizards of the Coast (now a subsidiary of Hasbro), Magic was the first trading card game and has approximately thirty-five million 
            players as of December 2018,and over twenty billion Magic cards produced in the period from 2008 to 2016, during which time it grew in popularity." />
            <Section1 series="Yu-Gi-Oh! Trading Card Game" image={yugi} alt="yugioh card back" link="https://en.wikipedia.org/wiki/Yu-Gi-Oh!_Trading_Card_Game" cite ="3" anchor="#3"
            description="The Yu-Gi-Oh! Trading Card Game[a] is a Japanese collectible card game developed and published by Konami. It is based on the fictional 
            game of Duel Monsters created by manga artist Kazuki Takahashi, which appears in portions of the manga franchise Yu-Gi-Oh! (under the name of 'Magic and Wizards'), 
            and is the central plot device throughout its various anime adaptations and spinoff series." />
            <WorksCited/>
            <Footer />
    </div>
    );
}

export default Home;