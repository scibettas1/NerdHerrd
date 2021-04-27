import React, { useContext, useEffect, useState } from "react";
import UserContext from "../utils/UserContext";
// import {auth} from "../utils/firebase";
import API from "../utils/API";
import MyCard from "../components/MyCard";
import { useLocation } from "react-router-dom";
import avatar from "../images/avatar.png";
import { storage } from "../utils/firebase";
// import { Link } from "react-router-dom";
// import CustomLink from "../components/customLink";
import ProfileBanner from "../components/ProfileBanner";

const ProfilePage = () => {
  const location = useLocation();
  let regex = /profile\/[a-z0-9-_]+/gi;
  let x = location.pathname.match(regex);
  x = x[0].split("/")[1];
  console.log(x);

  const [thisUser, setThisUser] = useState({});
  const [fbImage, setFbImage] = useState({})
  const [trade, setTrade] = useState([])
  // const [interested, setInterested] = (false)

  useEffect(() => {
    loadUser();
  }, []);

  function loadUser() {
    API.getProfile(x)
      .then((res) => {
        getFbImage(res.data)
        setThisUser(res.data)
      })
      .catch((err) => console.error(err));
  }


  const getFbImage = (data) => {
    storage
    .ref("images")
    .child(data._id)
    .getDownloadURL()
    .then((fireBaseUrl) => {
      setFbImage(fireBaseUrl)
    });

  }

  if (fbImage) {
    console.log(fbImage);
    // getFirebaseImage()
  }

  const user = useContext(UserContext);
  const { displayName } = thisUser;

  const addToTrade = (uuid) => {
    console.log(uuid);
    setTrade([...trade, uuid]);
  };

  const removeFromTrade = (uuid) => {
    console.log(uuid);
    const tempArr = trade.splice(trade.indexOf(uuid), 1);
    console.log(tempArr);
    setTrade(tempArr);
  };

  const handleChat= () => {
    let arr= [user.displayName.toLowerCase(), displayName.toLowerCase()];
    let sorted= arr.sort();
    let room= `${sorted[0]}-${sorted[1]}`;
    console.log(room);

    let data= {
      user: user.displayName,
      otherUser: displayName,
      room: room
    }

    API.createChatRoom(data)
    .then(res => console.log(res))
    .catch(err => console.error(err));
  }

  // if (trade.length >= 1) {
  //   console.log(trade);
  // }

  const setLocalTrade = () => {
    let localTrade = { user: thisUser, tradeItems: trade };
    localStorage.setItem("trade", JSON.stringify(localTrade));
  };

  return (
    <div>
    <ProfileBanner
        pageTitle={displayName}
        fbImage={fbImage}
        email={thisUser.email}
        userId={thisUser.displayName}
        handleChat={handleChat}
        setLocalTrade={setLocalTrade}
        // updatePicButton={updatePicButton}
      />
    <div className="mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
      <div className="m-3">
      </div>
      <div className="container">
        <div className="row">
          {thisUser.products &&
            thisUser.products.map((card) => {
            return (
              <div key={card.uuid} className="col-6">
                <MyCard
                  key={card.uuid}
                  uuid={card.uuid}
                  profileType={location.pathname}
                  name={card.name}
                  category={card.category}
                  description={card.description}
                  available={card.available}
                  image={card.image}
                  price={card.price}
                  attributes={card.attributes}
                  addToTrade={addToTrade}
                  removeFromTrade={removeFromTrade}
                ></MyCard>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProfilePage;
