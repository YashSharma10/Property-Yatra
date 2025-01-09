import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SubscriptionPlans = () => {
  const plans = [
    {
      id: "basic",
      title: "Basic",
      price: "₹2,000 / month",
      features: [
        "Post up to 10 properties",
        "Basic property analytics",
        "Access to customer inquiries",
      ],
      isPopular: false,
    },
    {
      id: "professional",
      title: "Professional",
      price: "₹5,000 / month",
      features: [
        "Post up to 50 properties",
        "Advanced analytics",
        "Priority customer support",
        "Promoted property listings",
      ],
      isPopular: true, // Highlight this as the most popular plan
    },
    {
      id: "advanced",
      title: "Advanced",
      price: "₹10,000 / month",
      features: [
        "Unlimited property postings",
        "Comprehensive market insights",
        "Dedicated account manager",
        "Exclusive property promotions",
      ],
      isPopular: false,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto my-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Choose Your Subscription Plan
      </h1>
      <p className="text-gray-600 text-center mb-10">
        Select a plan that suits your property management needs and grow your real estate business.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`p-6 shadow-md rounded-lg ${
              plan.isPopular ? "border-2 border-green-500" : "border"
            }`}
          >
            <CardHeader className="text-center">
              {plan.isPopular && (
                <Badge variant="success" className="mb-4">
                  Most Popular
                </Badge>
              )}
              <CardTitle className="text-xl font-bold text-gray-900">
                {plan.title}
              </CardTitle>
              <p className="text-2xl font-semibold text-green-600 mt-2">
                {plan.price}
              </p>
            </CardHeader>

            <CardContent className="my-4 space-y-3">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-green-500">✔</span>
                  <p className="text-sm text-gray-700">{feature}</p>
                </div>
              ))}
            </CardContent>

            <div className="text-center">
              <Button variant="primary" size="lg">
                Choose {plan.title}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default SubscriptionPlans;
