import { Download, Home, User, BarChart2 } from "lucide-react"; // Import Lucide icons
import { Card } from "@/components/ui/card"; // Assuming you have a Card component
import { Separator } from "@radix-ui/react-dropdown-menu";

const StatisticsSection = () => {
  const stats = [
    {
      id: 1,
      icon: <Download size={32} className="text-blue-500" />,
      title: "Downloads",
      value: "1,250,000",
      description: "Total app downloads",
    },
    {
      id: 2,
      icon: <Home size={32} className="text-green-500" />,
      title: "Properties Posted",
      value: "35,000+",
      description: "Properties listed by users",
    },
    {
      id: 3,
      icon: <User size={32} className="text-purple-500" />,
      title: "Active Users",
      value: "50,000+",
      description: "Users actively browsing properties",
    },
    {
      id: 4,
      icon: <BarChart2 size={32} className="text-orange-500" />,
      title: "Revenue Generated",
      value: "₹12,50,00,000",
      description: "Total revenue generated from transactions",
    },
  ];

  return (
    <section className="bg-gray-50 py-12 px-6 my-7 rounded-md max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold mb-4">Platform Statistics</h2>
        <p className="text-lg text-gray-600">
          Key statistics that showcase the platform's growth and success.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card
            key={stat.id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-between"
          >
            <div className="text-3xl mb-4">{stat.icon}</div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <p className="text-sm text-gray-500">{stat.description}</p>
            </div>
            <div className="text-2xl font-bold text-gray-900 mt-4">{stat.value}</div>
          </Card>
        ))}
      </div>

      {/* Optional Separator */}
      <Separator className="my-8" />
    </section>
  );
};

export default StatisticsSection;
