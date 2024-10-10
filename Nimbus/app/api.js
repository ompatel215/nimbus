export const fetchWeatherData = async (city) => {
  try {
    // Step 1: Get the coordinates for the given city
    const geocodeResponse = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=70342383ac34488eb2c824cf22f24a60`);
    if (!geocodeResponse.ok) {
      throw new Error('Unable to fetch location data. Please check the city name.');
    }
    const geocodeData = await geocodeResponse.json();
    const { lat: latitude, lng: longitude } = geocodeData.results[0].geometry;

    // Step 2: Get the forecast URL for the given coordinates
    const pointsResponse = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`, {
      headers: {
        'User-Agent': 'nimbus (vpl5085@psu.edu)',
        'Accept': 'application/geo+json',
      },
    });
    if (!pointsResponse.ok) {
      throw new Error('Unable to fetch location data. Please check the coordinates.');
    }
    const pointsData = await pointsResponse.json();
    const forecastUrl = pointsData.properties.forecast;

    // Step 3: Fetch the actual forecast data
    const forecastResponse = await fetch(forecastUrl, {
      headers: {
        'User-Agent': 'nimbus (vpl5085@psu.edu)',
        'Accept': 'application/geo+json',
      },
    });
    if (!forecastResponse.ok) {
      throw new Error('Unable to fetch weather data. Please try again later.');
    }
    const forecastData = await forecastResponse.json();

    // Step 4: Extract and return relevant weather information
    const currentPeriod = forecastData.properties.periods[0];
    return {
      temperature: currentPeriod.temperature,
      temperatureUnit: currentPeriod.temperatureUnit,
      windSpeed: currentPeriod.windSpeed,
      windDirection: currentPeriod.windDirection,
      shortForecast: currentPeriod.shortForecast,
      detailedForecast: currentPeriod.detailedForecast,
    };
  } catch (error) {
    return { error: error.message };
  }
};

