const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema, "PomodoroUsers");

app.post("/signup", async (req, res) => {
    try {
        console.log(req.body);
        const userData = req.body;
        await User.insertMany(userData);
        console.log("Successfully signed up");
        res.json({ status: "success", msg: "signup successful" });
    } catch (err) {
        console.log("Not signed up", err);
        res.json({ status: "error" });
    }
});

app.post("/login", async (req, res) => {
    try {
        console.log(req.body);

        const userArr = await User.find({ email: req.body.email });

        if (userArr.length > 0) {
            if (req.body.password === userArr[0].password) {
                console.log("login successful");
                const token = jwt.sign(
                    {
                        email: req.body.email,
                        password: req.body.password,
                    },
                    "jwt_secret_key"
                );

                res.json({
                    status: "success",
                    msg: "login successful",
                    data: userArr,
                });
            } else {
                console.log("password incorrect");
                res.json({ status: "error", msg: "password incorrect" });
            }
        } else {
            console.log("email doesn't exist");
            res.json({ status: "error", msg: "email doesn't exist" });
        }
    } catch (err) {
        console.log("Not logged in", err);
        res.json({ status: "error" });
    }
});

const connectToMDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://sai:honey@cluster0.r8k6sfp.mongodb.net/BRNDB?appName=Cluster0");
        console.log("Successfully connected to MDB");
    } catch (err) {
        console.log("Not connected to MDB", err);
    }
};

connectToMDB();

app.listen(4567, () => {
    console.log("Listening to port 4567");
});
