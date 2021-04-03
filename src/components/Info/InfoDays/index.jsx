import React from 'react';
import { Loader } from 'react-feather';
import switchIcon from '../../../modules/SwitchIcon';

import './InfoDays.scss';

const InfoDays = ({ weekDays }) => {

  const getDayName = (millsec) => {
    return new Date(millsec * 1000).toUTCString().slice(0, 3);
  }

  return (
    <div className="days">
      {!weekDays &&
        <div className="days__loading">
          <Loader />
        </div>
      }
      {weekDays &&
        weekDays.slice(1, 5).map((item, index) => {
          return (
            <div className="day" key={index}>
              <div className="day__icon">
                {switchIcon(item.weather[0].icon)}
              </div>
              <span className="day__name">
                {getDayName(item.dt)}
              </span>
              <span className="day__temp">
                {item.temp.day.toFixed(0)}°C
              </span>
            </div>
          )
        })
      }
    </div>
  )
}

export default InfoDays;
