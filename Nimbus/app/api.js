export const fetchWeatherData = async (city) => {
  try {
    // Step 1: Get the coordinates for the given city using OpenCage API
    const geocodeResponse = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=70342383ac34488eb2c824cf22f24a60`);
    if (!geocodeResponse.ok) {
      throw new Error('Unable to fetch location data. Please check the city name.');
    }
    const geocodeData = await geocodeResponse.json();
    const { lat: latitude, lng: longitude } = geocodeData.results[0].geometry;

    // Step 2: Fetch weather data from OpenWeatherMap using the coordinates
    const openWeatherMapKey = '67e987533f43fef74a12b262431da0db'; 
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherMapKey}&units=imperial`);
    if (!weatherResponse.ok) {
      throw new Error('Unable to fetch weather data. Please try again later.');
    }
    const weatherData = await weatherResponse.json();

    // Step 3: Extract and return relevant weather information
    return {
      temperature: Math.round(weatherData.main.temp),
      temperatureUnit: 'F',
      windSpeed: `${Math.round(weatherData.wind.speed * 2.23694)} mph`, // Convert to mph
      windDirection: weatherData.wind.deg,
      shortForecast: weatherData.weather[0].main,
      detailedForecast: weatherData.weather[0].description,
      humidity: weatherData.main.humidity,
      pressure: weatherData.main.pressure,
      cityName: weatherData.name,
      country: weatherData.sys.country
    };
  } catch (error) {
    return { error: error.message };
  }
};
