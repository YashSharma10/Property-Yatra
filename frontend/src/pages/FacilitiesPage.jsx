import React from "react";
import { Link } from "react-router-dom";

const FacilityManagement = () => {
  return (
    <div className="page-container">
      <h1>Facility Management</h1>
      <p>Welcome to our Facility Management services page.</p>
      <Link to="/" className="back-link">
        Back to Services
      </Link>
      <style jsx>{`
        .page-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
        }
        h1 {
          color: #007bff;
        }
        .back-link {
          display: inline-block;
          margin-top: 1rem;
          color: #007bff;
          text-decoration: none;
        }
        .back-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default FacilityManagement;
