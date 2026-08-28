import "./SuggestedBusinesses.css";
import { useState } from "react";

const businesses = [
  { icon: "🥖", name: "Bakery" },
  { icon: "🍽️", name: "Restaurant" },
  { icon: "💊", name: "Medical Shop" },
  { icon: "🛒", name: "Grocery Store" },
  { icon: "👕", name: "Clothing Store" },
  { icon: "💇", name: "Salon" },
  { icon: "🏋️", name: "Gym" },
  { icon: "📱", name: "Mobile Repair" },
  { icon: "☕", name: "Cafe" },
  { icon: "🏨", name: "Hotel" },
  { icon: "💻", name: "Software Company" },
  { icon: "📈", name: "Digital Marketing Agency" },
  { icon: "🧑‍🏫", name: "Coaching Center" },
  { icon: "🖥️", name: "Computer Training Center" },
  { icon: "🚗", name: "Car Service Center" },
  { icon: "🏍️", name: "Bike Service Center" },
  { icon: "🛠️", name: "Hardware Store" },
  { icon: "🪑", name: "Furniture Store" },
  { icon: "📦", name: "Courier Service" },
  { icon: "🐔", name: "Poultry Farm" },
  { icon: "🐄", name: "Dairy Farm" },
  { icon: "🐟", name: "Fish Farming" },
  { icon: "💄", name: "Cosmetic Store" },
  { icon: "👟", name: "Footwear Store" },
];

function SuggestedBusinesses({ onSelect }) {
  const [showAll, setShowAll] = useState(false);

  const visibleBusinesses = showAll
    ? businesses
    : businesses.slice(0, 8);

  return (
    <div className="suggested-businesses">

      <h3>💡 Popular Business Ideas</h3>

      <p>
        Not sure what business to start? Choose one below to quickly fill the
        Business Category.
      </p>

      <div className="business-grid">
        {visibleBusinesses.map((business) => (
          <button
            key={business.name}
            className="business-chip"
            onClick={() => onSelect(business.name)}
          >
            <span>{business.icon}</span>
            {business.name}
          </button>
        ))}
      </div>

      <button
        className="view-more-btn"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? "Show Less ▲" : "View More ▼"}
      </button>

    </div>
  );
}

export default SuggestedBusinesses;