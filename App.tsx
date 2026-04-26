// Bu import en üstte olmalı — gesture handler başlatma zorunluluğu
import 'react-native-gesture-handler';

import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { RootNavigator } from './src/navigation/RootNavigator';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      gcTime: 1000 * 60 * 5,  // 5 dakika
      staleTime: 1000 * 60,    // 1 dakika
    },
  },
});

function AppContent() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return <RootNavigator />;
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
