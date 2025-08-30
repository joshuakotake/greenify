import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";

const WeeklyCO2Chart = ({ dailyBudget = 20 }) => {
  // Hardcoded sample data - replace with real data later
  const weeklyData = [
    { day: "Mon", usage: 18.5, budget: dailyBudget },
    { day: "Tue", usage: 22.3, budget: dailyBudget },
    { day: "Wed", usage: 15.7, budget: dailyBudget },
    { day: "Thu", usage: 25.1, budget: dailyBudget },
    { day: "Fri", usage: 19.2, budget: dailyBudget },
    { day: "Sat", usage: 12.8, budget: dailyBudget },
    { day: "Sun", usage: 16.4, budget: dailyBudget },
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isOverBudget = data.usage > data.budget;

      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-600">
            Usage:{" "}
            <span className="font-medium">{data.usage.toFixed(1)} kg CO2</span>
          </p>
          <p className="text-sm text-gray-600">
            Budget: <span className="font-medium">{data.budget} kg CO2</span>
          </p>
          <p
            className={`text-sm font-medium ${
              isOverBudget ? "text-red-600" : "text-green-600"
            }`}
          >
            {isOverBudget
              ? `Over by ${(data.usage - data.budget).toFixed(1)} kg`
              : `Under by ${(data.budget - data.usage).toFixed(1)} kg`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Calculate weekly stats
  const totalUsage = weeklyData.reduce((sum, day) => sum + day.usage, 0);
  const totalBudget = weeklyData.length * dailyBudget;
  const daysOverBudget = weeklyData.filter(
    (day) => day.usage > day.budget
  ).length;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Weekly Carbon Footprint Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-blue-600 font-medium">Total Usage</div>
            <div className="text-2xl font-bold text-blue-900">
              {totalUsage.toFixed(1)} kg CO2
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 font-medium">
              Weekly Budget
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {totalBudget} kg CO2
            </div>
          </div>
          <div
            className={`p-4 rounded-lg ${
              daysOverBudget > 0 ? "bg-red-50" : "bg-green-50"
            }`}
          >
            <div
              className={`text-sm font-medium ${
                daysOverBudget > 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              Days Over Budget
            </div>
            <div
              className={`text-2xl font-bold ${
                daysOverBudget > 0 ? "text-red-900" : "text-green-900"
              }`}
            >
              {daysOverBudget}/7
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="h-70 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={weeklyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              label={{
                value: "CO2 Usage (kg)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Budget reference line */}
            <ReferenceLine
              y={dailyBudget}
              stroke="#ef4444"
              strokeDasharray="4 4"
              strokeWidth={2}
            />

            <Bar dataKey="usage" radius={[4, 4, 0, 0]}>
              {weeklyData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.usage > entry.budget ? "#ef4444" : "#10b981"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* 
      {/* Legend and weekly summary */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Under Budget</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-600">Over Budget</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-1 bg-red-400 rounded"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, #ef4444 0, #ef4444 4px, transparent 4px, transparent 8px)",
              }}
            ></div>
            <span className="text-sm text-gray-600">Daily Limit</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCO2Chart;
