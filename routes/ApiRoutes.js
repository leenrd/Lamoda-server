const express = require("express");
const Products = require("../models/DbModels");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.description ||
      !req.body.imageName ||
      !req.body.imageAlt ||
      !req.body.price ||
      !req.body.inStock ||
      !req.body.tags
    ) {
      return res.status(400).send({ message: "Send all required fields!" });
    }
    const newProd = {
      name: req.body.name,
      description: req.body.description,
      imageName: req.body.imageName,
      imageAlt: req.body.imageAlt,
      price: req.body.price,
      inStock: req.body.inStock,
      tags: req.body.tags,
    };

    const cloth = await Products.create(newProd);

    return res.status(201).send(cloth);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const clothes = await Products.find({});

    return res.status(200).json({
      count: clothes.length,
      data: clothes,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ msg: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const clothe = await Products.findById(id);
    return res.status(200).send(clothe);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ msg: error.message });
  }
});

module.exports = router;
