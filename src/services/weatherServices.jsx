import axios from 'axios';

const getWeather = (lat, lon) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`
  );
  return request.then((response) => {
    return response.data;
  });
};

export default { getWeather };
