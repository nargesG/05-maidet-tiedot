import axios from 'axios';

const getWeather = (lat, lon) => {
  const apiKey = '562aa7a775b43a43e788a9c62fba043d';
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );
  return request.then((response) => {
    return response.data;
  });
};

export default { getWeather };
