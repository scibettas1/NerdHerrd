const db = require("../models");
const moongoose = require("mongoose");
const mongojs = require("mongojs");

const pushToProducts = (data) => {
    db.User.updateOne(
    { displayName: data.proposedTo },
    {
        $push: { products: {$each: data.proposedByProducts} }
    }
  )
  .then(res => console.log(res))
    .catch(err => console.error(err));
}

const pullByProducts = (data) => {
  db.User.updateOne(
    { displayName: data.proposedBy },
    {
        $pullAll: { products: data.proposedByProducts }
    }
  )
  .then(res => console.log(res))
  .catch(err => console.error(err));
}

const pullToProducts = (data) => {
  db.User.updateOne(
    { displayName: data.proposedTo },
    {
        $pullAll: { products: data.proposedToProducts }
    }
  )
  .then(res => console.log(res))
  .catch(err => console.error(err));
}

const verifyAccept = (data) => {
  const uuids = []
  data.proposedByProducts.map(item => uuids.push(item.uuid))
  data.proposedToProducts.map(item => uuids.push(item.uuid))
  db.Trade.updateMany(
    {
      status: "pending",
      $or: [
        { "proposedByProducts.uuid": { $in: uuids } },
        { "proposedToProducts.uuid": { $in: uuids } },
      ],
    },
    {
      $set: {
        status: "canceled",
      },
    }
  )
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
}

// Defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
    db.User.find({}).select("_id displayName products.category products.name").then(function (dbUser) {
      res.json(dbUser);
    });
  },
  findById: function (req, res) {
    db.User
    .findOne(
      {'displayName': req.params.id}
  )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByEmail: function (req, res) {
    db.User
    .find(
      {'email': req.params.id}
  )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
    update: function(req, res) {
      db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  executeTrade: function(req, res) {
    db.User.updateOne(
      { displayName: req.body.proposedBy },
      {
          $push: { products: {$each: req.body.proposedToProducts} }
      })
      .then(data => {
            pushToProducts(req.body);
            pullByProducts(req.body);
            pullToProducts(req.body);
            verifyAccept(req.body);
      })
  }
}
  // update: function (req, res) {
  //   console.log(req.body)
  //   db.User.replaceOne(
  //     { "products.uuid": req.body.proposedToProducts.uuid },
  //     { "products": req.body.proposedByProducts },
  //     (error, data) => {
  //       if (error) {
  //         res.send(error);
  //       } else {
  //         res.send(data);
  //       }
  //     },
  //   )
  // }

