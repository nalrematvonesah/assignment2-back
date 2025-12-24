const axios = require("axios");

const RANDOM_USER_URL = "https://randomuser.me/api/";
const COUNTRIES_URL = "https://restcountries.com/v3.1/name/";
const NEWS_URL = "https://newsapi.org/v2/everything";
const EXCHANGE_URL = "https://v6.exchangerate-api.com/v6";

async function getRandomUser() {
  const res = await axios.get(RANDOM_USER_URL);
  const user = res.data.results[0];

  return {
    firstName: user.name.first,
    lastName: user.name.last,
    gender: user.gender,
    age: user.dob.age,
    dob: user.dob.date.split("T")[0],
    city: user.location.city,
    country: user.location.country,
    address: `${user.location.street.name} ${user.location.street.number}`,
    picture: user.picture.large,
  };
}

async function getCountryData(countryName) {
  const res = await axios.get(`${COUNTRIES_URL}${countryName}`);
  const country = res.data[0];

  const currencyCode = Object.keys(country.currencies || {})[0];

  return {
    name: country.name.common,
    capital: country.capital?.[0] || "N/A",
    languages: Object.values(country.languages || {}),
    currency: currencyCode,
    flag: country.flags.svg,
  };
}

async function getExchangeRates(currency) {
  const res = await axios.get(
    `${EXCHANGE_URL}/${process.env.EXCHANGE_API_KEY}/latest/${currency}`
  );

  return {
    USD: res.data.conversion_rates.USD,
    KZT: res.data.conversion_rates.KZT,
  };
}

async function getNews(country) {
  const res = await axios.get(NEWS_URL, {
    params: {
      q: country,
      language: "en",
      pageSize: 5,
      apiKey: process.env.NEWS_API_KEY,
    },
  });

  return res.data.articles.map(article => ({
    title: article.title,
    description: article.description,
    image: article.urlToImage,
    url: article.url,
  }));
}

async function getFullUserData() {
  const user = await getRandomUser();
  const country = await getCountryData(user.country);
  const exchange = await getExchangeRates(country.currency);
  const news = await getNews(user.country);

  return {
    user,
    country,
    exchange,
    news,
  };
}

module.exports = { getFullUserData };
