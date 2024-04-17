import Weather from './Weather';

const ShortView = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.keys(country.languages).map((key) => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>
      <img
        alt={country.flags.alt}
        src={country.flags.svg}
        width={200}
        height={150}
      />
      <h2>Weather in {country.capital}</h2>
      <Weather
        lat={country.capitalInfo.latlng[0]}
        lng={country.capitalInfo.latlng[1]}
      />
    </div>
  );
};

export default ShortView;
