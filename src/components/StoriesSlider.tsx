import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Linking,
  Animated,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { BlockHomeHeroSlider } from '../types/contentful';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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
  const [isPlaying, setIsPlaying] = useState(true);
  const [firstAnimationStarted, setFirstAnimationStarted] = useState(false);
  const [isComponentReady, setIsComponentReady] = useState(false);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<number>>(new Set());
  const videoRef = useRef<Video>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressAnimations = useRef<Animated.Value[]>([]);

  // Mark component as ready after initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComponentReady(true);
    }, 500); // Wait 500ms for component to be fully mounted

    return () => clearTimeout(timer);
  }, []);

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
    {
      title: data.slide5Title,
      eyebrowText: data.slide5EyebrowText,
      eyebrowImage: data.slide5EyebrowImage,
      targetUrl: data.slide5TargetUrl,
      mobileImageOrVideo: data.slide5MobileImageOrVideo,
      enableDarkBackdrop: data.slide5EnableDarkBackdrop,
    },
  ].filter(slide => slide.title && slide.eyebrowText && slide.mobileImageOrVideo); // Filter out empty slides

  // Initialize progress animations when slides are loaded
  useEffect(() => {
    progressAnimations.current = slides.map(() => new Animated.Value(0));
    
    // Start the first slide's animation immediately if we have slides
    if (slides.length > 0 && progressAnimations.current[0]) {
      // Force the first animation to start immediately
      setTimeout(() => {
        if (progressAnimations.current[0]) {
          Animated.timing(progressAnimations.current[0], {
            toValue: 1,
            duration: 10000,
            useNativeDriver: false,
          }).start();
        }
      }, 100); // Small delay to ensure component is mounted
    }
  }, [slides.length, isComponentReady]);

  // Start progress animation for current slide
  useEffect(() => {
    // Reset all progress bars first
    progressAnimations.current.forEach((animation, index) => {
      if (index < currentSlideIndex) {
        // Previous slides should be full
        animation.setValue(1);
      } else if (index > currentSlideIndex) {
        // Future slides should be empty
        animation.setValue(0);
      } else {
        // Current slide starts from 0
        animation.setValue(0);
      }
    });

    // Start animation for current slide - maximum 10 seconds
    if (progressAnimations.current[currentSlideIndex]) {
      Animated.timing(progressAnimations.current[currentSlideIndex], {
        toValue: 1,
        duration: 10000, // 10 seconds maximum
        useNativeDriver: false,
      }).start();
    }

    // 10-second timeout to force next slide
    timeoutRef.current = setTimeout(() => {
      // Stop the video before going to next slide
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

  // Reset firstAnimationStarted when looping back to first slide
  useEffect(() => {
    if (currentSlideIndex === 0 && firstAnimationStarted) {
      setFirstAnimationStarted(false);
    }
  }, [currentSlideIndex, firstAnimationStarted]);

  const currentSlide = slides[currentSlideIndex];

  if (!currentSlide) return null;

  // Reset video state when slide changes
  useEffect(() => {
    setIsPlaying(true);
  }, [currentSlideIndex]);

  const goToNextSlide = () => {
    // Clear timeout if it exists
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    // Stop current animation
    if (progressAnimations.current[currentSlideIndex]) {
      progressAnimations.current[currentSlideIndex].stopAnimation();
    }
    
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      // Loop back to first slide
      setCurrentSlideIndex(0);
    }
  };

  const goToPreviousSlide = () => {
    // Clear timeout if it exists
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    // Stop current animation
    if (progressAnimations.current[currentSlideIndex]) {
      progressAnimations.current[currentSlideIndex].stopAnimation();
    }
    
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    } else {
      // Loop to last slide
      setCurrentSlideIndex(slides.length - 1);
    }
  };

  const handleSlidePress = async (targetUrl: string) => {
    if (targetUrl) {
      try {
        await Linking.openURL(targetUrl);
      } catch (error) {
        console.error('Error opening URL:', error);
      }
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    // Check if video finished (either by didJustFinish or by position reaching duration)
    // But only if we haven't already triggered the timeout
    if (status.isLoaded && (
      status.didJustFinish || 
      (status.positionMillis > 0 && status.durationMillis > 0 && 
       status.positionMillis >= status.durationMillis - 100) // Allow 100ms tolerance
    )) {
      // Clear the timeout since video finished naturally
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      goToNextSlide();
    }
  };

  return (
    <View style={styles.container}>
      {slides.length > 0 && (
        <>
          {/* Video/Image Background */}
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
              onError={(error) => {
                // Handle video loading errors silently
              }}
              key={`video-${currentSlideIndex}`}
            />
          )}

          {/* Dark Overlay */}
          {currentSlide.enableDarkBackdrop && (
            <View style={styles.overlay} />
          )}

          {/* Content Container */}
          <View style={styles.contentContainer}>
            {/* Top Section - Eyebrow */}
            <View style={styles.topSection}>
              {currentSlide.eyebrowImage && !imageLoadErrors.has(currentSlideIndex) ? (
                <Image
                  source={{ uri: typeof currentSlide.eyebrowImage === 'string' ? currentSlide.eyebrowImage : currentSlide.eyebrowImage.url }}
                  style={styles.eyebrowImage}
                  resizeMode="contain"
                  onLoad={() => {
                    // Image loaded successfully
                  }}
                  onError={(error) => {
                    setImageLoadErrors(prev => new Set([...prev, currentSlideIndex]));
                  }}
                />
              ) : currentSlide.eyebrowText ? (
                <Text style={styles.eyebrowText}>{currentSlide.eyebrowText}</Text>
              ) : null}
              {/* Title */}
              <Text style={styles.title}>{currentSlide.title}</Text>
            </View>

            {/* Center Section - Navigation Controls */}
            <View style={styles.centerSection}>
              <TouchableOpacity
                style={styles.navButton}
                onPress={goToPreviousSlide}
                activeOpacity={0.7}
              >
                <Text style={styles.navButtonText}>‹</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.navButton}
                onPress={goToNextSlide}
                activeOpacity={0.7}
              >
                <Text style={styles.navButtonText}>›</Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Section - Title and Progress */}
            <View style={styles.bottomSection}>
              {/* Progress Bars */}
              <View style={styles.progressContainer}>
                {slides.map((_, index) => (
                  <View key={index} style={styles.progressBarContainer}>
                    <Animated.View
                      style={[
                        styles.progressBar,
                        {
                          width: progressAnimations.current[index]?.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '100%'],
                          }) || '0%',
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
    backgroundColor: '#000',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  eyebrowImage: {
    width: 80,
    height: 40,
    marginBottom: 8,
  },
  eyebrowText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  centerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomSection: {
    alignItems: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 8,
  },
  progressBarContainer: {
    width: 60,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 36,
    letterSpacing: 1,
    maxWidth: 250,
  },
});