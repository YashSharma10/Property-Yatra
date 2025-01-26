import React from "react";

function Property() {
  const services = [
    {
      icon: "https://img.icons8.com/?size=100&id=aEkEE8aNMUvT&format=png&color=000000",
      title: "Plumbing",
      description:
        "We tailor complete specialized solutions in line with the client’s business strategy and long-term goals.",
      link: "/",
    },
    {
      icon: "https://img.icons8.com/?size=100&id=7188&format=png&color=000000",
      title: "Cleaning",
      description:
        "We focus on creating an optimal working environment through regular maintenance, inspection, and repair for your property.",
      link: "/",
    },
    {
      icon: "https://img.icons8.com/?size=100&id=EvmKTdQmsDL5&format=png&color=000000",
      title: "Electrical",
      description:
        "Our soft service delivery model prioritizes a clean, safe, and appealing working environment across a variety of sectors.",
      link: "/",
    },
    {
      icon: "https://img.icons8.com/?size=100&id=jZyBAWVmVUrT&format=png&color=000000",
      title: "Security",
      description:
        "Whether you need single-sourced security management or a partner for existing arrangements, we deliver robust services.",
      link: "/",
    },
    {
      icon: "https://img.icons8.com/?size=100&id=fPdH9eGtDqfH&format=png&color=000000",
      title: "Pest Control Services",
      description:
        "Our pest control services protect your premises by conducting thorough inspections, eliminating unwanted pest activity.",
      link: "/",
    },
    {
      icon: "https://img.icons8.com/?size=100&id=rVFkCOkaCd03&format=png&color=000000",
      title: "Gardening",
      description:
        "We tailor complete specialized solutions in line with the client’s business strategy and long-term goals.",
      link: "/",
    },
    {
      icon: "https://img.icons8.com/?size=100&id=YdgP5OnDHAX6&format=png&color=000000",
      title: "HVAC",
      description:
        "We deliver specialized HVAC solutions tailored to ensure optimal functionality and efficiency.",
      link: "/",
    },
    {
      icon: "https://img.icons8.com/?size=100&id=9zoe75ZxjBmG&format=png&color=000000",
      title: "Painting",
      description:
        "We provide expert painting services to enhance and maintain the aesthetic appeal of your property.",
      link: "/",
    },
    {
      icon: "https://img.icons8.com/?size=100&id=tWBwNAhLUrtj&format=png&color=000000",
      title: "Carpentry",
      description:
        "Our skilled carpentry solutions cater to a variety of needs, ensuring exceptional craftsmanship.",
      link: "/",
    },
    {
      icon: "https://img.icons8.com/?size=100&id=gE7mqr5m453P&format=png&color=000000",
      title: "Parking",
      description:
        "We provide well-managed parking solutions tailored to meet your facility's requirements.",
      link: "/",
    },
    {
      icon: "https://img.icons8.com/?size=100&id=33951&format=png&color=000000",
      title: "Other",
      description:
        "Explore a range of additional property services designed to meet your unique needs.",
      link: "/",
    },
  ];

  return (
    <div>
      {/* Header Section */}
      <div className="relative w-full h-[40vh] flex items-center justify-center bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white">
        <h1 className="text-3xl md:text-5xl font-bold text-center max-w-3xl">
          Welcome to Our Property Services
        </h1>
      </div>

      {/* Services Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-8 md:mb-10">
            We Provide The Best Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-6 flex flex-col items-center text-center rounded-lg hover:shadow-xl transition duration-300"
              >
                <div className="mb-4">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-12 h-12 md:w-16 md:h-16 p-3 bg-red-100 rounded-full"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4">
                  {service.description}
                </p>
                <a
                  href={service.link}
                  className="text-red-500 font-medium hover:underline flex items-center"
                >
                  Read more <span className="ml-1">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Property;