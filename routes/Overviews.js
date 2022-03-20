const express = require("express");
const router = express.Router();
const { Overviews } = require("../models");

router.get("/", async (req, res) => {
    const listOfOverviews = await Overviews.findAll();
    res.json(listOfOverviews);
});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const overview = await Overviews.findByPk(id);
    res.json(overview);
});

router.get("/:userId", async (req, res) => {
    const userId = req.params.userId;
    const overviews = await Overviews.findAll({ where: { UserId: userId } });
    res.json(overviews);
});

router.post("/createOverview", async (req, res) => {
    const newOverview = req.body;
    await Overviews.create(newOverview);
    res.json("created successfully");
});

router.post("/editOverview/:id", async (req, res) => {
    const id = req.params.id;
    const editOverview = req.body;
    await Overviews.update(editOverview, { where: { id: id } });
    res.json("updated successfully");
});

router.put("/deleteOverviews", async (req, res) => {
    await Overviews.destroy({ where: { id: req.body } });
    res.json("deleted successfully");
});

module.exports = router;