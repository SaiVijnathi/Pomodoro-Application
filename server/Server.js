const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors({
  origin: ["https://pomodoro-application-zeta.vercel.app"],
//   origin : 'http://localhost:5173',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema, "PomodoroUsers");

const sessionSchema = new mongoose.Schema({
    minutes : {
        type : Number,
        required : true
    },
    seconds : {
        type : Number,
        required :true
    },
    userId : {
        type : String,
        required : true
    }
})

const Session = mongoose.model("session", sessionSchema, "SessionsData");

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
                    token:token,
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

app.post('/postSessionData', async (req,res) => {
    console.log(req.body);
    const count = req.body.count;
    const userId = req.body.userId
    try{
        const minutes = Math.floor(count/60);
        const seconds = count%60;
        const time = {
            minutes, seconds, userId
        }
        console.log("time",minutes,seconds,userId)
        await Session.insertMany(time);
        res.json({status:"Success", msg:"saved mins and secs to DB"});
    }
      catch(err){
        res.json({status:"Failure"});
      }
})

app.post('/getSessionData', async (req,res) => {
    console.log(req.body)
    try{
        const sessionData = await Session.find({userId:req.body.userId});
        console.log(sessionData)
        res.json({status:"Success", msg:"session data retrieved successfully", data: sessionData});
    }catch(err){
        res.json({status:"Failure", msg:"session data is not retrieved"});
    }
})

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
