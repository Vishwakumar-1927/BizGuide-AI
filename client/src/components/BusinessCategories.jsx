import "./BusinessCategories.css";
import {
  FaUtensils,
  FaStore,
  FaLaptopCode,
  FaHeartbeat,
  FaGraduationCap,
  FaShoppingBag,
  FaCar,
  FaHotel,
  FaArrowRight,
} from "react-icons/fa";

function BusinessCategories() {
  const categories = [
    {
      icon: <FaUtensils />,
      title: "Restaurant",
      desc: "Restaurants, cafes & food businesses",
      tag: "FOOD",
    },
    {
      icon: <FaStore />,
      title: "Retail Store",
      desc: "Shops, supermarkets & local stores",
      tag: "RETAIL",
    },
    {
      icon: <FaLaptopCode />,
      title: "IT Startup",
      desc: "Software, apps & technology",
      tag: "TECH",
    },
    {
      icon: <FaHeartbeat />,
      title: "Healthcare",
      desc: "Medical shops, clinics & services",
      tag: "HEALTH",
    },
    {
      icon: <FaGraduationCap />,
      title: "Education",
      desc: "Coaching, training & learning",
      tag: "EDUCATION",
    },
    {
      icon: <FaShoppingBag />,
      title: "E-Commerce",
      desc: "Online stores & delivery businesses",
      tag: "ONLINE",
    },
    {
      icon: <FaCar />,
      title: "Automobile",
      desc: "Garages, service & automobile",
      tag: "AUTO",
    },
    {
      icon: <FaHotel />,
      title: "Hospitality",
      desc: "Hotels, resorts & stays",
      tag: "TRAVEL",
    },
  ];

  return (
    <section className="categories">

      <div className="categories-heading">

        <span className="categories-label">
          BUSINESS CATEGORIES
        </span>

        <h2>
          Explore Your
          <span> Business Possibilities</span>
        </h2>

        <p>
          Choose from popular business sectors and use BizGuide AI to
          understand the opportunities, investment, competition and
          growth potential.
        </p>

      </div>

      <div className="categories-grid">

        {categories.map((item, index) => (

          <div
            className="category-card"
            key={index}
          >

            <div className="category-card-top">

              <div className="category-icon">
                {item.icon}
              </div>

              <span className="category-number">
                {String(index + 1).padStart(2, "0")}
              </span>

            </div>

            <div className="category-tag">
              {item.tag}
            </div>

            <h3>
              {item.title}
            </h3>

            <p>
              {item.desc}
            </p>

            <div className="category-link">

              <span>
                Explore
              </span>

              <FaArrowRight />

            </div>

          </div>

        ))}

      </div>

      <div className="categories-footer">

        <span>
          Don't see your business type?
        </span>

        <strong>
          BizGuide AI supports many more industries.
        </strong>

      </div>

    </section>
  );
}

export default BusinessCategories;