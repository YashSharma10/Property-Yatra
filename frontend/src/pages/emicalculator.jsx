import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rateOfInterest = parseFloat(interestRate) / 12 / 100;
    const tenureInMonths = parseInt(loanTenure) * 12;

    if (principal && rateOfInterest && tenureInMonths) {
      const emiValue =
        (principal * rateOfInterest * Math.pow(1 + rateOfInterest, tenureInMonths)) /
        (Math.pow(1 + rateOfInterest, tenureInMonths) - 1);
      const totalPayment = emiValue * tenureInMonths;
      const interest = totalPayment - principal;

      setEmi(emiValue.toFixed(2));
      setTotalInterest(interest.toFixed(2));
      setTotalAmount(totalPayment.toFixed(2));
    } else {
      setEmi(null);
      setTotalInterest(null);
      setTotalAmount(null);
    }
  };

  const resetCalculator = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTenure("");
    setEmi(null);
    setTotalInterest(null);
    setTotalAmount(null);
  };

  const pieChartData = {
    labels: ["Principal Amount", "Total Interest"],
    datasets: [
      {
        label: "Loan Breakdown",
        data: [loanAmount, totalInterest],
        backgroundColor: ["#333", "#bbb"],
        hoverBackgroundColor: ["#222", "#999"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white-900 text-white p-6">
      <h1 className="text-3xl font-bold text-black mb-6">EMI Calculator</h1>

      <div className="flex flex-col lg:flex-row bg-gray-500 shadow-md rounded-lg p-6 max-w-4xl w-full">
        {/* Calculator Section */}
        <div className="flex-1 p-4">
          <div className="mb-4">
            <label className="block text-gray-300 font-medium mb-2">
              Loan Amount (₹)
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter loan amount"
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 font-medium mb-2">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Enter interest rate"
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 font-medium mb-2">
              Loan Tenure (Years)
            </label>
            <input
              type="number"
              value={loanTenure}
              onChange={(e) => setLoanTenure(e.target.value)}
              placeholder="Enter tenure in years"
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={calculateEMI}
              className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition"
            >
              Calculate EMI
            </button>
            <button
              onClick={resetCalculator}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-400 transition"
            >
              Reset
            </button>
          </div>

          {emi && (
            <div className="mt-6 bg-gray-700 p-4 rounded-md text-center">
              <h2 className="text-lg font-bold text-white mb-2">
                Monthly EMI: ₹{emi}
              </h2>
              <p>Total Interest Payable: ₹{totalInterest}</p>
              <p>Total Payment: ₹{totalAmount}</p>
            </div>
          )}
        </div>

        {emi && (
          <div className="flex-1 flex justify-center items-center">
            <div className="w-64 h-64">
              <Pie data={pieChartData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EMICalculator;
