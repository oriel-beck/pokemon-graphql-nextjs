export const convertToLb = (num: number) => (num * 2.20462).toFixed(2);
export const convertToFt = (num: number) => metersToFeetAndInches(num);

function metersToFeetAndInches(meters: number) {
    // Conversion factors
    const feetPerMeter = 3.28084;
    const inchesPerFoot = 12;
  
    // Calculate the number of feet and remaining decimal fraction of a foot
    const feet = Math.floor(meters * feetPerMeter);
    const remainingFraction = (meters * feetPerMeter - feet) * inchesPerFoot;
  
    // Calculate the number of inches
    const inches = Math.round(remainingFraction);
  
    return `${feet}'${inches.toString().padStart(2, '0')}"`;
  }
  