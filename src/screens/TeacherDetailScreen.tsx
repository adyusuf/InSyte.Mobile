import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TeacherDetailScreen({ route }: any) {
  const { teacher } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{teacher.name}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{teacher.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 24,
  },
  infoContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  value: {
    fontSize: 14,
    color: '#1f2937',
    marginTop: 4,
  },
});
