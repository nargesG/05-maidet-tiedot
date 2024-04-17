import countryServices from './services/countryServices';
import { useState } from 'react';
import "./index.css";
import { useEffect } from 'react';
import ShortView from './components/ShortView';


const App = () => {
  const [all, setAll] = useState([]);

  const [countries, setCountries] = useState([]);
  const [filterString, setFilterString] = useState('');

  useEffect(() => {
    const call = async () => {
      try {
        const fetchedCountries = await countryServices.getAll();
        setAll(fetchedCountries)
        
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    }
    call();
    
  }, [])
  
  const handleSearchChange = async event => {
    const value = event.target.value;
    setFilterString(value);
    
    const matchedCountries = all.filter(
      (country) => country.name.common.toLowerCase().includes(value.toLowerCase())
    )
    setCountries(matchedCountries);
  };

  
  

  return (
    <>
      <div className='searchCountries'>
        <label>Find countries</label>
        <input value={filterString} onChange={handleSearchChange} />
      </div>

      {countries.length > 10 && 
        <p>Too many matches, specify another filter</p>
      }

      {(countries.length > 1 && countries.length <= 10) && 
        countries.map((country) => (<div key={country.name.common}>
          <p>
            {country.name.common}
            <button onClick={() => setCountries([country])}>Show</button>
          </p>
        </div>
        ))
      }

      {countries.length === 1 && <ShortView country={countries[0]} /> }
      
    </>
  );
};

export default App;
