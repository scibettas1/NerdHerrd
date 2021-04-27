import React, { useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faCheck } from "@fortawesome/free-solid-svg-icons";
import "../styles/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function MyCard(props) {
  // console.log(Object.entries(props.attributes))
  // console.log(props);
  const [interested, setInterested] = useState(false);
  
  return (
      <div>
        <div key={props.id} className="card myCard shadow p-3 rounded"
        style={
          !interested
            ? { backgroundColor: "white" }
            : { backgroundColor: "lightblue" }
        }>
          <div className="row">
            <div className="col-md-4">
              <img className="img-fluid tradingCard shadow" alt={props.name} src={props.image} />
              <div className="row">
                <ul>
                  <li className="cardInfo">
                    <br />
                  Name: {props.name}
                  </li>
                  <li className="cardInfo">
                    Description: {props.description}
                  </li>
                  <li className="cardInfo">
                    Price: ${props.price}
                  </li>
                  <li className="cardInfo">
                    Available: {props.available === true ? "Yes" : "No"}
                  </li></ul></div></div>
            <div className="col-md-8">
              <div className="row catAtt">
                <div className="row bottom-border catAttTitle">
                  Attributes:</div>

                {/* map the attributes dynamically here based on card type */}
                {
                  Object.entries(props.attributes).map(([key, value]) => {
                    switch (key) {
                      case 'types':
                        return <div><p className="attList">Types: </p><ul> {value.map(item => {
                          return (
                            <li className="attList">{item}</li>
                          )
                        })}
                        </ul></div>
                      case 'subtypes':
                        return <div><p className="attList">Subtypes: </p> <ul> {value.map(item => {

                          return (
                            <li className="attList">{item}</li>
                          )
                        })}
                        </ul></div>
                      case 'hp':
                        return <p className="attList">HP: {value}</p>
                      case 'rarity':
                        return <p className="attList">Rarity: {value}</p>
                      case 'manna':
                        return <p className="attList">Manna: {value}</p>
                      case 'damage':
                        return <div><p className="attList">Attacks: </p><ul> {value.map(item => {
                          return (
                            <>
                              <li className="attList">Name: {item.name} | Damage: {item.damage && (item.damage.length) > 1 ? (item.damage) : "N/A"}</li>
                            </>
                          )
                        })}
                        </ul></div>
                      case 'weakness':
                        return <div><p className="attList">Threats: </p><ul>{value.map(item => {
                          return (
                            <>
                              <li className="attList">Type: {item.type}</li>
                              <li className="attList">Value: {item.value && (item.value.length) > 1 ? (item.value) : "N/A"}</li>
                            </>
                          )
                        })}
                        </ul></div>
                      case 'colors':
                        return <div> {value.map(item => {
                          return (
                            <p className="attList">Color: {item}</p>
                          )
                        })}
                        </div>
                      case 'set':
                        return <p className="attList">Set: {value}</p>
                      case 'type':
                        return <p className="attList"> Type: {value}</p>
                      case 'level':
                        return <p className="attList">Level: {value}</p>
                      case 'race':
                        return <p className="attList">Race: {value}</p>
                      case 'attribute':
                        return <p className="attList">Attribute: {value}</p>
                      default:
                        return null;
                    }
                  })
                }
              </div>
            </div>
          </div>
        </div>
        {props.profileType && !interested ? (
          <button
            onClick={() => {
              props.addToTrade(props.uuid);
              setInterested(true);
            }}
            // cardData={props.cardData}
            type="button"
            className="btn btn-primary"
          >
            I'm Interested
          </button>
        ) : props.profileType && interested ? (
          <div>
            <Badge pill variant="success" style={{cursor: "pointer"}}>
              Added
              <span className={"ml-2"}></span>
              <FontAwesomeIcon icon={faCheck} />
            </Badge>
            <Badge
              pill
              variant="danger"
              style={{cursor: "pointer"}}
              onClick={() => {
                props.removeFromTrade(props.uuid);
                setInterested(false);
              }}
            >
              {/* Undo
            <span className={"ml-2"}></span> */}
              <FontAwesomeIcon icon={faUndo} />
            </Badge>
          </div>
        ) : (
          ""
        )}
        {!props.profileType && (
          <button
            onClick={() => {
              props.openModal();
              props.setModalSource("card");
              props.setuuid(props.uuid);
            }}
            // cardData={props.cardData}
            type="button"
            className="btn btn-primary"
          >
            Update
          </button>
        )}
      </div>
  );
}

export default MyCard;
