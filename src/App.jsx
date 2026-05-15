import React, { useMemo, useState } from "react";
import "./index.css";

const vehicleSizes = [
  {
    id: "coupe",
    name: "Coupe",
    comboPrice: 170,
    ceramicPrice: 1100,
    addonIncrease: 0,
    description: "Small 2-door vehicles.",
    examples: "Mustang, Camaro, BRZ, Miata, etc.",
  },
  {
    id: "sedan",
    name: "Sedan",
    comboPrice: 185,
    ceramicPrice: 1200,
    addonIncrease: 0,
    description: "Standard 4-door cars.",
    examples: "Camry, Accord, Altima, Civic, etc.",
  },
  {
    id: "crossover",
    name: "Crossover",
    comboPrice: 200,
    ceramicPrice: 1300,
    addonIncrease: 0,
    description: "Small to midsize crossover vehicles.",
    examples: "RAV4, CR-V, CX-5, Rogue, etc.",
  },
  {
    id: "midsizeSuv",
    name: "Midsize SUV",
    comboPrice: 215,
    ceramicPrice: 1400,
    addonIncrease: 5,
    description: "Larger family SUVs and midsize utility vehicles.",
    examples: "Highlander, 4Runner, Explorer, Telluride, etc.",
  },
  {
    id: "truck",
    name: "Truck",
    comboPrice: 215,
    ceramicPrice: 1400,
    addonIncrease: 5,
    description: "Pickup trucks priced the same as midsize SUVs.",
    examples: "F-150, Silverado, Ram, Tacoma, etc.",
  },
  {
    id: "fullSizeSuv",
    name: "Full-size SUV",
    comboPrice: 230,
    ceramicPrice: 1500,
    addonIncrease: 5,
    description: "Large SUVs with more interior and exterior surface area.",
    examples: "Tahoe, Suburban, Expedition, Yukon XL, etc.",
  },
];

const serviceTypes = [
  {
    id: "full",
    name: "Interior + Exterior Base Detail",
    description: "Best value for a full inside and outside base detail.",
    includes: [
      "Foam and hand wash",
      "Wheel clean",
      "Window clean",
      "Tire shine",
      "Full vacuum",
      "Hard surface cleaning",
      "Interior window clean",
    ],
  },
  {
    id: "exterior",
    name: "Exterior Only",
    description: "Exterior wash and shine only.",
    includes: ["Foam and hand wash", "Wheel clean", "Window clean", "Tire shine"],
  },
  {
    id: "interior",
    name: "Interior Only",
    description: "Interior reset only.",
    includes: ["Full vacuum", "Hard surface cleaning", "Interior window clean"],
  },
  {
    id: "ceramic",
    name: "Ceramic Coating",
    description:
      "Premium ceramic protection service. Price may vary depending on paint condition, prep work, and vehicle condition.",
    includes: [
      "Exterior wash",
      "Paint prep",
      "Ceramic coating application",
      "Gloss and water resistance",
      "Final inspection",
    ],
  },
  {
    id: "ceramicInterior",
    name: "Ceramic Coating + Interior",
    description:
      "Ceramic coating service paired with an interior reset. Price may vary depending on paint condition, prep work, and vehicle condition.",
    includes: [
      "Exterior wash",
      "Paint prep",
      "Ceramic coating application",
      "Gloss and water resistance",
      "Full vacuum",
      "Hard surface cleaning",
      "Interior window clean",
      "Final inspection",
    ],
  },
];

const addOns = [
  {
    id: "sprayWax",
    name: "Spray Wax",
    basePrice: 25,
    type: "Exterior",
    description: "Adds shine and short-term paint protection.",
  },
  {
    id: "clayBar",
    name: "Clay Bar",
    basePrice: 40,
    type: "Exterior",
    description: "Helps remove rough paint contaminants.",
  },
  {
    id: "steam",
    name: "Steam Cleaning",
    basePrice: 50,
    type: "Interior",
    description: "Deeper cleaning for interior surfaces.",
  },
  {
    id: "plastic",
    name: "Plastic Dressing",
    basePrice: 40,
    type: "Interior",
    description: "Restores a cleaner look to interior plastic trim.",
  },
  {
    id: "floorMats",
    name: "Rubber Floor Mat Dressing",
    basePrice: 30,
    type: "Interior",
    description: "Cleans and dresses rubber floor mats.",
  },
  {
    id: "leather",
    name: "Leather Conditioning",
    basePrice: 35,
    type: "Interior",
    description: "Conditions leather seats and leather surfaces.",
  },
  {
    id: "petHair",
    name: "Excessive Pet Hair Removal",
    basePrice: 30,
    type: "Interior",
    description: "Added when extra time is needed for heavy pet hair.",
  },
];

function App() {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicleSizes[0]);
  const [selectedService, setSelectedService] = useState(serviceTypes[0]);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  function roundToNearestFive(number) {
    return Math.round(number / 5) * 5;
  }

  function getInteriorOnlyPrice() {
    const separateTotal = selectedVehicle.comboPrice + 20;
    const exteriorPrice = roundToNearestFive(separateTotal * 0.45);
    return separateTotal - exteriorPrice;
  }

  function getServicePrice(service) {
    const comboPrice = selectedVehicle.comboPrice;
    const separateTotal = comboPrice + 20;

    if (service.id === "full") {
      return comboPrice;
    }

    if (service.id === "exterior") {
      return roundToNearestFive(separateTotal * 0.45);
    }

    if (service.id === "interior") {
      return getInteriorOnlyPrice();
    }

    if (service.id === "ceramic") {
      return selectedVehicle.ceramicPrice;
    }

    if (service.id === "ceramicInterior") {
      return selectedVehicle.ceramicPrice + getInteriorOnlyPrice();
    }

    return comboPrice;
  }

  function getAddOnPrice(addOn) {
    return addOn.basePrice + selectedVehicle.addonIncrease;
  }

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

  const servicePrice = getServicePrice(selectedService);

  const total = useMemo(() => {
    return (
      servicePrice +
      chosenAddOns.reduce((sum, item) => sum + getAddOnPrice(item), 0)
    );
  }, [servicePrice, chosenAddOns, selectedVehicle]);

  const textMessage = encodeURIComponent(
    `Hi Rence Premium Detailing, I would like to book a detail.

Vehicle Size: ${selectedVehicle.name}
Service: ${selectedService.name} - $${servicePrice}
Add-ons: ${
      chosenAddOns.length
        ? chosenAddOns
            .map((item) => `${item.name} ($${getAddOnPrice(item)})`)
            .join(", ")
        : "None"
    }

Estimated Total: $${total}

Name:
Vehicle make/model:
Preferred date:
Preferred time:
Service address:
Notes:`
  );

  return (
    <div className="page">
      <header className="hero">
        <nav className="nav">
      
          <div className="nav-links">
            <a href="#pricing">Pricing</a>
            <a href="#addons">Add-ons</a>
            <a href="#booking">Booking</a>
            <a href="#reviews">Reviews</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="hero-content">
          <div className="hero-text">
          

            <h1>
              Rence <span>Premium Detailing</span>
            </h1>

            <p className="description">
              Select your vehicle size, choose your service, add any extras, and
              see your estimate update before booking.
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
              src="/images/rence-logo.png"
              alt="Rence Premium Detailing Logo"
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
        <h2>Build Your Estimate</h2>

        <p className="section-subtitle">
          Select your vehicle size first. The service prices below will
          automatically adjust.
        </p>

        <div className="pricing-layout">
          <div>
            <h3 className="step-title">Step 1: Select vehicle size</h3>

            <div className="vehicle-grid">
              {vehicleSizes.map((vehicle) => (
                <button
                  key={vehicle.id}
                  className={
                    selectedVehicle.id === vehicle.id
                      ? "vehicle-card selected"
                      : "vehicle-card"
                  }
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <div>
                    <h4>{vehicle.name}</h4>
                    <p className="vehicle-description">
                      {vehicle.description}
                    </p>
                    <p className="examples">{vehicle.examples}</p>
                  </div>
                </button>
              ))}
            </div>

            <h3 className="step-title">Step 2: Select service type</h3>

            <div className="service-grid">
              {serviceTypes.map((service) => (
                <button
                  key={service.id}
                  className={
                    selectedService.id === service.id
                      ? "service-card selected"
                      : "service-card"
                  }
                  onClick={() => setSelectedService(service)}
                >
                  <h4>{service.name}</h4>

                  <p className="service-price">${getServicePrice(service)}</p>

                  <p className="service-description">{service.description}</p>

                  <ul>
                    {service.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>

            <h3 id="addons" className="step-title">
              Step 3: Choose add-ons
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

                  <p className="addon-price">${getAddOnPrice(item)}</p>
                </button>
              ))}
            </div>
          </div>

          <aside className="estimate-box">
            <h3>Your Estimate</h3>

            <div className="estimate-row">
              <span>Vehicle size</span>
              <strong>{selectedVehicle.name}</strong>
            </div>

            <div className="estimate-row">
              <span>{selectedService.name}</span>
              <strong>${servicePrice}</strong>
            </div>

            {chosenAddOns.length === 0 ? (
              <p className="empty">No add-ons selected.</p>
            ) : (
              chosenAddOns.map((item) => (
                <div className="estimate-row" key={item.id}>
                  <span>{item.name}</span>
                  <strong>${getAddOnPrice(item)}</strong>
                </div>
              ))
            )}

            <div className="total-row">
              <span>Estimated total</span>
              <strong>${total}</strong>
            </div>

            <p className="note">
              Final price may change depending on vehicle condition, staining,
              pet hair, paint condition, ceramic prep work, and service
              location.
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
          Customers can choose their vehicle size, select their service, add
          extra options, and send the estimate directly by text.
        </p>

        <div className="booking-boxes">
          <div>
            <h3>What to Send</h3>
            <p>
              Name, vehicle make/model, preferred date, preferred time, service
              address, and any special notes.
            </p>
          </div>

          <div>
            <h3>Mobile Service</h3>
            <p>
              Rence Premium Detailing comes to the customer. Availability can be
              added once the schedule is finalized.
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

      <section id="reviews" className="review-section">
        <h2>Enjoyed Your Detail?</h2>

        <p>
          Reviews help Rence Premium Detailing grow and help future customers
          feel confident booking their vehicle. If you were happy with your
          service, we would appreciate you taking a minute to leave a review.
        </p>

        <div className="review-buttons">
          <a
            href="https://www.google.com/search?q=Rence+Premium+Detailing+review"
            target="_blank"
            rel="noreferrer"
            className="primary-btn"
          >
            Leave a Review
          </a>
        </div>
      </section>

      <footer id="contact" className="footer">
        <h2>Ready for a Premium Detail?</h2>

        <p>Call, text, or message on Instagram or Facebook to book your detail.</p>

        <div className="footer-buttons">
          <a href="tel:4706778558">470-677-8558</a>

          <a
            href="https://www.instagram.com/rence.premium.detailing/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61563221352873"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
        </div>

        <p className="copyright">
          © {new Date().getFullYear()} Rence Premium Detailing. Prices are
          estimates and may vary by vehicle condition.
        </p>
      </footer>
    </div>
  );
}

export default App;