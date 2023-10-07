import Weather from "./Weather";
import Details from "./details";

const Summary = ({ country, weather }) => {
  return (
    <div>
      <Details country={country} />
      <Weather city={weather} />
    </div>
  );
};

export default Summary;
