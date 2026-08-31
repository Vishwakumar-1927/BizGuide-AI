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
      desc: "Restaurants, cafes and food businesses",
    },
    {
      icon: <FaStore />,
      title: "Retail Store",
      desc: "Shops, supermarkets and local stores",
    },
    {
      icon: <FaLaptopCode />,
      title: "IT Startup",
      desc: "Software, apps and technology businesses",
    },
    {
      icon: <FaHeartbeat />,
      title: "Healthcare",
      desc: "Medical shops, clinics and healthcare",
    },
    {
      icon: <FaGraduationCap />,
      title: "Education",
      desc: "Coaching, training and learning centers",
    },
    {
      icon: <FaShoppingBag />,
      title: "E-Commerce",
      desc: "Online stores and delivery businesses",
    },
    {
      icon: <FaCar />,
      title: "Automobile",
      desc: "Garages, service and automobile businesses",
    },
    {
      icon: <FaHotel />,
      title: "Hospitality",
      desc: "Hotels, resorts and accommodation",
    },
  ];

  return (
    <section className="categories">

      <div className="categories-heading">
        <span className="categories-label">
          BUSINESS CATEGORIES
        </span>

        <h2>
          Explore Popular
          <span> Business Ideas</span>
        </h2>

        <p>
          Discover different industries and explore business opportunities
          with AI-powered insights from BizGuide.
        </p>
      </div>

      <div className="categories-grid">

        {categories.map((category, index) => (
          <div className="category-card" key={category.title}>

            <div className="category-top">

              <div className="category-icon">
                {category.icon}
              </div>

              <span className="category-number">
                {String(index + 1).padStart(2, "0")}
              </span>

            </div>

            <h3>{category.title}</h3>

            <p>{category.desc}</p>

            <div className="category-explore">
              Explore
              <FaArrowRight />
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default BusinessCategories;