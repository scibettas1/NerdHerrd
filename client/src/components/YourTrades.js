import React from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import UserContext from "../utils/UserContext";
import "./style.css";
import { Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";

function YourTrades(props) {


    return (

        <div 
            style={
                props.id === props.selectedTrade._id ?
                {border: "2px solid green"}
                :
                {border: "1px solid lightgrey"}
            }
            className="card shadow center trade">
            <div>
                <Badge 
                pill variant="success"
                style={{float: "right", cursor: "pointer"}}
                className="m-2"
                onClick={() => {
                    props.setChart(props.tradeObj);
                  }}>
                Analyze It!
                <span className={"ml-2"}></span>
                <FontAwesomeIcon icon={faChartBar} />
                </Badge>
            </div>

            <ul>

                <li>
                    Proposed by: {props.proposedBy}
                    {props.status === "accepted" ? <span className="span" style={{ background: "green", color: "white" }}>Accepted</span> : ""}
                    {props.status === "declined" ? <span className="span" style={{ background: "red", color: "white" }}> Declined </span> : ""}
                    {props.status === "canceled" ? <span className="span" style={{ background: "red", color: "white"}}>Canceled</span> : ""}
                </li>
                <li>
                    Proposed to: {props.proposedTo}
                </li>
                <li>
                    {props.proposedBy}'s products: {props.proposedByProducts}
                </li>
                <li>
                    {props.proposedTo}'s products: {props.proposedToProducts}
                </li>
                <br/>
                {props.status === "pending" ?
                    <>

                        {props.currentUser === props.proposedTo ?
                            <div>
                                <br/>
                                <button
                                    className="btn btn-primary ml-1"
                                    onClick={() => {
                                        props.confirmTrade(props.tradeObj, props.id, props.proposedBy)
                                    }}>
                                    Accept Trade</button>&nbsp;&nbsp;
                                <button
                                    className="btn btn-primary ml-1"
                                    onClick={() => {
                                        props.declineTrade(props.id, props.proposedBy)
                                    }}>
                                    Decline Trade
                                </button>
                            </div> : <><div className="sent"> Sent!</div>
                            <button className="btn btn-primary ml-1" style={{float: "right"}}
                            onClick={() => {
                                props.cancelTrade(props.id)
                            }}>Cancel Trade</button></>
                        }

                    </>
                    : <button
                        className="btn btn-danger deletetrade"
                        onClick={() => { props.deleteTrade(props.id) }}>
                        Delete
                </button>

                }


            </ul>
        </div>
    )
}

export default YourTrades;