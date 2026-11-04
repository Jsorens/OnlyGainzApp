# OnlyGainz 💪

OnlyGainz is a mobile app for training and nutrition. Users can log meals, track their daily intake of calories and macronutrients, and manage their own profile and calorie goal.

The app was built as a project in the Mobile Programming course (semester 5) using [Expo](https://expo.dev) and React Native, with [Appwrite](https://appwrite.io) as the backend.

## Features

- **Login and registration**: user accounts through Appwrite. A profile is created automatically on sign-up.
- **Home**: an overview of today's nutrition intake (calories, protein, carbs and fat) against the calorie goal in the profile.
- **Meals**: log meals (breakfast, lunch, dinner, etc.), and view and edit them.
- **Foods**: search a food database (Matvaretabellen), see details for each food item and choose a serving size. The barcode button opens the camera, but scanning is not implemented yet.
- **Profile**: name, bio, city, country, birthday and calorie goal.
- **Admin**: a separate tab that is only shown to members of the admin team in Appwrite.
- **Workouts**: in development.

## Tech stack

| Area       | Technology                                    |
| ---------- | --------------------------------------------- |
| Framework  | Expo SDK 58, React Native 0.88, React 19      |
| Language   | TypeScript                                    |
| Navigation | Expo Router (file-based routing)              |
| Backend    | Appwrite (Auth, TablesDB, Teams)              |
| Food data  | Appwrite table and a custom OnlyGainz API     |
| Camera     | expo-camera                                   |
| Calendar   | react-native-calendars                        |
| Testing    | Jest, jest-expo, React Native Testing Library |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) (LTS)
- [Expo Go](https://expo.dev/go) on your phone, or an Android emulator / iOS simulator

### Installation

1. Clone the repo and go to the project folder:

   ```bash
   cd OnlyGainz
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. If you are using expo go (ios or android) -- Optional:

   ```bash
   npx expo login
   ```

4. Start the development server:

   ```bash
   npx expo start
   ```

5. Scan the QR code with Expo Go (Android) or the Camera app (iOS), or press `a` for an Android emulator / `i` for an iOS simulator.

### Useful commands

```bash
npx expo start     # start the development server
npm run android    # start and open on Android
npm run ios        # start and open on iOS
npm run web        # start in the browser
npm test           # run the tests
npm run lint       # lint
npx tsc --noEmit   # type check
```

## Backend (Appwrite)

The app connects to an Appwrite Cloud project. The setup lives in [src/lib/appwrite.js](OnlyGainz/src/lib/appwrite.js), which holds the endpoint, project ID, database ID and table IDs:

| Table      | Contents                                                    |
| ---------- | ----------------------------------------------------------- |
| `Foods`    | Food items with calories, macros and serving size           |
| `Profiles` | User profiles (name, bio, location, birthday, calorie goal) |
| `Meals`    | Logged meals per user                                       |

Admin access is controlled by membership in an Appwrite team (`ADMIN_TEAM_ID`).

## Project structure

```
src/
├── app/                  # Screens (Expo Router – every file is a route)
│   ├── (tabs)/           # Tabs: home, meals, workouts, profile, admin
│   ├── auth/             # Login and registration
│   ├── foods/            # Food list and details for a single food item
│   └── meals/            # Meal details and editing
├── features/             # Functionality split by domain
│   ├── contexts/         # AuthProvider, MealsContext, schemas and tests
│   ├── food/             # API, components and types for foods
│   ├── meal/             # API, components and types for meals
│   ├── profile/          # API, components and types for profiles
│   └── shared/           # Shared components (logo, loading, etc.)
├── hooks/                # Custom hooks
├── lib/                  # Appwrite client and configuration
└── Types/                # Shared types (user, workouts)
```

## Testing

Tests live in `__tests__` folders next to the code they test, and are run with:

```bash
npm test
```

## Team members

- Jørgen Sørensen
- Ayman Bellamine

## License

See [LICENSE](OnlyGainz/LICENSE).
