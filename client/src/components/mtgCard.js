import React from "react";

function mtgCard(props) {
  return (
    <div key={props.id} className="card shadow p-3 mb-5 rounded">
      <div className="row">
        <div className="col-md-6">
          <img className="img-fluid tradingCard shadow" alt={props.name} src={props.image} />
        </div>
        <div className="content col-md-6">
          <ul className="ul2">
            <li className="cardInfo">
            <br />
              Name: {props.name}
            </li>
            <li className="cardInfo">
              Colors:
            {/* {props.colors &&
              props.colors.map((color) => {
                return <>{color}</>;
              })} */}

              {props.colors && props.colors.length > 1 &&
                props.colors.map((color, index) => {
                  index = + index
                  return index === (props.colors.length - 1) ? <span>{color}</span> : <span>{color},&nbsp;</span>
                })}
              {props.colors && props.colors.length === 1 &&
                props.colors.map((color) => {
                  return <span>{color}</span>
                })}
            </li>
            <li className="cardInfo">
              Subtypes:{" "}
              {props.subtypes &&
                props.subtypes.map((subtype) => {
                  return <>{subtype}</>;
                })}
            </li>
            <li className="cardInfo">
              Supertype:{" "}
              {props.supertypes &&
                props.supertypes.map((supertype) => {
                  return <>{supertype}</>;
                })}
            </li>

            <li className="cardInfo">
              Set: {props.set}
            </li>
            <li className="cardInfo">
              Rarity:
            {props.rarity}
            </li>
            <li className="cardInfo"> 
              Manna Cost: {props.manna}
            </li>
            <li className="cardInfo">
              Description: {props.text}
            </li>
          </ul>
          <br />
          <button
            // onClick={props.openModal}
            onClick={() => {
              props.openModal()
              props.postData(props.cardData);
            }}
            cardData={props.cardData}
            type="button"
            className="btn btn-primary"
          >
            Add
        </button>
        </div>
      </div>
    </div>
  );
}

export default mtgCard;