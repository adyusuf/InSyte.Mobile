import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

export default function ReportsListScreen() {
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['reports', search],
    queryFn: async () => {
      const response = await api.get<any>('/reports', {
        params: { search: search || undefined },
      });
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
      <TextInput
        style={styles.searchInput}
        placeholder="Rapor ara..."
        value={search}
        onChangeText={setSearch}
        placeholderTextColor="#9ca3af"
      />
      <FlatList
        data={data || []}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.reportCard}>
            <Text style={styles.reportTitle}>{item.id}</Text>
            <Text style={styles.reportStatus}>{item.status}</Text>
          </TouchableOpacity>
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
  searchInput: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 16,
  },
  reportCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  reportTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  reportStatus: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
