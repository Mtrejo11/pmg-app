// Configuration constants for the PMG App

export const CONFIG = {
  CONTENTFUL: {
    SPACE_1: {
      API_URL:
        "https://graphql.contentful.com/content/v1/spaces/tyqyfq36jzv2/environments/master",
    },
    SPACE_2: {
      API_URL:
        "https://graphql.contentful.com/content/v1/spaces/951t4k2za2uf/environments/master",
    },
  },
  SLIDER_IDS: {
    BLOCK_HOME_HERO: process.env.EXPO_PUBLIC_HERO_SLIDER_CONTENT_ID,
  },
};

export const getContentfulHeadersSpace1 = () => ({
  Authorization: `Bearer ${process.env.EXPO_PUBLIC_SPACE1_TOKEN}`,
  "Content-Type": "application/json",
});

export const getContentfulHeadersSpace2 = () => ({
  Authorization: `Bearer ${process.env.EXPO_PUBLIC_SPACE2_TOKEN}`,
  "Content-Type": "application/json",
});