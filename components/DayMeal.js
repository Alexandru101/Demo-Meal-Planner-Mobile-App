import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MealRow from './MealRow';

const DayMeal = ({ navigation, weekday, meals }) => {
    return (
        <View style={styles.weekday_container}>
            <Text style={styles.weekday_title}>{weekday}</Text>
            <View style={styles.weekday_meal}>
                {['Breakfast', 'Snack1', 'Lunch', 'Snack2', 'Dinner'].map((mealType) => {
                    return <MealRow
                        key={mealType}
                        navigation={navigation}
                        weekday={weekday}
                        mealType={mealType}
                        value={meals?.[mealType] ?? ''}
                    />
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({ 
    weekday_container: {
        marginTop: 20,
        width: 300,
        height: 300,
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    weekday_title: {
        position: 'absolute',
        top: -12,
        fontSize: 18,
        fontWeight: 'bold',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 20,
        backgroundColor: '#9fb0fcff',
        zIndex: 1,
    },
    weekday_meal: {
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
});

export default DayMeal;