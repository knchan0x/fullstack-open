import axios from "axios";

const key = import.meta.env.VITE_WEATHER_API_KEY
const baseUrl = `https://api.openweathermap.org/data/2.5`;

const getWeather = (city) =>
  axios
    .get(`${baseUrl}/weather?q=${city}&units=metric&appid=${key}`)
    .then((response) => response.data);

export default { getWeather };
