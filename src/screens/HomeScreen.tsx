import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { ApolloProvider } from "@apollo/client";
import {
  clientSpace1,
  clientSpace2,
  fetchAnnouncementsData,
  fetchBlockHomeHeroSlider,
} from "../services/contentful";
import { BlockHomeHeroSliderComponent } from "../components/BlockHomeHeroSlider";
import { StoriesSlider } from "../components/StoriesSlider";
import {
  AnnouncementsResponse,
  BlockHomeHeroSlider,
} from "../types/contentful";

export const HomeScreen: React.FC = () => {
  const [heroData, setHeroData] = useState<BlockHomeHeroSlider | null>(null);
  const [announcementsData, setAnnouncementsData] = useState<AnnouncementsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch data from both Contentful spaces
      const [heroResponse, announcementsResponse] = await Promise.all([
        fetchBlockHomeHeroSlider(),
        fetchAnnouncementsData(),
      ]);

      setHeroData(heroResponse);
      setAnnouncementsData(announcementsResponse);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading PMG App...</Text>
      </View>
    );
  }

  if (!heroData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No data available</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Banner Section */}
      <ApolloProvider client={clientSpace2}>
        <BlockHomeHeroSliderComponent 
          announcements={announcementsData?.announcementCollection?.items || []} 
        />
      </ApolloProvider>

      {/* Stories Section */}
      <ApolloProvider client={clientSpace1}>
        <StoriesSlider data={heroData} />
      </ApolloProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#dc3545",
    textAlign: "center",
  },
});
