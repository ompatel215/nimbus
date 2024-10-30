export const fetchWeatherData = async (city) => {
  try {
    // Step 1: Get the coordinates for the given city using OpenCage API
    const geocodeResponse = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=70342383ac34488eb2c824cf22f24a60`);
    if (!geocodeResponse.ok) {
      throw new Error('Unable to fetch location data. Please check the city name.');
    }
    const geocodeData = await geocodeResponse.json();

    // Check if results are available
    if (geocodeData.results.length === 0) {
      throw new Error('No results found for the specified city.');
    }

    // Log the geocode results for debugging
    //console.log(geocodeData.results); // Added logging to see the results

    // Extract latitude and longitude from the geocode data
    let latitude, longitude, cityName, stateName, countryName;

    // Loop through results to find the correct city based on state
    for (const result of geocodeData.results) {
      const components = result.components;

      // Consolidate all possible city names
      const currentCityName = components.city || components.town || components.village || components.hamlet || components.road || components.suburb || components.neighbourhood || components.county;
      const currentStateName = components.state || components.province || components.region;

      // Check if the state matches the desired state
      if (currentStateName && currentCityName) {
        // Set the values if they match
        latitude = result.geometry.lat;
        longitude = result.geometry.lng;
        cityName = currentCityName;
        stateName = currentStateName;
        countryName = components.country;

        // Check for an exact match for "Clinton" as a city
        if (currentCityName.toLowerCase() === city.toLowerCase() && (components._type === "city" || components._type === "town")) {
          break; // Exit loop once we find a match
        }

        // Fallback to other types if no exact match is found
        if (components._type === "county" && currentCityName.toLowerCase().includes(city.toLowerCase())) {
          break; // Exit loop if we find a county that includes the city name
        }
      }
    }

    // If no valid city was found, throw an error
    if (!cityName) {
      throw new Error('No valid city found for the specified location.');
    }

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
      windSpeed: `${Math.round(weatherData.wind.speed * 2.23694)} mph`, // Convert m/s to mph
      windDirection: weatherData.wind.deg, // Wind direction in degrees
      shortForecast: mainCondition, // Keep short forecast as the main condition only
      detailedForecast: detailedConditions, // Keep detailed forecast as is
      humidity: weatherData.main.humidity, 
      cityName: cityName, // Include city name
      stateName: stateName, // Use full state name
      countryName: countryName // Include country name
    };
  } catch (error) {
    return { error: error.message };
  }
};
