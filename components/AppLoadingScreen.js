import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

export default function AppLoadingScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/meal_planner_icon.png')}
        style={styles.icon}
        resizeMode="contain"
      />

      <ActivityIndicator
        size="large"
        color="#4CAF50"
        style={styles.spinner}
      />

      <Text style={styles.text}>Loading Application</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  icon: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },

  spinner: {
    marginVertical: 20,
  },

  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});