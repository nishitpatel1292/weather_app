import React, { useEffect, useRef, useState } from 'react'
import searchIcon from './search.svg'
import WeatherData from './WeatherData'
import linkIcon from './external-link.svg'
const Main = () => {
    const inputValue = useRef();
    const [cityName, setCityName] = useState("Mumbai");
    const [error, setError] = useState(true)
    // const [lang, setLang] = useState(true)
    const [myData, setMyData] = useState([])
    const [cityDetails, setCityDetails] = useState([])
    const [dataWeather, setDataWeather] = useState([])
    const [windData, setWindData] = useState([]);
    const[isToday,setIsToday] = useState(true);
    const APP_KEY = "f99de037cea28e50166e4980c7a3c17e";
    //APP_KEY should be kept in .env file 
    // I am keeping here because of the convenience for evaluater for now as .env is not generally included in git

    const weatherBackgrounds = {
        "Clear": "https://images.unsplash.com/photo-1527824219416-62ecc4122e3b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNsZWFyJTIwc2t5JTIwYmxhY2t8ZW58MHwwfDB8fHww",
        "Clouds": "https://plus.unsplash.com/premium_photo-1669750812848-e43175c0d3a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2xvdWRzJTIwYmxhY2t8ZW58MHwwfDB8fHww",
        "Rain": "https://plus.unsplash.com/premium_photo-1670002482706-29a3ba4059a6?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "Drizzle": "https://images.unsplash.com/photo-1608890306831-58efdc14450b?q=80&w=1754&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "Thunderstorm": "https://plus.unsplash.com/premium_photo-1670002482706-29a3ba4059a6?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "Snow": "https://images.unsplash.com/photo-1542362690-a2988840aaa1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNub3clMjAlMjBibGFja3xlbnwwfDB8MHx8fDA%3D",
        "Mist": "https://images.unsplash.com/photo-1542362690-a2988840aaa1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNub3clMjAlMjBibGFja3xlbnwwfDB8MHx8fDA%3D",
        "Smoke": "https://images.unsplash.com/photo-1542362690-a2988840aaa1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNub3clMjAlMjBibGFja3xlbnwwfDB8MHx8fDA%3D",
        "Haze": "https://images.unsplash.com/photo-1518963274633-c6ae33c76e0d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "Dust": "https://images.unsplash.com/photo-1463171515643-952cee54d42a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGR1c3QlMjBibGFja3xlbnwwfDB8MHx8fDA%3D",
        "Fog": "https://images.unsplash.com/photo-1463171515643-952cee54d42a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGR1c3QlMjBibGFja3xlbnwwfDB8MHx8fDA%3D",
        "Sand": "https://plus.unsplash.com/premium_photo-1663036496963-5d2303a23586?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FuZCUyMGJsYWNrfGVufDB8MHwwfHx8MA%3D%3D",
        "Ash": "https://plus.unsplash.com/premium_photo-1663036496963-5d2303a23586?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FuZCUyMGJsYWNrfGVufDB8MHwwfHx8MA%3D%3D",
        "Squall": "https://plus.unsplash.com/premium_photo-1663036496963-5d2303a23586?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FuZCUyMGJsYWNrfGVufDB8MHwwfHx8MA%3D%3D",
        "Tornado": "https://images.unsplash.com/photo-1600672202669-3521432b6302?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      };
      
    useEffect(() => {
        (async _ => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${APP_KEY}&units=metric&lang='en'`);
            const data = await response.json();
            if (response.ok) {
                // in list element 0 has Today's data and 1 has Tommorrow's
                setCityDetails(data.city)
                setMyData(data.list[isToday?0:1].main)
                setDataWeather(data.list[isToday?0:1].weather[0])
                setWindData(data.list[isToday?0:1].wind)
                setError(true)
            } else {
                setError(false)
            }
        })();

    }, [cityName,isToday])

    const onkeydownHandler = ((e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setCityName(inputValue.current.value)
        }
    })
    const onSubmitHandler = ((e) => {
        e.preventDefault();
        setCityName(inputValue.current.value)
    })
console.log(weatherBackgrounds[dataWeather?.main])
    return (
  dataWeather && <div className='weather-wrapper' 
  style={{
    background: `url(${weatherBackgrounds[dataWeather.main]})`,
    backgroundSize: 'cover',
    backgroundRepeat:'no-repeat'
  }}
  >
            <div className='cityName'>
                {error ? (<p>{cityDetails.name}, {cityDetails.country}<a href={`https://en.wikipedia.org/wiki/${cityDetails.name}`} target="_ "><img src={linkIcon} alt='link' /></a></p>) : (<p className='invalid'>{ 'Invalid City Name'}</p>)}

                <div className='day-btns'>
                    <button className={isToday?'active':''} onClick={()=>{setIsToday(true)}}>
                        Today
                    </button>
                    <button className={!isToday?'active':''} onClick={()=>{setIsToday(false)}}>
                        Tommorrow
                    </button>
                </div>

                <div className='search'>
                    <input type='text' ref={inputValue} onKeyDown={onkeydownHandler} placeholder='City Name' /><img style={{ cursor: 'pointer' }} onClick={onSubmitHandler} src={searchIcon} alt='searchIcon' />
                </div>
            </div>
            <WeatherData weatherData={myData} weather={dataWeather} city={cityDetails}  windData={windData} />
            
        </div>
    )
}

export default Main
