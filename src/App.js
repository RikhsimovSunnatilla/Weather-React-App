import React, { useState, useEffect } from 'react';
import axios from 'axios';
import switchDay from './modules/SwitchDay';

import Weather from './components/Weather';
import Info from './components/Info';

import './App.scss';


const WEATHER_API_KEY = '59ef8d4a613a8e7f16322ee89944d278';
const GEO_API_KEY = '9b245597a500403a8befba9c69784f2e';

function App() {
  const [weekDays, setWeekDays] = useState(null);
  const [time, setTime] = useState({ day: 'Loading...', date: 'Loading...' });
  const [place, setPlace] = useState('Tashkent');
  const [desc, setDesc] = useState({
    iconId: 0,
    temp: 0,
    condition: 'Loading...'
  });
  const [stat, setStat] = useState({
    pressure: 0,
    humidity: 0,
    wind: 0
  });
  const [location, setLocation] = useState({lat: 41.2646, lng: 69.2163});

  const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lng}&exclude=current,minutely,hourly,alerts&appid=${WEATHER_API_KEY}&units=metric`;

  const getGeoLocation = () => {
    const newPlace = window.prompt('Enter a city name:', place);
    if (newPlace) {
      axios(`https://api.opencagedata.com/geocode/v1/json?q=${newPlace}&language=en&no_annotations=1&key=${GEO_API_KEY}`)
      .then(({ data }) => {
        const isNotEmpty = data.results !== [];
        const isCity = data.results[0].components._type === 'city';
        const isTown = data.results[0].components._type === 'town';
        if (isNotEmpty && isCity || isTown) {
          setPlace(data.results[0].formatted);
          fetchTemp(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.results[0].geometry.lat}&lon=${data.results[0].geometry.lng}&exclude=current,minutely,hourly,alerts&appid=${WEATHER_API_KEY}&units=metric`);
        } else {
          alert('Please enter a valid city name!');
        }
      })
      .catch(() => alert(404));
    }
  }

const fetchTemp = async (weatherUrl) => {
  const response = await axios(weatherUrl);
  const { data } = response;

  const millsec = data.daily[0].dt * 1000;
  const date = new Date(millsec).toUTCString().slice(5, 16);
  const dayId = new Date(millsec).getDay();
  setTime({ day: switchDay(dayId), date: date });

  setDesc({
    iconId: data.daily[0].weather[0].icon,
    temp: data.daily[0].temp.day.toFixed(0),
    condition: data.daily[0].weather[0].main
  });

  setStat({
    pressure: data.daily[0].pressure,
    humidity: data.daily[0].humidity,
    wind: data.daily[0].wind_speed.toFixed(1)
  });

  setWeekDays(data.daily);
}

useEffect(() => {
  fetchTemp(weatherUrl);
}, []);

return (
  <div className="container">
    <Weather
      day={time.day}
      date={time.date}
      place={place}
      icon={desc.iconId}
      temp={desc.temp}
      condit={desc.condition}
    />
    <Info
      weekDays={weekDays}
      pressure={stat.pressure}
      humidity={stat.humidity}
      wind={stat.wind}
      getGeo={getGeoLocation}
    />
  </div>
);
}

export default App;
