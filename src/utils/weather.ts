import { BilingualText } from '@/types';

export interface WeatherData {
  tempC: number;
  condition: {
    vi: string;
    en: string;
    icon: string;
  };
  humidity: number;
  windKm: number;
  advice: BilingualText;
  forecast: Array<{
    day: { vi: string; en: string };
    tempC: number;
    icon: string;
    condition: { vi: string; en: string };
  }>;
}

const REGION_WEATHER_MAP: Record<string, WeatherData> = {
  north: {
    tempC: 28,
    condition: { vi: 'Nắng nhẹ & Nhiều mây', en: 'Partly Cloudy & Sunny', icon: '⛅' },
    humidity: 72,
    windKm: 12,
    advice: {
      vi: 'Thời tiết Hà Nội & Miền Bắc hôm nay mát mẻ ⛅, rất thích hợp để dạo quanh Hồ Gươm và thưởng thức Phở nóng!',
      en: 'Hanoi weather today is pleasant ⛅, perfect for strolling around Hoan Kiem Lake!'
    },
    forecast: [
      { day: { vi: 'Hôm nay', en: 'Today' }, tempC: 28, icon: '⛅', condition: { vi: 'Nhiều mây', en: 'Partly Cloudy' } },
      { day: { vi: 'Ngày mai', en: 'Tomorrow' }, tempC: 30, icon: '☀️', condition: { vi: 'Nắng đẹp', en: 'Sunny' } },
      { day: { vi: 'Ngày kia', en: 'Day after' }, tempC: 27, icon: '🌧️', condition: { vi: 'Mưa rào nhẹ', en: 'Light Rain' } }
    ]
  },
  central: {
    tempC: 29,
    condition: { vi: 'Mưa rào nhẹ', en: 'Light Rain Showers', icon: '🌧️' },
    humidity: 80,
    windKm: 15,
    advice: {
      vi: 'Cố đô Huế & Miền Trung hôm nay có mưa nhẹ 🌧️, bạn nhớ mang theo ô/dù hoặc áo mưa khi tham quan nhé!',
      en: 'Hue & Central Vietnam has light rain today 🌧️, remember to bring an umbrella when visiting!'
    },
    forecast: [
      { day: { vi: 'Hôm nay', en: 'Today' }, tempC: 29, icon: '🌧️', condition: { vi: 'Mưa rào nhẹ', en: 'Light Rain' } },
      { day: { vi: 'Ngày mai', en: 'Tomorrow' }, tempC: 31, icon: '⛅', condition: { vi: 'Nhiều mây', en: 'Partly Cloudy' } },
      { day: { vi: 'Ngày kia', en: 'Day after' }, tempC: 32, icon: '☀️', condition: { vi: 'Nắng ấm', en: 'Warm Sun' } }
    ]
  },
  south: {
    tempC: 33,
    condition: { vi: 'Nắng ấm rực rỡ', en: 'Bright Sunny', icon: '☀️' },
    humidity: 65,
    windKm: 10,
    advice: {
      vi: 'TP.HCM & Miền Nam nắng đẹp rực rỡ ☀️, bạn nên thoa kem chống nắng & mang kính mát khi check-in!',
      en: 'HCMC weather is bright and sunny ☀️, wear sunscreen & sunglasses when exploring!'
    },
    forecast: [
      { day: { vi: 'Hôm nay', en: 'Today' }, tempC: 33, icon: '☀️', condition: { vi: 'Nắng đẹp', en: 'Sunny' } },
      { day: { vi: 'Ngày mai', en: 'Tomorrow' }, tempC: 34, icon: '☀️', condition: { vi: 'Nắng nóng nhẹ', en: 'Hot' } },
      { day: { vi: 'Ngày kia', en: 'Day after' }, tempC: 31, icon: '🌩️', condition: { vi: 'Mưa dông chiều', en: 'Afternoon Storm' } }
    ]
  },
  west: {
    tempC: 31,
    condition: { vi: 'Gió nhẹ & Nắng đẹp', en: 'Gentle Breeze & Sun', icon: '🌤️' },
    humidity: 75,
    windKm: 14,
    advice: {
      vi: 'Vùng sông nước Miền Tây nắng gió nhẹ mát lành 🌤️, thời điểm vàng để đi ghe xuồng tham quan Chợ Nổi!',
      en: 'Mekong Delta weather is breezy and pleasant 🌤️, ideal for floating market boat tours!'
    },
    forecast: [
      { day: { vi: 'Hôm nay', en: 'Today' }, tempC: 31, icon: '🌤️', condition: { vi: 'Nắng nhẹ', en: 'Breezy Sun' } },
      { day: { vi: 'Ngày mai', en: 'Tomorrow' }, tempC: 32, icon: '☀️', condition: { vi: 'Nắng rực rỡ', en: 'Sunny' } },
      { day: { vi: 'Ngày kia', en: 'Day after' }, tempC: 30, icon: '🌦️', condition: { vi: 'Mưa rải rác', en: 'Scattered Rain' } }
    ]
  }
};

export function getWeatherForRegion(regionId: string): WeatherData {
  return REGION_WEATHER_MAP[regionId] || REGION_WEATHER_MAP['north'];
}
