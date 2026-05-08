import React, { useMemo, useState } from "react";
import "./index.css";

const packages = [
  {
    id: "full",
    name: "Interior + Exterior Basic",
    price: 160,
    description: "Best value for a full clean inside and outside.",
    includes: [
      "Foam and hand wash",
      "Wheel clean",
      "Window clean",
      "Tire shine",
      "Full vacuum",
      "Hard surface cleaning",
    ],
  },
  {
    id: "exterior",
    name: "Exterior Only",
    price: 80,
    description: "A clean exterior wash to bring back shine.",
    includes: ["Foam and hand wash", "Wheel clean", "Window clean", "Tire shine"],
  },
  {
    id: "interior",
    name: "Interior Only",
    price: 100,
    description: "A clean reset for the inside of your vehicle.",
    includes: ["Full vacuum", "Hard surface cleaning", "Window clean"],
  },
  {
    id: "ceramic",
    name: "Ceramic Coating",
    price: 1100,
    description:
      "Premium paint protection option. Final price depends on vehicle size and paint condition.",
    includes: [
      "Exterior wash",
      "Paint prep",
      "Ceramic protection",
      "Gloss and water resistance",
    ],
  },
];

const addOns = [
  {
    id: "sprayWax",
    name: "Spray Wax",
    price: 25,
    type: "Exterior",
    description: "Adds extra shine and short-term protection after the wash.",
  },
  {
    id: "clayBar",
    name: "Clay Bar",
    price: 40,
    type: "Exterior",
    description: "Removes stuck-on dirt and rough contaminants from the paint.",
  },
  {
    id: "steam",
    name: "Steam Cleaning",
    price: 50,
    type: "Interior",
    description: "Uses hot steam to help clean deeper into interior surfaces.",
  },
  {
    id: "plastic",
    name: "Plastic Dressing",
    price: 40,
    type: "Interior",
    description: "Restores a cleaner look to interior plastic trim and panels.",
  },
  {
    id: "floorMats",
    name: "Rubber Floor Mat Dressing",
    price: 30,
    type: "Interior",
    description: "Cleans and dresses rubber floor mats for a fresh finish.",
  },
  {
    id: "leather",
    name: "Leather Conditioning",
    price: 35,
    type: "Interior",
    description: "Helps clean and condition leather seats and surfaces.",
  },
  {
    id: "petHair",
    name: "Excessive Pet Hair Removal",
    price: 30,
    type: "Interior",
    description: "Added when extra time is needed to remove heavy pet hair.",
  },
];

function App() {
  const [selectedPackage, setSelectedPackage] = useState(packages[0]);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  function toggleAddOn(id) {
    setSelectedAddOns((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  const chosenAddOns = useMemo(() => {
    return addOns.filter((item) => selectedAddOns.includes(item.id));
  }, [selectedAddOns]);

  const total = useMemo(() => {
    return (
      selectedPackage.price +
      chosenAddOns.reduce((sum, item) => sum + item.price, 0)
    );
  }, [selectedPackage, chosenAddOns]);

  const textMessage = encodeURIComponent(
    `Hi True Clean Auto Detailing, I would like to book a detail.

Package: ${selectedPackage.name} - $${selectedPackage.price}
Add-ons: ${
      chosenAddOns.length
        ? chosenAddOns.map((item) => `${item.name} ($${item.price})`).join(", ")
        : "None"
    }
Estimated Total: $${total}

Name:
Vehicle type:
Preferred date:
Preferred time:
Service address:
Notes:`
  );

  return (
    <div className="page">
      <header className="hero">
        <nav className="nav">
          <div className="brand">True Clean</div>

          <div className="nav-links">
            <a href="#pricing">Pricing</a>
            <a href="#addons">Add-ons</a>
            <a href="#booking">Booking</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="hero-content">
          <div className="hero-text">
            <p className="tagline">Mobile Auto Detailing</p>

            <h1>
              True Clean <span>Auto Detailing</span>
            </h1>

            <p className="description">
              Choose your detailing package, add the services you want, and see
              your estimated price update instantly.
            </p>

            <div className="hero-buttons">
              <a
                className="primary-btn"
                href={`sms:4706778558?&body=${textMessage}`}
              >
                Book by Text
              </a>

              <a className="secondary-btn" href="tel:4706778558">
                Call 470-677-8558
              </a>
            </div>
          </div>

          <div className="logo-card">
            <img
              src="/images/trueclean-logo.png"
              alt="True Clean Auto Detailing Logo"
              className="main-logo"
            />

            <h3>470-677-8558</h3>
          </div>
        </div>
      </header>

      <section className="promo-banner">
        <h2>Loyalty Special</h2>
        <p>Every 3rd wash is $50 off.</p>
      </section>

      <main id="pricing" className="pricing-section">
        <h2>Customize Your Detail</h2>

        <p className="section-subtitle">
          Select a package and choose any add-ons you want.
        </p>

        <div className="pricing-layout">
          <div>
            <h3 className="step-title">Step 1: Choose a package</h3>

            <div className="package-grid">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  className={
                    selectedPackage.id === pkg.id
                      ? "package-card selected"
                      : "package-card"
                  }
                  onClick={() => setSelectedPackage(pkg)}
                >
                  <h4>{pkg.name}</h4>
                  <p className="price">${pkg.price}</p>
                  <p className="package-description">{pkg.description}</p>

                  <ul>
                    {pkg.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>

            <h3 id="addons" className="step-title">
              Step 2: Choose add-ons
            </h3>

            <div className="addon-grid">
              {addOns.map((item) => (
                <button
                  key={item.id}
                  className={
                    selectedAddOns.includes(item.id)
                      ? "addon-card selected"
                      : "addon-card"
                  }
                  onClick={() => toggleAddOn(item.id)}
                >
                  <div>
                    <p className="addon-type">{item.type}</p>
                    <h4>{item.name}</h4>
                    <p className="addon-description">{item.description}</p>
                  </div>

                  <p className="addon-price">${item.price}</p>
                </button>
              ))}
            </div>
          </div>

          <aside className="estimate-box">
            <h3>Your Estimate</h3>

            <div className="estimate-row">
              <span>{selectedPackage.name}</span>
              <strong>${selectedPackage.price}</strong>
            </div>

            {chosenAddOns.length === 0 ? (
              <p className="empty">No add-ons selected.</p>
            ) : (
              chosenAddOns.map((item) => (
                <div className="estimate-row" key={item.id}>
                  <span>{item.name}</span>
                  <strong>${item.price}</strong>
                </div>
              ))
            )}

            <div className="total-row">
              <span>Estimated total</span>
              <strong>${total}</strong>
            </div>

            <p className="note">
              Final price may change depending on vehicle size and condition.
            </p>

            <a
              className="primary-btn full-width"
              href={`sms:4706778558?&body=${textMessage}`}
            >
              Text This Estimate
            </a>
          </aside>
        </div>
      </main>

      <section id="booking" className="booking-section">
        <h2>Book Your Detail</h2>

        <p>
          Online scheduling and payments can be added later. For now, customers
          can text their selected package, add-ons, vehicle type, preferred date,
          and service address.
        </p>

        <div className="booking-boxes">
          <div>
            <h3>What to Send</h3>
            <p>
              Name, vehicle type, preferred date, preferred time, service
              address, and any notes.
            </p>
          </div>

          <div>
            <h3>Mobile Service</h3>
            <p>
              True Clean comes to the customer. Availability can be listed here
              once your schedule is set.
            </p>
          </div>

          <div>
            <h3>Payments</h3>
            <p>
              Cash, Cash App, Venmo, or online payments can be added once you
              choose a payment method.
            </p>
          </div>
        </div>
      </section>

      <footer id="contact" className="footer">
        <h2>Ready for a True Clean?</h2>

        <p>Call, text, or message on Instagram to book your detail.</p>

        <div className="footer-buttons">
          <a href="tel:4706778558">470-677-8558</a>

          <a
            href="https://www.instagram.com/trueclean_autodetailing"
            target="_blank"
            rel="noreferrer"
          >
            @trueclean_autodetailing
          </a>
        </div>

        <p className="copyright">
          © {new Date().getFullYear()} True Clean Auto Detailing. Prices are
          estimates and may vary by vehicle condition.
        </p>
      </footer>
    </div>
  );
}

export default App;