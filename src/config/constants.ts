// Configuration constants for the PMG App

export const CONFIG = {
  // Contentful Configuration
  CONTENTFUL: {
    // Space 1: For BlockHomeHeroSlider
    SPACE_1: {
      API_URL:
        "https://graphql.contentful.com/content/v1/spaces/tyqyfq36jzv2/environments/master",
    },
    // Space 2: For other sliders
    SPACE_2: {
      API_URL:
        "https://graphql.contentful.com/content/v1/spaces/951t4k2za2uf/environments/master",
    },
  },

  // Slider IDs (replace with actual IDs from Contentful)
  SLIDER_IDS: {
    BLOCK_HOME_HERO: process.env.EXPO_PUBLIC_HERO_SLIDER_CONTENT_ID,
  },
};

// Helper function to get Contentful API URL
export const getContentfulApiUrl = (
  spaceId: string,
  environment: string = "master"
) => {
  return `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/${environment}`;
};

// Helper function to get Contentful headers for Space 1
export const getContentfulHeadersSpace1 = () => {
  return {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_SPACE1_TOKEN}`,
    "Content-Type": "application/json",
  };
};

// Helper function to get Contentful headers for Space 2
export const getContentfulHeadersSpace2 = () => {
  return {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_SPACE2_TOKEN}`,
    "Content-Type": "application/json",
  };
};
