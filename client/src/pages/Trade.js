import React, { useContext, useEffect, useState } from "react";
import UserContext from "../utils/UserContext";
import { socketContext } from '../utils/socketContext';
import API from "../utils/API";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";

function Trade(props) {
  const user = useContext(UserContext);
  const socket= useContext(socketContext);

  console.log(user)
  const [trade, setTrade] = useState(
    localStorage.getItem("trade")
      ? JSON.parse(localStorage.getItem("trade"))
      : null
  );
  const [tradeItems, setTradeItems] = useState(trade ? trade.tradeItems : null);
  const [tradeUser, setTradeUser] = useState(trade ? trade.user : null)
  const [whoseCards, setWhoseCards] = useState("YourCards");
  console.log(whoseCards)

  const removeFromTrade = (uuid) => {
    console.log(uuid);
    const tempArr = tradeItems.filter((item) => item !== uuid);
    console.log(tempArr);
    setTradeItems(tempArr);
  };

  const addToTrade = (uuid) => {
    setTradeItems([...tradeItems, uuid]);
  };

  const manageWhoseCards = (x) => {
    setWhoseCards(x)
  }

  const submitTrade = () => {
    const theirProducts = tradeUser.products.filter(item => tradeItems.includes(item.uuid))
    const myProducts = user.mongo.products.filter(item => tradeItems.includes(item.uuid))
    // console.log(theirProducts)
    // console.log(myProducts)
    const trade = {
      proposedBy: user.mongo.displayName,
      proposedTo: tradeUser.displayName,
      proposedByProducts: myProducts,
      proposedToProducts: theirProducts,
      status: "pending"

    }

    API.createTrade(trade)
    .then(res => console.log(res))
    socket.emit("event", {user: user.displayName, otherUser: tradeUser.displayName, type: "newTrade"});
  }

  return (
    <div>
      <Banner pageTitle="Make a Trade" />
      {whoseCards && whoseCards === "YourCards" ?
        <div>
          <div className="container">
            <br />
            <h2>Confirm the Cards you want to Trade</h2>
            <button
              className="btn btn-primary"
              onClick={() => {
                manageWhoseCards("MyCards")
              }}
            >
              Continue</button>
          </div>
          <div className="container">
            {trade.user.products &&
              trade.user.products.map((item) => {
                return (
                  <div
                    className="row border mt-3 mb-3 p-3"
                    style={
                      tradeItems.includes(item.uuid)
                        ? { backgroundColor: "#24258242" }
                        : { backgroundColor: "white" }
                    }
                  >
                    <div className="col">
                      <img width={"75px"} alt={item.name} src={item.image} />
                    </div>
                    <h6 className="col">{item.name}</h6>
                    <div className="col">
                      {tradeItems && tradeItems.includes(item.uuid) ? (
                        <button className="btn btn-primary"
                          onClick={() => {
                            removeFromTrade(item.uuid);
                          }}
                        >
                          Remove
                        </button>
                      ) : (
                          <button className="btn btn-other"
                            onClick={() => {
                              addToTrade(item.uuid);
                            }}
                          >
                            Add
                          </button>
                        )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        :
        <div>
          <div className="container">
            <br />
            <h2>Which of Your Cards Will you Offer?</h2>
            <button
              className="btn btn-primary"
              onClick={() => {
                manageWhoseCards("YourCards")
              }}
            >
              Re-Pick Cards You Want</button>&nbsp;&nbsp;
            <Link to="/">
              <button
                className="btn btn-other"
                onClick={() => {
                  submitTrade()
                }}
              >

                Submit
                </button>
            </Link>

          </div>
          <div className="container">
            {user.mongo.products &&
              user.mongo.products.map((item) => {
                return (
                  <div
                    className="row border mt-3 mb-3 p-3"
                    style={
                      tradeItems.includes(item.uuid)
                        ? { backgroundColor: "#24258242" }
                        : { backgroundColor: "white" }
                    }
                  >
                    <div className="col">
                      <img width={"75px"} alt={item.name} src={item.image} />
                    </div>
                    <div className="col">{item.name}</div>
                    <div className="col">
                      {tradeItems && tradeItems.includes(item.uuid) ? (
                        <button className="btn btn-primary"
                          onClick={() => {
                            removeFromTrade(item.uuid);
                          }}
                        >
                          Remove
                        </button>
                      ) : (
                          <button className="btn btn-other"
                            onClick={() => {
                              addToTrade(item.uuid);
                            }}
                          >
                            Add
                          </button>
                        )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      }
    </div>
  );
}

export default Trade;
