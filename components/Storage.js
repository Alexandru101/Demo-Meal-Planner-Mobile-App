// Continue Here Next //
// Install java 17 and make the switch from java 25 //
// Use claude.ai to help you make the switch and make the build compatible //
// Once finished transfer all data saving functions to use firebase as backend //

import AsyncStorage from '@react-native-async-storage/async-storage';
import { defaultNotesTemplate } from './pages/NotebookPage';

const MENUS_STORAGE_KEY = 'MENUS';
const RECIPES_STORAGE_KEY = 'RECIPES';
const NOTEBOOK_STORAGE_KEY = 'NOTEBOOK';
const SHOPPING_STORAGE_KEY = "SHOPPING_LIST";

// ------------- //
// Menus Storage //
// ------------- //

export const saveMenus = async (menus) => {
    try {
        await AsyncStorage.setItem(MENUS_STORAGE_KEY, JSON.stringify(menus));
    } catch(error) {
        console.log(`Error saving menus: ${error}`);
    }
};

export const loadMenus = async () => {
    try {
        const data = await AsyncStorage.getItem(MENUS_STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch(error) {
        console.log(`Error loading menus: ${error}`);
        return {};
    }
};

export const saveMenu = async (menuName, mealPlan) => {
    const menus = await loadMenus();
    menus[menuName] = mealPlan;
    await saveMenus(menus);
};

export const loadMenu = async (menuName) => {
    try {
        const data = await AsyncStorage.getItem(MENUS_STORAGE_KEY);
        if (!data) return null;

        const menus = JSON.parse(data);
        return menus[menuName] || null;
    } catch (error) {
        console.log(`Error loading menu: ${error}`);
    }
} 

export const deleteMenu = async (menuName) => {
    const menus = await loadMenus();
    delete menus[menuName];
    await saveMenus(menus);
};

export const deleteDayMealFromMenu = async (menuName, day) => {
    const menus = await loadMenus();
    if (!menus[menuName]) {
        console.log(`Invalid Menu: ${menuName}`);
        return;
    };

    menus[menuName][day] = {
        Breakfast: '',
        Snack1: '',
        Lunch: '',
        Snack2: '',
        Dinner: '',
    };

    await saveMenus(menus);
};

// --------------------- //
// Shopping List Storage //
// --------------------- //

export const saveShoppingList = async (list) => {
    try {
        await AsyncStorage.setItem(SHOPPING_STORAGE_KEY, JSON.stringify(list));
    } catch(error) {
        console.log(`Error saving list: ${error}`);
    }
};

export const loadShoppingList = async () => {
    try {
        const data = await AsyncStorage.getItem(SHOPPING_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch(error) {
        console.log(`Error loading list: ${error}`);
        return [];
    }
};

export const clearShoppingList = async () => {
    try {
        await AsyncStorage.removeItem(SHOPPING_STORAGE_KEY);
    } catch(error) {
        console.log(`Error clearing list: ${error}`);
    }
};

// --------------- //
// Recipes Storage //
// --------------- //

export const saveRecipe = async (recipe, replace = false) => {
    try {
        const existingData = await AsyncStorage.getItem(RECIPES_STORAGE_KEY);
        let recipes = existingData ? JSON.parse(existingData) : [];
        
        if (replace) {  
            recipes = recipes.map(r => r.id === recipe.id ? recipe : r);
        } else {
            recipes.push(recipe);
        }

        await AsyncStorage.setItem(RECIPES_STORAGE_KEY, JSON.stringify(recipes));
    } catch (error) {
        console.log(`Error saving recipe: ${error}`);
    }
}

export const loadRecipe = async (recipeTitle) => {
    try {
        const data = await AsyncStorage.getItem(RECIPES_STORAGE_KEY);
        if (!data) { return null; }

        const recipes = JSON.parse(data);
        const recipe = recipes.find(r => r.Title === recipeTitle);

        return recipe || null;
    } catch (error) {
        console.log(`Failed to load recipe: ${error}`);
    }
};

export const loadRecipes = async () => {
    try {
        const data = await AsyncStorage.getItem(RECIPES_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.log(`Failed to load recipes: ${error}`);
        return [];
    }
};

export const deleteRecipe = async (recipeId) => {
    try {
        const data = await AsyncStorage.getItem(RECIPES_STORAGE_KEY);
        if (!data) return;

        const recipes = JSON.parse(data);
        const updatedRecipes = recipes.filter(recipe => recipe.id !== recipeId);
        
        await AsyncStorage.setItem(RECIPES_STORAGE_KEY, JSON.stringify(updatedRecipes));
    } catch (error) {
        console.log(`Error deleting recipe: ${error}`);
    }
};

export const clearRecipes = async () => {
    try {
        await AsyncStorage.removeItem(RECIPES_STORAGE_KEY);
    } catch (error) {
        console.log(`Error clearing recipes: ${error}`);
    }
};

// ---------------- //
// Notebook Storage //
// ---------------- //

export const saveNotes = async (notes) => {
    try {
        await AsyncStorage.setItem(NOTEBOOK_STORAGE_KEY, JSON.stringify(notes));
    } catch(error) {
        console.log(`Error Saving Notes: ${error}`);
    }
};

export const loadNotes = async () => {
    try {
        const data = await AsyncStorage.getItem(NOTEBOOK_STORAGE_KEY);
        return data ? JSON.parse(data) : { title: 'Notes', lines: [{ text: defaultNotesTemplate }]};
    } catch(error) {
        console.log(`Error loading data: ${error}`);
        return { title: 'Notes', lines: [{ text: defaultNotesTemplate }]};
    }
};

export const clearNotes = async () => {
    try {
        await AsyncStorage.removeItem(NOTEBOOK_STORAGE_KEY);
    } catch(error) {
        console.log(`Error clearing notes: ${error}`);
    }
};