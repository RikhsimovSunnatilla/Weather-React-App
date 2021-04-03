import React from 'react';
import { MapPin } from 'react-feather';

import InfoDays from './InfoDays';
import './Info.scss';

const Info = ({ pressure, humidity, wind, weekDays, getGeo }) => {
  return (
    <div className="info">
      <div className="info__container">
        <div className="info__wrapper">
          <span className="info__title">PRESSURE</span>
          <span className="info__value">{pressure} hPa</span>
        </div>
        <div className="info__wrapper">
          <span className="info__title">HUMIDITY</span>
          <span className="info__value">{humidity} %</span>
        </div>
        <div className="info__wrapper">
          <span className="info__title">WIND</span>
          <span className="info__value">{wind} m/s</span>
        </div>
      </div>
      <InfoDays weekDays={weekDays} />
      <button className="info__btn" onClick={getGeo}>
        <MapPin />
        Change location
      </button>
    </div>
  );
}

export default Info;
