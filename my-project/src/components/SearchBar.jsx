export default function SearchBar({ onSearch, loading }) {
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const city = e.target.elements.city.value.trim()
    if (city) onSearch(city) // Send city to parent component
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      {/* City Input Field */}
      <input
        type="text"
        name="city"
        placeholder="Enter city name..."
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={loading}
      />
      
      {/* Search Button */}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  )
}