import React, { useState } from 'react';
import { calculateEmissions, getEmissionColor, formatEmissionComparison } from '../../utils/emissions-calculator';

export default function EmissionForm({ onSubmit }) {
  const [subcategory, setSubcategory] = useState('car_petrol');
  const [amount, setAmount] = useState('');
  
  const co2Amount = calculateEmissions('transport', parseFloat(amount) || 0, subcategory);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && co2Amount >= 0) {
      onSubmit({
        category: 'transport',
        subcategory,
        amount: parseFloat(amount),
        co2_kg: co2Amount,
        date: new Date().toISOString(),
        timestamp: new Date()
      });
      setAmount('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">🌱 Add Trip</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transport Type
          </label>
          <select 
            value={subcategory} 
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="car_petrol">🚗 Petrol Car</option>
            <option value="car_diesel">🚙 Diesel Car</option>
            <option value="car_electric">⚡ Electric Car</option>
            <option value="car_hybrid">🔋 Hybrid Car</option>
            <option value="motorcycle">🏍️ Motorcycle</option>
            <option value="bus">🚌 Bus</option>
            <option value="train">🚊 Train</option>
            <option value="plane_domestic">✈️ Domestic Flight</option>
            <option value="plane_international">🌍 International Flight</option>
            <option value="bike">🚲 Bike</option>
            <option value="walking">🚶 Walking</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Distance (km)
          </label>
          <input
            type="number"
            placeholder="How far did you travel?"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            min="0"
            step="0.1"
          />
        </div>
        
        {amount && co2Amount >= 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className={`text-lg font-bold ${getEmissionColor(co2Amount)}`}>
              {formatEmissionComparison(co2Amount)}
            </div>
          </div>
        )}
        
        <button 
          type="submit"
          disabled={!amount}
          className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Add Trip 🌿
        </button>
      </form>
    </div>
  );
}