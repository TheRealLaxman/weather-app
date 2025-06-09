import { useEffect, useState } from "react"
import SearchBar from "./components/SearchBar"
import WeatherCard from "./components/WeatherCard"
import Forecast from "./components/Forecast"

// Get API key from environment variables
const API_KEY = import.meta.env.VITE_API_KEY

export default function App() {
  // State variables
  const [city, setCity] = useState("Kathmandu") // Default city
  const [weather, setWeather] = useState(null) // Current weather data
  const [forecast, setForecast] = useState([]) // 5-day forecast
  const [error, setError] = useState("") // Error messages
  const [loading, setLoading] = useState(false) // Loading state

  // Fetch current weather data
  const fetchWeather = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      const data = await response.json()
      
      if (!response.ok) throw new Error(data.message || "City not found")
      
      setWeather(data)
      setError("")
    } catch (err) {
      setError(err.message)
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  // Fetch 5-day forecast data
  const fetchForecast = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      )
      const data = await response.json()
      
      if (response.ok) {
        // Get one forecast per day (API returns data every 3 hours)
        const dailyForecast = data.list.filter((_, index) => index % 8 === 0)
        setForecast(dailyForecast)
      }
    } catch {
      setForecast([])
    }
  }

  // Fetch data when city changes
  useEffect(() => {
    if (city) {
      fetchWeather()
      fetchForecast()
    }
  }, [city])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* App Header */}
        <h1 className="text-3xl font-bold text-center my-6">Weather App</h1>
        
        {/* Search Component */}
        <SearchBar onSearch={setCity} loading={loading} />
        
        {/* Error Message Display */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 p-3 rounded my-4">
            Error: {error}
          </div>
        )}
        
        {/* Loading Indicator */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {/* Weather Display */}
        <div className="grid gap-6 mt-8">
          {weather && <WeatherCard data={weather} />}
          {forecast.length > 0 && <Forecast data={forecast} />}
        </div>
      </div>
    </div>
  )
}