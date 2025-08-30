import React from 'react';
import { getEmissionColor, EMISSION_FACTORS } from '../../utils/emissions-calculator';

const TRANSPORT_ICONS = {
  car_petrol: '🚗',
  car_diesel: '🚙', 
  car_electric: '⚡',
  car_hybrid: '🔋',
  motorcycle: '🏍️',
  bus: '🚌',
  train: '🚊',
  plane_domestic: '✈️',
  plane_international: '🌍',
  bike: '🚲',
  walking: '🚶'
};

export default function EmissionList({ emissions }) {
  const totalEmissions = emissions.reduce((sum, emission) => sum + emission.co2_kg, 0);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Your Emissions</h3>
        <div className="text-right">
          <div className="text-sm text-gray-600">Total</div>
          <div className={`text-lg font-bold ${getEmissionColor(totalEmissions)}`}>
            {totalEmissions.toFixed(1)} kg CO2
          </div>
        </div>
      </div>
      
      {emissions.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          No emissions tracked yet. Add your first trip above! 🌱
        </div>
      ) : (
        <div className="space-y-3">
          {emissions.map((emission) => (
            <div key={emission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">
                  {TRANSPORT_ICONS[emission.subcategory] || '🚗'}
                </span>
                <div>
                  <div className="font-medium capitalize">
                    {emission.subcategory?.replace('_', ' ')}
                  </div>
                  <div className="text-sm text-gray-600">
                    {emission.amount} km • {new Date(emission.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className={`font-bold ${getEmissionColor(emission.co2_kg)}`}>
                {emission.co2_kg} kg
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}