# Course Project: Requirements & Team Policies

**CMPSC 487W**  
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
- **OPENWEATHERMAP API Documentation:** [OPENWEATHERMAP API](https://openweathermap.org/api)

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
4. **OPENWEATHERMAP API Integration**: Real-time temperature comparisons are made using the OPENWEATHERMAP API.

### Stretch Goals:
1. **Weather-Based Suggestions**: Provide relevant suggestions based on real-time weather conditions (e.g., clothing recommendations).
2. **Leaderboard**: A leaderboard showing the top users with the most correct guesses.

---

## 3. Use Cases (Functional Requirements) 

Each team member has contributed a use case:

### Use Case 1: User submits a temperature guess
1. **Actors:** User, OPENWEATHERMAP API
2. **Trigger:** The user submits a location and temperature guess.
3. **Preconditions:** The user has access to the app and inputs a valid location and temperature guess.
4. **Postconditions (Success Scenario):** The system retrieves the actual temperature via the OPENWEATHERMAP API and compares it with the user’s guess.
5. **Steps (Success Scenario):**
   - User inputs a location and temperature guess.
   - System retrieves the current temperature via the OPENWEATHERMAP API.
   - The system compares the user’s guess with the actual temperature.
   - The system updates the user’s streak if the guess is correct.
6. **Extensions/Variations:**
   - The user can submit guesses for different locations.
   - The system displays streaks and correct guesses on a dashboard.
7. **Exceptions:** Failure to retrieve data from the OPENWEATHERMAP API due to connection issues.

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
3. **Preconditions:** The user has access to the app and the OPENWEATHERMAP API is available.
4. **Postconditions (Success Scenario):** The system provides a weather-based suggestion based on real-time conditions.
5. **Steps (Success Scenario):**
   - The user inputs a location and temperature guess.
   - The system retrieves current weather data via the OPENWEATHERMAP API.
   - The system analyzes the weather conditions (e.g., temperature, humidity).
   - The system provides relevant suggestions based on the weather (e.g., wear a jacket).
6. **Extensions/Variations:**
   - Users can receive additional suggestions or personalized recommendations.
7. **Exceptions:** The OPENWEATHERMAP API fails or no suggestion is available for the weather conditions.

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
- **API:** OPENWEATHERMAP API for real-time weather data.
- **Version Control:** GitHub for collaborative development and issue tracking.

### Roles:
- **Om Patel:** Product Owner (Frontend) – Coordinates project direction, manages UI/UX development, and ensures smooth API integration.
- **Victor Liu:** Backend Developer – Manages server logic and ensures efficient integration with MongoDB.
- **Tommy Lu:** Scrum Master (Database) – Manages database design and oversees the team’s adherence to agile methodology.

### Schedule:
1. **Milestone 1 (Week 3):** Set up app structure and integrate OPENWEATHERMAP API.
2. **Milestone 2 (Week 6):** Complete the temperature guessing feature and backend integration.
3. **Milestone 3 (Week 9):** Implement streak tracking and develop the user dashboard.
4. **Milestone 4 (Week 12):** Conduct final testing, complete documentation, and deploy the app.

### Risks:
1. **OPENWEATHERMAP API Unavailability:** We risk downtime if the API is inaccessible.
2. **Team Availability:** Conflicting schedules could cause delays. We’ll mitigate this through active communication on Discord.
3. **Database Integration Issues:** If there are issues integrating MongoDB, it could delay data handling features.

### External Feedback:
- Feedback from classmates will be gathered after core features are implemented and tested. This will provide valuable insights into improving the user experience.

## 7. Software Architecture

### System Overview
Our project follows a client-server architecture. 
- Client Side (Frontend): The app uses React Native to create a mobile application that interacts with users. Users can input locations and retrieve weather data, guess temperatures, and view their streak history. The client side handles the user interface and user experience.
- Server Side (Backend): The backend is developed using Node.js, which handles server logic, processes requests from the client, and communicates with the MongoDB database for data storage. It also integrates with the OPENWEATHERMAP API to fetch real-time weather data.

### Major Software Components
- **Frontend**: Responsible for displaying data and user interactions. Built using [React].
- **Backend**: Handles the application logic, routes, and API requests. Implemented using [Node.js].
- **Database**: Stores persistent data and handles queries. We use [MongoDB] for data storage.

### Component Interfaces
- **Frontend-Backend Interface**: Communicates using RESTful API endpoints. The backend provides JSON responses to the frontend.
- **Backend-Database Interface**: The backend interacts with MongoDB through [an ORM like Mongoose], which manages CRUD operations.

### Data Storage
We store data using MongoDB, with collections for [Users, Streaks, etc.]. The schema includes:
- **Users**: Stores user information (name, email, password hash).
- **Streaks**: Contains streak data (date, streak number).

### Architectural Assumptions
- All requests will follow standard REST conventions.
- MongoDB will handle high traffic and scale with the application.

### Alternative Architectural Decisions
- **Alternative 1**: Use a SQL database instead of MongoDB.
  - **Pros**: Better for structured data, ACID transactions.
  - **Cons**: Less flexible for unstructured or schema-less data.
- **Alternative 2**: Implement a microservices architecture instead of MVC.
  - **Pros**: Enables scaling individual services, better isolation.
  - **Cons**: More complex to implement and maintain, overhead of managing multiple services.

## 8. Software Design 

### Detailed Software Components
- **Frontend (View)**:
  - **Packages**: React, Expo
  - **Responsibilities**: Manage UI state, render components, and handle user inputs. The frontend utilizes Expo for building a cross-platform mobile application.
  
- **Backend (Controller)**:
  - **Packages**: Node.js, Express
  - **Responsibilities**: API routing, data validation, and business logic. The backend will communicate with the frontend through RESTful API endpoints.

- **Database (Model)**:
  - **Packages**: MongoDB, Mongoose
  - **Responsibilities**: Data storage, schema validation, and query optimization. The backend uses Mongoose to interact with MongoDB, managing data schemas and queries efficiently.

## 9. Coding Guidelines
### React Native
- **Guideline**: [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- **Reason for Choice**: The Airbnb JavaScript Style Guide is one of the most popular and comprehensive style guides for JavaScript, covering best practices and coding conventions that enhance code quality and readability. Given that React Native is built on JavaScript, this guideline will help us maintain consistent coding standards across our React Native application.

### TypeScript
- **Guideline**: [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
- **Reason for Choice**: 
  1. Provides comprehensive coverage for TypeScript, complementing our JavaScript guidelines.
  2. Promotes type safety and TypeScript-specific best practices, helping to catch errors early and improve overall code quality.
  3. Widely adopted in the industry, making it easier for team members to adapt and for potential new contributors to understand our codebase.
  4. Regularly updated to keep pace with TypeScript language evolution and community standards.

### Enforcement Plan
To ensure adherence to these guidelines, we will implement the following measures:
- **Pre-commit Hooks**: We will set up pre-commit hooks in our development environment to automatically check code against the specified style guides before allowing commits. This helps catch deviations early and maintains code quality.
- **IDE Integration**: Encourage team members to use IDEs with built-in support for JavaScript and TypeScript, such as Visual Studio Code, with appropriate extensions.

## 10. Process Description

### 10.1 Risk Assessment
- **Integration challenges between frontend and backend**:
  - Likelihood: Medium
  - Impact: High
  - Mitigation: Early API definition and integration tests.
- **Data Accuracy and Reliability**:
  - Likelihood: Medium
  - Impact: High
  - Mitigation: Implement data validation, cross-check with multiple sources if possible, and provide clear disclaimers to users.
- **Geocoding Inaccuracies**:
  - Likelihood: Low
  - Impact: Medium
  - Mitigation: Implement error handling for location inputs, and provide manual location selection options.
- **Scaling issues with MongoDB**:
  - Likelihood: Low
  - Impact: Medium
  - Mitigation: Initial load testing and database indexing.
- **Team member availability during finals week**:
  - Likelihood: Medium
  - Impact: High
  - Mitigation: Plan to complete major features before finals.
- **New technology learning curve**:
  - Likelihood: Medium
  - Impact: Medium
  - Mitigation: Allocate dedicated time for tutorials and experiments.
- **Unexpected API changes (third-party services)**:
  - Likelihood: Low
  - Impact: High
  - Mitigation: Version lock APIs, and add mocks for testing.

### 10.2 Project Schedule
| Milestone               | Task                                      | Effort (person-weeks) | Dependencies                             |
|------------------------|-------------------------------------------|------------------------|------------------------------------------|
| Milestone 1: Setup     | Initialize GitHub Repo, CI/CD setup      | 1                      | None                                     |
| Milestone 2: MVP Backend| Build API for basic functionality        | 2                      | Backend setup, Database schema           |
| Milestone 3: MVP Frontend| UI design, basic forms                  | 2                      | API and basic backend endpoints           |
| Milestone 4: Testing    | Full system integration testing           | 1                      | All components completed                 |

### 10.3 Team Structure
- **Frontend Lead**: [Om] – Responsible for UI design and user experience.
- **Backend Lead**: [Victor] – Responsible for API development and data flow.
- **Database Lead**: [Tommy] – Manages database schema and optimization.
- **Scrum Master**: [N/A] – Tracks project progress and handles task delegation.

### 10.4 Documentation Plan
We plan to deliver the following documentation:
- **User Guide**: Instructions on how to install and use the product.
- **API Documentation**: Details on API endpoints, request/response formats.
- **Developer Guide**: Instructions for setting up the development environment.

## 11. Test Automation and Continuous Integration (CI)

### Test-Automation Infrastructure
Our project uses **Jest** for unit testing and test automation. Jest is a popular JavaScript testing framework that is well-integrated with React Native, making it a great choice for our project's testing needs. It provides features such as snapshot testing, asynchronous testing, and mocking capabilities, which are essential for our React Native app.

### Justification for Test-Automation Infrastructure
We chose **Jest** for the following reasons:
- **Integration with React Native:** Jest is the default testing framework for React Native, ensuring seamless integration with the app.
- **Asynchronous Testing Support:** Jest’s support for testing asynchronous code allows us to effectively handle API calls and asynchronous operations in our app.
- **Snapshot Testing:** Jest’s snapshot testing feature helps us ensure that the UI remains consistent across updates, a crucial aspect of frontend development.

### Adding a New Test to the Code Base
To add a new test to the code base, follow these steps:
1. **Create a new test file** with the `.test.js` or `.spec.js` extension.
2. Write the test using Jest's testing functions (`test()`, `expect()`, etc.).
3. Place the test file in the `__tests__` directory or alongside the file being tested, depending on your preferred project structure.
4. Run `npm test` to execute the tests.

For example, to test a function that formats temperatures, a test might look like:
```javascript
test('should format temperature correctly', () => {
  expect(formatTemperature(32)).toBe('32°F');
});
```
### Justification for CI Service
We chose **GitHub Actions** because:
- **Native Integration with GitHub:** As our project repository is hosted on GitHub, GitHub Actions integrates seamlessly with our workflow.
- **Flexibility and Customization:** GitHub Actions allows us to define custom workflows for testing, deployment, and other automation tasks.
- **Free Tier for Public Repositories:** GitHub Actions offers a free tier for open-source projects, which is beneficial for our project.

### Pros/Cons Matrix for CI Services

| **CI Service**        | **Pros**                                                                 | **Cons**                                                               |
|-----------------------|--------------------------------------------------------------------------|------------------------------------------------------------------------|
| **GitHub Actions**     | - Seamless integration with GitHub<br>- Free for public repositories<br>- Custom workflows | - Limited configuration options compared to specialized tools like Jenkins |
| **Travis CI**          | - Simple to configure<br>- Great for open-source projects               | - Limited resources in free tier<br>- Slower build times compared to GitHub Actions  |

### Tests Executed in a CI Build
The following tests will be executed in the CI build:
- **Unit tests** for individual functions using Jest.
- **Integration tests** to verify interactions between components.
- **End-to-end tests** for the critical workflows of the application, such as the user login and weather retrieval.

### Development Actions Triggering a CI Build
The following actions will trigger a CI build:
- **Pushing changes** to any branch (e.g., feature branches or the main branch).
- **Opening a pull request** to the main branch.
- **Merging a pull request** to the main branch.

CI builds will run automatically upon these actions to ensure that new code changes do not break the existing functionality.


