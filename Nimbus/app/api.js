export const fetchWeatherData = async (city) => {
  try {
    // Step 1: Get the coordinates for the given city using OpenCage API
    const geocodeResponse = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=70342383ac34488eb2c824cf22f24a60`);
    if (!geocodeResponse.ok) {
      throw new Error('Unable to fetch location data. Please check the city name.');
    }
    const geocodeData = await geocodeResponse.json();
    const { lat: latitude, lng: longitude } = geocodeData.results[0].geometry;

    // Extract city, state, and country from the geocode data
    const components = geocodeData.results[0].components;
    const cityName = components.city || components.town || components.village || components.road; // Fallback to other types if city is not available
    const stateName = components.state || components.province || components.region; // Fallback to province or region
    const countryName = components.country;

    // Step 2: Fetch weather data from OpenWeatherMap using the coordinates
    const openWeatherMapKey = '67e987533f43fef74a12b262431da0db'; 
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherMapKey}&units=imperial`);
    if (!weatherResponse.ok) {
      throw new Error('Unable to fetch weather data. Please try again later.');
    }
    const weatherData = await weatherResponse.json();

    // Step 3: Extract and return relevant weather information
    const mainCondition = weatherData.weather[0].main; // Main weather condition
    const detailedConditions = weatherData.weather.map(condition => condition.description).join(', '); // Detailed descriptions

    return {
      temperature: Math.round(weatherData.main.temp),
      temperatureUnit: 'F',
      windSpeed: `${Math.round(weatherData.wind.speed * 2.23694)} mph`, 
      windDirection: weatherData.wind.deg,
      shortForecast: mainCondition, // Keep short forecast as the main condition only
      // detailedForecast: detailedConditions, // Keep detailed forecast as is
      humidity: weatherData.main.humidity, 
      cityName: cityName, // Include city name
      stateName: stateName, // Use full state name
      countryName: countryName // Include country name
    };
  } catch (error) {
    return { error: error.message };
  }
};
