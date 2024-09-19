## 1. Team Info & Policies (10%)
### Team Members
- **Om Patel:** 
- **Victor Liu:**
- **Tommy Lu:**

### Project Artifacts
- **GitHub Repository:** https://github.com/ompatel215/nimbus
- **Project Documentation:** [Markdown Documentation](#git@github.com:ompatel215/nimbus.git)
- **NOAA API Documentation:** [NOAA API](https://www.ncdc.noaa.gov/cdo-web/webservices/v2)

---

# 2. Product Description (20%)
### Major Features:
- Allow user to enter current location to get weather
- Allow user to guess the temperature of selected location
- Tracks how many correct predictions users submitted for select location
- Compare user predictions with real-time temperatures from NOAA API 

### Stretch Goals:
- Weather-Based Suggestions
- Leaderboard for correct guesses

---

# 3. Use Cases (Functional Requirements) (30%)

### 1) Actors
- The user who is checking the weather
- The Weather API providing the weather data to the app

### 2) Triggers
- The user searches for a city to check the current weather

### 3) Preconditions
- The user has the weather app downloaded
- The device is connected to the internet
- Weather API is operational

### 4) Postconditions (Success Scenario)
- The app successfully retrieves and displays the current weather information.

### 5) List of Steps (Success Scenario)
1. The user opens the weather app.
2. The user enters the name of a city in the search field.
3. The user taps the search button.
4. The app sends a request to the weather API with the entered city name.
5. The weather API processes the request and returns the weather data for that city.
6. The app displays the city's weather data to the user.

### 6) Extensions/Variations of the Success Scenario
- The app accesses the user's location and automatically provides the weather information.
- The user changes the unit of measurement before fetching data, and the app converts the data into the chosen unit.
- Severe weather will be shown along with the regular weather data.

### 7) Exceptions: Failure Conditions and Scenarios
- **Device not connected to the internet**: Display a message prompting the user to connect to the internet.
- **Weather API is down**: Display a message indicating that weather data is unavailable.
- **City name is misspelled**: Display a message stating that the city was not found.

---

# 4. Non-functional Requirements (10%)

### Scalability
- The system should be able to handle a 50% increase in the number of users within the first year without any performance degradation. This includes both vertical scalability and horizontal scalability.

### Usability
- The user interface must be intuitive and easy to use, allowing new users to complete core tasks without requiring a manual. The average time for a new user to learn to perform these tasks should be less than 5 minutes.

### Security and Privacy
- The system must comply with relevant data protection laws such as GDPR or CCPA, ensuring that all user data is encrypted both in transit and at rest. Access to sensitive information should be restricted to authorized personnel only, with multi-factor authentication enforced for administrative accounts.
