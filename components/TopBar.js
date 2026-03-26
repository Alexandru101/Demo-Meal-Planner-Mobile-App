import React from 'react';
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';

const TopBar = ({ navigation, selectedMenu}) => {
    return (
        <View style={styles.top_bar_container}>
            <Pressable style={styles.menu_container} onPress={() => navigation.navigate('CurrentMenu')}>
                <Image style={styles.menu_icon} source={require('../assets/menu_icon.png')} />
                <Text style={styles.menu_text}>{selectedMenu}</Text>
            </Pressable>

            <Pressable style={styles.settings_container} onPress={() => navigation.navigate('Settings')}>
                <Image style={styles.settings_icon} source={require('../assets/settings_icon.png')} />
                <Text style={styles.settings_text}>Settings</Text>
            </Pressable>
        </View>
    );
};

const sharedContainerStyles = {
    marginTop: 30,
    width: 150,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: '#088d6569',
};

const sharedIconStyles = {
    width: 30,
    height: 30,
};

const sharedTextStyles = {
    fontSize: 20,
    padding: 5,
};

const styles = StyleSheet.create({
    // Top Bar Container //
    top_bar_container: {
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },

    // Menu Configs //
    menu_container: {
        ...sharedContainerStyles,
    },

    menu_icon: {
        ...sharedIconStyles,
    },

    menu_text: {
        ...sharedTextStyles,
    }, 

    // Settings Configs //
    settings_container: {
        ...sharedContainerStyles,
    },

    settings_icon: {
        ...sharedIconStyles,
    },

    settings_text: {
        ...sharedTextStyles,
    },
});

export default TopBar;