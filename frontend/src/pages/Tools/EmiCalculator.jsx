import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const EmiCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(10);
  const [loanTenure, setLoanTenure] = useState(12);
  const [emi, setEmi] = useState(8791.59);
  const [chartData, setChartData] = useState([
    { name: "Principal", value: 100000 },
    { name: "Interest", value: 5499.06 },
    { name: "Total Payment", value: 105499.08 },
  ]);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  // Function to calculate EMI
  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const emiValue =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTenure)) /
      (Math.pow(1 + monthlyRate, loanTenure) - 1);

    setEmi(emiValue.toFixed(2));

    // Calculate interest and principal components
    const totalPayment = emiValue * loanTenure;
    const totalInterest = totalPayment - loanAmount;
    setChartData([
      { name: "Principal", value: loanAmount },
      { name: "Interest", value: totalInterest },
      { name: "Total Payment", value: totalPayment },
    ]);
  };

  return (
    <div className="width flex gap-3 flex-col sm:flex-row">
      {/* Calculator Section */}
      <div className="">
        <Card className="p-4 space-y-4 shadow-md sm:w-72 h-full">
          <div>
            <h1 className="text-xl font-bold">EMI Calculator</h1>
          </div>
          <div className="space-y-2">
            <label className="font-medium">Loan Amount (₹)</label>
            <Input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="font-medium">Annual Interest Rate (%)</label>
            <Input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="font-medium">Loan Tenure (months)</label>
            <Input
              type="number"
              value={loanTenure}
              onChange={(e) => setLoanTenure(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <CardFooter className="">
            <Button className="w-full" onClick={calculateEMI}>
              Calculate EMI
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Charts Section */}
      {
        <div className="w-full">
          <Card className="shadow-md">
            <CardHeader>
              <h2 className="text-lg font-semibold">EMI Details</h2>
              <p className="text-gray-700 font-semibold">Monthly EMI: ₹{emi}</p>
              <h2 className="text-lg font-semibold text-center mb-4">
                EMI Breakdown
              </h2>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ₹${value.toFixed(2)}`}
                  >
                    {chartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`₹${value}`, name]}
                    contentStyle={{
                      backgroundColor: "#f5f5f5",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      }
    </div>
  );
};

export default EmiCalculator;
