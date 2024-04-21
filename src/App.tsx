import axios from "axios";
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
const API_KEY = "b003253a9a14f3a27388c6d6ab62ab40";
const LINK = "https://api.openweathermap.org/data/2.5/weather?q";

function kelvinToCelsius(temp:number) {
  return (temp - 273.15).toFixed(2);
}

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({ main: { temp: 0.0 }, error: false });
  const [loading,setLoading] = useState(true)

  const debouncedRequest = debounce((searchCity:string)=>setCity(searchCity),500)

  useEffect(() => {
    axios.get(`${LINK}=${city}&appid=${API_KEY}`)
      .then((response) => {
        setWeatherData(response.data);
        setLoading(false);
      })
  }, [city]);

  return (
    <>
      <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-5">Weather App</h1>
        <div className="text-xl font-bold mb-2">Enter your city name:</div>
        <div>
          <input
            className="p-2 border rounded"
            onChange={(e) => {e.target.value?debouncedRequest(e.target.value):setLoading(true)}}
            type="text"
            placeholder="eg: Hyderabad"
          />
        </div>
        {weatherData.error ? (
          <div className="text-red-500 mt-3">Failed to fetch weather data. Please try again.</div>
        ) : (
          <div className="text-xl mt-3">
            Temperature in {city} is {
              loading ? <>Loading...</> : kelvinToCelsius(weatherData.main.temp) 
            } °C
          </div>
        )}
      </div>
    </>
  );
}

export default App;
