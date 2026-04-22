import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

export default function VideosListScreen({ route }: any) {
  const { teacherId } = route.params;

  const { data, isLoading } = useQuery({
    queryKey: ['videos', teacherId],
    queryFn: async () => {
      const response = await api.get<any>(`/teachers/${teacherId}/videos`);
      return response.data.data;
    },
  });

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data || []}
        renderItem={({ item }) => (
          <View style={styles.videoCard}>
            <Text style={styles.videoTitle}>{item.title}</Text>
            <Text style={styles.videoStatus}>{item.status}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  videoStatus: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
});
