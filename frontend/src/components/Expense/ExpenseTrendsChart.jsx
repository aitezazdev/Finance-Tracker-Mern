import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ExpenseTrendsChart = ({ data }) => {
  const hasValidData = Array.isArray(data) && data.length > 0;
  
  const chartData = hasValidData 
  ? data.map(item => {
      const parsedDate = new Date(item._id);
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const day = parsedDate.getDate();
      const month = parsedDate.getMonth();
      const year = parsedDate.getFullYear().toString().slice(-2);

      return {
        date: `${day} ${monthNames[month]} ${year}`,
        timestamp: parsedDate.getTime(),
        amount: typeof item.totalSpent === 'number' ? item.totalSpent : 0
      };

    })
  : [];

  chartData.sort((a, b) => a.timestamp - b.timestamp);


  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-md rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-800 mb-2">{label}</h4>
          <p className="text-purple-600 font-medium text-lg">
            Rs. {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {!hasValidData || chartData.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
          <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-lg font-medium">No trends data available</p>
          <p className="text-sm mt-1">Add some expenses to see your spending trends</p>
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart 
              data={chartData} 
              margin={{ top: 10, right: 30, left: 20, bottom: 70 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis className="text-sm"
                dataKey="date" 
                angle={-45} 
                textAnchor="end" 
                height={70}
                tick={{ fontSize: 12 }}
              />
              <YAxis className="text-sm"
                tickFormatter={(value) => `Rs.${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#8884d8" 
                strokeWidth={2}
                dot={{ r: 4, fill: "#8884d8" }}
                activeDot={{ r: 6, fill: "#8884d8" }}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <p className="text-sm text-purple-700 mb-1">Highest Day</p>
              <p className="text-lg font-semibold">
                {chartData.slice().sort((a, b) => b.amount - a.amount)[0]?.date || "N/A"}
              </p>
              <p className="text-gray-600 text-sm">
                Rs. {chartData.slice().sort((a, b) => b.amount - a.amount)[0]?.amount.toLocaleString() || "0"}
              </p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <p className="text-sm text-indigo-700 mb-1">Lowest Day</p>
              <p className="text-lg font-semibold">
                {chartData.slice().sort((a, b) => a.amount - b.amount)[0]?.date || "N/A"}
              </p>
              <p className="text-gray-600 text-sm">
                Rs. {chartData.slice().sort((a, b) => a.amount - b.amount)[0]?.amount.toLocaleString() || "0"}
              </p>
            </div>
            {/* <div className="bg-violet-50 p-4 rounded-lg border border-violet-100">
              <p className="text-sm text-violet-700 mb-1">Monthly Average</p>
              <p className="text-lg font-semibold">
                ${(chartData.reduce((sum, item) => sum + item.amount, 0) / chartData.length).toFixed(2)}
              </p>
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseTrendsChart;