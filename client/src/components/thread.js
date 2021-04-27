import React, { useState } from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faCheckCircle,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

function Thread(props) {
  let subject = props.subject;
  let content;
  const [edit, setEdit] = useState(false);
  const [newSubject, setSubject] = useState(null);

  const style = {
    fontFamily: "Courier",
    fontSize: "20px",
    marginLeft: "5px",
  };

  const data = {
    name: props.name,
    subject: newSubject === null ? subject : newSubject,
    room: props.room,
  };

  const handleClick = (e) => {
    if (!edit) {
      setEdit(true);
    } else {
      setEdit(false);
      props.update(newSubject, data.room);
    }
  };

  const handleChange = (e) => {
    setSubject(e.target.value);
  };

  if (!edit) {
    content = (
      <span id={`${props.name}-sub`} style={style}>
        {newSubject === null ? subject : newSubject}
        <FontAwesomeIcon
          onClick={(e) => handleClick(e)}
          id={`${props.name}-icon`}
          icon={faEdit}
        />
      </span>
    );
  } else {
    content = (
      <>
        <input
          onChange={(e) => handleChange(e)}
          value={newSubject === null ? subject : newSubject}
          id={`${props.name}-input`}
        ></input>
        <FontAwesomeIcon
          onClick={(e) => handleClick(e)}
          style={{ marginLeft: "10px" }}
          id={`${props.name}-icon2`}
          icon={faCheckCircle}
        />
      </>
    );
  }

  return (
    <Row style={{ marginLeft: "15px" }}>
      <Col
        style={{
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "lightgray",
        }}
        md={4}
      >
        <h3
          onClick={() => props.fxn(data)}
          style={{
            marginTop: "10px",
            marginLeft: "10px",
            color: "black",
            cursor: "pointer",
          }}
        >
          {props.name}
          {/* <span className="ml-2" /> */}
          <Badge
            pill
            variant="btn btn-primary"
            style={{ float: "right", cursor: "pointer" }}
            // className="ml-2"
            // onClick={() => {
            //   //    console.log("ALERT")
            //   //    console.log(props.tradeObj)
            //   props.setChart(props.tradeObj);
            // }}
          >
            Start a Chat
            <span className={"ml-2"}></span>
            <FontAwesomeIcon id={`${props.name}-icon`} icon={faComment} />
          </Badge>
        </h3>
        <br />
        <h4 id="parent" style={{ marginLeft: "10px" }}>
          Subject: {content}
        </h4>
      </Col>
    </Row>
  );
}

export default Thread;
