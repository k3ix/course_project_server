const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
    const { ItemId } = req.body;
    const UserId = req.user.id;

    const liked = await Likes.findOne({ where: { ItemId: ItemId, UserId: UserId } });
    if(liked){
        await Likes.destroy({ where: { ItemId: ItemId, UserId: UserId } });
        res.json({ liked: false });
    } else{
        await Likes.create({ ItemId: ItemId, UserId: UserId });
        res.json({ liked: true });
    }
});

module.exports = router;