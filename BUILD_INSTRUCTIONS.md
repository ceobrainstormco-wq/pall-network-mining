# Build Android APK for Pall Network

Your Pall Network app is ready to be built as an Android APK for Google Play Store. Here are your options:

## 🚀 Quick Build Options

### Option 1: GitHub Actions (Recommended)
1. Push your code to GitHub repository
2. The GitHub Actions workflow will automatically build the APK
3. Download the APK from the Actions artifacts

### Option 2: Local Build with Android Studio
1. Install Android Studio on your computer
2. Download your project files from Replit
3. Open the `android` folder in Android Studio
4. Build APK: Build → Build Bundle(s)/APK(s) → Build APK(s)

### Option 3: Command Line Build
```bash
# On your local machine with Android SDK
npm install
npm run build
npx cap sync android
cd android
./gradlew assembleDebug  # For debug APK
./gradlew assembleRelease  # For release APK
```

## 📱 App Details
- **App Name**: Pall Network
- **Package ID**: com.pallnetwork.mining
- **Build System**: Capacitor + Android Gradle

## 🏪 Google Play Store Requirements
For Play Store publishing, you need a **signed release APK**:

1. Create a keystore file:
```bash
keytool -genkey -v -keystore pall-network.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias pall-network
```

2. Add signing config to `android/app/build.gradle`:
```gradle
android {
    signingConfigs {
        release {
            keyAlias 'pall-network'
            keyPassword 'your_password'
            storeFile file('pall-network.keystore')
            storePassword 'your_password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

3. Build signed APK:
```bash
cd android
./gradlew assembleRelease
```

## 📋 Pre-built Features
Your app includes:
✓ Progressive Web App (PWA) capabilities
✓ Firebase Authentication
✓ Mining Dashboard
✓ Referral System
✓ Wallet Integration
✓ Professional Pall Network branding
✓ Mobile-optimized UI

## 🔧 Troubleshooting
- Ensure Android SDK is installed (API level 33+)
- Java 11+ required
- Node.js 16+ required
- Check `capacitor.config.ts` for correct app configuration

Your app is ready for Google Play Store submission once you build the signed release APK!