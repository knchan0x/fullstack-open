const Countries = ({ countries, handleShow }) => {
  if (Countries.length <= 10) {
    return (
      <div>
        {countries.map((country) => (
          <p key={country}>
            {country} <button onClick={() => handleShow(country)}>show</button>
          </p>
        ))}
      </div>
    );
  } else {
    return <p>Too many matches, specify another filter</p>;
  }
};

export default Countries;
