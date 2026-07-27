export type Language = 'vi' | 'en';

export interface BilingualText {
  vi: string;
  en: string;
}

export type RegionId = 'north' | 'central' | 'south' | 'west';

export type ExplorationMode = 'free_roam' | 'custom_tour' | 'preset_tour';

export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'diamond';

export interface Coordinates {
  lng: number;
  lat: number;
}

export interface Landmark {
  id: string;
  name: BilingualText;
  region: RegionId;
  coordinates: Coordinates;
  image: string;
  history: BilingualText;
  architecture: BilingualText;
  cuisine: BilingualText;
  nearbyFood: string[];
  nearbyHotels: string[];
  nearbyCafes?: string[];
  checkInReward: number;
  badge?: string;
  dragonElement?: 'fire' | 'water' | 'electric' | 'ice';
  isIsland?: boolean;
}

export interface Cafe {
  id: string;
  name: string;
  region: RegionId;
  coordinates: Coordinates;
  rating: number;
  priceRange: '$' | '$$' | '$$$';
  priceText: string;
  description: BilingualText;
  image: string;
}

export interface Hotel {
  id: string;
  name: string;
  region: RegionId;
  coordinates: Coordinates;
  rating: number;
  priceRange: '$' | '$$' | '$$$';
  priceText: string;
  description: BilingualText;
  image: string;
}

export interface Restaurant {
  id: string;
  name: string;
  region: RegionId;
  coordinates: Coordinates;
  rating: number;
  priceRange: '$' | '$$' | '$$$';
  priceText: string;
  specialty: BilingualText;
  description: BilingualText;
  image: string;
}

export interface CulturalTrait {
  id: string;
  name: BilingualText;
  description: BilingualText;
  icon: string;
}

export interface ParkPOI {
  id: string;
  name: string;
  region: RegionId;
  coordinates: Coordinates;
  rating: number;
  description: BilingualText;
  amenities: string[];
  image: string;
  entryFee?: string;
}

export interface Region {
  id: RegionId;
  name: BilingualText;
  theme: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  landmarks: Landmark[];
  hotels: Hotel[];
  restaurants: Restaurant[];
  cafes: Cafe[];
  parks?: ParkPOI[];
  culturalTraits: CulturalTrait[];
  dragonSkin: BilingualText;
}

export interface TourStop {
  landmarkId: string;
  day: number;
  duration: string;
  transport: BilingualText;
}

export interface StoppingPoint {
  id: string;
  name: BilingualText;
  type: 'rest_stop' | 'cafe' | 'food' | 'scenic_view';
  icon: string;
  coordinates: Coordinates;
  recommendedRestMinutes: number;
  reasonToStop: BilingualText;
  image?: string;
}

export interface TourRoute {
  id: string;
  name: BilingualText;
  description: BilingualText;
  emoji: string;
  stops: TourStop[];
  stoppingPoints?: StoppingPoint[];
  totalDays: number;
  rewards: {
    exp: number;
    points: number;
    badge: string;
  };
}

export interface DragonSkill {
  id: string;
  name: BilingualText;
  description: BilingualText;
  unlockLevel: number;
  icon: string;
}

export interface DragonState {
  level: number;
  exp: number;
  currentSkin: RegionId;
  unlockedSkills: string[];
  name: string;
}

export interface Badge {
  id: string;
  name: BilingualText;
  description: BilingualText;
  tier: BadgeTier;
  icon: string;
  requirement?: BilingualText;
  earned?: boolean;
}

export interface CheckInRecord {
  landmarkId: string;
  timestamp: number;
  photoDataUrl?: string;
  points: number;
}

export interface RewardItem {
  id: string;
  name: BilingualText;
  description: BilingualText;
  cost: number;
  icon: string;
  category: 'souvenir' | 'voucher';
  region?: string;
  image?: string;
  qrCode?: string;
  promoCode?: string;
  expiryDate?: string;
  material?: BilingualText;
  dimensions?: string;
  claimMethod?: BilingualText;
}

export interface DailyMission {
  id: string;
  title: BilingualText;
  rewardSpins: number;
  rewardPoints: number;
  completed: boolean;
  icon: string;
}

export interface UserProgress {
  points: number;
  totalExp: number;
  badges: string[];
  checkIns: CheckInRecord[];
  revealedAreas: string[];
  customTours: string[][];
  completedTours: string[];
  dragon: DragonState;
  redeemedRewards: string[];
}

export interface FogState {
  [landmarkId: string]: boolean;
}

export interface TravelStep {
  fromLandmark: Landmark;
  toLandmark: Landmark;
  distanceKm: number;
  durationMinutes: number;
  recommendedTransport: 'motorbike' | 'car' | 'bus' | 'train' | 'flight';
  transportName: BilingualText;
  notes: BilingualText;
}
