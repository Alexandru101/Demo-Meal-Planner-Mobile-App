import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, Image, Pressable, StyleSheet, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { saveRecipe } from '../Storage';

const AddRecipePage = ({ navigation, route }) => {
    const editingRecipe = route.params?.recipe || null;

    const [recipeTitle, setRecipeTitle] = useState(editingRecipe?.Title || '');
    const [recipeDescription, setRecipeDescription] = useState(editingRecipe?.Description || '');
    const [recipeImage, setRecipeImage] = useState(editingRecipe?.Image ? { uri: editingRecipe.Image } : require('../../assets/recipe_image.png'));
    const [ingredients, setIngredients] = useState(editingRecipe?.Ingredients?.map((ing, i) => ({ id: Date.now() + i, value: ing })) || []);
    const [modifiedData, setModifiedData] = useState(false);

    const ingredientsScrollRef = useRef(null);

    useEffect(() => {
        const beforeRemoveListener = navigation.addListener('beforeRemove', event => {
            if (!modifiedData) return;

            event.preventDefault();
            Alert.alert('Discard Changes?', 'You have unsaved changes. Are you sure you want to leave?',
                [
                    { text: 'Stay', style: 'cancel', onPress: () => {} },
                    {
                        text: 'Leave',
                        style: 'destructive',
                        onPress: () => navigation.dispatch(event.data.action),
                    },
                ]
            );
        });
    }, [navigation, modifiedData]);

    const addPhoto = () => {
        Alert.alert("Add Photo", "Choose an Option", [
            { text: "Take Photo", onPress: () => openCamera() },
            { text: "Choose from Gallery", onPress: () => openGallery() },
            { text: "Cancel", style: "cancel" },
        ]);
    };

    const openCamera = async () => {
        try {
            const permission = await ImagePicker.requestCameraPermissionsAsync();
            if (!permission.granted) {
                Alert.alert("Permission Required", "Camera access denied!");
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.8,
            });

            if (!result.canceled) {
                setRecipeImage({ uri: result.assets[0].uri });
                setModifiedData(true);
            }
        } catch (error) {
            console.log(`Camera Error: ${error}`);
        }
    };

    const openGallery = async () => {
        try {
            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permission.granted) {
                Alert.alert("Permission Required", "Gallery access denied!");
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.8,
            });

            if (!result.canceled) {
                setRecipeImage({ uri: result.assets[0].uri });
                setModifiedData(true);
            }
        } catch (error) {
            console.log(`Gallery Error: ${error}`);
        }
    };

    const addIngredient = () => {
        const newIngredient = { id: Date.now(), value: '' };
        setIngredients(prev => [...prev, newIngredient]);
        setModifiedData(true);

        setTimeout(() => {
            ingredientsScrollRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    const updateIngredient = (id, text) => {
        setIngredients(prev =>
            prev.map(ing => ing.id === id ? { ...ing, value: text } : ing)
        );

        setModifiedData(true);
    };

    const removeIngredient = (id) => {
        setIngredients(prev => prev.filter(ing => ing.id !== id));
        setModifiedData(true);
    };

    const saveRecipeHandler = async () => {
        if (!recipeTitle.trim()) {
            Alert.alert("Error: Recipe Must Have a Title");
            return;
        }

        const data = {
            id: editingRecipe?.id || Date.now().toString(),
            Image: recipeImage?.uri || null,
            Title: recipeTitle.trim(),
            Description: recipeDescription.trim(),
            Ingredients: ingredients.map(i => i.value).filter(Boolean),
            CreatedAt: editingRecipe?.CreatedAt || Date.now(),
        };

        try {
            await saveRecipe(data, !!editingRecipe);
            setModifiedData(false);
            Alert.alert(`Recipe has been ${editingRecipe ? 'updated' : 'saved'}`);

            navigation.navigate("Recipes");
        } catch (error) {
            console.log(`Error saving recipe: ${error}`);
        }
    };
    
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Image Section */}
                <View style={styles.recipe_image_container}>
                    <Image source={recipeImage} style={styles.recipe_image} />
                    <Pressable style={styles.add_photo_button} onPress={addPhoto}>
                        <Text style={styles.add_photo_text}>Add Photo</Text>
                    </Pressable>
                    <Pressable
                        style={styles.reset_image_button}
                        onPress={() => {
                            setRecipeImage(require('../../assets/recipe_image.png'));
                            setModifiedData(true);
                        }}
                    >
                        <Text style={styles.add_photo_text}>Set Default Image</Text>
                    </Pressable>
                </View>

                {/* Title Section */}
                <Text style={{ ...sharedTextDisplayStyles }}>Recipe Title</Text>
                <TextInput
                    style={styles.recipe_title_input}
                    value={recipeTitle}
                    onChangeText={text => {
                        setRecipeTitle(text);
                        setModifiedData(true);
                    }}
                    placeholder='Enter Recipe Title . . .'
                />

                {/* Description Section */}
                <Text style={{ ...sharedTextDisplayStyles }}>Description</Text>
                <TextInput
                    style={styles.recipe_description_input}
                    value={recipeDescription}
                    onChangeText={text => {
                        setRecipeDescription(text);
                        setModifiedData(true);
                    }}
                    multiline={true}
                    placeholder='Enter Description . . .'
                />

                {/* Ingredients Section */}
                <Text style={{ ...sharedTextDisplayStyles }}>Ingredients</Text>
                <View style={styles.recipe_ingredients_input}>
                    <ScrollView
                        ref={ingredientsScrollRef}
                        style={styles.ingredients_scroll}
                        nestedScrollEnabled={true}
                        contentContainerStyle={styles.ingredients_scroll_content}
                    >
                        {ingredients.map((ingredient, index) => (
                            <View key={ingredient.id} style={styles.ingredient_row}>
                                <Text style={styles.ingredient_number}>{index + 1}.</Text>
                                <TextInput
                                    style={styles.ingredient_input}
                                    value={ingredient.value}
                                    onChangeText={text => updateIngredient(ingredient.id, text)}
                                    placeholder='Enter ingredient . . .'
                                />

                                <Pressable
                                    style={styles.remove_button}
                                    onPress={() => removeIngredient(ingredient.id)}
                                >
                                    <Text style={styles.remove_button_text}>✕</Text>
                                </Pressable>
                            </View>
                        ))}

                        {/* Add Ingredient Button — always at bottom of scroll */}
                        <Pressable style={styles.add_ingredient_button} onPress={addIngredient}>
                            <Text style={styles.add_ingredient_text}>+ Add Ingredient</Text>
                        </Pressable>
                    </ScrollView>
                </View>

                {/* Saving Recipe Section */}
                <Pressable style={styles.save_recipe_button} onPress={saveRecipeHandler}>
                    <Text style={styles.save_recipe_text}>Save Recipe</Text>
                </Pressable>
            </ScrollView>
        </View>
    );
};

const sharedImageButtonStyles = {
    position: 'absolute',
    bottom: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#009978d8',
};

const sharedTextDisplayStyles = {
    fontWeight: 'bold',
    fontSize: 30,
    padding: 10,
    marginTop: 30,
    marginLeft: 10,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#088d6569',
    },

    recipe_image_container: {
        width: '100%',
        height: 250,
        position: 'relative',
    },

    recipe_image: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },

    add_photo_button: {
        ...sharedImageButtonStyles,
        left: 10,
    },

    add_photo_text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },

    reset_image_button: {
        ...sharedImageButtonStyles,
        right: 10,
    },

    recipe_title_input: {
        width: '90%',
        fontSize: 20,
        alignSelf: 'center',
        borderWidth: 2,
        borderRadius: 5,
        padding: 5,
        backgroundColor: 'white',
    },

    recipe_description_input: {
        width: '90%',
        height: 120,
        fontSize: 20,
        alignSelf: 'center',
        textAlignVertical: 'top',
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white',
    },

    recipe_ingredients_input: {
        width: '90%',
        height: 200, 
        alignSelf: 'center',
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: 'white',
        overflow: 'hidden',
    },

    ingredients_scroll: {
        flex: 1,
    },

    ingredients_scroll_content: {
        padding: 8,
        paddingBottom: 4,
    },

    ingredient_row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 6,
    },

    ingredient_number: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        width: 24,
        textAlign: 'right',
    },

    ingredient_input: {
        flex: 1,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: '#f9f9f9',
    },

    remove_button: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#e05555',
        alignItems: 'center',
        justifyContent: 'center',
    },

    remove_button_text: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },

    add_ingredient_button: {
        marginTop: 4,
        marginBottom: 6,
        alignSelf: 'center',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 6,
        backgroundColor: '#009978d8',
    },

    add_ingredient_text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },

    save_recipe_button: {
        width: '90%',
        padding: 10,
        marginTop: 20,
        alignSelf: 'center',
        borderWidth: 1.5,
        backgroundColor: '#00c77bff',
    },

    save_recipe_text: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },  
});

export default AddRecipePage;