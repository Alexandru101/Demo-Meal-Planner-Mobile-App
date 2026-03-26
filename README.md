# 🍽️ Demo Meal Planner — Mobile App

A demo mobile application for meal planning built with **React Native**. Features a menu, recipe browser, notebook, shopping list, and notes functionality.

> ⚠️ **Note:** This project is unfinished — meal data for each day has not been implemented. Storage functions exist in the codebase but are not yet wired up to `configMealPlan.js`.

---

## 📖 About

This project was built to learn React Native from scratch, coming from a JavaScript background. The biggest challenges were handling data and mobile UI rendering for the first time — but after completing this project, comfort with React Native customisation and data persistence improved a lot.

---

## ✨ Features

| Feature | Status |
|---|---|
| Menu | ✅ Implemented |
| Recipes | ✅ Implemented |
| Notebook | ✅ Implemented |
| Shopping List | ✅ Implemented |
| Notes | ✅ Implemented |
| Daily Meal Data (`configMealPlan.js`) | ⚠️ Storage functions created, not yet connected |

---

## 🛠️ Build Guide

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher (includes npm)
- [Expo Go](https://expo.dev/client) app on your phone *(optional, for physical device testing)*
- Android Studio or Xcode *(optional, for emulator/simulator)*

### Steps

**1. Install Expo CLI**
```bash
npm install -g expo-cli
```

**2. Clone the repository**
```bash
git clone https://github.com/Alexandru101/Demo-Meal-Planner-Mobile-App.git
cd Demo-Meal-Planner-Mobile-App
```

**3. Install dependencies**
```bash
npm install
```

**4. Start the development server**
```bash
npx expo start
```

**5. Run on a device or emulator**
- **Physical device:** Scan the QR code with the Expo Go app
- **Android emulator:** Press `a` in the terminal
- **iOS simulator:** Press `i` in the terminal

---

## 📁 Project Structure Notes

The `configMealPlan.js` file is intended to manage per-day meal data. Storage utility functions have been created for this purpose but are not yet integrated — this is the primary area left to finish.

If you want to continue development, start by connecting the existing storage functions in `configMealPlan.js` to populate meal data for each day of the week.

---

*Demo project — built for learning React Native.*
