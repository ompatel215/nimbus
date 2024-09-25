export const fetchWeatherData = async (location) => {
  try {
    const response = await fetch(`https://api.weather.gov/points/${location}/forecast`, {
      headers: {
        'User-Agent': 'nimbus (vpl5085@psu.edu)',
        'Accept': 'application/ld+json',
      },
    });
    if (!response.ok) {
      throw new Error('Unable to fetch weather data. Please check the location.');
    }
    const data = await response.json();
    return {
      temperature: data.properties.periods[0].temperature,
    };
  } catch (error) {
    return { error: error.message };
  }
};
