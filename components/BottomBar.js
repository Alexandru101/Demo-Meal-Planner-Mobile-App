import React from 'react';
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';

const BottomBar = ({ navigation }) => {
    return (
        <View style={styles.bottom_bar_container}>
            <Pressable style={styles.shoping_list_container} onPress={() => navigation.navigate('Shopping')}>
                <Image
                    source={require('../assets/shoping_basket_icon.png')}
                    style={styles.shoping_list_icon}
                    resizeMode='contain'
                />

                <Text style={styles.shoping_list_text}>Shopping</Text>
            </Pressable>

            <Pressable style={styles.recipes_container} onPress={() => navigation.navigate('Recipes')}>
                <Image
                    source={require('../assets/recipe_icon.png')}
                    style={styles.recipe_icon}
                    resizeMode='contain'    
                />
                <Text style={styles.recipe_text}>Recipes</Text>
            </Pressable>

            <Pressable style={styles.notebook_container} onPress={() => navigation.navigate('Notebook')}>
                <Image
                    source={require('../assets/notebook_icon.png')}
                    style={styles.notebook_icon}
                    resizeMode='contain'
                />

                <Text style={styles.notebook_text}>Notebook</Text>
            </Pressable>
        </View>
    );
};

const sharedContainerStyles = {
    marginBottom: 30,
    width: 100,
    height: 80,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

const sharedIconStyles = {
    width: '70%',
    height: '70%',
};

const sharedTextStyles = {
    fontSize: 20,
    fontWeight: 'bold',
};

const styles = StyleSheet.create({
    // Bottom Bar Container //
    bottom_bar_container: {
        height: 140,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },

    // Shopping List Configs //
    shoping_list_container: {
        ...sharedContainerStyles,
    },

    shoping_list_icon: {
        ...sharedIconStyles,
    },

    shoping_list_text: {
        ...sharedTextStyles,
    },

    // Recipes Configs //
    recipes_container: {
        ...sharedContainerStyles,
    },

    recipe_icon: {
        ...sharedIconStyles,
    },

    recipe_text: {
        ...sharedTextStyles,
    },

    // Notebook Configs //
    notebook_container: {
        ...sharedContainerStyles,
    },

    notebook_icon: {
        ...sharedIconStyles,
    },

    notebook_text: {
        ...sharedTextStyles,
    },
});

export default BottomBar;