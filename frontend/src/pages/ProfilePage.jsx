import React, { useState, useEffect } from "react";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const data = await fetch(`http://localhost:3000/api/properties/profile`, {
          method: "GET",
        });
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (!userData) return <div>User not found</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Profile Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <p className="text-xl font-semibold">Name: {userData.user.name}</p>
        <p className="text-xl font-semibold mt-2">
          Email: {userData.user.email}
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Properties Added by You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userData.properties.length === 0 ? (
          <div>No properties added yet.</div>
        ) : (
          userData.properties.map((property) => (
            <div
              key={property._id}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold">{property.name}</h3>
              <p>
                {property.type} - {property.price}
              </p>
              <p>
                {property.address.city}, {property.address.state}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
