export const fetchWeatherData = async (latitude, longitude) => {
  try {
    // Step 1: Get the forecast URL for the given coordinates
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

    // Step 2: Fetch the actual forecast data
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

    // Step 3: Extract and return relevant weather information
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

