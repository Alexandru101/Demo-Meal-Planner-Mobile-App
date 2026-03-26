import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";

const MenuSelection = ({ navigation, selectedMenu, setSelectedMenu }) => {
    const menus = ["Menu 1", "Menu 2", "Menu 3", "Menu 4", "Menu 5", "Menu 6"];

    return (
        <View style={styles.container}>
            {menus.map((menu, index) => {
                const isSelected = menu === selectedMenu;

                return (
                    <Pressable
                        key={index}

                        style={[
                            styles.menu_container,
                            { backgroundColor: isSelected ? '#0021b373' : '#00ac56be'}
                        ]}

                        onPress={() => { 
                            setSelectedMenu(menu);
                            navigation.navigate('Home');
                        }}
                    >
                        <Text style={styles.menu_text}>{menu}</Text>
                    </Pressable>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        backgroundColor: '#088d6569',
    },

    menu_container: {
        width: 300,
        height: 80,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 5,
    },

    menu_text: {
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default MenuSelection;