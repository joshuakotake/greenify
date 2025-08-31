import React, { useMemo } from "react";
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

const WeeklyCO2Chart = ({ trips, dailyBudget = 10 }) => {
  // Calculate daily savings for the past 7 days
  const weeklyData = useMemo(() => {
    const days = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const day = new Date(now);
      day.setDate(now.getDate() - i);
      const dayStr = day.toISOString().slice(0, 10);
      const savings = trips
        .filter((t) => t.date && t.date.slice(0, 10) === dayStr)
        .reduce((sum, t) => sum + (t.co2Saved || t.co2_saved_kg || 0), 0);
      days.push({
        day: day.toLocaleDateString(undefined, { weekday: "short" }),
        savings,
        goal: dailyBudget,
      });
    }
    return days;
  }, [trips, dailyBudget]);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const metGoal = data.savings >= data.goal;

      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-600">
            Saved:{" "}
            <span className="font-medium">
              {data.savings.toFixed(1)} kg CO₂
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Goal: <span className="font-medium">{data.goal} kg CO₂</span>
          </p>
          <p
            className={`text-sm font-medium ${
              metGoal ? "text-blue-600" : "text-orange-600"
            }`}
          >
            {metGoal
              ? `Goal achieved! +${(data.savings - data.goal).toFixed(
                  1
                )} kg extra`
              : `${(data.goal - data.savings).toFixed(1)} kg to reach goal`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Calculate weekly stats and max value for Y-axis
  const totalSavings = weeklyData.reduce((sum, day) => sum + day.savings, 0);
  const totalGoal = weeklyData.length * dailyBudget;
  const daysGoalMet = weeklyData.filter(
    (day) => day.savings >= day.goal
  ).length;

  // Calculate Y-axis domain to ensure goal line is always visible
  const maxSavings = Math.max(...weeklyData.map((day) => day.savings));
  const yAxisMax = Math.max(12, Math.ceil(maxSavings + 2));

  return (
    <div className="w-full max-w-4xl mx-auto bg-white">
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm text-green-600 font-medium">
              Total Saved
            </div>
            <div className="text-2xl font-bold text-green-900">
              {totalSavings.toFixed(1)} kg CO₂
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-blue-600 font-medium">Weekly Goal</div>
            <div className="text-2xl font-bold text-blue-900">
              {totalGoal} kg CO₂
            </div>
          </div>
          <div
            className={`p-4 rounded-lg ${
              daysGoalMet >= 4 ? "bg-blue-50" : "bg-orange-50"
            }`}
          >
            <div
              className={`text-sm font-medium ${
                daysGoalMet >= 4 ? "text-blue-600" : "text-orange-600"
              }`}
            >
              Target Achieved
            </div>
            <div
              className={`text-2xl font-bold ${
                daysGoalMet >= 4 ? "text-blue-900" : "text-orange-900"
              }`}
            >
              {daysGoalMet}/7
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
              tick={{ fontSize: 12, fill: "#6b7280", textAnchor: "middle" }}
            />
            <YAxis
              domain={[0, yAxisMax]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              label={{
                value: "CO₂ Saved (kg)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Goal reference line */}
            <ReferenceLine
              y={dailyBudget}
              stroke="#3b82f6"
              strokeDasharray="4 4"
              strokeWidth={2}
            />

            <Bar dataKey="savings" radius={[4, 4, 0, 0]}>
              {weeklyData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.savings >= entry.goal ? "#3b82f6" : "#10b981"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* 
      {/* Legend and weekly summary */}
      <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Below Goal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">Goal Achieved</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-1 bg-blue-400 rounded"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, #3b82f6 0, #3b82f6 4px, transparent 4px, transparent 8px)",
              }}
            ></div>
            <span className="text-sm text-gray-600">Daily Goal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCO2Chart;
