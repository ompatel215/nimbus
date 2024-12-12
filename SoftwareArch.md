# 1. Software Architecture

## System Overview
Our project follows a client-server architecture. 
- Client Side (Frontend): The app uses React Native to create a mobile application that interacts with users. Users can input locations and retrieve weather data, guess temperatures, and view their streak history. The client side handles the user interface and user experience.
- Server Side (Backend): The backend is developed using Node.js, which handles server logic, processes requests from the client, and communicates with the MongoDB database for data storage. It also integrates with the OPENWEATHERMAP API to fetch real-time weather data.

## Major Software Components
- **Frontend**: Responsible for displaying data and user interactions. Built using [React].
- **Backend**: Handles the application logic, routes, and API requests. Implemented using [Node.js].
- **Database**: Stores persistent data and handles queries. We use [SQLite] for data storage.

## Component Interfaces
- **Frontend-Backend Interface**: Communicates using RESTful API endpoints. The backend provides JSON responses to the frontend.
- **Backend-Database Interface**: The backend interacts with the SQLite database to perform CRUD (Create, Read, Update, Delete) operations, ensuring efficient data management.
- 
## Data Storage
We store data using SQLite, with collections for [Users, Streaks, etc.]. The schema includes:
- **Streaks**: Contains streak (userID, date, streak number).

## Architectural Assumptions
- All requests will follow standard REST conventions.
- MongoDB will handle high traffic and scale with the application.

## Alternative Architectural Decisions
- **Alternative 1**: Use a SQL database instead of MongoDB.
  - **Pros**: Better for structured data, ACID transactions.
  - **Cons**: Less flexible for unstructured or schema-less data.
- **Alternative 2**: Implement a microservices architecture instead of MVC.
  - **Pros**: Enables scaling individual services, better isolation.
  - **Cons**: More complex to implement and maintain, overhead of managing multiple services.

# 2. Software Design 

## Detailed Software Components
- **Frontend (View)**:
  - **Packages**: React, Expo
  - **Responsibilities**: Manage UI state, render components, and handle user inputs. The frontend utilizes Expo for building a cross-platform mobile application.
  
- **Backend (Controller)**:
  - **Packages**: Node.js, Express
  - **Responsibilities**: API routing, data validation, and business logic. The backend will communicate with the frontend through RESTful API endpoints.

- **Database (Model)**:
  - **Packages**: SQLite
  - **Responsibilities**: Data storage, schema validation, and query optimization. 

# 3. Coding Guidelines
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


# 4. Process Description

## 4.1 Risk Assessment
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
- **Scaling issues with SQLite**:
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

## 4.2 Project Schedule
| Milestone               | Task                                      | Effort (person-weeks) | Dependencies                             |
|------------------------|-------------------------------------------|------------------------|------------------------------------------|
| Milestone 1: Setup     | Initialize GitHub Repo, CI/CD setup      | 1                      | None                                     |
| Milestone 2: MVP Backend| Build API for basic functionality        | 2                      | Backend setup, Database schema           |
| Milestone 3: MVP Frontend| UI design, basic forms                  | 2                      | API and basic backend endpoints           |
| Milestone 4: Testing    | Full system integration testing           | 1                      | All components completed                 |

## 4.3 Team Structure
- **Frontend Lead**: [Om] – Responsible for UI design and user experience.
- **Backend Lead**: [Victor] – Responsible for API development and data flow.
- **Database Lead**: [Tommy] – Manages database schema and optimization.
- **Scrum Master**: [N/A] – Tracks project progress and handles task delegation.

## 4.4 Documentation Plan
We plan to deliver the following documentation:
- **User Guide**: Instructions on how to install and use the product.
- **API Documentation**: Details on API endpoints, request/response formats.
- **Developer Guide**: Instructions for setting up the development environment.
