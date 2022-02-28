const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const { sign } = require('jsonwebtoken');
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
    const listOfUsers = await Users.findAll();
    res.json(listOfUsers);
});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const user = await Users.findByPk(id);
    res.json(user);
});

router.get("/auth", validateToken, (req, res) => {
    res.json(req.user);
});

router.put("/logout", validateToken, async (req, res) => {
    res.json("logged out successfully");
});

router.put("/deleteUsers", async (req, res) => {
    await Users.destroy({ where: { id: req.body } });
    res.json("deleted successfully");
});

router.put("/blockUsers", async (req, res) => {
    await Users.update( { isBlocked: true }, { where: { id: req.body, isBlocked: false } });
    res.json("blocked successfully");
});

router.put("/unblockUsers", async (req, res) => {
    await Users.update( { isBlocked: false }, { where: { id: req.body, isBlocked: true } });
    res.json("unblocked successfully");
});

router.put("/adminUsers", async (req, res) => {
    await Users.update( { isAdmin: true }, { where: { id: req.body, isBlocked: false } });
    res.json("set to admin successfully");
});

router.put("/change-theme", async (req, res) => {
    const { isDark, id} = req.body;
    if (isDark) {
        await Users.update({ theme: "dark" }, { where: {id: id, theme:"light" }})
    } else {
        await Users.update({ theme: "light" }, { where: {id: id, theme:"dark" }})
    }
    res.json("theme changed");
})

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    let user = await Users.findOne({ where: { email: email } });
    if (user) {
        res.json({ error: "Account with this e-mail already exists!"});
    }  else {
        user = await Users.findOne({ where: { username: username } });
        if (user) {
            res.json({ error: "This username is already taken"});
        }  else {
            bcrypt.hash(password, 10).then((hash) => {
                Users.create({
                    username: username,
                    email: email,
                    password: hash,
                    isBlocked: false,
                    isAdmin: false,
                    theme: "light",
                    lang: "en"
                });
                res.json("registered successfully");
            });
        }
    }
});

router.post("/login", async (req, res) => {
    const { nameOrEmail, password } = req.body;
    let user = await Users.findOne({ where: { username: nameOrEmail } });
    if(!user) {
        user = await Users.findOne({ where: { email: nameOrEmail} });
        if(!user) res.json({ error: "User doesn't exist" });
    };

    if(user.isBlocked) {
        res.json({ error: "User is blocked" });
    } else {
        bcrypt.compare(password, user.password).then((equal) => {
            if (!equal) {
                res.json({ error: "Wrong password or email/username" });
            } else {
                const accessToken = sign({ username: user.username, id: user.id }, "authsecret");
                res.json({accessToken});
            }
        });
    }
});

module.exports = router;