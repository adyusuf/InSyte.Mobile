# InSyte Mobile Development Guide

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Emulator (for Android)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/adyusuf/InSyte.Mobile.git
cd InSyte.Mobile
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
# Edit .env with your API URL
```

4. Start development server:
```bash
npm start
```

## Project Structure

```
src/
├── screens/          # Individual screen components
├── navigation/       # Navigation configuration
├── context/          # React context providers (Auth, etc.)
├── hooks/            # Custom React hooks
├── lib/              # Utilities (API client, endpoints)
├── components/       # Reusable UI components
├── types/            # TypeScript type definitions
└── App.tsx           # Root component
```

## Screens

### LoginScreen
- User authentication with email and password
- Token persistence in AsyncStorage
- Auto-login on app restart

### SchoolsListScreen
- List all schools
- Search functionality
- Navigate to school details

### SchoolDetailScreen
- Display school information
- View associated teachers

### TeachersListScreen
- List all teachers
- Search functionality

### TeacherDetailScreen
- Display teacher information
- View associated videos

### VideosListScreen
- List videos for a teacher
- View video evaluation status

### ReportsListScreen
- List all reports
- Search functionality
- View report status

### SettingsScreen
- User profile information
- Logout functionality

## Authentication Flow

1. **Login**: User submits credentials
2. **Token Storage**: Access and refresh tokens stored in AsyncStorage
3. **API Authorization**: All requests include Authorization header
4. **Token Refresh**: Automatic refresh on 401 response
5. **Logout**: Tokens removed from storage

## API Integration

### Base URL
Update in `src/lib/api.ts`:
```typescript
const API_URL = 'http://your-api-url/api';
```

### Endpoints
See `src/lib/endpoints.ts` for all available endpoints

### Making API Calls

Using React Query:
```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['schools'],
  queryFn: () => api.get('/schools'),
});
```

### Error Handling

The API client automatically handles:
- Token refresh on 401 errors
- Request/response logging
- Timeout management

## State Management

### Authentication Context
```typescript
const { user, isSignedIn, login, logout, refreshToken } = useAuth();
```

### Server State
Uses React Query for caching and synchronization:
```typescript
const { data: schools } = useSchools(search, page);
```

## Custom Hooks

### useSchools
```typescript
const { data, isLoading } = useSchools(search, page);
```

### useTeachers
```typescript
const { data, isLoading } = useTeachers(search);
```

## Building for Production

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

## Testing

Run type checking:
```bash
tsc --noEmit
```

## Environment Variables

Required variables in `.env`:
- `REACT_APP_API_URL`: API endpoint URL

## Troubleshooting

### App won't start
- Clear cache: `npm cache clean --force`
- Reinstall: `rm -rf node_modules && npm install`

### API connection issues
- Check API_URL in `src/lib/api.ts`
- Verify backend is running
- Check network connectivity

### Token refresh issues
- Ensure refresh endpoint is working on backend
- Check token expiration times
- Verify AsyncStorage permissions

## Best Practices

1. **TypeScript**: Always use proper types
2. **Error Handling**: Wrap API calls in try-catch
3. **Loading States**: Show activity indicators during async operations
4. **Form Validation**: Use React Hook Form for validation
5. **Code Organization**: Keep components focused and reusable
6. **Comments**: Document complex logic

## Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## Resources

- [React Native Documentation](https://reactnative.dev)
- [Expo Documentation](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org)
- [TanStack Query](https://tanstack.com/query/latest)
