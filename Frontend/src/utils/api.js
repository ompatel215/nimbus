export const fetchWeatherData = async (location) => {
    try {
      const response = await fetch(`https://api.weather.gov/points/${location}/forecast`, {
        headers: {
          'token': 'YOUR_NOAA_API_TOKEN',
        },
      });
      const data = await response.json();
      return {
        temperature: data.properties.periods[0].temperature,
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  