const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
require("dotenv").config();

const db = require("./models");

const usersRouter = require("./routes/Users");
app.use("/users", usersRouter);
const tagsRouter = require("./routes/Tags");
app.use("/tags", tagsRouter);
const overviewsRouter = require("./routes/Overviews");
app.use("/overviews", overviewsRouter);
const likesRouter = require('./routes/Likes');
app.use("/likes", likesRouter);
const commentsRouter = require('./routes/Comments');
app.use("/comments", commentsRouter);
const usersRatingRouter = require('./routes/UsersRating');
app.use("/users-rating", usersRatingRouter);

db.sequelize.sync().then(() => {
    server.listen(process.env.PORT || 3001, () => {
        console.log("Server running on port 3001");
    });

    io.on("connection", socket => {
        socket.on("sendComment", (data) => {
            socket.broadcast.emit("sendCommentFromServ", data);
        });

        socket.on("disconnect", () => {
            console.log("User " + socket.id + " disconnected")
        });
    });
});


