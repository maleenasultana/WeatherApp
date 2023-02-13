import './App.css';
import React,{ useEffect, useState } from 'react';
import WeatherDay from '../src/weather/WeatherDay';
import styles from "./styles.module.css"
import {API_KEY} from './const'
import LocationSearch from './LocationSearch/LocationSearch';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [weatherInfo, setWeatherInfo] = useState();
  const [locationKey, setLocationKey] = useState();
  const [location, setLocation] = useState('');

 
  

  const padnum = (num) => {
    const stringNum = num + '';
    const stringLen = stringNum.length;
    if(stringLen === 1) {
      return '0' + stringNum;  
    }else {
      return stringNum;
    }
  }
  const apikey = API_KEY;

  useEffect(() => {
    const daysOfWeek = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday','Friday','Saturday'
    ]

    if (locationKey) {
      fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/locationKey=${locationKey}?apikey=${apikey}`)
      .then(res => res.json())
      .then(res => 
        setWeatherInfo(res.DailyForecasts.map(df => {
        return {
          min: df.Temperature.Minimum.Value,
          max: df.Temperature.Maximum.Value,
          weatherType: df.Day.IconPhrase,
          weatherKey: padnum(df.Day.Icon),
          dayOfWeek: daysOfWeek[new Date(df.Date).getDay()],

        }
      })))
    }
  
  }, [locationKey, apikey])

  // useEffect(()=> {
  //   console.log(weatherInfo);
  // }, [weatherInfo])

  return (
    <div className={styles.container}>
      <div>
  <LocationSearch 
  onCityFound={cityInfo => {
   setLocationKey(cityInfo.key)
   setLocation(cityInfo.name + ', ' + cityInfo.state )
  }}/>
<div className={styles.header}>
<h1 className='text-muted'>{location}</h1> 
</div>

    <div className={styles.main}>
     
      {
        !!weatherInfo && weatherInfo.map((i, index) => (
          <div key={index}>
            <WeatherDay 
            min={i.min} 
            max={i.max} 
            weatherType={i.weatherType} 
            weatherKey={i.weatherKey}
            dayOfWeek = {i.dayOfWeek} />
          </div>
        ))
      }
    </div>
    </div>
    </div>
  
  );
}



export default App;