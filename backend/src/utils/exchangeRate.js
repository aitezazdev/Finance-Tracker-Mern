import axios from "axios";

export const getExchangeRate = async (fromCurrency, toCurrency) => {
  const apiKey = process.env.EXCHANGE_API_KEY;
  const response = await axios.get(
    `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`
  );

  const rates = response.data.conversion_rates;
  if (!rates || !rates[toCurrency]) {
    throw new Error(
      `Conversion rate from ${fromCurrency} to ${toCurrency} not found.`
    );
  }

  return rates[toCurrency];
};
