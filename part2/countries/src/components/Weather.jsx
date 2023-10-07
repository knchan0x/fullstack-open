const Weather = ({ city }) => {
  return (
    <div>
      <h2>Weather in {city.name}</h2>
      <p>temperature {city.main.temp}</p>
      <img
        src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
        alt={city.weather[0].description}
      />
      <p>wind {city.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
