/* ---------------------------------------------------------------------------------------
calculateAge.js
This utility is used to calculate the age of the users for specific actions that require adult oversight 
------------------------------------------------------------------------------------------ */

function calculateAge(birthDateString) {
  const today = new Date();
  const birthDate = new Date(birthDateString); // Parsing the date string

  let age = today.getFullYear() - birthDate.getFullYear(); // Year difference
  const monthDiff = today.getMonth() - birthDate.getMonth(); // Month difference

  // Adjusting if birthday hasn't happened yet this year
  if (
    monthDiff < 0 || // either it's in the coming month
    (monthDiff === 0 && today.getDate() < birthDate.getDate()) // or it's in the same month but the coming days
  ) {
    age--;
  }

  return age;
}

export default calculateAge;
