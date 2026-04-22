import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';

// Screens
import LoginScreen from '../screens/LoginScreen';
import SchoolsListScreen from '../screens/SchoolsListScreen';
import SchoolDetailScreen from '../screens/SchoolDetailScreen';
import TeachersListScreen from '../screens/TeachersListScreen';
import TeacherDetailScreen from '../screens/TeacherDetailScreen';
import VideosListScreen from '../screens/VideosListScreen';
import ReportsListScreen from '../screens/ReportsListScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#9ca3af',
      }}
    >
      <Tab.Screen
        name="Schools"
        component={SchoolsListScreen}
        options={{
          title: 'Okullar',
          tabBarLabel: 'Okullar',
        }}
      />
      <Tab.Screen
        name="Teachers"
        component={TeachersListScreen}
        options={{
          title: 'Öğretmenler',
          tabBarLabel: 'Öğretmenler',
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportsListScreen}
        options={{
          title: 'Raporlar',
          tabBarLabel: 'Raporlar',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Ayarlar',
          tabBarLabel: 'Ayarlar',
        }}
      />
    </Tab.Navigator>
  );
}

function RootStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Group screenOptions={{ animationEnabled: true }}>
        <Stack.Screen name="Main" component={MainNavigator} />
        <Stack.Screen
          name="SchoolDetail"
          component={SchoolDetailScreen}
          options={{
            title: 'Okul Detayı',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="TeacherDetail"
          component={TeacherDetailScreen}
          options={{
            title: 'Öğretmen Detayı',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="VideosList"
          component={VideosListScreen}
          options={{
            title: 'Videolar',
            headerShown: true,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export function RootNavigator() {
  const { isSignedIn } = useAuth();

  return (
    <NavigationContainer>
      {isSignedIn ? <RootStackNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
