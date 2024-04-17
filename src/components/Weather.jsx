import { useEffect, useState } from 'react';
import weatherServices from '../services/weatherServices';

const Weather = ({ lat, lng }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const call = async () => {
      try {
        const weather = await weatherServices.getWeather(lat, lng);
        setWeather(weather);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    call();
  }, []);

  return (
    <>
      {weather.main && (
        <>
          <p>temprature {weather.main.temp} Celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <p>wind {weather.wind.speed} m/s</p>
        </>
      )}
    </>
  );
};

export default Weather;
