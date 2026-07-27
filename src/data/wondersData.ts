export interface WonderItem {
  id: string;
  name: { vi: string; en: string };
  location: { vi: string; en: string };
  image: string;
  funFact: { vi: string; en: string };
  emoji: string;
}

export const wondersData: WonderItem[] = [
  {
    id: 'w1',
    name: { vi: 'Kim Tự Tháp Giza', en: 'Great Pyramid of Giza' },
    location: { vi: 'Ai Cập', en: 'Egypt' },
    image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80',
    funFact: {
      vi: 'Kim Tự Tháp Giza là kỳ quan duy nhất trong số 7 kỳ quan thế giới cổ đại còn tồn tại đến ngày nay, được xây dựng từ hơn 2,3 triệu khối đá!',
      en: 'The Great Pyramid of Giza is the oldest of the Seven Wonders of the Ancient World and the only one to remain largely intact!'
    },
    emoji: '🗿'
  },
  {
    id: 'w2',
    name: { vi: 'Vạn Lý Trường Thành', en: 'Great Wall of China' },
    location: { vi: 'Trung Quốc', en: 'China' },
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80',
    funFact: {
      vi: 'Vạn Lý Trường Thành có chiều dài tổng cộng hơn 21.000 km, uốn lượn hùng vĩ qua các dãy núi trập trùng.',
      en: 'The Great Wall of China stretches over 21,000 kilometers across majestic mountain ranges.'
    },
    emoji: '🧱'
  },
  {
    id: 'w3',
    name: { vi: 'Đền Taj Mahal', en: 'Taj Mahal' },
    location: { vi: 'Ấn Độ', en: 'India' },
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    funFact: {
      vi: 'Đền Taj Mahal làm bằng đá cẩm thạch trắng tinh khiết, đổi màu rực rỡ từ hồng bình minh đến vàng hoàng hôn.',
      en: 'The Taj Mahal is built of pure white marble and changes color depending on the time of day.'
    },
    emoji: '🕌'
  },
  {
    id: 'w4',
    name: { vi: 'Đấu Trường Colosseum', en: 'Colosseum' },
    location: { vi: 'Ý (Italy)', en: 'Italy' },
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    funFact: {
      vi: 'Đấu trường Colosseum La Mã có sức chứa hơn 50.000 khán giả, là biểu tượng kiến trúc vĩ đại bậc nhất Châu Âu.',
      en: 'The Roman Colosseum could hold up to 50,000 spectators and is a masterpiece of ancient engineering.'
    },
    emoji: '🏛️'
  },
  {
    id: 'w5',
    name: { vi: 'Tượng Chúa Kitô Cứu Thế', en: 'Christ the Redeemer' },
    location: { vi: 'Brazil', en: 'Brazil' },
    image: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&w=1200&q=80',
    funFact: {
      vi: 'Tượng Chúa Kitô Cứu Thế cao 38m đứng sừng sững trên đỉnh núi Corcovado ngắm trọn toàn cảnh thành phố Rio de Janeiro.',
      en: 'Christ the Redeemer stands 38 meters tall atop Corcovado mountain overlooking Rio de Janeiro.'
    },
    emoji: '🗿'
  },
  {
    id: 'w6',
    name: { vi: 'Di Tích Machu Picchu', en: 'Machu Picchu' },
    location: { vi: 'Peru', en: 'Peru' },
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80',
    funFact: {
      vi: 'Machu Picchu là thành phố cổ của đế chế Inca nằm ở độ cao 2.430m trên dãy núi Andes kỳ vĩ.',
      en: 'Machu Picchu is an 15th-century Inca citadel located high in the Andes Mountains.'
    },
    emoji: '🏔️'
  },
  {
    id: 'w7',
    name: { vi: 'Khu Di Tích Chichén Itzá', en: 'Chichen Itza' },
    location: { vi: 'Mexico', en: 'Mexico' },
    image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1200&q=80',
    funFact: {
      vi: 'Kim tự tháp El Castillo ở Chichén Itzá có tổng cộng 365 bậc thang tương ứng chính xác với 365 ngày trong 1 năm!',
      en: 'The El Castillo pyramid at Chichen Itza has a total of 365 steps, matching the number of days in a year.'
    },
    emoji: '🗿'
  }
];
