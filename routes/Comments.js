const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:overviewId", async (req, res) => {
    const overviewId = req.params.overviewId;
    const comments = await Comments.findAll({ where: { OverviewId: overviewId } });
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