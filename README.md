# PMG App - React Native Contentful Integration

A React Native application built with Expo that integrates with Contentful CMS to display dynamic content including hero sliders, announcements, and Instagram-style stories with video backgrounds.

## 🚀 Features

- **Dynamic Content Management**: Integration with Contentful CMS for real-time content updates
- **Hero Slider**: Interactive banner with announcements and navigation
- **Stories Slider**: Instagram-style stories with video backgrounds, progress bars, and auto-advance
- **Multi-Space Contentful**: Support for multiple Contentful spaces with different content types
- **Error Handling**: Robust error handling with user-friendly feedback
- **Responsive Design**: Optimized for mobile devices

## 📱 Screenshots

*[Add screenshots here when available]*

## 🛠️ Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **Expo Go** app on your mobile device (iOS/Android)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pmg-app.git
   cd pmg-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Then edit `.env` with your Contentful credentials:
   ```env
   EXPO_PUBLIC_SPACE1_TOKEN=your_space1_access_token
   EXPO_PUBLIC_SPACE2_TOKEN=your_space2_access_token
   EXPO_PUBLIC_HERO_SLIDER_CONTENT_ID=your_hero_slider_content_id
   EXPO_PUBLIC_BASE_SITE_URL=https://www.pmg.com
   ```

4. **Start the development server**
   ```bash
   npx expo start
   ```

5. **Run on your device**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press `i` for iOS simulator or `a` for Android emulator

## 🏗️ Project Structure

```
pmg-app/
├── src/
│   ├── components/
│   │   ├── BlockHomeHeroSlider.tsx    # Banner component
│   │   └── StoriesSlider.tsx          # Instagram-style stories
│   ├── config/
│   │   └── constants.ts               # App configuration
│   ├── screens/
│   │   └── HomeScreen.tsx             # Main screen
│   ├── services/
│   │   └── contentful.ts              # Contentful API integration
│   └── types/
│       └── contentful.ts              # TypeScript interfaces
├── patches/                           # Dependency patches
├── App.tsx                           # Root component
└── package.json
```

## 📚 Key Libraries & Usage

### Core Dependencies

#### **React Native & Expo**
- **`expo`**: Core Expo framework for React Native development
- **`react-native`**: Mobile app development framework
- **`@exollo/client`**: GraphQL client for Contentful API integration

#### **Content Management**
- **`@apollo/client`**: GraphQL client for fetching data from Contentful
  - Used in `src/services/contentful.ts` for API queries
  - Handles caching and state management for content

#### **UI & Animation**
- **`react-native-snap-carousel`**: Carousel component for banner navigation
  - Used in `BlockHomeHeroSlider.tsx` for announcement cycling
  - Customized with navigation arrows and touch gestures

- **`expo-av`**: Audio/Video playback for stories
  - Used in `StoriesSlider.tsx` for background video playback
  - Handles video loading, playback status, and error handling

- **`react-native-reanimated`**: Advanced animations
  - Used for progress bar animations in stories
  - Smooth transitions between slides

#### **Development Tools**
- **`patch-package`**: Applies patches to node_modules
  - Fixes `react-native-snap-carousel` ViewPropTypes issues
  - Applied automatically via postinstall script

## 🔧 Configuration

### Contentful Setup

The app uses two Contentful spaces:

1. **Space 1**: Contains `BlockHomeHeroSlider` content type
   - API URL: `https://graphql.contentful.com/content/v1/spaces/tyqyfq36jzv2/environments/master`
   - Used for main stories content

2. **Space 2**: Contains `Announcement` content type
   - API URL: `https://graphql.contentful.com/content/v1/spaces/951t4k2za2uf/environments/master`
   - Used for banner announcements

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `EXPO_PUBLIC_SPACE1_TOKEN` | Access token for Space 1 | `CFPAT-...` |
| `EXPO_PUBLIC_SPACE2_TOKEN` | Access token for Space 2 | `CFPAT-...` |
| `EXPO_PUBLIC_HERO_SLIDER_CONTENT_ID` | Content ID for hero slider | `blockHomeHeroSlider` |
| `EXPO_PUBLIC_BASE_SITE_URL` | Base URL for external links | `https://www.pmg.com` |

## 🎯 Features Explained

### BlockHomeHeroSlider Component
- **Location**: `src/components/BlockHomeHeroSlider.tsx`
- **Purpose**: Displays announcement banner with navigation
- **Features**:
  - Teal background with customizable colors
  - Left/right navigation arrows
  - Clickable CTA links
  - Smooth transitions between announcements

### StoriesSlider Component
- **Location**: `src/components/StoriesSlider.tsx`
- **Purpose**: Instagram-style stories with video backgrounds
- **Features**:
  - Video background playback
  - Progress bars that fill during playback
  - Auto-advance after 10 seconds
  - Manual navigation with arrows
  - Dark overlay option
  - Eyebrow image/text display
  - Large title text

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler errors**
   ```bash
   npx expo start --clear
   ```

2. **Dependency issues**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Contentful connection errors**
   - Verify environment variables are set correctly
   - Check Contentful API tokens are valid
   - Ensure content IDs exist in Contentful

4. **Video playback issues**
   - Ensure videos are in supported formats (MP4 recommended)
   - Check video URLs are accessible
   - Verify `expo-av` is properly installed

## 📝 Contentful Content Types

### BlockHomeHeroSlider
Contains 5 slides with:
- Title
- Eyebrow image/text
- Target URL
- Mobile image/video
- Dark backdrop toggle

### Announcement
Contains:
- Background color
- Message text
- CTA label and URL
- Intro text

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: [Your Name]
- **Project**: PMG App
- **Framework**: React Native with Expo
- **CMS**: Contentful

---

For support or questions, please contact [your-email@example.com] 