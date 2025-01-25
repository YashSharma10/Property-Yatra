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

  const COLORS = ["#4CAF50", "#FFC107", "#2196F3"];

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
    <div className="flex flex-col gap-8 p-6 md:p-12 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Home Loan EMI Calculator</h1>
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Calculator Section */}
        <div className="flex-1">
          <Card className="p-6 space-y-6 shadow-xl rounded-lg bg-white">
            <CardHeader>
              <h2 className="text-xl font-semibold text-indigo-600">EMI Calculator</h2>
            </CardHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="font-medium text-gray-700">Loan Amount (₹)</label>
                <Input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <label className="font-medium text-gray-700">Annual Interest Rate (%)</label>
                <Input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <label className="font-medium text-gray-700">Loan Tenure (months)</label>
                <Input
                  type="number"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <CardFooter>
                <Button
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                  onClick={calculateEMI}
                >
                  Calculate EMI
                </Button>
              </CardFooter>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="flex-1">
          <Card className="shadow-xl rounded-lg bg-white p-6">
            <CardHeader>
              <h2 className="text-xl font-semibold text-indigo-600">EMI Details</h2>
              <p className="text-gray-700 font-semibold text-lg mt-4">Monthly EMI: ₹{emi}</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
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
                      fontSize: "14px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Details Section */}
      <div>
        <Card className="shadow-xl rounded-lg bg-white p-6">
          <CardHeader>
            <h2 className="text-xl font-bold text-indigo-600">Home Loan Details</h2>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-gray-700">
              <li><strong>Loan Amount:</strong> The total amount you plan to borrow from the lender.</li>
              <li><strong>Interest Rate:</strong> The annual rate of interest applied on the loan.</li>
              <li><strong>Loan Tenure:</strong> The period over which the loan is to be repaid in months.</li>
              <li><strong>Monthly EMI:</strong> Equal monthly installment that you need to pay towards loan repayment.</li>
              <li><strong>Principal:</strong> The original loan amount borrowed.</li>
              <li><strong>Total Interest:</strong> The total interest paid over the loan tenure.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Roadmap and FAQ Sections */}
      {/* Similar styling applied to Roadmap and FAQ Sections for consistency */}

      <div>
        <Card className="shadow-xl rounded-lg bg-white p-6">
          <CardHeader>
            <h2 className="text-xl font-bold text-indigo-600">Roadmap for Home Loan</h2>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal ml-6 space-y-3 text-gray-700">
              <li>Determine your eligibility for a home loan.</li>
              <li>Research and compare loan offers from different banks.</li>
              <li>Finalize the property you wish to purchase.</li>
              <li>Prepare the necessary documents, such as income proof, ID proof, and property documents.</li>
              <li>Submit your loan application to the bank.</li>
              <li>Await approval and verification by the bank.</li>
              <li>Sign the loan agreement and disbursement process begins.</li>
              <li>Start repaying the loan through EMIs.</li>
            </ol>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div>
        <Card className="shadow-xl rounded-lg bg-white p-6">
          <CardHeader>
            <h2 className="text-xl font-bold text-indigo-600">Frequently Asked Questions</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-semibold">Q: What is a home loan?</p>
                <p>A: A home loan is a sum of money borrowed from a bank or lender to purchase a house.</p>
              </div>
              <div>
                <p className="font-semibold">Q: How is EMI calculated?</p>
                <p>A: EMI is calculated based on the loan amount, interest rate, and tenure using a standard formula.</p>
              </div>
              <div>
                <p className="font-semibold">Q: Can I prepay my home loan?</p>
                <p>A: Yes, most banks allow prepayment, but some may charge a prepayment fee.</p>
              </div>
              <div>
                <p className="font-semibold">Q: What is the maximum tenure for a home loan?</p>
                <p>A: The maximum tenure varies by bank, typically ranging from 15 to 30 years.</p>
              </div>
              <div>
                <p className="font-semibold">Q: What is the processing fee for a home loan?</p>
                <p>A: Processing fees vary between banks and are usually a percentage of the loan amount or a fixed amount.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmiCalculator;
