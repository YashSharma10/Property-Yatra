import React from "react"
import { Building2, Scale, Home, Wrench } from "lucide-react"
import { Link } from "react-router-dom"

const services = [
  {
    title: "Facility Management",
    description: "Comprehensive solutions for managing and maintaining your facilities efficiently.",
    icon: Building2,
    action: "Manage Facilities",
    link: "/facilities",
    points: ["24/7 maintenance support", "Energy efficiency optimization", "Space planning and utilization"],
  },
  {
    title: "Legal Services",
    description: "Expert legal advice and representation for all your business needs.",
    icon: Scale,
    action: "Get Legal Help",
    link: "/comingsoon",
    points: ["Contract review and drafting", "Dispute resolution", "Regulatory compliance"],
  },
  {
    title: "Home Loan",
    description: "Flexible and competitive home loan options to help you achieve your dream home.",
    icon: Home,
    action: "Home Loan",
    link: "/comingsoon",
    points: ["Competitive interest rates", "Flexible repayment options", "Quick approval process"],
  },
  {
    title: "Tools",
    description: "A wide range of professional tools and equipment for rent or purchase.",
    icon: Wrench,
    points: ["High-quality power tools", "Specialized equipment rental", "Tool maintenance services"],
    buttons: [
      { text: "EMI Calculator", link: "/emicalculator" },
      { text: "Rent Agreement", link: "/rent-agreement" },
    ],
  },
]

const ServiceCard = ({ service }) => {
  const isToolsCard = service.title === "Tools"

  return (
    <div className={`service-card ${isToolsCard ? "tools-card" : ""}`}>
      <div className="icon-container">
        <service.icon className="icon" />
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <ul className="points">
        {service.points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
      {isToolsCard ? (
        <div className="tools-buttons">
          {service.buttons.map((button, index) => (
            <Link key={index} to={button.link} className="action-button tools-button">
              {button.text}
            </Link>
          ))}
        </div>
      ) : (
        <Link to={service.link} className="action-button">
          {service.action}
        </Link>
      )}
    </div>
  )
}

const ServiceCards = () => {
  return (
    <div className="service-cards-container">
      <h2>Our Services</h2>
      <div className="cards-grid">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
      <style jsx>{`
        .service-cards-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        h2 {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 2rem;
        }
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        .service-card {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
        }
        .tools-card {
          background-color: #f8f9fa;
        }
        .icon-container {
          background-color: #e9ecef;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1rem;
        }
        .icon {
          width: 30px;
          height: 30px;
          color: #495057;
        }
        h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }
        p {
          font-size: 0.9rem;
          color: #6c757d;
          margin-bottom: 1rem;
        }
        .points {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          color: #6c757d;
        }
        .action-button {
          background-color: #090909;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin-top: auto;
          text-decoration: none;
          text-align: center;
        }
        .action-button:hover {
          background-color: #060606;
        }
        .tools-card .tools-buttons {
          display: flex;
          gap: 1rem;
          margin-top: auto;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .tools-card:hover .tools-buttons {
          opacity: 1;
        }
        .tools-button {
          flex: 1;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  )
}

export default ServiceCards

