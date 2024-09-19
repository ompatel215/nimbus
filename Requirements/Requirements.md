## 1. Team Info & Policies (10%)
### Team Members
- **Om Patel:** 
- **Victor Liu:**
- **Tommy Lu:**

### Project Artifacts
- **GitHub Repository:** https://github.com/ompatel215/nimbus
- **Project Documentation:** [Markdown Documentation](#git@github.com:ompatel215/nimbus.git)
- **NOAA API Documentation:** [NOAA API](https://www.ncdc.noaa.gov/cdo-web/webservices/v2)

### Communication Channels & Policies
- **Discord:** Primary communication tool for team discussions, status updates, and quick decisions. All team members are expected to check Discord daily.
- **GitHub Issues/Projects:** Used for task tracking and version control.
  
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

### Use Case 3: 
1) **Actors:**
2) **Trigger:**
3) **Preconditions:**
4) **Postconditions (Success Scenario):** 
5) **Postconditions (Success Scenario):**
6) **Extensions/Variations:**
7) **Exceptions:**

---

# 4. Non-functional Requirements (10%)

### Scalability
- The system should be able to handle a 50% increase in the number of users within the first year without any performance degradation. This includes both vertical scalability and horizontal scalability.

### Usability
- The user interface must be intuitive and easy to use, allowing new users to complete core tasks without requiring a manual. The average time for a new user to learn to perform these tasks should be less than 5 minutes.

### Security and Privacy
- The system must comply with relevant data protection laws such as GDPR or CCPA, ensuring that all user data is encrypted both in transit and at rest. Access to sensitive information should be restricted to authorized personnel only, with multi-factor authentication enforced for administrative accounts.
