import React from "react";

//==================Images====================
import logo from "../images/logo74KBblack.png"
//============================================



function Footer() {
    return (
        <footer className="bg-light text-lg-start">

            <div className="container p-4">

                <div className="row">

                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <img src={logo} alt="" className="logo-small" />
                        <p>
                            Your place to meet and trade with other nerds.
                            Currently supporting trades for Pokémon Trading Card Game, Magic: The Gathering, and Yu-Gi-Oh! Trading Card Game. More card series coming soon!
                        </p>
                    </div>
      
                    <div className="col-lg-3 col-md-12 mb-4 mb-md-0"></div>
                    <div className="col-lg-3 col-md-12 mb-4 mb-md-0">
                        <h6 className="mb-0">Resources</h6>

                        <ul className="list-unstyled">
                        <li>
                                <a href="https://www.pokemon.com/" rel="noreferrer" target="_blank" className="text-dark">Pokémon Official Website</a>
                            </li>
                            <li>
                                <a href="https://magic.wizards.com/" rel="noreferrer" target="_blank" className="text-dark">Magic The Gathering Official Website</a>
                            </li>
                            <li>
                                <a href="https://www.yugioh-card.com/en/" rel="noreferrer" target="_blank" className="text-dark">Yu-Gi-Oh! Official Website</a>
                            </li>
                            
                        </ul>
                    </div>

                </div>

            </div>


            <div className="text-center p-3 footer-bg">
                <h6>© 2021 Copyright: Group 5</h6>
            </div>

        </footer>
    )
}

export default Footer;