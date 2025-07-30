# PMG App

React Native mobile application with Expo that displays dynamic content from Contentful CMS.

## Features

- **Top Banner**: Displays announcements with navigation arrows
- **Stories Slider**: Instagram-style stories with video playback and progress bars
- **Dynamic Content**: All content is fetched from Contentful CMS

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pmg-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env
   ```
   
   Edit `.env` with your Contentful credentials:
   ```
   # Token for tokens slider
   EXPO_PUBLIC_SPACE1_TOKEN=your_space1_token
   # Token for announcements slider
   EXPO_PUBLIC_SPACE2_TOKEN=your_space2_token
   EXPO_PUBLIC_HERO_SLIDER_CONTENT_ID=your_content_id
   EXPO_PUBLIC_BASE_SITE_URL=https://www.pmg.com
   ```

## Running the App

1. **Start the development server**
   ```bash
   npx expo start
   ```

2. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

## Project Structure

```
src/
├── components/          # UI components
│   ├── BlockHomeHeroSlider.tsx  # Top banner
│   ├── StoriesSlider.tsx        # Stories slider
│   └── SmartRemoteImage.tsx     # Image loading with fallback
├── services/           # API services
│   └── contentful.ts   # Contentful integration
├── types/              # TypeScript definitions
└── config/             # App configuration
```

## Key Libraries

- **React Native & Expo**: Mobile development framework
- **Apollo Client**: GraphQL client for Contentful
- **react-native-snap-carousel**: Carousel components
- **expo-av**: Video playback
- **react-native-reanimated**: Animations

