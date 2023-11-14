
import React, { useState,useEffect } from "react";
import './../styles/App.css';

const App = () => {
  const [search,setSearch]=useState();
  const [name,setName]=useState();
  const [temp,setTemp]=useState();
  const [weather,setWeather]=useState();
  const [icon,setIcon]=useState();
  const [loading,setLoading]=useState(true);
  

     const debounce = (func, delay) => { 
        let debounceTimer 
        return function() { 
            const context = this
            const args = arguments 
                clearTimeout(debounceTimer) 
                    debounceTimer 
                = setTimeout(() => func.apply(context, args), delay) 
        } 
    } 

  useEffect(debounce(function(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=927107ad549126b6f6d80e3a37255431`)
    .then((response)=>response.json())
    .then((jsonData)=>{
      setName(jsonData.name);
      setTemp(jsonData.main.temp)
      setWeather(jsonData.weather[0].main)
      setIcon(jsonData.weather[0].icon)
      setLoading(false)
      console.log(jsonData)})
    .catch((error)=>console.log(error))
  },3000),[search])
  return (
    <div>
        <input className="search" type='text' value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <div className="weather">
          {
            loading?<>
            
            </>:<>
            <div>{name}</div>
            <div>{temp}</div>
            <div>{weather}</div>
            <div>{icon}</div>
            </>
          }
        </div>
    </div>
  )
}

export default App
