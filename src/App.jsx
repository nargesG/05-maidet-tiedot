import countryServices from './services/countryServices';
import { useState } from 'react';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterString, setFilterString] = useState('');

  const handleSearchChange = async event => {
    const value = event.target.value;
    setFilterString(value);

    // Fetch countries only when user starts typing
    try {
      const fetchedCountries = await countryServices.getAll();

      // Check if number of filtered countries exceeds 10
      const matchedCountries = fetchedCountries.filter(
        (country) => country.name.common.toLowerCase().includes(value.toLowerCase())
      )

      console.log(matchedCountries);
      setCountries(matchedCountries);

    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  return (
    <>
      <label>Find countries</label>
      <input value={filterString} onChange={handleSearchChange} />

      {countries.length > 10 && 
        <p>Too many matches, specify another filter</p>
      }

      {(countries.length > 1 && countries.length <= 10) && 
        countries.map(({ name }) => <p key={name.common}>{name.common}</p>)
      }

      {countries.length === 1 && 
        <div>
          <h1>{countries[0].name.common}</h1>
          <p>Capital: {countries[0].capital[0]}</p>
          <p>Area: {countries[0].area}</p>
          <h2>Languages:</h2>
          <ul>
          {Object.keys(countries[0].languages).map((key) => 
            <li key={key}>{countries[0].languages[key]}</li>
          )
          }
          </ul>
          <img alt={countries[0].flags.alt} src={countries[0].flags.svg} width={200} height={150}/>
          
        </div>
      }
      
    </>
  );
};

export default App;
