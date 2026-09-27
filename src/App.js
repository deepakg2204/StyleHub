import React, { useState } from "react";
import "./App.css";
import Registration from "./Registration";

function App() {
  const [showRegistration, setShowRegistration] = useState(false);

  // ===============================
  // STRIPE PAYMENT
  // ===============================

  const handlePayment = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Payment session could not be created.");
      }

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Unable to connect to payment server.");
    }
  };

  // ===============================
  // REGISTRATION PAGE
  // ===============================

  if (showRegistration) {
    return (
      <Registration
        goBack={() => setShowRegistration(false)}
      />
    );
  }

  // ===============================
  // MAIN PAGE
  // ===============================

  return (
    <div>

      {/* Navigation Bar */}
      <nav className="navbar">
        <h2>StyleHub</h2>

        <ul>
          <li>Home</li>
          <li>Collection</li>
          <li>About</li>
          <li>Contact</li>
        </ul>

        <button
          className="signin-btn"
          onClick={() => setShowRegistration(true)}
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to StyleHub</h1>

        <p>
          Discover the latest fashion trends
        </p>

        <button onClick={handlePayment}>
          Shop Now - ₹999
        </button>
      </section>

      {/* Collection Section */}
      <section className="collection">

        <h2>Our Collection</h2>

        <div className="cards">

          <div className="card">
            <div className="emoji">👕</div>

            <h3>Casual Wear</h3>

            <p>
              Comfortable and trendy outfits.
            </p>

          </div>

          <div className="card">
            <div className="emoji">👗</div>

            <h3>Party Wear</h3>

            <p>
              Stylish outfits for special occasions.
            </p>

          </div>

          <div className="card">
            <div className="emoji">👟</div>

            <h3>Footwear</h3>

            <p>
              Modern footwear for every style.
            </p>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer>
        <p>
          © 2026 StyleHub. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
}

export default App;