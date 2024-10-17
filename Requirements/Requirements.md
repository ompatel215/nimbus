# Course Project: Requirements & Team Policies

**CMPSC 487**  
**Om Patel, Victor Liu, Tommy Lu**  
**September 1, 2023**

---

## 1. Team Info & Policies

### Team Members:
- **Om Patel:** Product Owner (Frontend)
- **Victor Liu:** Backend Developer
- **Tommy Lu:** Scrum Master (Database)

### Project Artifacts:
- **GitHub Repository:** [Nimbus GitHub Repo](https://github.com/ompatel215/nimbus)
- **Project Documentation:** [Markdown Documentation](#git@github.com:ompatel215/nimbus.git)
- **NOAA API Documentation:** [NOAA API](https://www.ncdc.noaa.gov/cdo-web/webservices/v2)

### Communication Channels & Policies:
- **Discord:** Used for team discussions, status updates, and decisions. Team members are required to check it daily.
- **GitHub Issues/Projects:** Used for task tracking and version control, ensuring organized collaboration.

---

## 2. Product Description

Our project, **Nimbus**, is a weather-based game app that integrates the NOAA API to provide real-time weather data. The app allows users to guess temperatures for different locations and track their correct guesses.

### Major Features:
1. **Input Location & Get Weather**: Users can input their location and retrieve real-time weather information.
2. **Temperature Guessing Game**: Users can guess the current temperature of selected locations.
3. **Track Correct Predictions**: The app tracks how many correct temperature predictions a user has made.
4. **NOAA API Integration**: Real-time temperature comparisons are made using the NOAA API.

### Stretch Goals:
1. **Weather-Based Suggestions**: Provide relevant suggestions based on real-time weather conditions (e.g., clothing recommendations).
2. **Leaderboard**: A leaderboard showing the top users with the most correct guesses.

---

## 3. Use Cases (Functional Requirements) 

Each team member has contributed a use case:

### Use Case 1: User submits a temperature guess
1. **Actors:** User, NOAA API
2. **Trigger:** The user submits a location and temperature guess.
3. **Preconditions:** The user has access to the app and inputs a valid location and temperature guess.
4. **Postconditions (Success Scenario):** The system retrieves the actual temperature via the NOAA API and compares it with the user’s guess.
5. **Steps (Success Scenario):**
   - User inputs a location and temperature guess.
   - System retrieves the current temperature via the NOAA API.
   - The system compares the user’s guess with the actual temperature.
   - The system updates the user’s streak if the guess is correct.
6. **Extensions/Variations:**
   - The user can submit guesses for different locations.
   - The system displays streaks and correct guesses on a dashboard.
7. **Exceptions:** Failure to retrieve data from the NOAA API due to connection issues.

### Use Case 2: User views streak history
1. **Actors:** User
2. **Trigger:** The user opens the streak history page.
3. **Preconditions:** The user has made at least one guess.
4. **Postconditions (Success Scenario):** The app displays the user’s previous guesses and streak performance.
5. **Steps (Success Scenario):**
   - The user opens the streak history page.
   - The system retrieves streak data from the database.
   - The system displays the user’s streak history.
6. **Extensions/Variations:** The user can filter streak history by date or location.
7. **Exceptions:** No data is available for the user’s streak history.

### Use Case 3: Weather-based suggestion
1. **Actors:** User
2. **Trigger:** The user submits a temperature guess for a location.
3. **Preconditions:** The user has access to the app and the NOAA API is available.
4. **Postconditions (Success Scenario):** The system provides a weather-based suggestion based on real-time conditions.
5. **Steps (Success Scenario):**
   - The user inputs a location and temperature guess.
   - The system retrieves current weather data via the NOAA API.
   - The system analyzes the weather conditions (e.g., temperature, humidity).
   - The system provides relevant suggestions based on the weather (e.g., wear a jacket).
6. **Extensions/Variations:**
   - Users can receive additional suggestions or personalized recommendations.
7. **Exceptions:** The NOAA API fails or no suggestion is available for the weather conditions.

---

## 4. Non-functional Requirements 

### Scalability:
- The app must handle many users without performance degradation.

### Usability:
- The user interface must be intuitive, allowing users to complete tasks within 5 minutes without needing a guide.

### Security and Privacy:
- All user data must be encrypted in transit and at rest.

---

## 5. External Requirements 

### Robustness:
- The app must handle invalid user input gracefully and provide appropriate error messages.

### Installation & Accessibility:
- The app must be installable by users, with instructions for setting up on both mobile and server environments.

### Buildability:
- The project must be fully buildable from source, with comprehensive documentation enabling developers to set up a new server or enhance the system.

---

## 6. Team Process Description 

### Toolset:
- **Frontend:** React Native for mobile app development.
- **Backend:** Node.js for handling the server logic and MongoDB for data storage.
- **API:** NOAA API for real-time weather data.
- **Version Control:** GitHub for collaborative development and issue tracking.

### Roles:
- **Om Patel:** Product Owner (Frontend) – Coordinates project direction, manages UI/UX development, and ensures smooth API integration.
- **Victor Liu:** Backend Developer – Manages server logic and ensures efficient integration with MongoDB.
- **Tommy Lu:** Scrum Master (Database) – Manages database design and oversees the team’s adherence to agile methodology.

### Schedule:
1. **Milestone 1 (Week 3):** Set up app structure and integrate NOAA API.
2. **Milestone 2 (Week 6):** Complete the temperature guessing feature and backend integration.
3. **Milestone 3 (Week 9):** Implement streak tracking and develop the user dashboard.
4. **Milestone 4 (Week 12):** Conduct final testing, complete documentation, and deploy the app.

### Risks:
1. **NOAA API Unavailability:** We risk downtime if the API is inaccessible.
2. **Team Availability:** Conflicting schedules could cause delays. We’ll mitigate this through active communication on Discord.
3. **Database Integration Issues:** If there are issues integrating MongoDB, it could delay data handling features.

### External Feedback:
- Feedback from classmates will be gathered after core features are implemented and tested. This will provide valuable insights into improving the user experience.
