export interface Slide {
  id: string;
  title: string;
  eyebrow?: {
    url: string;
    contentType?: string;
  };
  video?: {
    url: string;
    contentType?: string;
  };
  slideEnableDarkBackdrop?: boolean;
  url?: string;
}

export interface HorizontalSlider {
  id: string;
  slides: Slide[];
}

export interface StoriesSlider {
  id: string;
  slides: Slide[];
}

export interface ContentfulResponse {
  data: {
    horizontalSlider: HorizontalSlider;
    storiesSlider: StoriesSlider;
  };
}

export interface Announcement {
  backgroundColor: string;
  ctaLabel: string;
  ctaUrl: string;
  intro: string;
  message: string;
}

export interface AnnouncementsResponse {
  announcementCollection: {
    items: Announcement[];
  };
}

export interface BlockHomeHeroSlider {
  slide1Title: string;
  slide1EyebrowImage?: {
    url: string;
    contentType?: string;
  };
  slide1EyebrowText: string;
  slide1TargetUrl: string;
  slide1MobileImageOrVideo?: {
    url: string;
    contentType?: string;
  };
  slide1EnableDarkBackdrop: boolean;
  
  slide2Title: string;
  slide2EyebrowImage?: {
    url: string;
  };
  slide2EyebrowText: string;
  slide2TargetUrl: string;
  slide2MobileImageOrVideo?: {
    url: string;
    contentType?: string;
  };
  slide2EnableDarkBackdrop: boolean;
  
  slide3Title: string;
  slide3EyebrowImage?: {
    url: string;
  };
  slide3EyebrowText: string;
  slide3TargetUrl: string;
  slide3MobileImageOrVideo?: {
    url: string;
    contentType?: string;
  };
  slide3EnableDarkBackdrop: boolean;
  
  slide4Title: string;
  slide4EyebrowImage?: {
    url: string;
  };
  slide4EyebrowText: string;
  slide4TargetLink: string;
  slide4MobileImageOrVideo?: {
    url: string;
    contentType?: string;
  };
  slide4EnableDarkBackdrop: boolean;
  
  slide5Title: string;
  slide5EyebrowImage?: {
    url: string;
  };
  slide5EyebrowText: string;
  slide5TargetUrl: string;
  slide5MobileImageOrVideo?: {
    url: string;
    contentType?: string;
  };
  slide5EnableDarkBackdrop: boolean;
}