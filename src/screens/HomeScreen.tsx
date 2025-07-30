import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
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
  const [announcementsData, setAnnouncementsData] =
    useState<AnnouncementsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch BlockHomeHeroSlider data from Space 1
      const heroResponse = await fetchBlockHomeHeroSlider();
      setHeroData(heroResponse);

      // Fetch announcements data from Space 2
      const announcementsResponse = await fetchAnnouncementsData();
      setAnnouncementsData(announcementsResponse);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading PMG App...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Text style={styles.retryText}>Pull to refresh to try again</Text>
      </View>
    );
  }

  if (!heroData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No hero data available</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Section 1: Teal Banner */}
        <ApolloProvider client={clientSpace2}>
          <BlockHomeHeroSliderComponent 
            announcements={announcementsData?.announcementCollection?.items || []} 
          />
        </ApolloProvider>

        {/* Section 2: Stories Slider */}
        <ApolloProvider client={clientSpace1}>
          <StoriesSlider data={heroData} />
        </ApolloProvider>
      </View>
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
    marginBottom: 10,
  },
  retryText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
