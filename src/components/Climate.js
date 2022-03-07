import React from 'react';
import {  useState,useEffect } from 'react';
import axios from 'axios'

const Climate = () => {
    
    const[response, setResponse] = useState({})
    const[weather, setweather] = useState({})
    
    const[temperature, setTemperature] = useState(0)
    const[isConvertTem, setIsConvertTem] = useState(false)
    
    const success = pos => {
        //console.log(pos.coords)
        const latitude = pos.coords.latitude
        const longitude = pos.coords.longitude
        
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=932a0f7c56220a5848f19857779fe03d`)
        .then(res => {
            console.log(res.data)
            setResponse(res.data)
            setweather(res.data)
            setTemperature(Math.round(res.data.main?.temp-272.15))
        })  
    }

    
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(success);
       
    },[])
    
    const changeTemperature = () =>{
        if (!isConvertTem){
            setTemperature(Math.round(9/5*(temperature)+32)) 
            setIsConvertTem(true)
        }else{
            setTemperature(Math.round((temperature-32)*5/9))
            setIsConvertTem(false)
        }
    }
    
    return (
        <div>
            <h2 className='title'>Weather App</h2>
            <article className='wrapper-weather'>
                <h3>City {response.name},"{response.sys?.country}"</h3>
                <div className='content-weather'>
                    <h1> {temperature} {isConvertTem? "F°" : "C°"}</h1>
                      <div className='image-weather'>
                        <img src={(weather.weather?.[0].icon === undefined) ? " " : `http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="icon" />
                    </div>
                    <div className='info-weather'>
                        <p><b>"Scattered clouds"</b></p>
                        <p><i className="fa-solid fa-wind"></i>  Wind speed | <span>{response.wind?.speed} m/s</span></p>
                        <p><i className="fa-solid fa-clouds"></i> Clouds | <span>{response.clouds?.all} %</span> </p>
                        <p><i className="fa-solid fa-temperature-arrow-up"></i> Pressure | <span>{response.main?.pressure} mb</span></p>
                    </div>
                </div>
                <button onClick={changeTemperature}>
                    Change C°/ F°
                </button>
            </article>
        </div>
    );
};

export default Climate;