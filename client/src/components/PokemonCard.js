import React from "react";
import "../styles/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';


function PokemonCard(props) {
  return (
    <div key={props.id} className="card shadow p-3 mb-5 rounded">
      <div className="row">
        <div className="col-md-6">
          <img className="img-fluid tradingCard shadow" alt={props.name} src={props.image} />
        </div>
        <div className="content col-md-6">
          <ul className="ul2">
            {/* <li>
            <strong>Images:</strong>
            <select>
            {props.sets.map && props.sets.map(set => {
              return (<option>{set.set_name} | {set.set_rarity}</option>)
            })}
            </select>
          </li> */}
            <li className="cardInfo">
              <br />
            Name: {props.name}
            </li>
            <li className="cardInfo">
              Types: {props.types}
            </li>
            <li className="cardInfo">
              Subtypes: {props.subtypes}
            </li>
            <li className="cardInfo">
              Supertype: {props.supertype}
            </li>

            <li className="cardInfo">
              HP: {props.hp}
            </li>


            <li className="cardInfo">
              Attacks: {props.damage &&
                props.damage.map((attk) => {
                  return (
                    <div>
                      <ul>
                        <li>
                          {attk.name} | Damage: {attk.damage && (attk.damage.length) < 1 ? "N/A" : (attk.damage)}
                        </li>
                      </ul>
                    </div>
                  );
                })}
            </li>
            <li className="cardInfo">
              Rarity: {props.rarity}
            </li>

            <li className="cardInfo">
              Weakness: {props.weakness &&
                props.weakness.map((weak) => {
                  return (

                    <>
                      {/* Damage: {(attk.weakness.length) < 1 ? "N/A" : (attk.damage) } */}
                      {weak.type} <br /><br />
                    </>

                  );
                })}
            </li>
            {/* <li>
            <strong>Set:</strong> */}
            {/* <select>
            {props.sets.map && props.sets.map(set => {
              return (<option>{set.set_name} | {set.set_rarity}</option>)
            })}
            </select> */}
            {/* </li> */}
          </ul>
            <button
            onClick={() => {
              props.openModal()
              props.postData(props.cardData);
            }}
            cardData={props.cardData}
            type="button" className="btn btn-primary">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
