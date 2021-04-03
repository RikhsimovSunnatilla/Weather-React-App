import React from 'react';
import { MapPin } from 'react-feather';
import switchIcon from '../../modules/SwitchIcon';

import './Weather.scss';

const Weather = ({ day, date, place, icon, temp, condit }) => {

  return (
    <div className="weather">
      <div className="weather__gradient"></div>
      <div className="weather__top">
        <h3 className="weather__day">{day}</h3>
        <span className="weather__date">{date}</span>
        <span className="weather__city"><MapPin />{place}</span>
      </div>
      <div className="weather__bottom">
        <div className="weather__icon">{switchIcon(icon)}</div>
        <h1 className="weather__temp">{temp}°C</h1>
        <span className="weather__desc">{condit}</span>
      </div>
    </div>
  );
}

export default Weather;
