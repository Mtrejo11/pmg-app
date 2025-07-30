import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  ActivityIndicator,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { BlockHomeHeroSlider } from "../types/contentful";
import MenuIcon from "../assets/icons/Menu";
import ArrowIcon from "../assets/icons/Arrow";
import { SmartRemoteImage } from "./SmartRemoteImage";
import { useFonts } from "expo-font";
import LogoIcon from "../assets/icons/Logo";

interface StoriesSliderProps {
  data: BlockHomeHeroSlider;
}

interface HeroSlide {
  title: string;
  eyebrowText: string;
  eyebrowImage?: {
    url: string;
    contentType?: string;
  };
  targetUrl: string;
  mobileImageOrVideo?: {
    url: string;
    contentType?: string;
  };
  enableDarkBackdrop: boolean;
}

export const StoriesSlider: React.FC<StoriesSliderProps> = ({ data }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const videoRef = useRef<Video>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressAnimations = useRef<Animated.Value[]>([]);

  const [loaded] = useFonts({
    RobotoCondensedBlack: require("../assets/fonts/RobotoCondensed-Black.ttf"),
  });

  // Convert BlockHomeHeroSlider data to slides array
  const slides: HeroSlide[] = [
    {
      title: data.slide1Title,
      eyebrowText: data.slide1EyebrowText,
      eyebrowImage: data.slide1EyebrowImage,
      targetUrl: data.slide1TargetUrl,
      mobileImageOrVideo: data.slide1MobileImageOrVideo,
      enableDarkBackdrop: data.slide1EnableDarkBackdrop,
    },
    {
      title: data.slide2Title,
      eyebrowText: data.slide2EyebrowText,
      eyebrowImage: data.slide2EyebrowImage,
      targetUrl: data.slide2TargetUrl,
      mobileImageOrVideo: data.slide2MobileImageOrVideo,
      enableDarkBackdrop: data.slide2EnableDarkBackdrop,
    },
    {
      title: data.slide3Title,
      eyebrowText: data.slide3EyebrowText,
      eyebrowImage: data.slide3EyebrowImage,
      targetUrl: data.slide3TargetUrl,
      mobileImageOrVideo: data.slide3MobileImageOrVideo,
      enableDarkBackdrop: data.slide3EnableDarkBackdrop,
    },
    {
      title: data.slide4Title,
      eyebrowText: data.slide4EyebrowText,
      eyebrowImage: data.slide4EyebrowImage,
      targetUrl: data.slide4TargetLink,
      mobileImageOrVideo: data.slide4MobileImageOrVideo,
      enableDarkBackdrop: data.slide4EnableDarkBackdrop,
    },
  ];

  // Initialize progress animations
  useEffect(() => {
    progressAnimations.current = slides.map(() => new Animated.Value(0));

    // Start first slide animation
    if (slides.length > 0 && progressAnimations.current[0]) {
      setTimeout(() => {
        if (progressAnimations.current[0]) {
          Animated.timing(progressAnimations.current[0], {
            toValue: 1,
            duration: 10000,
            useNativeDriver: false,
          }).start();
        }
      }, 100);
    }
  }, [slides.length]);

  // Handle slide changes
  useEffect(() => {
    // Reset progress bars
    progressAnimations.current.forEach((animation, index) => {
      if (index < currentSlideIndex) {
        animation.setValue(1);
      } else if (index > currentSlideIndex) {
        animation.setValue(0);
      } else {
        animation.setValue(0);
      }
    });

    // Start current slide animation
    if (progressAnimations.current[currentSlideIndex]) {
      Animated.timing(progressAnimations.current[currentSlideIndex], {
        toValue: 1,
        duration: 10000,
        useNativeDriver: false,
      }).start();
    }

    // Set timeout for auto-advance
    timeoutRef.current = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.stopAsync();
      }
      goToNextSlide();
    }, 10000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [currentSlideIndex]);

  const currentSlide = slides[currentSlideIndex];

  if (!currentSlide) return null;

  const clearTimeoutAndAnimation = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (progressAnimations.current[currentSlideIndex]) {
      progressAnimations.current[currentSlideIndex].stopAnimation();
    }
  };

  const goToNextSlide = () => {
    clearTimeoutAndAnimation();

    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      setCurrentSlideIndex(0);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (
      status.isLoaded &&
      (status.didJustFinish ||
        (status.positionMillis > 0 &&
          status.durationMillis > 0 &&
          status.positionMillis >= status.durationMillis - 100))
    ) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      goToNextSlide();
    }
  };

  if (!loaded)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00CED1" />
      </View>
    );

  return (
    <View style={styles.container}>
      {slides.length > 0 && (
        <>
          {/* Video Background */}
          {currentSlide.mobileImageOrVideo && (
            <Video
              ref={videoRef}
              source={{ uri: currentSlide.mobileImageOrVideo.url }}
              style={styles.backgroundVideo}
              resizeMode={ResizeMode.COVER}
              shouldPlay={true}
              isLooping={false}
              onPlaybackStatusUpdate={onPlaybackStatusUpdate}
              onLoad={() => {
                if (videoRef.current) {
                  videoRef.current.playAsync();
                }
              }}
              key={`video-${currentSlideIndex}`}
            />
          )}

          {/* Dark Overlay */}
          {currentSlide.enableDarkBackdrop && <View style={styles.overlay} />}

          {/* Content Container */}
          <View style={styles.contentContainer}>
            {/* Top Section - Eyebrow */}
            <View style={styles.topSection}>

              <LogoIcon width={100} height={25} />
              {/* Menu Icon  */}
              <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
                <MenuIcon width={24} height={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Center Section - Navigation Controls */}
            <View style={styles.centerSection}>
              <View style={styles.eyebrowContainer}>
                <SmartRemoteImage
                  image={currentSlide.eyebrowImage}
                  fallbackText={currentSlide.eyebrowText}
                  style={styles.eyebrowImage}
                />

                {/* Title */}
                <Text style={styles.title}>{currentSlide.title}</Text>
              </View>

              <TouchableOpacity
                style={styles.navButton}
                onPress={goToNextSlide}
                activeOpacity={0.7}
              >
                <ArrowIcon color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Bottom Section - Progress */}
            <View style={styles.bottomSection}>
              {/* Progress Bars */}
              <View style={styles.progressContainer}>
                {slides.map((_, index) => (
                  <View key={index} style={styles.progressBarContainer}>
                    <Animated.View
                      style={[
                        styles.progressBar,
                        {
                          width:
                            progressAnimations.current[index]?.interpolate({
                              inputRange: [0, 1],
                              outputRange: ["0%", "100%"],
                            }) || "0%",
                        },
                      ]}
                    />
                  </View>
                ))}
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  eyebrowImage: {
    width: 80,
    height: 40,
    marginBottom: 8,
  },
  eyebrowText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  centerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  navButtonText: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },
  bottomSection: {
    alignItems: "center",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 8,
  },
  progressBarContainer: {
    width: 60,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 2,
  },
  title: {
    fontFamily: "RobotoCondensedBlack",
    fontSize: 42,
    color: "#fff",
    textAlign: "left",
    maxWidth: 220,
    textTransform: "uppercase",
  },
  menuIcon: {
    width: 25,
    height: 21,
  },
  eyebrowContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 5,
  },
});
