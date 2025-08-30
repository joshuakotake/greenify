import React from 'react';

const CO2ProgressBar = ({ 
  currentUsage = 12.5, 
  dailyBudget = 20, 
  unit = 'kg CO2' 
}) => {
  const progressPercentage = Math.min((currentUsage / dailyBudget) * 100, 100);
  const isOverBudget = currentUsage > dailyBudget;
  
  // Color logic: green when under 70%, yellow 70-90%, red when over 90% or over budget
  const getProgressColor = () => {
    if (isOverBudget) return 'bg-red-500';
    if (progressPercentage >= 90) return 'bg-red-400';
    if (progressPercentage >= 70) return 'bg-yellow-400';
    return 'bg-green-500';
  };

  const getBackgroundColor = () => {
    if (isOverBudget) return 'bg-red-100';
    if (progressPercentage >= 90) return 'bg-red-50';
    if (progressPercentage >= 70) return 'bg-yellow-50';
    return 'bg-green-50';
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Daily Carbon Budget
        </h3>
        <div className="flex justify-between items-baseline">
          <span className="text-2xl font-bold text-gray-900">
            {currentUsage.toFixed(1)} {unit}
          </span>
          <span className="text-sm text-gray-600">
            of {dailyBudget} {unit}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className={`w-full h-8 rounded-full ${getBackgroundColor()} overflow-hidden`}>
          <div 
            className={`h-full transition-all duration-500 ease-out ${getProgressColor()}`}
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
          {/* Overflow indicator if over budget */}
          {isOverBudget && (
            <div 
              className="absolute top-0 left-0 h-full bg-red-600 opacity-20 animate-pulse"
              style={{ width: '100%' }}
            />
          )}
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
        {isOverBudget ? (
          <div className="text-red-600 text-sm font-medium">
            ⚠️ Over budget by {(currentUsage - dailyBudget).toFixed(1)} {unit}
          </div>
        ) : (
          <div className="text-green-600 text-sm">
            ✓ {(dailyBudget - currentUsage).toFixed(1)} {unit} remaining
          </div>
        )}
      </div>

      {/* Quick stats */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              Used Today
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {progressPercentage.toFixed(0)}%
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              Budget Status
            </div>
            <div className={`text-lg font-semibold ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
              {isOverBudget ? 'Over' : 'Under'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CO2ProgressBar;