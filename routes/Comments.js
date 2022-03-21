const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:itemId", async (req, res) => {
    const itemId = req.params.itemId;
    const comments = await Comments.findAll({ where: { ItemId: itemId } });
    res.json(comments);
});

router.post("/", validateToken, async (req, res) => {
    const comment = req.body;
    const commentInfo = await Comments.create(comment);
    res.json(commentInfo);
});

router.delete("/:id", validateToken, async (req, res) => {
    const id = req.params.id;
    await Comments.destroy({ where: { id: id } });
    res.json("comment deleted successfully");
});

module.exports = router;