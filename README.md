# InSyte Mobile

React Native mobile application for the InSyte education evaluation system.

## Features

- **Authentication**: JWT-based login with token refresh
- **Schools Management**: View and manage schools
- **Teachers Management**: View teacher profiles and details
- **Videos Management**: View and manage teacher evaluation videos
- **Reports**: Access evaluation reports
- **Settings**: User profile and logout

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **React Navigation** for screen navigation
- **TanStack React Query** for server state management
- **Axios** for API requests
- **React Hook Form** for form management
- **AsyncStorage** for local data persistence

## Project Structure

```
src/
├── screens/          # Screen components
├── navigation/       # Navigation configuration
├── context/          # React context (Auth)
├── lib/              # Utilities (API client)
├── hooks/            # Custom hooks
├── components/       # Reusable components
└── types/            # TypeScript types
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create .env file with API configuration:
```bash
REACT_APP_API_URL=http://localhost:5090/api
```

### Running the App

Start the Expo development server:

```bash
npm start
```

Then choose:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web browser

Or scan the QR code with Expo Go app on your device.

## API Configuration

Update the API URL in `src/lib/api.ts`:

```typescript
const API_URL = 'http://your-api-url/api';
```

## Authentication Flow

1. User enters credentials on LoginScreen
2. Credentials sent to `/api/auth/login`
3. JWT tokens (access + refresh) stored in AsyncStorage
4. Authorization header set for all API requests
5. Token refresh handled automatically on 401 response

## Building for Production

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

## Environment Variables

Create a `.env` file in the root directory:

```
REACT_APP_API_URL=https://api.example.com/api
```

## TypeScript

All code is written in TypeScript. Run type checking:

```bash
tsc --noEmit
```

## Contributing

Follow the project structure and maintain TypeScript strict mode compliance.

## License

MIT
