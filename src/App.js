import React, { useState } from 'react';
import './index'
<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>


const api={
  key:"430732e9865f0343283c891c7c92c71a",
  base:"https://api.openweathermap.org/data/2.5/"
}


function App() {


  const [query,setQuery]=useState('')
  const [weather,setWeather]=useState('')

  const search = evt => {
    document.querySelector('h1').style.display='none';
    if (evt.key === 'Enter'){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(weather);
      });
    }
  }



  const dateBuilder=(d)=>{
    let months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 
    
    let day =days[d.getDay()];
    let date =d.getDate();
    let month =months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`
  
  
  }
  return (
    <div className={(typeof weather.main != 'undefined') ?  (( weather.weather[0].main === 'Clouds' && weather.main.temp < 16 && weather.main.temp > 5 ) ? 'app cloud' : (( weather.weather[0].main === 'Clouds' && weather.main.temp > 16 )? 'app warm' : (( weather.weather[0].main === 'Rain')? 'app rain' : 'app cold'  ) ))
    : 'app'}>
       <h1>find the weather of your location!</h1>
      <main>
        <div className='search-box'>
          <input type='text' className='search-bar' placeholder='Search...' onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
        </div>
        {(typeof weather.main != 'undefined') ? (
        <div>
        <div className='location-box'>
            <div className='location'>{weather.name}, {weather.sys.country}</div>
            <div className='date'>{dateBuilder(new Date())}</div>
        </div>
        <div className='weather-box'> 
          <div className='temp'>
            {Math.round(weather.main.temp)}°C
          </div>
          <div className='weather'>{weather.weather[0].main}</div>
        </div>
        </div>
      ) : ('')}
      </main>
    </div>
  );
}

export default App;
