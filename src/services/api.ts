export async function getAllRates(){
  const response = await fetch('https://v6.exchangerate-api.com/v6/6e2c522ebe1303dd1af254c0/latest/AOA');
  const rates = await response.json();
  return rates;
}

export async function convertRates(baseCode: string, convertionRate: string, amount: number){
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/6e2c522ebe1303dd1af254c0/pair/${baseCode}/${convertionRate}/${amount}`
    );
    const convertedRates = await response.json();
    return convertedRates;
}

export async function getCountries() {
  const response = await fetch('https://flagcdn.com/en/codes.json');
  const contries = await response.json();
  return contries;
}