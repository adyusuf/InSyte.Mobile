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

interface School {
  id: string;
  name: string;
  address: string;
  city: string;
  email: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
}

interface SchoolsListResponse {
  items: School[];
  totalCount: number;
}

export default function SchoolsListScreen({ navigation }: any) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['schools', search, page],
    queryFn: async () => {
      const response = await api.get<any>('/schools', {
        params: {
          search: search || undefined,
          page,
          pageSize: 20,
        },
      });
      return response.data.data;
    },
  });

  const handleSchoolPress = (school: School) => {
    navigation.navigate('SchoolDetail', { schoolId: school.id, school });
  };

  const renderSchool = ({ item }: { item: School }) => (
    <TouchableOpacity
      style={styles.schoolCard}
      onPress={() => handleSchoolPress(item)}
    >
      <View>
        <Text style={styles.schoolName}>{item.name}</Text>
        <Text style={styles.schoolInfo}>{item.city}</Text>
        <View style={styles.statusBadge}>
          <Text
            style={[
              styles.statusText,
              { color: item.isActive ? '#15803d' : '#b91c1c' },
            ]}
          >
            {item.isActive ? 'Aktif' : 'Pasif'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading && !data) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={{ marginTop: 12, color: '#666' }}>Okullar yükleniyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Hata: Okullar yüklenemedi</Text>
        <Text style={{ marginTop: 8, color: '#666', fontSize: 12 }}>
          {error instanceof Error ? error.message : 'Bilinmeyen hata'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Okul ara..."
        value={search}
        onChangeText={setSearch}
        placeholderTextColor="#9ca3af"
      />

      <FlatList
        data={data?.items || []}
        renderItem={renderSchool}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Okul bulunamadı</Text>
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
    color: '#1f2937',
    backgroundColor: '#f9fafb',
  },
  listContent: {
    paddingBottom: 20,
  },
  schoolCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  schoolName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  schoolInfo: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: '#9ca3af',
    fontSize: 14,
  },
});
