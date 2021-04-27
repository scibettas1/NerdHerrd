import React, { useContext, useEffect, useState } from "react";
import UserContext from "../utils/UserContext";
import axios from "axios";
import YugiohCard from "../components/yuigiohCard";
import PokemonCard from "../components/PokemonCard";
import MtgCard from "../components/mtgCard";
import API from "../utils/API";
import { Modal, Button, Form } from 'react-bootstrap';
import Banner from "../components/Banner";

function Search() {
  const user = useContext(UserContext);
  const [search, setSearch] = useState("Charizard");
  const [yCards, setYCards] = useState([]);
  const [pCards, setPCards] = useState([]);
  const [mCards, setMCards] = useState([]);
  const [searchType, setSearchType] = useState("Pokemon");
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState("");
  const [descr, setDescr] = useState("");
  const [avail, setAvail] = useState("Yes");
  const [postData, setPostData] = useState("");
  const [yImage, setYImage] = useState("");
  const [ySet, setYSet] = useState("");
  const [yugiohSearch, setYugiohSearch] = useState([])
  

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    axios
    .get(`https://db.ygoprodeck.com/api/v7/cardinfo.php`)
    .then(res => setYugiohSearch(res.data.data))
  })


  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!search) {
      return;
    }

    // yugioh
    if (searchType === "Yugioh!") {
      let lowerSearch = search.toLocaleLowerCase();
      if (search && yugiohSearch) {
        let c = yugiohSearch.map((x) => JSON.stringify(x.name));
        let temp = c
          .filter((card) => card.toLocaleLowerCase().includes(lowerSearch) === true)
          .map((x) => JSON.parse(x));
        console.log(c)
        console.log(temp)
        let final = yugiohSearch.filter(item => temp.includes(item.name))

        setYCards(final);
        setPCards(null);
        setMCards(null)
      }
      
      // axios
      //   .get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${search}`)
      //   .then((res) => {
      //     setYCards(res.data.data);
      //     setPCards(null);
      //     setMCards(null)
      //     console.log(res.data.data);
      //   });
    }


    //pokemon
    if (searchType === "Pokemon") {
      axios
        .get(`https://api.pokemontcg.io/v2/cards?q=name:*${search}*`)
        .then((res) => {
          setPCards(res.data.data);
          setMCards(null)
          setYCards(null)
          console.log(res.data.data);

        });
    }
    // console.log(pCards);

    //mtg
    if (searchType === "MTG") {
      axios
        .get(`https://api.magicthegathering.io/v1/cards?name=${search}`)
        .then((res) => {
          setMCards(res.data.cards);
          setPCards(null)
          setYCards(null)
          console.log(res.data.cards);
        });
    }


  };

  const addCard = (event) => {
    handleClose();
    let data = JSON.parse(postData);
    
    if (avail === "Yes") {
      data.available = true
    }
    else {
      data.available = false
    }
    data.price = price;
    data.description = descr;
    
    if (data.category === "Yugioh!") {
      data.image = yImage;
      data.attributes.set = ySet;
    }

    console.log(data)
    API.addCard(user.mongo._id, data).then(res => console.log(res));
    refreshUsers();
  }

  const refreshUsers = () => {
    API.getUser(user.email).then(res => {
      user.mongo = res.data[0]
    })

  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div>
      <Banner pageTitle="Search" />
      <div className="container">
        <h1 className="text-center">Search For Your Cards</h1>

        <form className="search container">
          <div className="row">
            <div className="col">
              <label htmlFor="type">Choose a brand:</label>
              <select id="type" className="form-control" value={searchType}
                onChange={(event) => setSearchType(event.target.value)
                }>
                <option name="Yugioh">Yugioh!</option>
                <option name="Pokemon" >Pokemon</option>
                <option name="MTG">MTG</option>
              </select>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="card">Search Term:</label>
                <input
                  value={search}
                  onChange={handleInputChange}
                  name="card"
                  list="term"
                  type="text"
                  className="form-control"
                  placeholder="Type in a search term to begin"
                  id="card"
                />
              </div>
            </div>
            <div className="col">
              <button onClick={handleFormSubmit} type="button" className="btn btn-primary margin-top">
                Search Cards
              </button>
            </div>
          </div>
        </form>
        <div className="renderCards container">
          <div className="row">
          {yCards &&
            yCards.map((card) => {
              return (
                <div key={card.id} className="col-6">
                <YugiohCard
                  key={card.id}
                  id={card.id}
                  name={card.name}
                  type={card.type}
                  attack={card.attack}
                  defense={card.defense}
                  level={card.level}
                  race={card.race}
                  attribute={card.attribute}
                  image={card.card_images[0].image_url_small}
                  initImage={card.card_images[0].id}
                  imageSet={card.card_images}
                  sets={card.card_sets}
                  setYSet={setYSet}
                  setYImage={setYImage}
                  initSet={ card.card_sets ? `${card.card_sets[0].set_name} | ${card.card_sets[0].set_rarity}` : ""}
                  openModal={handleShow}
                  addCard={addCard}
                  postData={setPostData}
                  searchType={searchType}
                  cardData={JSON.stringify({
                    id: card.id,
                    name: card.name,              
                    category: searchType,
                    attributes: {
                      attack: card.attack,
                      type: card.type,
                      defense: card.defense,
                      level: card.level,
                      race: card.race,
                      attribute: card.attribute
                    }
                  })}
                >
                </YugiohCard>
                </div>
              );
            })}
            </div>

          <div className="row">
            {pCards &&
              pCards.map((pCard) => {
                return (
                  <div key={pCard.id} className="col-6">
                    <PokemonCard
                      key={pCard.id}
                      name={pCard.name}
                      types={pCard.types}
                      subtypes={pCard.subtypes}
                      supertype={pCard.supertype}
                      hp={pCard.hp}
                      rarity={pCard.rarity}
                      damage={pCard.attacks}
                      weakness={pCard.weaknesses}
                      image={pCard.images.small}
                      openModal={handleShow}
                      addCard={addCard}
                      postData={setPostData}
                      searchType={searchType}
                      cardData={JSON.stringify({
                        id: pCard.id,
                        name: pCard.name,
                        category: searchType,
                        image: pCard.images.small,
                        attributes: {
                          types: pCard.types,
                          subtypes: pCard.subtypes,
                          supertype: pCard.supertype,
                          hp: pCard.hp,
                          rarity: pCard.rarity,
                          damage: pCard.attacks,
                          weakness: pCard.weaknesses
                        }
                      })}
                    >
                    </PokemonCard>
                  </div>
                )
              })}
          </div>

          <div className="row">
            {mCards &&
              mCards.map((mCard) => {
                return (
                  <div className="col-6">
                    <MtgCard
                      key={mCard.id}
                      name={mCard.name}
                      image={mCard.imageUrl}
                      colors={mCard.colors}
                      subtypes={mCard.subtypes}
                      supertype={mCard.supertypes}
                      set={mCard.set}
                      manna={mCard.manaCost}
                      rarity={mCard.rarity}
                      text={mCard.text}
                      openModal={handleShow}
                      addCard={addCard}
                      postData={setPostData}
                      searchType={searchType}
                      cardData={JSON.stringify({
                        id: mCard.id,
                        name: mCard.name,
                        category: searchType,
                        image: mCard.imageUrl,
                        attributes: {
                          colors: mCard.colors,
                          subtypes: mCard.subtypes,
                          supertype: mCard.supertypes,
                          set: mCard.set,
                          manna: mCard.manaCost,
                          rarity: mCard.rarity,
                          text: mCard.text,
                        }
                      })}
                    >
                    </MtgCard>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Price</Form.Label>
            <Form.Control as="textarea" value={price} onChange={(e) => setPrice(e.target.value)} rows={2} />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" value={descr} onChange={(e) => setDescr(e.target.value)} rows={2} />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Available?</Form.Label>
            <Form.Control onChange={(e) => setAvail(e.target.value)} as="select">
              <option >Yes</option>
              <option>No</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addCard}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Search;
