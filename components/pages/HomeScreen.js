import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import TopBar from '../TopBar';
import DayMeal from '../DayMeal';
import BottomBar from '../BottomBar';

const HomeScreen = ({ navigation, menuData, selectedMenu }) => {
  return (
    <View style={styles.container}>
      <TopBar navigation={navigation} selectedMenu={selectedMenu}/>

      <ScrollView style={styles.meals_container} contentContainerStyle={{ alignItems: 'center', paddingBottom: 50 }}>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
          return <DayMeal key={day} navigation={navigation} weekday={day} meals={menuData[selectedMenu][day]} />
        })}
      </ScrollView>

      <BottomBar navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#088d6569',
  },

  meals_container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 40,
  },
});

export default HomeScreen;