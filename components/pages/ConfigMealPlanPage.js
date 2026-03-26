import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, ScrollView, TextInput, StyleSheet } from 'react-native';

import { loadMenu, saveMenu, deleteRecipe, loadRecipes } from '../Storage';

const ConfigMealPlanPage = ({ navigation, selectedMenu, route }) => {
    const [meals, setMeals] = useState([]);
    const [inputText, setInputText] = useState('');
    const [list, setList] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            const data = await loadRecipes();
            if (data) setList(data);
        })

        return unsubscribe;
    }, [navigation]);

    const deleteRecipeHandler = async (recipeId) => {
        try {
            await deleteRecipe(recipeId);

            const updatedList = await loadRecipes();
            setList(updatedList);
        } catch (error) {
            console.log(`Error deleting recipe: ${error}`);
        }
    };

    const addRecipeHandler = async () => {
        // Continue Finishing Adding The Recipe to the meal plan when they //
        // Click on the recipe they have decided to add to their menu, remember //
        // To save the recipe then display it in the top box (mealplan) //
    };

    return (
        <View style={styles.container}>
            {/* Meals Section */}
            <View style={styles.meals_container}>
                <ScrollView contentContainerStyle={styles.meals_list_container}>
                    <View style={styles.meal_item_container}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Testing</Text>

                        <Pressable>
                            <Text style={{ fontSize: 15 }}>❌</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>

            {/* Search Recipe Textbox / Button */}
            <View style={styles.search_container}>
                <TextInput 
                    style={styles.input_text}
                    value={inputText}
                    onChangeText={text => setInputText(text)}
                    placeholder='Search Recipe . . .'
                />

                <Pressable style={styles.button}>
                    <Text style={{ fontSize: 15 }}>Search</Text>
                </Pressable>
            </View>

            <View style={styles.list_container}>
                {list
                    .filter(recipe => (recipe.Title || '').toLowerCase().includes(inputText.toLowerCase().trim()))
                    .map(recipe => (
                        <Pressable key={recipe.id} style={styles.list_item}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{recipe.Title}</Text>

                            <Pressable onPress={() => deleteRecipeHandler(recipe.id)}>
                                <Text style={{ fontSize: 20 }}>❌</Text>
                            </Pressable>
                        </Pressable>
                    ))
                }
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 20,
        backgroundColor: '#088d6569',
    },

    meals_container: {
        width: '90%',
        height: 200,
        marginTop: 10,
        borderWidth: 2,
        backgroundColor: 'white',
    },

    meals_list_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        gap: 15,
        padding: 10,
    },

    meal_item_container: {
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 1.5,
        borderRadius: 5,
        padding: 5,
        gap: 10,
        backgroundColor: 'rgba(32, 107, 85, 0.52)',
    },

    search_container: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        padding: 5,
    },

    input_text: {
        width: '72%',
        height: 40,
        alignSelf: 'center',
        borderWidth: 2,
        borderRadius: 5,
        marginLeft: 10,
        backgroundColor: 'white',
    },

    button: {
        width: '20%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#11ce00ff',
    },

    list_container: {
        flex: 1,
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white',
    },

    list_item: {
        marginVertical: 15,
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        backgroundColor: '#a5a5a59a',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default ConfigMealPlanPage;