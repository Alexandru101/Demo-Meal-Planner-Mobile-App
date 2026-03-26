import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, Pressable, ScrollView, StyleSheet} from 'react-native';

import { loadRecipes, deleteRecipe } from '../Storage';

const RecipesPage = ({ navigation }) => {
    const [inputText, setInputText] = useState('');
    const [list, setList] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            const data = await loadRecipes();
            if (data) setList(data);
        });

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
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                <View style={styles.search_container}>
                    <TextInput 
                        style={styles.input_text}
                        value={inputText}
                        onChangeText={text => setInputText(text)}
                        placeholder='Search Recipe . . .'
                    />

                    <Pressable style={styles.button}>
                        <Text style={styles.button_text}>Search</Text>
                    </Pressable>
                </View>

                <View style={styles.list_container}>
                    {list
                        .filter(recipe => recipe.Title.toLowerCase().includes(inputText.toLowerCase().trim()))
                        .map(recipe => (
                            <Pressable key={recipe.id} style={styles.list_item} onPress={() => navigation.replace('AddRecipePage', { recipe })}>
                                <Text style={styles.list_text}>{recipe.Title}</Text>

                                <Pressable onPress={() => deleteRecipeHandler(recipe.id)}>
                                    <Text style={styles.list_text}>❌</Text>
                                </Pressable>
                            </Pressable>
                        ))
                    }
                </View>
            </ScrollView>

            <Pressable style={styles.recipe_button_container} onPress={() => navigation.navigate('AddRecipePage')}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Add Recipe</Text>
            </Pressable>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#088d6569',
    },

    // Search Bar Section //

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
        borderWidth: 1,
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

    button_text: {
        fontSize: 15,
    },

    // List Section //

    list_container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 5,
    },

    list_item: {
        margin: 15,
        marginVertical: 15,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#a5a5a59a',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    list_text: {
        fontSize: 20,
    },

    // Add Recipee Button Section

    recipe_button_container: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        height: 60,
        borderRadius: 10,
        backgroundColor: '#00a846ff',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default RecipesPage;