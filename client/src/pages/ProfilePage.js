import React, { useContext, useEffect, useState, useCallback } from "react";
import UserContext from "../utils/UserContext";
import { storage } from "../utils/firebase";
import API from "../utils/API";
import MyCard from "../components/MyCard";
import ProfileBanner from "../components/ProfileBanner";
import { Modal, Button, Form } from "react-bootstrap";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const ProfilePage = () => {
  // updating products
  const [show, setShow] = useState(false);
  const [confirm, setConfirm]= useState(false);
  const [price, setPrice] = useState("");
  const [descr, setDescr] = useState("");
  const [avail, setAvail] = useState("Yes");
  const [uuid, setuuid] = useState("");
  const [modalSource, setModalSource] = useState("");
  const [toDelete, setDelete]= useState("");

  // cropping an iamge
  const [tempImg, setTempImg] = useState({});
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [downloaded, setDownloaded] = useState(false);

  //uploading image to FB
  const [imageAsFile, setImageAsFile] = useState("");
  const [finalImage, setFinalImage] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState({ imgUrl: "" });
  const [profilePic, setProfilePic] = useState("");
  // const [reRender, setReRender] = useState(false);

  const user = useContext(UserContext);
  const { displayName, email, uid } = user;

  const handleFile = (e) => {
    // console.log(e);
    const img = e.target.files[0];
    // console.log(img);
    setTempImg(URL.createObjectURL(img));
    setImageAsFile(img);
  };

  const handleFile2 = (e) => {
    const img = e.target.files[0];
    // console.log(img);
    setFinalImage(img);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const generateImg = async () => {
    try {
      const a = await getCroppedImg(tempImg, croppedAreaPixels, rotation);
      //const tempFile = new File([a], "uhhh", { type: "image/jpeg" });
      // console.log(a);
      setCroppedImage(a);
      setDownloaded(true);
      // console.log(tempFile)
    } catch (e) {
      console.error(e);
    }
  };

  const handleFireBaseUpload = (e) => {
    e.preventDefault();
    handleClose();
    console.log("start of upload");

    const uploadTask = storage.ref(`/images/${user.mongo._id}`).put(finalImage);

    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref("images")
          .child(user.mongo._id)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setImageAsUrl((prevObject) => ({
              ...prevObject,
              imgUrl: fireBaseUrl,
            }));
          });
      }
    );
    // window.location.reload();
  };

  // YOU NEED TO STORE THE IMAGE AS THE ACTUAL FILENAME W/ THEIR ID ATTACHED
  // WHEN STORING, SEND THE SAME INFO TO MONGO
  // SO WHEN CALLED, YOU CAN USE MONGO TO INFER TO ROUTE FOR THE IMAGE

  useEffect(() => {
    storage
      .ref("images")
      .child(user.mongo._id)
      .getDownloadURL()
      .then((fireBaseUrl) => {
        console.log(fireBaseUrl);
        setProfilePic(fireBaseUrl);
      });
  }, [user.mongo._id, imageAsUrl]);

  const handleClose = () => {
    setConfirm(false);
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const updateCard = (event) => {
    handleClose();
    let newAvail;

    if (avail === "Yes") {
      newAvail = true;
    } else {
      newAvail = false;
    }

    const data = {
      available: newAvail,
      price: price,
      description: descr,
      uuid: uuid,
    };

    console.log(data);
    API.updateCard(user.mongo._id, data).then((res) => window.location.reload());
  };

  function confirmDelete(uuid) {
    setDelete(uuid);
    setConfirm(true);
  }

  function verifyTrades(id, uuid) {
    const data= {
      uuid: uuid
    }
    API.verifyTrades(data).then(res => deleteCard(id, uuid))
  }

  function deleteCard(id, uuid) {
    console.log(id, uuid);
    API.deleteCard(id, uuid).then((res) => window.location.reload());
  }

  function updatePicButton() {
    setModalSource("profilePic")
    handleShow();
  }

  return (
    <div>
      <ProfileBanner
        pageTitle={displayName}
        fbImage={profilePic}
        email={email}
        userId={uid}
        updatePicButton={updatePicButton}
      />
      <div className="container">
        <div className="row">
          {user &&
            user.mongo.products.map((card) => {
              return (
                <div key={card.uuid} className="col-6">
                  <MyCard
                    key={card.uuid}
                    uuid={card.uuid}
                    name={card.name}
                    category={card.category}
                    description={card.description}
                    available={card.available}
                    image={card.image}
                    price={card.price}
                    attributes={card.attributes}
                    openModal={handleShow}
                    // addCard={updateCard}
                    setuuid={setuuid}
                    setModalSource={setModalSource}
                    // deleteCard={deleteCard}
                  ></MyCard>
                  <Button
                    type="button"
                    className="btn btn-primary delBtn-margin"
                    onClick={() => confirmDelete(card.uuid)}
                  >
                    Delete
                  </Button>
                </div>
              );
            })}
        </div>

        <Modal show={confirm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you wish to delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>If this card is present in any pending trades, the trade will be canceled.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => verifyTrades(user.mongo._id, toDelete)}>
            Delete Card
          </Button>
        </Modal.Footer>
      </Modal>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <div>
            {modalSource === "card" ? (
              <div>
                <Modal.Header closeButton>
                  <Modal.Title>Update Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      rows={2}
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={descr}
                      onChange={(e) => setDescr(e.target.value)}
                      rows={2}
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Available?</Form.Label>
                    <Form.Control
                      onChange={(e) => setAvail(e.target.value)}
                      as="select"
                    >
                      <option>Yes</option>
                      <option>No</option>
                    </Form.Control>
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={updateCard}>
                    Save
                  </Button>
                </Modal.Footer>
              </div>
            ) : (
              <div>
                <Modal.Header closeButton>
                  <Modal.Title>Set Profile Pic</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div>
                    <div>
                      <div>
                        {!imageAsFile && !downloaded ? (
                          <div className="m-3">
                            <div className="mb-2">
                              <h6>Choose the Image</h6>
                              <input type="file" onChange={handleFile}></input>
                            </div>
                          </div>
                        ) : tempImg && !downloaded ? (
                          <div className="m-3">
                            <div className="mb-2">
                              <h6>
                                Once you're done cropping, click "Crop Image".
                              </h6>
                              {/* <button
                                className="btn btn-primary"
                                onClick={generateImg}
                              >
                                Crop Image
                              </button> */}
                            </div>
                            <div
                              style={
                                tempImg.length > 1
                                  ? {
                                      display: "block",
                                      height: "25rem",
                                      margin: "2rem",
                                    }
                                  : { display: "none" }
                              }
                            >
                              <Cropper
                                image={tempImg}
                                crop={crop}
                                rotation={rotation}
                                zoom={zoom}
                                aspect={3 / 3}
                                onCropChange={setCrop}
                                onRotationChange={setRotation}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                                showGrid={true}
                                style={{
                                  containerStyle: {
                                    margin: "12rem 3rem 5rem 3rem",
                                  },
                                }}
                              />
                              <RangeSlider
                                value={zoom}
                                label="Zoom"
                                min={1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={(changeEvent) =>
                                  setZoom(changeEvent.target.value)
                                }
                              />
                            </div>
                          </div>
                        ) : downloaded ? (
                          <div>
                            <div className="mb-3">
                              <h6>Click Download</h6>
                              <span className="ml-2">
                                <a
                                  href={croppedImage}
                                  download="croppedNerdHerd.jpeg"
                                  className="btn btn-danger"
                                  // onClick={() => {
                                  //   setDownloaded(true)
                                  // }}
                                >
                                  Download
                                  <span className={"ml-2"}></span>
                                  <FontAwesomeIcon icon={faDownload} />
                                </a>
                              </span>
                            </div>
                            <div>
                              <h6>
                                Drag your downloaded image over here, and click
                                "Save".
                              </h6>
                              <input type="file" onChange={handleFile2}></input>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <div>
                    { !imageAsFile && !downloaded ? (
                      <div>
                        <div>
                      <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleFireBaseUpload}>
                    Save
                  </Button>
                  </div>
                      </div>
                    ) : tempImg && !downloaded ? (
                      <div>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                      <Button variant="primary" onClick={generateImg}>Crop Image</Button>
                      </div>
                    ) : (
                    <div>
                      <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleFireBaseUpload}>
                    Save
                  </Button>
                  </div>)}
                  </div>
                </Modal.Footer>
                {/* <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleFireBaseUpload}>
                    Save
                  </Button>
                </Modal.Footer> */}
              </div>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ProfilePage;
