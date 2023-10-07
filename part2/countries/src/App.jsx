import { useState, useEffect } from "react";

import Countries from "./components/Countries";
import Summary from "./components/Summary";

import CountryService from "./services/country";
import WeatherService from "./services/weather";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [criteria, setCriteria] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [details, setDetails] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    CountryService.getAll().then((response) => {
      setCountries(response.map((e) => e.name.common));
    });
  }, []);

  useEffect(() => {
    if (country) {
      CountryService.get(country).then((response) => {
        setDetails(response);
        WeatherService.getWeather(response.capital[0]).then((response) => {
          setWeather(response);
        });
      });
    }
  }, [country]);

  useEffect(() => {
    if (filtered.length === 1) {
      setCountry(filtered[0]);
    }
  }, [filtered]);

  const handleSearchChange = (event) => {
    setCriteria(event.target.value);
    setCountry(null);
    setDetails(null);
    setWeather(null);
    setFiltered(
      countries.filter((e) =>
        e.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const handleShow = (selected) => {
    setFiltered([selected]);
  };

  return (
    <div>
      find countries <input value={criteria} onChange={handleSearchChange} />
      {filtered.length !== 1 ? (
        <Countries countries={filtered} handleShow={handleShow} />
      ) : details && weather ? (
        <Summary country={details} weather={weather} />
      ) : (
        <p>loading</p>
      )}
    </div>
  );
};

export default App;
