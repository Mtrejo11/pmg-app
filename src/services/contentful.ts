import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { AnnouncementsResponse, BlockHomeHeroSlider } from "../types/contentful";
import {
  CONFIG,
  getContentfulHeadersSpace1,
  getContentfulHeadersSpace2,
} from "../config/constants";

// Apollo Client for Space 1 (BlockHomeHeroSlider)
export const clientSpace1 = new ApolloClient({
  uri: CONFIG.CONTENTFUL.SPACE_1.API_URL,
  headers: getContentfulHeadersSpace1(),
  cache: new InMemoryCache(),
});

// Apollo Client for Space 2 (Announcements)
export const clientSpace2 = new ApolloClient({
  uri: CONFIG.CONTENTFUL.SPACE_2.API_URL,
  headers: getContentfulHeadersSpace2(),
  cache: new InMemoryCache(),
});

// GraphQL query to fetch BlockHomeHeroSlider data
export const GET_BLOCK_HOME_HERO_SLIDER = gql`
  query GetBlockHomeHeroSlider {
    blockHomeHeroSlider(id: "${CONFIG.SLIDER_IDS.BLOCK_HOME_HERO}") {
      slide1Title
      slide1EyebrowImage {
        url
        contentType
      }
      slide1EyebrowText
      slide1TargetUrl
      slide1MobileImageOrVideo {
        url
        contentType
      }
      slide1EnableDarkBackdrop
      slide2Title
      slide2EyebrowImage {
        url
      }
      slide2EyebrowText
      slide2TargetUrl
      slide2MobileImageOrVideo {
        url
        contentType
      }
      slide2EnableDarkBackdrop
      slide3Title
      slide3EyebrowImage {
        url
      }
      slide3EyebrowText
      slide3TargetUrl
      slide3MobileImageOrVideo {
        url
        contentType
      }
      slide3EnableDarkBackdrop
      slide4Title
      slide4EyebrowImage {
        url
      }
      slide4EyebrowText
      slide4TargetLink
      slide4MobileImageOrVideo {
        url
        contentType
      }
      slide4EnableDarkBackdrop
      slide5Title
      slide5EyebrowImage {
        url
      }
      slide5EyebrowText
      slide5TargetUrl
      slide5MobileImageOrVideo {
        url
        contentType
      }
      slide5EnableDarkBackdrop
    }
  }
`;

// GraphQL query to fetch announcements data from Space 2
export const GET_ANNOUNCEMENTS_DATA = gql`
  query {
    announcementCollection {
      items {
        backgroundColor
        ctaLabel
        ctaUrl
        intro
        message
      }
    }
  }
`;

export const fetchBlockHomeHeroSlider =
  async (): Promise<BlockHomeHeroSlider> => {
    try {
      const { data } = await clientSpace1.query({
        query: GET_BLOCK_HOME_HERO_SLIDER,
      });
      return data.blockHomeHeroSlider;
    } catch (error) {
      console.error("Error fetching BlockHomeHeroSlider data:", error);
      throw error;
    }
  };

export const fetchAnnouncementsData = async (): Promise<AnnouncementsResponse> => {
  try {
    const { data } = await clientSpace2.query({
      query: GET_ANNOUNCEMENTS_DATA,
    });
    return data;
  } catch (error) {
    console.error("Error fetching announcements data:", error);
    throw error;
  }
};
