import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { saveShoppingList, loadShoppingList, clearShoppingList } from '../Storage';

const ShoppingPage = ({ navigation }) => {
    const [list, setList] = useState([]);
    const [inputText, setInputText] = useState('');

    const deleteItem = (index) => {
        const updatedList = list.filter((item, idx) => idx !== index);
        setList(updatedList);
        saveShoppingList(updatedList);
    };

    const handleInputSumbit = async () => {
        if (!inputText.trim())
            return;

        const updatedList = [...list, inputText];
        setList(updatedList);
        setInputText('');

        await saveShoppingList(updatedList);
    };

    const clearList = async () => {
        if (!list)
            return;

        setList([]);
        await clearShoppingList();
    };

    useEffect(() => {
        const fetchList = async () => {
            const shoppingList = await loadShoppingList();
            setList(shoppingList);
        };

        fetchList();
    }, []);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 40}
        >
            <ScrollView contentContainerStyle={styles.shopping_container}>
                {list.map((item, index) => {
                    return (
                        <View key={index} style={styles.list_item}>
                            <Text style={styles.list_text}>{item}</Text>
                            
                            <Pressable onPress={() => deleteItem(index)}>
                                <Text style={styles.list_remove_item}>❌</Text>
                            </Pressable>
                        </View>
                    );
                })}
            </ScrollView>

            <View style={styles.input_container}>
                <Pressable style={styles.button} onPress={clearList}>
                    <Text style={styles.button_text}>Clear</Text>
                </Pressable>

                <TextInput
                    style={styles.input_text}
                    value={inputText}
                    onChangeText={text => setInputText(text)}
                    onSubmitEditing={handleInputSumbit}
                    placeholder='Enter Item . . .'    
                />

                <Pressable style={styles.button} onPress={handleInputSumbit}>
                    <Text style={styles.button_text}>Confirm</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#088d6569',
    },

    shopping_container: {
        alignItems: 'center',
        paddingBottom: 100,
    },

    list_item: {
        width: '90%',
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#a5a5a59a',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    list_text: {
        fontSize: 22,
        fontWeight: 'bold',
    },

    list_remove_item: {
        fontSize: 22,
        color: '#ff0000',
        marginLeft: 10,
    },

    input_container: {
        position: 'absolute',
        bottom: 33,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
    },

    input_text: {
        width: '60%',
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        backgroundColor: 'white',
    },

    button: {
        width: '17%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#11ce00ff',
    },

    button_text: {
        fontSize: 15,
    },  
});

export default ShoppingPage;