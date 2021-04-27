import React from "react";
import "../styles/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

function Section2(props) {
  const tradingCard = props;

  return (
    <div>
      <div className="container">
        <div className="row tradingCard-margin">
          <div className="col-md-10">
            <h2>{tradingCard.series}</h2>
            <p>{tradingCard.description} <a href={tradingCard.anchor}><cite>[{tradingCard.cite}]</cite></a></p>
            <p><Link className="link" to={tradingCard.link}>Read more on Wikipedia</Link></p>
          </div>
          <div className="col-md-2">
            <img src={tradingCard.image} className="img-fluid tradingCard shadow" alt={tradingCard.alt} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section2;