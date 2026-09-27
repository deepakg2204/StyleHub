const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ===============================
// STRIPE
// ===============================

const Stripe = require("stripe");

if (!process.env.STRIPE_SECRET_KEY) {
    console.log("ERROR: STRIPE_SECRET_KEY not found in .env");
    process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ===============================
// EXPRESS APP
// ===============================

const app = express();
const PORT = 5000;

// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// MONGODB SCHEMA
// ===============================

const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    gender: String
});

// ===============================
// MONGODB MODEL
// ===============================

const Registration = mongoose.model(
    "Registration",
    registrationSchema
);

// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {
    res.send(`
        <h1>StyleHub Backend</h1>
        <h2>Node.js + Express.js + MongoDB Atlas + Stripe</h2>
        <p>Backend is running successfully.</p>
        <p>Stripe is enabled.</p>
    `);
});

// ===============================
// REGISTRATION ROUTE
// ===============================

app.post("/register", async (req, res) => {
    try {
        console.log("Registration data received:");
        console.log(req.body);

        const registration = new Registration({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            gender: req.body.gender
        });

        await registration.save();

        console.log("Registration saved to MongoDB");

        res.status(201).json({
            message: "Registration Successful!"
        });

    } catch (error) {
        console.log("Registration Error:", error.message);

        res.status(500).json({
            message: "Registration failed!"
        });
    }
});

// ===============================
// STRIPE CHECKOUT
// ===============================

app.post("/create-checkout-session", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],

            line_items: [
                {
                    price_data: {
                        currency: "inr",

                        product_data: {
                            name: "StyleHub Fashion Product"
                        },

                        unit_amount: 99900
                    },

                    quantity: 1
                }
            ],

            mode: "payment",

            success_url:
                "http://localhost:3000/payment-success",

            cancel_url:
                "http://localhost:3000/payment-cancelled"
        });

        console.log("Stripe Checkout Session Created");

        res.json({
            url: session.url
        });

    } catch (error) {
        console.log("Stripe Error:", error.message);

        res.status(500).json({
            error: "Stripe checkout failed"
        });
    }
});

// ===============================
// MONGODB ATLAS CONNECTION
// ===============================

mongoose.connect(process.env.MONGO_URI)

    .then(() => {
        console.log("======================================");
        console.log("       STYLEHUB SERVER STARTED");
        console.log("======================================");

        console.log("Experiment 6 : Node.js");
        console.log("Experiment 7 : Express.js");
        console.log("MongoDB      : Atlas");
        console.log("Stripe       : Enabled");

        console.log("--------------------------------------");

        console.log("MongoDB Atlas Connected Successfully");
        console.log("Stripe Configuration Loaded");
        console.log("Backend: http://localhost:5000");

        console.log("======================================");
    })

    .catch((error) => {
        console.log("MongoDB Connection Failed");
        console.log(error.message);
    });

// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});