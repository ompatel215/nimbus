# 1. Team Info & Policies
### Team Members
- **Om Patel:** Product Owner: Frontend
- **Victor Liu:** Development Team: Backend
- **Tommy Lu:** Scrum Master: Database

### Project Artifacts
- **GitHub Repository:** https://github.com/ompatel215/nimbus
- **Project Documentation:** [Markdown Documentation](#git@github.com:ompatel215/nimbus.git)
- **NOAA API Documentation:** [NOAA API](https://www.ncdc.noaa.gov/cdo-web/webservices/v2)

### Communication Channels & Policies
- **Discord:** Primary communication tool for team discussions, status updates, and quick decisions. All team members are expected to check Discord daily.
- **GitHub Issues/Projects:** Used for task tracking and version control.
  
---

# 2. Product Description
### Major Features:
- Allow user to enter current location to get weather
- Allow user to guess the temperature of selected location
- Tracks how many correct predictions users submitted for select location
- Compare user predictions with real-time temperatures from NOAA API 

### Stretch Goals:
- Weather-Based Suggestions
- Leaderboard for correct guesses

---

# 3. Use Cases (Functional Requirements) 

### Use Case 1: User submits a temperature guess
1) **Actors:** User, NOAA API
2) **Trigger:** User inputs a location and submits a temperature guess.
3) **Preconditions:** User has access to the app and submits a valid location and temperature guess.
4) **Postconditions (Success Scenario):** The system retrieves the correct temperature via the NOAA API and compares it to the user’s guess.
5) **List of Steps (Success Scenario):**
   - User inputs location and temperature guess.
   - System calls NOAA API to fetch current temperature.
   - System compares the user’s guess to the actual temperature.
   - System updates the user’s streak if the guess is correct.
6) **Extensions/Variations:**
   - User makes multiple guesses for different locations.
   - System shows streaks and correct guesses in a dashboard.
7) **Exceptions:** Failure to retrieve data from NOAA API due to connection issues.

### Use Case 2: User views streak history
1) **Actors:** User
2) **Trigger:** User navigates to the streak history page.
3) **Preconditions:** User has made at least one guess.
4) **Postconditions (Success Scenario):** The app displays the user's previous guesses and streak performance.
5) **List of Steps (Success Scenario):**
   - User opens the streak history page.
   - System retrieves streak data from the database.
   - System displays streak history and relevant details.
6) **Extensions/Variations:** User filters streak history by date or location.
7) **Exceptions:** No data available for streak history.

### Use Case 3: Weather-based suggestion
1) **Actors:** User
2) **Trigger:** User makes guess of temperature for location
3) **Preconditions:**
- The user has access to the app
- The NOAA API is working and the system can retrieve weather data.
4) **Postconditions (Success Scenario):**
- The system provides a suggestion to the user based on the actual weather of the location
5) **Postconditions (Success Scenario):**
- User inputs location and temperature guess.
- System calls the NOAA API to fetch current weather data.
- System analyzes the weather conditions (e.g., temperature, humidity).
- System provides a relevant suggestion based on the current weather
6) **Extensions/Variations:**  
- User selects additional types of weather-based suggestions 
- System provides personalized suggestions based on user preferences
- Failure to retrieve weather data from the NOAA API.  
- No suggestion is available for the given weather conditions.

---

# 4. Non-functional Requirements

### Scalability
- The system should be able to handle a 50% increase in the number of users within the first year without any performance degradation. This includes both vertical scalability and horizontal scalability.

### Usability
- The user interface must be intuitive and easy to use, allowing new users to complete core tasks without requiring a manual. The average time for a new user to learn to perform these tasks should be less than 5 minutes.

### Security and Privacy
- The system must comply with relevant data protection laws such as GDPR or CCPA, ensuring that all user data is encrypted both in transit and at rest. Access to sensitive information should be restricted to authorized personnel only, with multi-factor authentication enforced for administrative accounts.

# 5. External Requirements 

### API Services

- **NOAA API:** Essential for retrieving real-time weather data. [NOAA API](https://www.ncdc.noaa.gov/cdo-web/webservices/v2)

### Backend Infrastructure

- **Node.js:** Runtime environment for the backend server.
- **MongoDB:** Database service for storing user data, predictions, and streak history.

### Frontend Framework

- **React Native:** For cross-platform mobile app development.

# 6. Team Process Description 

### Schedule:
1. **Milestone 1 (Week 3):** Basic app structure with NOAA API integration.
2. **Milestone 2 (Week 6):** Functional temperature guessing and comparison feature.
3. **Milestone 3 (Week 9):** Streak tracking and display dashboard.
4. **Milestone 4 (Week 12):** Final testing, documentation, and deployment.

- The technologies we will be using include Node.js, React Native, MongoDB, and NOAA API for weather data.

- **Om Patel:** Product Owner: Frontend
- **Victor Liu:** Development Team: Backend
- **Tommy Lu:** Scrum Master: Database

### Milestones
1. Begin frontend development and integrate NOAA API. Establish MongoDB database and set up initial API endpoints.
2. Complete the user interface for guessing temperature. Work on database to store user data and streak history.
3. Testing and bug fixes to improve user experience
4. Finalize the app and implement any stretch goals such as leaderboards and/or weather-based suggestions
### Risks
- Risks that we may encounter include, API unavailability and/or Team Availabilty. Team Availability can be easily mitigated by communication through discord and working through github.
### Feedback
- Once the core features have been implemented and tested, external feedback would be the most useful. We can gather this feedback from other classmates interacting with our app.
