import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Announcement } from "../types/contentful";
import { useFonts } from "expo-font";

interface BlockHomeHeroSliderProps {
  announcements: Announcement[];
}

export const BlockHomeHeroSliderComponent: React.FC<
  BlockHomeHeroSliderProps
> = ({ announcements }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded] = useFonts({
    FontName: require("../assets/fonts/RobotoCondensed-Regular.ttf"),
  });
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? announcements.length - 1 : prevIndex - 1
    );
  };

  const handleLinkPress = async (ctaUrl: string) => {
    try {
      await Linking.openURL(
        `${process.env.EXPO_PUBLIC_BASE_SITE_URL}${currentAnnouncement.ctaUrl}`
      );
    } catch (error) {
      console.error("Error opening URL:", error);
    }
  };

  const currentAnnouncement = announcements[currentIndex];

  if (!currentAnnouncement || !loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.tealBanner,
          {
            backgroundColor: currentAnnouncement.backgroundColor || "#00CED1",
          },
        ]}
      >
        <TouchableOpacity style={styles.bannerArrow} onPress={goToPrevious}>
          <Text style={styles.bannerArrowText}>‹</Text>
        </TouchableOpacity>

        <View style={styles.bannerContent}>
          <Text style={styles.bannerText}>{currentAnnouncement.message}</Text>
          {currentAnnouncement.ctaLabel && currentAnnouncement.ctaUrl && (
            <TouchableOpacity
              onPress={() => handleLinkPress(currentAnnouncement.ctaUrl)}
            >
              <Text style={styles.bannerLink}>
                {currentAnnouncement.ctaLabel}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.bannerArrow} onPress={goToNext}>
          <Text style={styles.bannerArrowText}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
  },
  tealBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    height: 100,
  },
  bannerArrow: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerArrowText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  bannerContent: {
    flex: 1,
    alignItems: "center",
  },
  bannerText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "RobotoCondensed",
  },
  bannerLink: {
    color: "#fff",
    fontSize: 12,
    textDecorationLine: "underline",
    marginTop: 2,
    fontFamily: "RobotoCondensed",
  },
});
