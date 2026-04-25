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

interface WorkingGroup {
  id: string;
  name: string;
  description?: string;
  schoolId: string;
  isActive: boolean;
  memberCount: number;
  createdAt: string;
}

export default function WorkingGroupsListScreen({ navigation }: any) {
  const [search, setSearch] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['working-groups', search],
    queryFn: async () => {
      const response = await api.get<any>('/v1/working-groups', {
        params: { search: search || undefined },
      });
      return response.data.data;
    },
  });

  const renderWorkingGroup = ({ item }: { item: WorkingGroup }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('WorkingGroupDetail', { group: item })}
    >
      <Text style={styles.name}>{item.name}</Text>
      {item.description && <Text style={styles.description}>{item.description}</Text>}
      <View style={styles.footer}>
        <Text style={styles.memberCount}>👥 {item.memberCount} Üye</Text>
        <Text style={styles.status}>{item.isActive ? 'Aktif' : 'Pasif'}</Text>
      </View>
    </TouchableOpacity>
  );

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
        placeholder="Çalışma grubu ara..."
        value={search}
        onChangeText={setSearch}
        placeholderTextColor="#9ca3af"
      />
      <FlatList
        data={data || []}
        renderItem={renderWorkingGroup}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Çalışma grubu bulunamadı</Text>
          </View>
        }
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
  card: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  memberCount: {
    fontSize: 12,
    color: '#6b7280',
  },
  status: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: '#9ca3af',
  },
});
