export const EMISSION_FACTORS = {
    // Transport (kg CO2 per km)
    car_petrol: 0.20,
    car_diesel: 0.18,
    car_electric: 0.07,
    car_hybrid: 0.14,
    motorcycle: 0.11,
    bus: 0.08,
    train: 0.04,
    plane_domestic: 0.27,
    plane_international: 0.17,
    bike: 0,
    walking: 0,
  };
  
  export function calculateEmissions(category, amount, subcategory = null) {
    const factor = EMISSION_FACTORS[subcategory || category];
    if (!factor) return 0;
    
    return Math.round((amount * factor) * 100) / 100;
  }
  
  export function getEmissionColor(co2Amount) {
    if (co2Amount < 5) return 'text-green-600';
    if (co2Amount < 20) return 'text-yellow-600';
    return 'text-red-600';
  }
  
  export function formatEmissionComparison(co2Kg) {
    if (co2Kg < 1) return `${Math.round(co2Kg * 1000)}g CO2`;
    if (co2Kg < 10) return `${co2Kg}kg CO2 (like charging your phone ${Math.round(co2Kg * 200)} times)`;
    if (co2Kg < 50) return `${co2Kg}kg CO2 (like leaving a light on for ${Math.round(co2Kg * 50)} hours)`;
    return `${co2Kg}kg CO2 (like driving ${Math.round(co2Kg / 0.21)}km in a petrol car)`;
  }