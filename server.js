const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.json());

app.use(express.static(__dirname));

mongoose.connect("mongodb://admin:password@localhost:27017/userdb?authSource=admin")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });


// User schema
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String
    },

    city: {
        type: String
    }

});


// User model
const User = mongoose.model("User", userSchema);


// POST API
app.post("/api/users", async (req, res) => {

    try {

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            city: req.body.city
        });

        const savedUser = await user.save();

        res.status(201).json({
            message: "User saved",
            user: savedUser
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to save user"
        });

    }

});


// Start server
app.listen(3000, () => {

    console.log("Server running at http://localhost:3000");

});