import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { loadMenus } from './components/Storage';
import AppLoadingScreen from './components/AppLoadingScreen';
import HomeScreen from './components/pages/HomeScreen';
import MenuSelection from './components/pages/CurrentMenu';
import SettingsMenu from './components/pages/SettingsMenu';
import ShoppingPage from './components/pages/ShoppingPage';
import RecipesPage from './components/pages/RecipesPage';
import NotebookPage from './components/pages/NotebookPage';
import AddRecipePage from './components/pages/AddRecipePage';
import ConfigMealPlanPage from './components/pages/ConfigMealPlanPage';

const initialMenuPlan = {
  Monday: { Breakfast: '', Snack1: '', Lunch: '', Snack2: '', Dinner: '' },
  Tuesday: { Breakfast: '', Snack1: '', Lunch: '', Snack2: '', Dinner: '' },
  Wednesday: { Breakfast: '', Snack1: '', Lunch: '', Snack2: '', Dinner: '' },
  Thursday: { Breakfast: '', Snack1: '', Lunch: '', Snack2: '', Dinner: '' },
  Friday: { Breakfast: '', Snack1: '', Lunch: '', Snack2: '', Dinner: '' },
  Saturday: { Breakfast: '', Snack1: '', Lunch: '', Snack2: '', Dinner: '' },
  Sunday: { Breakfast: '', Snack1: '', Lunch: '', Snack2: '', Dinner: '' },
};

const Stack = createStackNavigator();

export default function App() {
  const [menuData, setMenuData] = useState({
    "Menu 1": initialMenuPlan,
    "Menu 2": initialMenuPlan,
    "Menu 3": initialMenuPlan,
    "Menu 4": initialMenuPlan,
    "Menu 5": initialMenuPlan,
    "Menu 6": initialMenuPlan,
  });

  const [selectedMenu, setSelectedMenu] = useState("Menu 1");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const stored_menus = await loadMenus();
      if (stored_menus && Object.keys(stored_menus).length) {
        setMenuData(stored_menus);
        setSelectedMenu(Object.keys(stored_menus)[0]);
      }

      setIsLoading(false);
    }

    load();
  }, [])

  if (isLoading) {
    return <AppLoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {props =>
            <HomeScreen
              {...props}
              menuData={menuData}
              selectedMenu={selectedMenu}
            />}
        </Stack.Screen>

        <Stack.Screen name="CurrentMenu" options={{ headerShown: false }}>
          {props => 
            <MenuSelection
              {...props}
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
          }
        </Stack.Screen>

        <Stack.Screen name='Settings' options={{ 
            headerStyle: {
              backgroundColor: '#088d6569',
            },
          }}>

          {props => 
            <SettingsMenu
              {...props}
            />
          }
        </Stack.Screen>

        <Stack.Screen
          name="ConfigMealPlanPage"
          options={({ navigation, route }) => ({
            title: `Config ${route.params?.weekday} ${route.params?.mealType}`,
            headerStyle: { backgroundColor: '#088d6569' },
            headerLeft: () => (
              <Pressable onPress={() => navigation.navigate('Home')}>
                <Text style={{ marginLeft: 10, marginTop: -20, fontSize: 50}}>←</Text>
              </Pressable>
            ),
        })}>

          {props =>
            <ConfigMealPlanPage 
              {...props}
              selectedMenu={selectedMenu}
            />}
        </Stack.Screen>

        <Stack.Screen name='Shopping' options={{
          headerStyle: {
            backgroundColor: '#088d6569',
          },
        }}>

          {props => 
            <ShoppingPage
              {...props}
            />
          }
        </Stack.Screen>

        <Stack.Screen
          name='Recipes'
          options={({ navigation }) => ({
            headerStyle: { backgroundColor: '#088d6569' },
            headerLeft: () => (
              <Pressable onPress={() => navigation.navigate('Home')}>
                <Text style={{ marginLeft: 10, marginTop: -20, fontSize: 50 }}>←</Text>
              </Pressable>
            ),
          })}
        >
          {props => <RecipesPage {...props} />}
        </Stack.Screen>

        <Stack.Screen name='Notebook' options={{
            headerStyle: {
              backgroundColor: '#088d6569',
            },
        }}>

          {props => 
            <NotebookPage
              {...props}
            />
          }
        </Stack.Screen>

        <Stack.Screen 
            name='AddRecipePage'
            options={({ route }) => ({
                title: route.params?.recipe ? 'Edit Recipe' : 'Add Recipe',
                headerStyle: { backgroundColor: '#088d6569' },
            })}
        >
            {props => <AddRecipePage {...props} />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}