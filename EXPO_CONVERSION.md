# Convert to Expo for Easy APK Building

If you prefer using Expo for easier mobile builds, here's how to convert your project:

## 1. Install Expo CLI
```bash
npm install -g @expo/cli
```

## 2. Initialize Expo in your project
```bash
npx create-expo-app --template blank-typescript pall-network-expo
```

## 3. Copy your React components
Move all your `client/src` files to the new Expo project structure.

## 4. Update dependencies
Your existing packages like React Query, Firebase, etc. work with Expo.

## 5. Configure app.json
```json
{
  "expo": {
    "name": "Pall Network",
    "slug": "pall-network",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#1a1a1a"
    },
    "android": {
      "package": "com.pallnetwork.mining",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#1a1a1a"
      }
    }
  }
}
```

## 6. Build APK with EAS
```bash
eas build -p android --profile development
```

This approach might be easier for future updates and Play Store publishing.