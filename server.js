// =====================================================
// STYLEHUB
// Experiment 6: Design a Web Page using Node.js
// Experiment 7: Designing a Simple Form using Express.js
// =====================================================

const http = require("http");
const express = require("express");

const app = express();
const PORT = 5000;

// Express middleware
app.use(express.urlencoded({ extended: true }));

// =====================================================
// EXPERIMENT 7 - EXPRESS.JS
// GET Route - Display StyleHub Web Page and Form
// =====================================================

app.get("/", (req, res) => {

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>

            <title>StyleHub</title>

            <style>

                * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                    font-family: Arial, sans-serif;
                    background-color: #e9c46a;
                    color: #222;
                }

                nav {
                    background-color: #222;
                    color: white;
                    padding: 20px 5%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                nav h1 {
                    margin: 0;
                }

                .hero {
                    text-align: center;
                    padding: 50px 20px;
                }

                .hero h2 {
                    font-size: 40px;
                    margin-bottom: 10px;
                }

                .hero p {
                    font-size: 20px;
                }

                .form-container {
                    background-color: white;
                    width: 350px;
                    margin: 20px auto 50px;
                    padding: 30px;
                    border-radius: 10px;
                }

                .form-container h2 {
                    text-align: center;
                }

                input {
                    width: 100%;
                    padding: 10px;
                    margin: 8px 0;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }

                button {
                    width: 100%;
                    padding: 12px;
                    margin-top: 10px;
                    background-color: #222;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }

                button:hover {
                    background-color: #555;
                }

            </style>

        </head>

        <body>

            <nav>
                <h1>StyleHub</h1>
                <span>Node.js + Express.js</span>
            </nav>

            <div class="hero">

                <h2>Welcome to StyleHub</h2>

                <p>
                    Discover the latest fashion trends
                </p>

            </div>

            <div class="form-container">

                <h2>Registration Form</h2>

                <form action="/submit" method="POST">

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Full Name"
                        required
                    >

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        required
                    >

                    <input
                        type="text"
                        name="phone"
                        placeholder="Enter Phone Number"
                        required
                    >

                    <button type="submit">
                        Register
                    </button>

                </form>

            </div>

        </body>
        </html>
    `);
});


// =====================================================
// EXPERIMENT 7 - EXPRESS.JS
// POST Route - Process Form
// =====================================================

app.post("/submit", (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;

    res.send(`
        <!DOCTYPE html>
        <html>

        <head>

            <title>Registration Successful</title>

            <style>

                body {
                    font-family: Arial, sans-serif;
                    background-color: #e9c46a;
                    text-align: center;
                    padding-top: 80px;
                }

                .result {
                    background-color: white;
                    width: 400px;
                    margin: auto;
                    padding: 30px;
                    border-radius: 10px;
                }

                a {
                    display: inline-block;
                    margin-top: 20px;
                    padding: 10px 20px;
                    background-color: #222;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                }

            </style>

        </head>

        <body>

            <div class="result">

                <h1>StyleHub</h1>

                <h2>Registration Successful!</h2>

                <p><b>Name:</b> ${name}</p>

                <p><b>Email:</b> ${email}</p>

                <p><b>Phone:</b> ${phone}</p>

                <a href="/">Go Back</a>

            </div>

        </body>

        </html>
    `);
});


// =====================================================
// EXPERIMENT 6 - NODE.JS
// Create Node.js HTTP Server
// =====================================================

const server = http.createServer(app);


// =====================================================
// START SERVER
// =====================================================

server.listen(PORT, () => {

    console.log(
        `StyleHub Node.js + Express.js server running on port ${PORT}`
    );

});