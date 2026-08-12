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
} from "react-icons/fa";

function BusinessCategories() {
  const categories = [
    {
      icon: <FaUtensils />,
      title: "Restaurant",
      desc: "Restaurants, Cafes & Food Trucks",
    },
    {
      icon: <FaStore />,
      title: "Retail Store",
      desc: "Shops, Supermarkets & Stores",
    },
    {
      icon: <FaLaptopCode />,
      title: "IT Startup",
      desc: "Software & Technology Businesses",
    },
    {
      icon: <FaHeartbeat />,
      title: "Healthcare",
      desc: "Medical Shops & Clinics",
    },
    {
      icon: <FaGraduationCap />,
      title: "Education",
      desc: "Schools, Coaching & Training",
    },
    {
      icon: <FaShoppingBag />,
      title: "E-Commerce",
      desc: "Online Selling & Delivery",
    },
    {
      icon: <FaCar />,
      title: "Automobile",
      desc: "Service Centers & Garages",
    },
    {
      icon: <FaHotel />,
      title: "Hospitality",
      desc: "Hotels & Resorts",
    },
  ];

  return (
    <section className="categories">

      <div className="categories-heading">

        <span>BUSINESS CATEGORIES</span>

        <h2>Explore Popular Business Types</h2>

        <p>
          BizGuide AI supports multiple industries to help entrepreneurs make
          informed business decisions.
        </p>

      </div>

      <div className="categories-grid">

        {categories.map((item, index) => (

          <div className="category-card" key={index}>

            <div className="category-icon">

              {item.icon}

            </div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default BusinessCategories;