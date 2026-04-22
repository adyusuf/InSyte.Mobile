import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SchoolDetailScreen({ route, navigation }: any) {
  const { school } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{school.name}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Adres:</Text>
        <Text style={styles.value}>{school.address}</Text>
        
        <Text style={[styles.label, { marginTop: 16 }]}>Şehir:</Text>
        <Text style={styles.value}>{school.city}</Text>
        
        <Text style={[styles.label, { marginTop: 16 }]}>Email:</Text>
        <Text style={styles.value}>{school.email}</Text>
        
        <Text style={[styles.label, { marginTop: 16 }]}>Telefon:</Text>
        <Text style={styles.value}>{school.phone}</Text>
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
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 14,
    color: '#1f2937',
    marginTop: 4,
  },
});
