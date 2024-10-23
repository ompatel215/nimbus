// const { fetchWeatherData } = require('./api.js');

// async function testFetchWeatherData() {
//   try {
//     // New York City coordinates
//     const latitude = 40.7128;
//     const longitude = -74.0060;
    
//     console.log('Fetching weather data for New York City...');
//     const weatherData = await fetchWeatherData(latitude, longitude);
    
//     if (weatherData.error) {
//       console.error('Error:', weatherData.error);
//     } else {
//       console.log('Weather Data:');
//       console.log(`Temperature: ${weatherData.temperature}${weatherData.temperatureUnit}`);
//       console.log(`Wind: ${weatherData.windSpeed} ${weatherData.windDirection}`);
//       console.log(`Forecast: ${weatherData.shortForecast}`);
//       console.log(`Detailed Forecast: ${weatherData.detailedForecast}`);
//     }
//   } catch (error) {
//     console.error('Unexpected error:', error);
//   }
// }

// // Export the test function
// module.exports = { testFetchWeatherData };

// // Run the test
// testFetchWeatherData();