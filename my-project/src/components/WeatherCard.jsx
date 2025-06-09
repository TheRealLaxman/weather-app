export default function WeatherCard({ data }) {
  // Don't render if no data
  if (!data) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      {/* City and Temperature */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{data.name}</h2>
          <p className="text-5xl font-bold my-2">{Math.round(data.main.temp)}°C</p>
          <p className="capitalize">{data.weather[0].description}</p>
        </div>
        
        {/* Weather Icon */}
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].main}
          className="w-20 h-20"
        />
      </div>
      
      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <WeatherDetail label="Humidity" value={`${data.main.humidity}%`} />
        <WeatherDetail label="Wind" value={`${data.wind.speed} m/s`} />
        <WeatherDetail label="Feels Like" value={`${Math.round(data.main.feels_like)}°C`} />
        <WeatherDetail label="Pressure" value={`${data.main.pressure} hPa`} />
      </div>
    </div>
  )
}

// Reusable weather detail component
function WeatherDetail({ label, value }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
      <p className="text-sm text-gray-600 dark:text-gray-300">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )
}