# What to Eat 🍽️

"What to Eat" is a mobile application designed to help users solve the daily dilemma of deciding what to eat. Built with React Native and Expo, this app provides a fun and interactive way for users to discover new food options through a card-based random selection system.

## Features ✨

- **Random Food Selection**: Choose between "Fast Food" and "Big Meal" categories and let the app help you decide with a card drawing interface.
- **Cuisine Categories**: Covers various cuisines including Western, Chinese, Japanese, and Korean styles.
- **Restaurant Locator**: Integrated Map view (using Google Maps) to find restaurants near you.
- **History Tracking**: Keep track of your previous food choices.
- **User Profile**: Simple user profile management.

## Tech Stack 🛠️

- **Framework**: React Native (Expo)
- **Navigation**: React Navigation (Bottom Tabs & Native Stack)
- **Maps**: `react-native-maps`, `react-native-geocoding`
- **Storage**: `@react-native-async-storage/async-storage`
- **UI**: Custom components with `@expo/vector-icons`

## Installation 📦

1.  **Clone the repository**
    ```bash
    git clone https://github.com/RUIPENG215/What-to-eat.git
    cd What-to-eat
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the application**
    ```bash
    npx expo start
    ```

## Project Structure 📂

- `App.js`: Main entry point containing navigation logic and screen components.
- `assets/`: Contains images for food cards and data files (`history.json`, `user.json`).
- `components/`: Reusable UI components.

## Notes 📝

This project was collaboratively developed by a group of students. It features custom assets for the food selection cards.

## License

[MIT](LICENSE)
