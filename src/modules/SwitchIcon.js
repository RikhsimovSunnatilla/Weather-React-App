import { Loader, Sun, Cloud, CloudRain, CloudSnow, CloudLightning } from 'react-feather';

const switchIcon = (iconId) => {
  switch (iconId) {
    case '01d':
    case '01n':
    case '02d':
    case '02n':
      return <Sun />;
    case '03d':
    case '03n':
    case '04d':
    case '04n':
    case '50d':
    case '50n':
      return <Cloud />;
    case '09d':
    case '09n':
    case '10d':
    case '10n':
      return <CloudRain />;
    case '13d':
    case '13n':
      return <CloudSnow />;
    case '11d':
    case '11n':
      return <CloudLightning />;
    default:
      return <Loader />
  }
}

export default switchIcon;
