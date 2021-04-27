import { React } from "react";
import Carousel from "react-bootstrap/Carousel";
import "../styles/carousel.css";

function YugiohCard(props) {

  props.setYImage(`https://storage.googleapis.com/ygoprodeck.com/pics_small/${props.initImage}.jpg`);
  props.setYSet(props.initSet);

  return (
    <div key={props.id} className="card shadow p-3 mb-5 rounded">
      <div className="row">
        <div className="col-md-6">
          <Carousel controls={true} interval={10000}>
            {props.imageSet &&
              props.imageSet.map((image) => {
                return (
                  <Carousel.Item style={{ textAlign: "center" }}>
                    <img
                      className="d-block img-fluid tradingCard shadow"
                      src={image.image_url_small}
                      alt={image.id}
                    />
                    <Carousel.Caption>
                      <h5 style={{ color: "black", backgroundColor: "white" }}>ID: {image.id}</h5>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
          </Carousel>

        </div>
          {/* <div className="img-container">
            <img alt={props.name} src={props.image} />
             </div> */}
          <div className="content col-6">
            <ul className="ul2">
              <li className="cardInfo">
              <br />
                Choose Image:
                <select
                  onChange={(event) => props.setYImage(`https://storage.googleapis.com/ygoprodeck.com/pics_small/${event.target.value}.jpg`)}
                >
                  {props.imageSet &&
                    props.imageSet.map((image) => {
                      return (
                        <option>
                          {image.id}
                        </option>
                      );
                    })}
                </select>
              </li>
              <li className="cardInfo">
                Name: {props.name}
              </li>
              <li className="cardInfo">
                Type: {props.type}
              </li>
              <li className="cardInfo">
                Attack: {props.attack}
              </li>
              <li className="cardInfo">
                Defense: {props.defense}
              </li>
              <li className="cardInfo">
                Level: {props.level}
              </li>

              <li className="cardInfo">
                Race: {props.race}
              </li>
              <li className="cardInfo">
                Attribute: {props.attribute}
              </li>
              <li className="cardInfo">
                Set:
                <select
                  onChange={(event) => props.setYSet(event.target.value)}
                >
                  {props.sets &&
                    props.sets.map((set) => {
                      return (
                        <option>
                          Name: {set.set_name} | Rarity: {set.set_rarity}
                        </option>
                      );
                    })}
                </select>
                <br /><br />
              </li>
            </ul>
            <button
              onClick={() => {
                props.openModal()
                props.postData(props.cardData);
              }}
              cardData={props.cardData}
              type="button"
              class="btn btn-primary"
            >
              Add
          </button>
          </div>
      </div>
    </div>
  );
}

export default YugiohCard;
