export default function Forecast({ data }) {
  // Don't render if no forecast data
  if (!data || data.length === 0) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">5-Day Forecast</h3>
      
      {/* Forecast Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {data.map((day) => (
          <div key={day.dt} className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            {/* Weekday */}
            <p className="font-semibold">
              {new Date(day.dt * 1000).toLocaleDateString([], { weekday: 'short' })}
            </p>
            
            {/* Weather Icon */}
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].main}
              className="mx-auto my-2 w-12 h-12"
            />
            
            {/* Temperature */}
            <p className="text-lg font-medium">{Math.round(day.main.temp)}°C</p>
            
            {/* Weather Condition */}
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {day.weather[0].main}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}