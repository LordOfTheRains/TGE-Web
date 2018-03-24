/**
 * @author Haven Barnes <hab0020@auburn.edu>
 */

const express = require("express");
const User = require("../models").User;
const Item = require("../models").Item;
const CartItem = require("../models").CartItem;
const Order = require("../models").Order;
const Facebook = require("../models").Facebook;
const Credential = require("../models").Credential;

module.exports = function(app, passport) {
  var router = express.Router();

  // Get Shopping Cart
  router.get("/", passport.isLoggedIn, function(req, res, next) {
    CartItem.findAll({
      where: { UserId: req.user.id },
      include: [Item]
    })
      .then(carts => {
        res.status(200).json(carts);
      })
      .catch(function(error) {
        res.status(500).json(error);
      });
  });

  // Add Item Shopping Cart
  router.post("/:itemId", passport.isLoggedIn, function(req, res, next) {
    CartItem.create({
      UserId: req.user.id,
      ItemId: req.params.itemId
    }).then(cart => {
      CartItem.findAll({
        where: { UserId: cart.UserId },
        include: [Item]
      })
        .then(carts => {
          res.status(200).json(carts);
        })
        .catch(function(error) {
          res.status(500).json(error);
        });
    });
  });

  // Delete Item Shopping Cart by CartItem ID
  router.delete("/:itemId", passport.isLoggedIn, function(req, res, next) {
    CartItem.destroy({
      where: {
        UserId: req.user.id,
        id: req.params.itemId
      }
    })
      .then(function(deletedRecords) {
        res.status(200).send(deletedRecords + ' deleted');
      })
      .catch(function(error) {
        res.status(500).json(error);
      });
  });

  app.use("/cart", router);
};
