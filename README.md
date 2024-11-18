# Nimbus: Build, Test, and Run Instructions

## Building the System

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd Nimbus
   ```

2. **Install Dependencies:**
   Run the following command to install all necessary dependencies:
   ```bash
   npm install
   ```

## Testing the System

1. **Run Tests:**
   The project uses Jest for testing. To run the tests, execute:
   ```bash
   npm test
   ```

   This will run all the test files in the project. Ensure that the test files are correctly set up and located in the appropriate directories.

## Running the System

1. **Start the Development Server:**
   Use Expo to start the development server. This can be done with:
   ```bash
   npx expo start
   ```

2. **Run on a Device or Simulator:**
   - **Expo Go App:** Use the Expo Go app on your mobile device to scan the QR code displayed in the terminal or browser.
   - **Android Emulator:** If you have Android Studio set up, you can run the app on an Android emulator.
   - **iOS Simulator:** If you are on macOS and have Xcode installed, you can run the app on an iOS simulator.

## Additional Notes

- **Environment Configuration:** Ensure that any environment variables or API keys required by the app are set up correctly. This might involve creating a `.env` file or setting variables in your development environment.

- **Database Setup:** If the app requires a backend database, ensure that MongoDB is running and accessible. You might need to configure connection strings or other database settings.

- **API Keys:** Make sure that any necessary API keys (e.g., for the NOAA Weather API) are configured in the app.

By following these instructions, the course staff should be able to build, test, and run the Nimbus app without any issues. If there are any specific configurations or additional steps required, they should be documented in the project's README or a dedicated setup guide.
