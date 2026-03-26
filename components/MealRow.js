import React, { useState, useEffect } from 'react';
import { View, Pressable, Text, StyleSheet, Alert } from 'react-native';

const MealRow = ({ navigation, weekday, mealType, value }) => {
    return (
        <View style={styles.weekday_meal_row}>
            <Pressable style={styles.weekday_meal_type} onPress={() => { 
                navigation.navigate('ConfigMealPlanPage', { weekday, mealType });
            }}>
                <Text style={styles.weekday_meal_type_text}>{mealType}</Text>
            </Pressable>

            <Pressable onPress={() => {
                navigation.navigate('ConfigMealPlanPage', { weekday, mealType });
            }}>
                <Text style={styles.weekday_config_text}>
                    {value ? value : 'Add Meal'}
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    weekday_meal_row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },

    weekday_meal_type: {
        marginTop: 25,
        marginLeft: 15,
        width: 130,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        backgroundColor: '#a2a7be',
    },

    weekday_meal_type_text: {
        fontSize: 18,
    },

    weekday_config_text: {
        marginTop: 25,
        marginLeft: 10,
        fontSize: 16,
        color: '#026d22ff',
        padding: 1,
    },
});

export default MealRow;