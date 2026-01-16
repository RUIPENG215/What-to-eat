# What to Eat APP

"What to Eat" is a mobile application designed to help users solve the daily dilemma of deciding what to eat. Built with React Native and Expo, this app provides a fun and interactive way for users to discover new food options through a card-based random selection system.

## Key Features

### 1. Food Category Selection
- **Fast Food** option for quick meal choices
- **Big Meal** option for more substantial dining experiences

### 2. Interactive Card Drawing System
- **First Round**: Randomly selects a major cuisine category (Western, Chinese, Japanese/Korean)
- **Second Round**: Based on the first selection, randomly chooses a specific dish type
- **Restaurant Recommendation**: Displays recommended restaurants with location information

### 3. History Tracking
- Automatically saves card drawing history
- Allows users to manually add and clear history records
- Displays past selections with timestamps

### 4. User Profile
- Shows user personal information
- Provides access to "My Collection" and "Settings" options

### 5. Map Integration
- Search functionality for locations
- Displays user's current location
- Marks search results on the map

## Technology Stack

- **Frontend Framework**: React Native + Expo
- **Navigation**: React Navigation (Stack + Tab)
- **State Management**: React useState + useEffect
- **Local Storage**: AsyncStorage
- **Maps**: react-native-maps + react-native-geocoding
- **UI Components**: @expo/vector-icons
- **Other Libraries**: expo-clipboard

## How to Run

### Prerequisites
- Node.js installed
- Expo CLI installed (`npm install -g expo-cli`)
- Android Studio or Xcode for emulators (optional)

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/RUPENG215/What-to-eat.git
   cd What-to-eat
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npx expo start
   ```

4. Run the app
   - Press `w` to open in web browser
   - Press `a` to run on Android emulator
   - Press `i` to run on iOS emulator
   - Scan the QR code with Expo Go app on your mobile device

## Project Structure

```
├── assets/           # Image resources
├── components/       # React components
├── App.js            # Main application file
├── index.js          # Application entry point
├── README.md         # Project documentation
├── app.json          # Expo configuration
└── package.json      # Project dependencies
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
