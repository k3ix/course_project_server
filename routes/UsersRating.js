const express = require("express");
const router = express.Router();
const { UsersRating } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
    const { OverviewId } = req.body;
    const UserId = req.user.id;
    const { rating } = req.body;

    const ratingExist = await UsersRating.findOne({ where: { OverviewId: OverviewId, UserId: UserId } });
    if (ratingExist) {
        await UsersRating.update({
            rating: rating
        }, { where: { OverviewId: OverviewId, UserId: UserId } });
        res.json("rating updated");
    } else {
        await UsersRating.create({
            rating: rating,
            OverviewId: OverviewId,
            UserId: UserId
        });
        res.json("rating created");
    }
});

module.exports = router;