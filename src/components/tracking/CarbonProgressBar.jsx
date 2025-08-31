import React from "react";

const CarbonSavingsProgressBar = ({
  currentUsage = 12.5,
  dailyBudget = 20,
  unit = "kg CO₂",
}) => {
  // Rename variables for clarity - currentUsage is actually currentSavings
  const currentSavings = currentUsage;
  const dailySavingGoal = dailyBudget;

  const progressPercentage = Math.min(
    (currentSavings / dailySavingGoal) * 100,
    100
  );
  const hasMetGoal = currentSavings >= dailySavingGoal;

  // Color logic: green when making good progress, blue when goal met/exceeded
  const getProgressColor = () => {
    if (hasMetGoal) return "bg-blue-500";
    if (progressPercentage >= 75) return "bg-green-500";
    if (progressPercentage >= 50) return "bg-green-400";
    return "bg-yellow-300";
  };

  const getBackgroundColor = () => {
    if (hasMetGoal) return "bg-blue-50";
    return "bg-green-50";
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white">
      <div className="mb-4">
        <div className="flex justify-between items-baseline">
          <span className="text-2xl font-bold text-gray-900">
            {currentSavings.toFixed(1)} {unit}
          </span>
          <span className="text-sm text-gray-600">
            of {dailySavingGoal} {unit} goal
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div
          className={`w-full h-8 rounded-full ${getBackgroundColor()} overflow-hidden`}
        >
          <div
            className={`h-full transition-all duration-500 ease-out ${getProgressColor()}`}
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>

        {/* Percentage text overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-800">
            {progressPercentage.toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Status message */}
      <div className="mt-3 text-center">
        {hasMetGoal ? (
          <div className="text-blue-600 text-sm font-medium">
            🎉 Goal achieved! Saved{" "}
            {(currentSavings - dailySavingGoal).toFixed(1)} {unit} extra
          </div>
        ) : (
          <div className="text-green-700 text-sm">
            {(dailySavingGoal - currentSavings).toFixed(1)} {unit} to reach goal
          </div>
        )}
      </div>

      {/* Quick stats */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              Saved Today
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {progressPercentage.toFixed(0)}%
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              Goal Status
            </div>
            <div
              className={`text-lg font-semibold ${
                hasMetGoal ? "text-blue-600" : "text-green-600"
              }`}
            >
              {hasMetGoal ? "Achieved" : "In Progress"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonSavingsProgressBar;
