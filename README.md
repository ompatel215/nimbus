# Nimbus: A Weather Guessing Game

Nimbus is a fun and interactive mobile app where users guess the current temperature for any location and compare their guesses with real-time data fetched from the NOAA API. The app tracks users' streaks and provides insightful suggestions based on the weather.

## Team Members
- **Om Patel** – Product Owner, Frontend Development
- **Victor Liu** – Backend Development
- **Tommy Lu** – Scrum Master, Database Management

## Project Overview
Nimbus allows users to:
- Enter a location and guess the current temperature.
- Compare their guesses with real-time temperature data retrieved from the NOAA API.
- Track how many correct predictions they've made and maintain streaks.
- View weather-based suggestions (stretch goal).
- Participate in a leaderboard for correct guesses (stretch goal).

## Features

### Real-Time Weather Data:
- Users submit location and temperature guesses.
- The system fetches real-time data from the NOAA API.

### Streak Tracking:
- Tracks how many correct predictions users have made for specific locations.

### Weather-Based Suggestions:
- Provides suggestions based on the actual weather of a location, such as what to wear or things to do.

### Leaderboard (Stretch Goal):
- Users can compete by guessing the correct temperature for various locations.

## Tech Stack
- **Frontend:** React Native
- **Backend:** Node.js
- **Database:** MongoDB
- **API:** NOAA Weather API

## Running the App through Expo
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npx expo start`
4. Use the Expo Go app to scan the QR code and run the app on your mobile device.
