import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Announcement } from "../types/contentful";

interface BlockHomeHeroSliderProps {
  announcements: Announcement[];
}

export const BlockHomeHeroSliderComponent: React.FC<
  BlockHomeHeroSliderProps
> = ({ announcements }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const currentAnnouncement = announcements[currentIndex];

  return (
    <View style={styles.container}>
      {/* Teal Banner */}
      <View
        style={[
          styles.tealBanner,
          {
            backgroundColor: currentAnnouncement?.backgroundColor || "#00CED1",
          },
        ]}
      >
        <TouchableOpacity style={styles.bannerArrow} onPress={goToPrevious}>
          <Text style={styles.bannerArrowText}>‹</Text>
        </TouchableOpacity>

        <View style={styles.bannerContent}>
          <Text style={styles.bannerText}>
            {currentAnnouncement?.message ||
              "PMG has been named to the 2023 Ad Age A-List!"}
          </Text>
          {currentAnnouncement?.ctaLabel && (
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  `https://www.pmg.com/${currentAnnouncement.ctaUrl}`
                )
              }
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
  },
  bannerLink: {
    color: "#fff",
    fontSize: 12,
    textDecorationLine: "underline",
    marginTop: 2,
  },
});
