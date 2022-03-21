const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
    const { OverviewId } = req.body;
    const UserId = req.user.id;

    const liked = await Likes.findOne({ where: { OverviewId: OverviewId, UserId: UserId } });
    if (liked) {
        await Likes.destroy({ where: { OverviewId: OverviewId, UserId: UserId } });
        res.json({ liked: false });
    } else {
        await Likes.create({ OverviewId: OverviewId, UserId: UserId });
        res.json({ liked: true });
    }
});

module.exports = router;