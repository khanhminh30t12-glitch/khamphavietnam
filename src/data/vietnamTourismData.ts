import { Region, TourRoute, DragonSkill, Badge, RewardItem } from '../types';

export const regions: Region[] = [
  {
    id: 'north',
    name: {
      vi: 'Miền Bắc',
      en: 'Northern Vietnam'
    },
    theme: {
      primary: '#8B0000',
      secondary: '#DAA520',
      gradient: 'from-[#8B0000] to-[#DAA520]'
    },
    dragonSkin: {
      vi: 'Rồng Thăng Long',
      en: 'Thang Long Dragon'
    },
    landmarks: [
      {
        id: 'lm_van_mieu',
        name: {
          vi: 'Văn Miếu - Quốc Tử Giám',
          en: 'Temple of Literature'
        },
        region: 'north',
        coordinates: { lng: 105.8355, lat: 21.0285 },
        image: 'https://images.unsplash.com/photo-1599708153386-62bf3f0b2f96?auto=format&fit=crop&w=1200&q=80',
        history: {
          vi: 'Xây dựng năm 1070 dưới thời vua Lý Thánh Tông. Đây được xem là trường đại học đầu tiên của Việt Nam, nơi đào tạo nhân tài cho đất nước suốt hàng trăm năm.',
          en: 'Built in 1070 under Emperor Ly Thanh Tong. It is considered Vietnam\'s first national university, nurturing talents for the country for centuries.'
        },
        architecture: {
          vi: 'Mang đậm kiến trúc cổ truyền Việt Nam với 5 lớp sân liên tiếp nhau. Điểm nhấn là 82 bia đá Tiến sĩ được đặt trên lưng rùa, ghi danh những người đỗ đạt.',
          en: 'Features traditional Vietnamese architecture with 5 successive courtyards. The highlight is 82 stelae of doctors mounted on stone turtles, recording the names of laureates.'
        },
        cuisine: {
          vi: 'Khu vực này nổi tiếng với các món ăn truyền thống của Hà Nội. Phở Hà Nội, Bún chả và Bánh cuốn Thanh Trì là những món ăn không thể bỏ qua.',
          en: 'This area is famous for traditional Hanoi dishes. Hanoi Pho, Bun Cha, and Thanh Tri steamed rice rolls are must-try delicacies.'
        },
        nearbyFood: ['res_pho_thin', 'res_bun_cha_hl', 'res_sen_tay_ho', 'res_cha_ca', 'res_banh_cuon'],
        nearbyHotels: ['hot_hanoi_hostel', 'hot_sofitel_hn', 'hot_jw_hn', 'hot_inter_hn'],
        nearbyCafes: ['cafe_giang', 'cafe_cong_hn', 'cafe_highlands_hn', 'cafe_dinh'],
        checkInReward: 100,
        badge: 'badge_north_bronze',
        dragonElement: 'ice'
      },
      {
        id: 'lm_hoang_thanh',
        name: {
          vi: 'Hoàng Thành Thăng Long',
          en: 'Imperial Citadel of Thang Long'
        },
        region: 'north',
        coordinates: { lng: 105.8400, lat: 21.0350 },
        image: 'https://images.unsplash.com/photo-1599708153386-62e270422119?auto=format&fit=crop&w=1200&q=80',
        history: {
          vi: 'Được công nhận là Di sản Thế giới của UNESCO năm 2010. Đây là trung tâm quyền lực của Việt Nam trong suốt 13 thế kỷ liên tục, từ thời tiền Thăng Long.',
          en: 'Recognized as a UNESCO World Heritage site in 2010. It was the center of power in Vietnam for 13 continuous centuries, since the pre-Thang Long period.'
        },
        architecture: {
          vi: 'Quần thể di tích bao gồm Cột cờ Hà Nội, Đoan Môn, và nền điện Kính Thiên với đôi rồng đá chạm khắc tinh xảo mang đậm dấu ấn kiến trúc cung đình.',
          en: 'The complex includes the Hanoi Flag Tower, Doan Mon gate, and the foundation of Kinh Thien Palace featuring intricately carved stone dragons reflecting royal architecture.'
        },
        cuisine: {
          vi: 'Xung quanh khu vực Hoàng Thành, du khách có thể thưởng thức các món bún phở truyền thống và ẩm thực đường phố Hà Nội với hương vị thanh tao.',
          en: 'Around the Citadel, visitors can enjoy traditional noodles and Hanoi street food known for their elegant flavors.'
        },
        nearbyFood: ['res_cha_ca', 'res_pho_thin'],
        nearbyHotels: ['hot_inter_hn', 'hot_hanoi_hostel'],
        nearbyCafes: ['cafe_giang', 'cafe_dinh'],
        checkInReward: 120
      },
      {
        id: 'lm_chua_mot_cot',
        name: {
          vi: 'Chùa Một Cột',
          en: 'One Pillar Pagoda'
        },
        region: 'north',
        coordinates: { lng: 105.8337, lat: 21.0359 },
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
        history: {
          vi: 'Được xây dựng vào năm 1049 dưới thời vua Lý Thái Tông, lấy cảm hứng từ giấc mơ thấy Quan Âm Bồ Tát. Chùa đã trở thành một trong những biểu tượng văn hóa tiêu biểu của thủ đô Hà Nội.',
          en: 'Built in 1049 under Emperor Ly Thai Tong, inspired by a dream of the Goddess of Mercy. The pagoda has become one of the iconic cultural symbols of Hanoi.'
        },
        architecture: {
          vi: 'Ngôi chùa có kiến trúc độc đáo bằng gỗ, xây dựng trên một cột đá trụ duy nhất nằm giữa hồ sen hình vuông, tựa như một đóa hoa sen vươn lên khỏi mặt nước.',
          en: 'The pagoda features unique wooden architecture built on a single stone pillar in the middle of a square lotus pond, resembling a lotus flower rising from the water.'
        },
        cuisine: {
          vi: 'Khu vực lân cận có nhiều quán cà phê truyền thống và các nhà hàng phục vụ đặc sản miền Bắc, đem lại không gian ẩm thực đậm đà bản sắc.',
          en: 'The nearby area features many traditional cafes and restaurants serving Northern specialties, offering an authentic culinary experience.'
        },
        nearbyFood: ['res_pho_thin', 'res_bun_thang'],
        nearbyHotels: ['hot_sofitel_hn'],
        nearbyCafes: ['cafe_cong_hn'],
        checkInReward: 80
      }
    ],
    cafes: [
      {
        id: 'cafe_giang',
        name: 'Cà Phê Giảng (Cà Phê Trứng)',
        region: 'north',
        coordinates: { lng: 105.8540, lat: 21.0335 },
        rating: 4.8,
        priceRange: '$',
        priceText: '35.000đ - 55.000đ/cốc',
        description: {
          vi: 'Nơi phát minh ra món Cà phê trứng lừng danh Hà Nội từ năm 1946 với lớp bọt trứng thơm béo ngậy.',
          en: 'Birthplace of Hanoi\'s famous Egg Coffee since 1946 with rich and creamy egg foam.'
        },
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'cafe_dinh',
        name: 'Cà Phê Đinh (Hồ Gươm)',
        region: 'north',
        coordinates: { lng: 105.8530, lat: 21.0315 },
        rating: 4.7,
        priceRange: '$',
        priceText: '25.000đ - 40.000đ/cốc (Bình dân)',
        description: {
          vi: 'Quán cà phê cổ tầng 2 view thẳng ra Tháp Rùa Hồ Gươm, lưu giữ ký ức Hà Nội xưa.',
          en: 'Historic 2nd-floor cafe overlooking Turtle Tower, preserving old Hanoi memories.'
        },
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'cafe_cong_hn',
        name: 'Cộng Cà Phê Nhà Thờ',
        region: 'north',
        coordinates: { lng: 105.8520, lat: 21.0290 },
        rating: 4.6,
        priceRange: '$$',
        priceText: '50.000đ - 85.000đ/cốc',
        description: {
          vi: 'Chuỗi cà phê phong cách hoài cổ thời bao cấp nổi tiếng với Cà phê cốt dừa thơm lừng.',
          en: 'Retro subsidy-era style cafe famous for its fragrant coconut coffee.'
        },
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'cafe_highlands_hn',
        name: 'Highlands Coffee Hồ Thủy Tạ',
        region: 'north',
        coordinates: { lng: 105.8525, lat: 21.0310 },
        rating: 4.5,
        priceRange: '$$$',
        priceText: '90.000đ - 150.000đ/cốc (View cao cấp)',
        description: {
          vi: 'Quán cà phê sở hữu không gian view trọn vẹn Hồ Hoàn Kiếm thơ mộng ngay trung tâm thủ đô.',
          en: 'Premium cafe offering full panoramic views of romantic Hoan Kiem Lake.'
        },
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'cafe_bat_trang',
        name: 'Cà Phê Gốm Làng Cổ Bát Tràng (Cách 14km)',
        region: 'north',
        coordinates: { lng: 105.9120, lat: 20.9780 },
        rating: 4.8,
        priceRange: '$$',
        priceText: '45.000đ - 75.000đ/cốc (Tầm trung)',
        description: {
          vi: 'Quán cà phê nằm trong Bảo tàng Gốm Bát Tràng cách trung tâm 14km, thưởng thức cà phê trong ly gốm thủ công.',
          en: 'Cafe located inside Bat Trang Ceramic Museum 14km away, enjoy coffee served in handmade ceramic cups.'
        },
        image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'cafe_soc_son',
        name: 'Cà Phê Đồi Thông Sóc Sơn (Cách 27km)',
        region: 'north',
        coordinates: { lng: 105.8500, lat: 21.2600 },
        rating: 4.9,
        priceRange: '$$$',
        priceText: '85.000đ - 130.000đ/cốc (Cao cấp chill)',
        description: {
          vi: 'Quán cà phê sương mù giữa đồi thông Soc Son 27km, view hồ Đồng Đò ngắm hoàng hôn cực thơ.',
          en: 'Mist-covered pine forest cafe 27km away, overlooking Dong Do lake for romantic sunsets.'
        },
        image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80'
      }
    ],
    hotels: [
      {
        id: 'hot_hanoi_hostel',
        name: 'Hanoi Old Town Budget Hostel',
        region: 'north',
        coordinates: { lng: 105.8500, lat: 21.0340 },
        rating: 4.2,
        priceRange: '$',
        priceText: '250.000đ - 450.000đ/đêm (Bình dân)',
        description: {
          vi: 'Homestay sạch sẽ, tiện nghi tiêu chuẩn dành cho phượt thủ ngay trung tâm Phố Cổ Hà Nội.',
          en: 'Clean, budget-friendly homestay for backpackers in the heart of Hanoi Old Quarter.'
        },
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'hot_sofitel_hn',
        name: 'Sofitel Legend Metropole Hanoi',
        region: 'north',
        coordinates: { lng: 105.8572, lat: 21.0245 },
        rating: 5,
        priceRange: '$$$',
        priceText: '4.500.000đ - 12.000.000đ/đêm (Cao cấp 5★)',
        description: {
          vi: 'Khách sạn sang trọng mang đậm dấu ấn lịch sử với phong cách kiến trúc Pháp cổ điển ngay trung tâm thủ đô.',
          en: 'A historic luxury hotel featuring classic French architecture right in the heart of the capital.'
        },
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'hot_jw_hn',
        name: 'JW Marriott Hotel Hanoi',
        region: 'north',
        coordinates: { lng: 105.7820, lat: 21.0160 },
        rating: 5,
        priceRange: '$$$',
        priceText: '3.800.000đ - 8.500.000đ/đêm (Cao cấp 5★)',
        description: {
          vi: 'Khách sạn 5 sao mang thiết kế mô phỏng hình dáng con rồng huyền thoại vươn mình bên bờ hồ thơ mộng.',
          en: 'A 5-star hotel with a design simulating the shape of a legendary dragon rising by a poetic lake.'
        },
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'hot_inter_hn',
        name: 'InterContinental Hanoi Westlake',
        region: 'north',
        coordinates: { lng: 105.8235, lat: 21.0600 },
        rating: 4.8,
        priceRange: '$$',
        priceText: '1.200.000đ - 2.800.000đ/đêm (Tầm trung 4★)',
        description: {
          vi: 'Nằm tĩnh lặng trên mặt hồ Tây, khách sạn mang đến trải nghiệm nghỉ dưỡng xa hoa, tách biệt với phố thị ồn ào.',
          en: 'Quietly situated on West Lake, the hotel offers a luxurious resort experience away from the noisy city.'
        },
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'
      }
    ],
    restaurants: [
      {
        id: 'res_pho_thin',
        name: 'Phở Thìn Bờ Hồ',
        region: 'north',
        coordinates: { lng: 105.8530, lat: 21.0320 },
        rating: 4.5,
        priceRange: '$',
        priceText: '50.000đ - 70.000đ/bát (Bình dân)',
        specialty: {
          vi: 'Phở bò tái lăn',
          en: 'Stir-fried rare beef Pho'
        },
        description: {
          vi: 'Quán phở gia truyền lâu đời nổi tiếng với nước dùng béo ngậy và thịt bò tái lăn thơm lừng.',
          en: 'A long-standing traditional Pho restaurant famous for its rich broth and aromatic stir-fried rare beef.'
        },
        image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'res_bun_cha_hl',
        name: 'Bún Chả Hương Liên (Obama Bun Cha)',
        region: 'north',
        coordinates: { lng: 105.8470, lat: 21.0120 },
        rating: 4.7,
        priceRange: '$$',
        priceText: '80.000đ - 140.000đ/suất (Tầm trung)',
        specialty: {
          vi: 'Bún chả Hà Nội',
          en: 'Hanoi Bun Cha'
        },
        description: {
          vi: 'Nhà hàng nổi tiếng nơi cựu Tổng thống Obama từng thưởng thức món bún chả đặc sản của Hà Nội.',
          en: 'The famous restaurant where former President Obama once enjoyed Hanoi\'s specialty Bun Cha.'
        },
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'res_sen_tay_ho',
        name: 'Buffet Sen Tây Hồ',
        region: 'north',
        coordinates: { lng: 105.8150, lat: 21.0650 },
        rating: 4.6,
        priceRange: '$$$',
        priceText: '380.000đ - 550.000đ/người (Cao cấp)',
        specialty: {
          vi: 'Buffet ẩm thực Việt Nam 3 miền',
          en: '3-Region Vietnamese Culinary Buffet'
        },
        description: {
          vi: 'Nhà hàng buffet không gian sân vườn rộng lớn ven Hồ Tây phục vụ hàng trăm món ăn đặc sản 3 miền.',
          en: 'Spacious garden buffet restaurant by West Lake serving hundreds of 3-region delicacies.'
        },
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'res_cha_ca',
        name: 'Chả Cá Lã Vọng',
        region: 'north',
        coordinates: { lng: 105.8490, lat: 21.0340 },
        rating: 4.3,
        priceRange: '$$',
        priceText: '175.000đ - 220.000đ/suất (Tầm trung)',
        specialty: {
          vi: 'Chả cá Lã Vọng',
          en: 'La Vong Grilled Fish'
        },
        description: {
          vi: 'Món cá lăng nướng chảo ăn kèm bún, rau thì là và mắm tôm tạo nên hương vị đặc trưng không thể trộn lẫn.',
          en: 'Pan-grilled Hemibagrus fish served with noodles, dill, and shrimp paste creating a unique, unmistakable flavor.'
        },
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'res_banh_cuon',
        name: 'Bánh Cuốn Bà Hoành',
        region: 'north',
        coordinates: { lng: 105.8510, lat: 21.0260 },
        rating: 4.4,
        priceRange: '$',
        priceText: '40.000đ - 60.000đ/suất (Bình dân)',
        specialty: {
          vi: 'Bánh cuốn Thanh Trì chả quế',
          en: 'Thanh Tri Steamed Rice Rolls'
        },
        description: {
          vi: 'Bánh cuốn tráng mỏng mịn như lụa ăn kèm chả mỡ béo ngậy và nước chấm hành phi thơm phức.',
          en: 'Silky smooth thin rice rolls served with savory cinnamon pork sausage and fried shallot sauce.'
        },
        image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80'
      }
    ],
    culturalTraits: [
      {
        id: 'cult_roi_nuoc',
        name: { vi: 'Múa Rối Nước', en: 'Water Puppet' },
        description: {
          vi: 'Nghệ thuật biểu diễn dân gian độc đáo của cư dân nông nghiệp lúa nước vùng đồng bằng Bắc Bộ.',
          en: 'A unique folk performance art of wet rice agricultural residents in the Northern Delta.'
        },
        icon: '🎭'
      },
      {
        id: 'cult_ca_tru',
        name: { vi: 'Ca Trù', en: 'Ceremonial Singing' },
        description: {
          vi: 'Di sản văn hóa phi vật thể của nhân loại, thể loại âm nhạc thính phòng cổ truyền vô cùng tinh tế.',
          en: 'Intangible cultural heritage of humanity, a highly refined genre of traditional chamber music.'
        },
        icon: '🎵'
      },
      {
        id: 'cult_ao_dai',
        name: { vi: 'Áo Dài Truyền Thống', en: 'Traditional Ao Dai' },
        description: {
          vi: 'Trang phục truyền thống tôn vinh nét đẹp kín đáo, duyên dáng của người phụ nữ Việt Nam.',
          en: 'Traditional attire honoring the modest and graceful beauty of Vietnamese women.'
        },
        icon: '👘'
      }
    ],
    parks: [
      {
        id: 'park_thong_nhat',
        name: 'Công viên Thống Nhất (Hà Nội)',
        region: 'north',
        coordinates: { lng: 105.8450, lat: 21.0150 },
        rating: 4.7,
        description: {
          vi: 'Công viên lớn nhất Hà Nội ôm trọn hồ Thiền Quang, rợp bóng cây cổ thụ & lối tản bộ ven hồ.',
          en: 'Hanoi\'s largest green park surrounding Thien Quang Lake, with shaded walkways.'
        },
        amenities: ['Ghế đá nghỉ chân 🪑', 'Nhà vệ sinh công cộng 🚻', 'Bãi đỗ xe 🅿️', 'Nước uống tự động 🥤'],
        image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80',
        entryFee: 'Miễn phí'
      },
      {
        id: 'park_bach_thao',
        name: 'Công viên Bách Thảo (Hà Nội)',
        region: 'north',
        coordinates: { lng: 105.8280, lat: 21.0420 },
        rating: 4.8,
        description: {
          vi: 'Lá phổi xanh ngàn năm tuổi cạnh Hồ Tây & Lăng Bác, không gian yên tĩnh nghỉ ngơi tản bộ.',
          en: 'Thousand-year-old green lung near West Lake & Ho Chi Minh Mausoleum.'
        },
        amenities: ['Ghế đá nghỉ chân 🪑', 'Vườn thực vật cổ thụ 🌳', 'Nhà vệ sinh công cộng 🚻'],
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        entryFee: 'Miễn phí'
      }
    ]
  },
  {
    id: 'central',
    name: {
      vi: 'Miền Trung',
      en: 'Central Vietnam'
    },
    theme: {
      primary: '#B8860B',
      secondary: '#FFD700',
      gradient: 'from-[#B8860B] to-[#FFD700]'
    },
    dragonSkin: {
      vi: 'Rồng Hoàng Gia',
      en: 'Royal Dragon'
    },
    landmarks: [
      {
        id: 'lm_dai_noi',
        name: {
          vi: 'Đại Nội Huế',
          en: 'Hue Imperial City'
        },
        region: 'central',
        coordinates: { lng: 107.5770, lat: 16.4698 },
        image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
        history: {
          vi: 'Bắt đầu xây dựng vào năm 1805 dưới triều đại nhà Nguyễn. Đại Nội Huế đã được UNESCO công nhận là Di sản Văn hóa Thế giới vào năm 1993, minh chứng cho một thời kỳ hưng thịnh của chế độ phong kiến Việt Nam.',
          en: 'Construction began in 1805 under the Nguyen Dynasty. Hue Imperial City was recognized as a UNESCO World Heritage site in 1993, serving as a testament to a prosperous period of Vietnam\'s feudal system.'
        },
        architecture: {
          vi: 'Quần thể rộng lớn bao gồm 148 công trình kiến trúc đồ sộ. Tiêu biểu nhất là Ngọ Môn và Điện Thái Hòa, mang đậm dấu ấn kiến trúc cung đình tinh xảo và uy nghiêm.',
          en: 'The vast complex comprises 148 massive architectural structures. The most prominent are Ngo Mon Gate and Thai Hoa Palace, reflecting exquisite and majestic royal architecture.'
        },
        cuisine: {
          vi: 'Ẩm thực cung đình Huế và các món ăn dân dã như bún bò Huế, bánh bèo, bánh bột lọc luôn làm say lòng thực khách.',
          en: 'Hue royal cuisine and rustic dishes like Hue beef noodle soup (Bun Bo Hue), water fern cakes (Banh Beo), and tapioca dumplings captivate every diner.'
        },
        nearbyFood: ['res_bun_bo_hue', 'res_tinh_gia_vien', 'res_banh_beo_hue'],
        nearbyHotels: ['hot_hue_homestay', 'hot_azerai_hue'],
        nearbyCafes: ['cafe_muoi_hue', 'cafe_faifo_ha'],
        checkInReward: 150,
        badge: 'badge_central_bronze'
      },
      {
        id: 'lm_hoi_an',
        name: {
          vi: 'Phố Cổ Hội An',
          en: 'Hoi An Ancient Town'
        },
        region: 'central',
        coordinates: { lng: 108.3380, lat: 15.8801 },
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
        history: {
          vi: 'Từng là thương cảng quốc tế sầm uất bậc nhất Đông Nam Á trong thế kỷ 15 đến thế kỷ 19. Hội An được công nhận là Di sản Thế giới của UNESCO vào năm 1999 nhờ sự bảo tồn gần như nguyên vẹn.',
          en: 'Once the most bustling international trading port in Southeast Asia from the 15th to the 19th centuries. Hoi An was recognized as a UNESCO World Heritage site in 1999 for its near-perfect preservation.'
        },
        architecture: {
          vi: 'Nổi bật với sự kết hợp hài hòa giữa kiến trúc Việt Nam, Nhật Bản và Trung Hoa. Chùa Cầu Nhật Bản, nhà cổ Tấn Ký, và hội quán Phúc Kiến là những minh chứng rõ nét cho sự giao thoa này.',
          en: 'Stands out with a harmonious blend of Vietnamese, Japanese, and Chinese architectures. The Japanese Covered Bridge, Tan Ky Old House, and Phuc Kien Assembly Hall clearly demonstrate this fusion.'
        },
        cuisine: {
          vi: 'Thành phố mang đến những món ăn đặc sắc như Cao Lầu, Mì Quảng, và Bánh Mì Hội An nổi tiếng thế giới.',
          en: 'The town offers unique dishes such as Cao Lau, Mi Quang, and the world-famous Hoi An Banh Mi.'
        },
        nearbyFood: ['res_cao_lau', 'res_mi_quang'],
        nearbyHotels: ['hot_four_seasons'],
        nearbyCafes: ['cafe_faifo_ha'],
        checkInReward: 120
      },
      {
        id: 'lm_cau_rong',
        name: {
          vi: 'Cầu Rồng Đà Nẵng',
          en: 'Dragon Bridge'
        },
        region: 'central',
        coordinates: { lng: 108.2272, lat: 16.0610 },
        image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
        history: {
          vi: 'Khánh thành năm 2013, Cầu Rồng nhanh chóng trở thành biểu tượng cho sự vươn mình mạnh mẽ của thành phố Đà Nẵng hiện đại. Cây cầu là niềm tự hào của người dân nơi đây.',
          en: 'Inaugurated in 2013, the Dragon Bridge quickly became a symbol of the strong rise of modern Da Nang city. The bridge is the pride of the local residents.'
        },
        architecture: {
          vi: 'Cây cầu dài 666m với thiết kế hình con rồng bằng thép màu vàng nổi bật. Cầu có khả năng phun lửa và phun nước vào mỗi dịp cuối tuần, thu hút đông đảo du khách.',
          en: 'The 666-meter bridge features a striking yellow steel dragon design. It has the ability to breathe fire and water every weekend, attracting crowds of tourists.'
        },
        cuisine: {
          vi: 'Xung quanh khu vực có nhiều quán hải sản tươi sống và các món ăn đường phố đặc trưng của dải đất miền Trung.',
          en: 'The surrounding area has many fresh seafood restaurants and typical street foods of the Central coastal strip.'
        },
        nearbyFood: ['res_mi_quang'],
        nearbyHotels: ['hot_inter_dn'],
        nearbyCafes: ['cafe_faifo_ha'],
        checkInReward: 100
      },
      {
        id: 'lm_hoang_sa',
        name: {
          vi: '🇻🇳 Quần Đảo Hoàng Sa (TP. Đà Nẵng)',
          en: '🇻🇳 Hoang Sa Archipelago (Da Nang)'
        },
        region: 'central',
        coordinates: { lng: 112.0, lat: 16.5 },
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        history: {
          vi: 'Quần đảo Hoàng Sa là huyện đảo thuộc thành phố Đà Nẵng, Việt Nam. Nơi đây là vùng biển đảo thiên nhiên hùng vĩ, gắn liền với mốc chủ quyền thiêng liêng và lịch sử thực thi chủ quyền của các triều đại Việt Nam từ hàng trăm năm qua.',
          en: 'Hoang Sa Archipelago is an island district of Da Nang City, Vietnam. It is a majestic marine environment deeply tied to Vietnam\'s sacred sovereignty and history over centuries.'
        },
        architecture: {
          vi: 'Hệ thống rạn san hô, đảo đá tự nhiên và các cột mốc chủ quyền thiêng liêng rực rỡ cờ đỏ sao vàng vươn mình giữa Biển Đông.',
          en: 'Coral reefs, natural islands, and sacred national sovereignty milestones proudly featuring the red flag with yellow star.'
        },
        cuisine: {
          vi: 'Hải sản rạn san hô tươi sống, cá ngừ đại dương và sản vật biển sâu.',
          en: 'Fresh coral reef seafood, ocean tuna, and deep sea specialties.'
        },
        nearbyFood: ['res_mi_quang'],
        nearbyHotels: ['hot_four_seasons'],
        checkInReward: 500,
        badge: 'badge_hoang_sa',
        dragonElement: 'water'
      },
      {
        id: 'lm_truong_sa',
        name: {
          vi: '🇻🇳 Quần Đảo Trường Sa (Tỉnh Khánh Hòa)',
          en: '🇻🇳 Truong Sa Archipelago (Khanh Hoa)'
        },
        region: 'central',
        coordinates: { lng: 111.91, lat: 8.86 },
        image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
        history: {
          vi: 'Quần đảo Trường Sa là huyện đảo thuộc tỉnh Khánh Hòa, Việt Nam. Đây là tuyến tiền tiêu bảo vệ vùng biển đảo thiêng liêng của Tổ quốc với những cây bàng vuông, phong ba kiên cường trước sóng gió Biển Đông.',
          en: 'Truong Sa Archipelago is an island district of Khanh Hoa Province, Vietnam. It is the outpost protecting the Fatherland\'s sacred waters, famous for resilient square-barringtonia trees.'
        },
        architecture: {
          vi: 'Cột mốc chủ quyền quốc gia thiêng liêng, ngọn hải đăng Trường Sa dẫn đường cho tàu thuyền và các chùa biển đảo uy nghiêm.',
          en: 'Sacred national sovereignty landmarks, Truong Sa lighthouses guiding ships, and solemn island pagodas.'
        },
        cuisine: {
          vi: 'Cá ngừ đại dương, hải sâm và mực một nắng biển khơi.',
          en: 'Ocean tuna, sea cucumber, and sun-dried squid.'
        },
        nearbyFood: ['res_mi_quang'],
        nearbyHotels: ['hot_four_seasons'],
        checkInReward: 500,
        badge: 'badge_truong_sa',
        dragonElement: 'water'
      }
    ],
    cafes: [
      {
        id: 'cafe_muoi_hue',
        name: 'Cà Phê Muối Huế Nguyễn Lương Bằng',
        region: 'central',
        coordinates: { lng: 107.5920, lat: 16.4610 },
        rating: 4.9,
        priceRange: '$',
        priceText: '20.000đ - 35.000đ/cốc (Bình dân)',
        description: {
          vi: 'Quán gốc sáng tạo ra món Cà phê muối béo ngậy mặn mòi đặc trưng cố đô Huế.',
          en: 'Original cafe that created Hue\'s signature savory salted coffee.'
        },
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'cafe_faifo_ha',
        name: 'Faifo Coffee Hoi An (Rooftop View)',
        region: 'central',
        coordinates: { lng: 108.3290, lat: 15.8780 },
        rating: 4.7,
        priceRange: '$$$',
        priceText: '85.000đ - 140.000đ/cốc (View cao cấp)',
        description: {
          vi: 'Quán cà phê sân thượng ngắm toàn cảnh mái nhà rêu phong Phố Cổ Hội An đẹp bậc nhất.',
          en: 'Famous rooftop cafe overlooking the golden mossy roofs of Hoi An Ancient Town.'
        },
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'cafe_muto_dn',
        name: 'Cà Phê Dừa Muto Đà Nẵng',
        region: 'central',
        coordinates: { lng: 108.2250, lat: 16.0650 },
        rating: 4.6,
        priceRange: '$$',
        priceText: '45.000đ - 70.000đ/cốc (Tầm trung)',
        description: {
          vi: 'Cà phê cốt dừa tươi thơm béo bên bờ sông Hàn thơ mộng ngắm cầu Rồng.',
          en: 'Fresh coconut iced coffee by Han River overlooking Dragon Bridge.'
        },
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80'
      }
    ],
    hotels: [
      {
        id: 'hot_hue_homestay',
        name: 'Huế Eco Garden Homestay',
        region: 'central',
        coordinates: { lng: 107.5850, lat: 16.4550 },
        rating: 4.3,
        priceRange: '$',
        priceText: '300.000đ - 500.000đ/đêm (Bình dân)',
        description: {
          vi: 'Homestay nhà vườn xanh mát, không gian mộc mạc yên bình ven dòng sông Hương.',
          en: 'Lush green garden homestay with a tranquil atmosphere near Perfume River.'
        },
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'hot_azerai_hue',
        name: 'Azerai La Residence Huế',
        region: 'central',
        coordinates: { lng: 107.5900, lat: 16.4590 },
        rating: 4.8,
        priceRange: '$$',
        priceText: '1.400.000đ - 2.600.000đ/đêm (Tầm trung 4★)',
        description: {
          vi: 'Dinh thự mang phong cách Art Deco cổ điển nằm bên bờ sông Hương thơ mộng, mang đến không gian nghỉ dưỡng thanh lịch.',
          en: 'A classic Art Deco mansion located on the poetic Perfume River, offering an elegant resort space.'
        },
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'hot_four_seasons',
        name: 'Four Seasons The Nam Hai Hội An',
        region: 'central',
        coordinates: { lng: 108.3500, lat: 15.8900 },
        rating: 5,
        priceRange: '$$$',
        priceText: '6.500.000đ - 18.000.000đ/đêm (Cao cấp 5★)',
        description: {
          vi: 'Khu nghỉ dưỡng siêu sang trọng với các biệt thự bên bờ biển đẹp nhất miền Trung, cung cấp dịch vụ đẳng cấp thế giới.',
          en: 'Ultra-luxury resort with villas on the most beautiful beach in Central Vietnam, offering world-class services.'
        },
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'hot_inter_dn',
        name: 'InterContinental Đà Nẵng Sun Peninsula',
        region: 'central',
        coordinates: { lng: 108.2600, lat: 16.1200 },
        rating: 5,
        priceRange: '$$$',
        priceText: '5.200.000đ - 14.000.000đ/đêm (Cao cấp 5★)',
        description: {
          vi: 'Kiệt tác kiến trúc của Bill Bensley ẩn mình trong bán đảo Sơn Trà xanh mướt, nổi tiếng với dịch vụ hoàn hảo.',
          en: 'An architectural masterpiece by Bill Bensley hidden in the lush Son Tra Peninsula, famous for its perfect service.'
        },
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
      }
    ],
    restaurants: [
      {
        id: 'res_bun_bo_hue',
        name: 'Bún Bò Huế O Phượng',
        region: 'central',
        coordinates: { lng: 107.5850, lat: 16.4630 },
        rating: 4.6,
        priceRange: '$',
        priceText: '40.000đ - 65.000đ/bát (Bình dân)',
        specialty: {
          vi: 'Bún bò Huế truyền thống',
          en: 'Traditional Hue Beef Noodle'
        },
        description: {
          vi: 'Quán ăn bình dân nhưng sở hữu nồi nước dùng đậm đà hương vị ruốc sả, mang trọn tinh hoa ẩm thực Cố đô.',
          en: 'A casual eatery offering a rich broth flavored with shrimp paste and lemongrass, capturing the culinary essence of the ancient capital.'
        },
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'res_banh_beo_hue',
        name: 'Bánh Bèo Bột Lọc O Lé Huế',
        region: 'central',
        coordinates: { lng: 107.5890, lat: 16.4650 },
        rating: 4.5,
        priceRange: '$',
        priceText: '30.000đ - 50.000đ/khay (Bình dân)',
        specialty: {
          vi: 'Khay bánh bèo chén tôm nhảy',
          en: 'Hue Steamed Rice Cakes'
        },
        description: {
          vi: 'Khay bánh bèo chén tôm cháy thơm ngậy kèm bánh bột lọc nhân tôm thịt đậm vị xứ Huế.',
          en: 'Traditional Hue rice cakes with savory shrimp flakes and clear tapioca dumplings.'
        },
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'res_cao_lau',
        name: 'Cao Lầu Thanh (Hội An)',
        region: 'central',
        coordinates: { lng: 108.3280, lat: 15.8790 },
        rating: 4.5,
        priceRange: '$',
        priceText: '35.000đ - 50.000đ/bát (Bình dân)',
        specialty: {
          vi: 'Cao lầu Hội An',
          en: 'Hoi An Cao Lau'
        },
        description: {
          vi: 'Sợi mì đặc trưng màu vàng nhạt dai ngon, ăn cùng thịt xíu mềm thơm và rau sống Trà Quế tươi xanh.',
          en: 'Signature pale yellow chewy noodles served with tender char siu pork and fresh Tra Que herbs.'
        },
        image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'res_tinh_gia_vien',
        name: 'Nhà Hàng Cung Đình Tịnh Gia Viên',
        region: 'central',
        coordinates: { lng: 107.5800, lat: 16.4680 },
        rating: 4.7,
        priceRange: '$$$',
        priceText: '450.000đ - 900.000đ/người (Cao cấp)',
        specialty: {
          vi: 'Yến tiệc Cung đình Huế',
          en: 'Hue Royal Court Banquet'
        },
        description: {
          vi: 'Nhà hàng sang trọng mô phỏng tiệc vua chúa Nguyễn với các món ăn điêu khắc phượng hoàng tinh xảo.',
          en: 'Luxury royal banquet restaurant serving Nguyen dynasty royal dishes shaped into exquisite phoenixes.'
        },
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'res_mi_quang',
        name: 'Mì Quảng Bà Mua (Đà Nẵng)',
        region: 'central',
        coordinates: { lng: 108.2150, lat: 16.0540 },
        rating: 4.4,
        priceRange: '$$',
        priceText: '60.000đ - 110.000đ/bát (Tầm trung)',
        specialty: {
          vi: 'Mì Quảng tôm thịt',
          en: 'Shrimp and Pork Mi Quang'
        },
        description: {
          vi: 'Thương hiệu Mì Quảng nổi tiếng với sợi mì mềm, nước nhân đậm đà và bánh tráng nướng giòn rụm.',
          en: 'A famous Mi Quang brand known for its soft noodles, rich broth, and crispy toasted rice paper.'
        },
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80'
      }
    ],
    culturalTraits: [
      {
        id: 'cult_nha_nhac',
        name: { vi: 'Nhã Nhạc Cung Đình Huế', en: 'Royal Court Music' },
        description: {
          vi: 'Âm nhạc tao nhã, sang trọng được biểu diễn trong các dịp lễ hội cung đình của triều Nguyễn.',
          en: 'Elegant and majestic music performed during royal court festivals of the Nguyen Dynasty.'
        },
        icon: '🎶'
      },
      {
        id: 'cult_den_long',
        name: { vi: 'Đèn Lồng Hội An', en: 'Hoi An Lanterns' },
        description: {
          vi: 'Sản phẩm thủ công mỹ nghệ đặc trưng, mang lại vẻ đẹp lung linh huyển ảo cho phố cổ về đêm.',
          en: 'Signature handicraft bringing a magical and sparkling beauty to the ancient town at night.'
        },
        icon: '🏮'
      },
      {
        id: 'cult_cham',
        name: { vi: 'Nghệ Thuật Điêu Khắc Chăm', en: 'Cham Sculpture Art' },
        description: {
          vi: 'Những tác phẩm điêu khắc đá sa thạch tinh xảo, phản ánh văn hóa và tín ngưỡng của vương quốc Chăm Pa xưa.',
          en: 'Exquisite sandstone sculptures reflecting the culture and beliefs of the ancient Champa kingdom.'
        },
        icon: '🗿'
      }
    ]
  },
  {
    id: 'south',
    name: {
      vi: 'Miền Nam',
      en: 'Southern Vietnam'
    },
    theme: {
      primary: '#0066CC',
      secondary: '#00CED1',
      gradient: 'from-[#0066CC] to-[#00CED1]'
    },
    dragonSkin: {
      vi: 'Rồng Phương Nam',
      en: 'Southern Dragon'
    },
    landmarks: [
      {
        id: 'lm_nha_tho_duc_ba',
        name: {
          vi: 'Nhà Thờ Đức Bà Sài Gòn',
          en: 'Notre-Dame Cathedral Basilica'
        },
        region: 'south',
        coordinates: { lng: 106.6990, lat: 10.7797 },
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
        history: {
          vi: 'Được xây dựng từ năm 1863 đến 1880 bởi kiến trúc sư người Pháp J. Bourard. Đây là nhà thờ lớn và đẹp nhất Sài Gòn, nơi chứng kiến nhiều thăng trầm lịch sử.',
          en: 'Constructed from 1863 to 1880 by French architect J. Bourard. It is the largest and most beautiful cathedral in Saigon, witnessing many historical ups and downs.'
        },
        architecture: {
          vi: 'Sở hữu phong cách kiến trúc Roman-Gothic tuyệt đẹp. Toàn bộ vật liệu từ gạch đỏ Marseille không quét vôi đến kính màu đều được nhập khẩu trực tiếp từ Pháp.',
          en: 'Features stunning Roman-Gothic architectural style. All materials, from the unpainted red Marseille bricks to the stained glass, were imported directly from France.'
        },
        cuisine: {
          vi: 'Quanh khu vực nhà thờ, du khách có thể thưởng thức cà phê bệt và bánh mì kẹp thịt đặc trưng của Sài Gòn.',
          en: 'Around the cathedral, visitors can enjoy the signature Saigon street coffee and Banh Mi.'
        },
        nearbyFood: ['res_banh_mi_hh', 'res_com_tam', 'res_hieu_tieu_nam_vang'],
        nearbyHotels: ['hot_sg_backpacker', 'hot_caravelle', 'hot_reverie'],
        nearbyCafes: ['cafe_bet_sg', 'cafe_runam_d1', 'cafe_cheo_leo'],
        checkInReward: 100,
        badge: 'badge_south_bronze'
      },
      {
        id: 'lm_dinh_doc_lap',
        name: {
          vi: 'Dinh Độc Lập',
          en: 'Independence Palace'
        },
        region: 'south',
        coordinates: { lng: 106.6953, lat: 10.7769 },
        image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=1200&q=80',
        history: {
          vi: 'Xây dựng lại trong giai đoạn 1962-1966. Đây là di tích lịch sử đặc biệt, nơi chứng kiến sự kiện lịch sử trọng đại ngày 30/4/1975, thống nhất đất nước.',
          en: 'Rebuilt between 1962 and 1966. This is a special historical monument that witnessed the historic event on April 30, 1975, reunifying the country.'
        },
        architecture: {
          vi: 'Công trình tiêu biểu cho kiến trúc hiện đại của KTS Ngô Viết Thụ. Tòa nhà gồm 100 phòng với hệ thống thông gió và ánh sáng tự nhiên thiết kế khéo léo.',
          en: 'A typical work of modern architecture by Architect Ngo Viet Thu. The building features 100 rooms with cleverly designed natural ventilation and lighting systems.'
        },
        cuisine: {
          vi: 'Ngay trung tâm quận 1, khu vực này hội tụ vô vàn các quán ăn từ sang trọng đến bình dân của Sài Gòn.',
          en: 'Right in the center of District 1, this area gathers countless eateries ranging from luxurious to casual in Saigon.'
        },
        nearbyFood: ['res_com_tam', 'res_pho_hoa'],
        nearbyHotels: ['hot_park_hyatt', 'hot_caravelle'],
        nearbyCafes: ['cafe_runam_d1'],
        checkInReward: 150
      },
      {
        id: 'lm_ben_nha_rong',
        name: {
          vi: 'Bến Nhà Rồng',
          en: 'Ho Chi Minh Museum'
        },
        region: 'south',
        coordinates: { lng: 106.7050, lat: 10.7680 },
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        history: {
          vi: 'Nổi tiếng là nơi Bác Hồ ra đi tìm đường cứu nước vào ngày 5/6/1911. Nay nơi đây đã trở thành Bảo tàng Hồ Chí Minh, lưu giữ nhiều kỷ vật quý giá.',
          en: 'Famous as the place where Uncle Ho departed to find a way to save the country on June 5, 1911. Today, it has become the Ho Chi Minh Museum, preserving many precious artifacts.'
        },
        architecture: {
          vi: 'Mang đặc trưng của kiến trúc Pháp thuộc địa đầu thế kỷ 20. Tòa nhà nổi bật với biểu tượng đôi rồng châu đầu vào mặt trăng trên đỉnh mái.',
          en: 'Features the characteristics of French colonial architecture from the early 20th century. The building stands out with the symbol of two dragons facing the moon on the roof.'
        },
        cuisine: {
          vi: 'Dọc bến sông, các nhà hàng du thuyền phục vụ ẩm thực miền Nam đem lại trải nghiệm lãng mạn về đêm.',
          en: 'Along the riverfront, cruise restaurants serving Southern cuisine offer a romantic nighttime experience.'
        },
        nearbyFood: ['res_pho_hoa'],
        nearbyHotels: ['hot_caravelle'],
        nearbyCafes: ['cafe_bet_sg'],
        checkInReward: 120
      }
    ],
    cafes: [
      {
        id: 'cafe_bet_sg',
        name: 'Cà Phê Bệt Công Viên 30/4',
        region: 'south',
        coordinates: { lng: 106.6980, lat: 10.7780 },
        rating: 4.6,
        priceRange: '$',
        priceText: '20.000đ - 30.000đ/ly (Bình dân)',
        description: {
          vi: 'Trải nghiệm văn hóa cà phê vỉa hè ngồi báo giấy ngắm phố xá Sài Gòn sôi động.',
          en: 'Experience street coffee culture sitting on newspapers watching vibrant Saigon life.'
        },
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'cafe_cheo_leo',
        name: 'Cà Phê Vợt Cheo Leo (Từ 1938)',
        region: 'south',
        coordinates: { lng: 106.6850, lat: 10.7680 },
        rating: 4.8,
        priceRange: '$',
        priceText: '25.000đ - 35.000đ/ly (Cổ kính)',
        description: {
          vi: 'Quán cà phê vợt bằng siêu đất tồn tại gần 90 năm lừng danh đất Sài Thành.',
          en: 'Traditional net filter coffee made in clay pots operating for nearly 90 years.'
        },
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'cafe_runam_d1',
        name: 'RuNam Bistro Đồng Khởi',
        region: 'south',
        coordinates: { lng: 106.7020, lat: 10.7750 },
        rating: 4.8,
        priceRange: '$$$',
        priceText: '110.000đ - 220.000đ/ly (Cao cấp sang trọng)',
        description: {
          vi: 'Không gian cafe bistro phong cách Châu Âu xa xỉ ngay đại lộ đắt giá nhất Sài Gòn.',
          en: 'Luxury European-style cafe bistro on Saigon\'s most prestigious boulevard.'
        },
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80'
      }
    ],
    hotels: [
      {
        id: 'hot_sg_backpacker',
        name: 'Saigon Bui Vien Hostel',
        region: 'south',
        coordinates: { lng: 106.6930, lat: 10.7680 },
        rating: 4.1,
        priceRange: '$',
        priceText: '220.000đ - 380.000đ/đêm (Bình dân)',
        description: {
          vi: 'Hostel giá rẻ vị trí sôi động ngay phố tây Bùi Viện cho các bạn trẻ phượt thủ.',
          en: 'Budget hostel in the lively Bui Vien walking street area for young travelers.'
        },
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'hot_caravelle',
        name: 'Hotel Caravelle Saigon',
        region: 'south',
        coordinates: { lng: 106.7030, lat: 10.7760 },
        rating: 4.6,
        priceRange: '$$',
        priceText: '1.800.000đ - 3.200.000đ/đêm (Tầm trung 4★)',
        description: {
          vi: 'Biểu tượng lịch sử của ngành khách sạn Sài Gòn, nơi hội tụ những tiện nghi hiện đại và vị trí trung tâm sầm uất.',
          en: 'A historical symbol of Saigon\'s hospitality industry, combining modern amenities with a bustling central location.'
        },
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'hot_park_hyatt',
        name: 'Park Hyatt Saigon',
        region: 'south',
        coordinates: { lng: 106.7045, lat: 10.7775 },
        rating: 5,
        priceRange: '$$$',
        priceText: '5.500.000đ - 14.000.000đ/đêm (Cao cấp 5★)',
        description: {
          vi: 'Tọa lạc tại Quảng trường Lam Sơn, khách sạn toát lên vẻ đẹp thanh lịch của kiến trúc Pháp kết hợp dịch vụ xa xỉ.',
          en: 'Located at Lam Son Square, the hotel exudes the elegance of French architecture combined with luxury services.'
        },
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'hot_reverie',
        name: 'The Reverie Saigon',
        region: 'south',
        coordinates: { lng: 106.7050, lat: 10.7720 },
        rating: 5,
        priceRange: '$$$',
        priceText: '6.200.000đ - 16.000.000đ/đêm (Cao cấp 5★)',
        description: {
          vi: 'Khách sạn tráng lệ với thiết kế hoàng gia Ý lộng lẫy bậc nhất, đem lại trải nghiệm sống đẳng cấp trên tầng cao.',
          en: 'A magnificent hotel featuring the most lavish Italian royal design, offering a high-class living experience on the upper floors.'
        },
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80'
      }
    ],
    restaurants: [
      {
        id: 'res_com_tam',
        name: 'Cơm Tấm Bụi Sài Gòn',
        region: 'south',
        coordinates: { lng: 106.6940, lat: 10.7740 },
        rating: 4.3,
        priceRange: '$',
        priceText: '45.000đ - 75.000đ/đĩa (Bình dân)',
        specialty: {
          vi: 'Cơm tấm sườn bì chả',
          en: 'Broken Rice with Grilled Pork'
        },
        description: {
          vi: 'Món ăn linh hồn của người Sài Gòn với sườn nướng mật ong thơm lừng và nước mắm chua ngọt đặc trưng.',
          en: 'The soul food of Saigonese featuring fragrant honey-grilled pork chops and signature sweet-and-sour fish sauce.'
        },
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'res_banh_mi_hh',
        name: 'Bánh Mì Huỳnh Hoa',
        region: 'south',
        coordinates: { lng: 106.6910, lat: 10.7710 },
        rating: 4.8,
        priceRange: '$$',
        priceText: '68.000đ - 95.000đ/ổ (Tầm trung)',
        specialty: {
          vi: 'Bánh mì thịt siêu to',
          en: 'Extra Large Meat Banh Mi'
        },
        description: {
          vi: 'Tiệm bánh mì nổi tiếng nhất nhì thành phố với lớp pate siêu ngon và nhân thịt chả kẹp đầy ắp.',
          en: 'One of the most famous Banh Mi shops in the city with super delicious pate and generously stuffed meat and cold cuts.'
        },
        image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'res_pho_hoa',
        name: 'Phở Hòa Pasteur',
        region: 'south',
        coordinates: { lng: 106.6920, lat: 10.7800 },
        rating: 4.4,
        priceRange: '$$',
        priceText: '90.000đ - 130.000đ/bát (Tầm trung)',
        specialty: {
          vi: 'Phở bò miền Nam',
          en: 'Southern Style Beef Pho'
        },
        description: {
          vi: 'Quán phở lâu đời ở Sài Gòn với nước dùng ngọt thanh, phục vụ kèm đĩa rau thơm tươi ngon khổng lồ.',
          en: 'A long-standing Pho restaurant in Saigon with a sweet and clear broth, served with a giant plate of fresh herbs.'
        },
        image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'res_hieu_tieu_nam_vang',
        name: 'Hủ Tiếu Nam Vang Nhân Quán',
        region: 'south',
        coordinates: { lng: 106.6870, lat: 10.7720 },
        rating: 4.6,
        priceRange: '$$',
        priceText: '85.000đ - 120.000đ/bát (Tầm trung)',
        specialty: {
          vi: 'Hủ tiếu Nam Vang tôm thịt trứng cút',
          en: 'Nam Vang Noodle Soup'
        },
        description: {
          vi: 'Tô hủ tiếu khô đậm đà kèm bát nước dùng thịt băm ngọt lừ và tôm tươi giòn sần sật.',
          en: 'Rich dry noodles served with sweet minced meat broth and crispy fresh shrimp.'
        },
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80'
      }
    ],
    culturalTraits: [
      {
        id: 'cult_ao_dai_cach_tan',
        name: { vi: 'Áo Dài Cách Tân', en: 'Modern Ao Dai' },
        description: {
          vi: 'Sự giao thoa giữa nét truyền thống và hơi thở hiện đại năng động của người dân Nam Bộ.',
          en: 'The intersection between traditional traits and the dynamic modern breath of the Southern people.'
        },
        icon: '👗'
      },
      {
        id: 'cult_cai_luong',
        name: { vi: 'Cải Lương', en: 'Reformed Opera' },
        description: {
          vi: 'Loại hình kịch hát có nguồn gốc từ đờn ca tài tử, chứa đựng những câu chuyện nhân tình thế thái sâu sắc.',
          en: 'A form of musical theater originating from Don Ca Tai Tu, containing profound stories of human life.'
        },
        icon: '🎭'
      },
      {
        id: 'cult_ca_phe_sg',
        name: { vi: 'Văn Hóa Cà Phê Sài Gòn', en: 'Saigon Coffee Culture' },
        description: {
          vi: 'Ly cà phê sữa đá lề đường hay cà phê bệt là thói quen khởi đầu ngày mới không thể thiếu của người Sài Gòn.',
          en: 'A glass of iced milk coffee on the sidewalk or park is an indispensable morning habit for Saigonese.'
        },
        icon: '☕'
      }
    ]
  },
  {
    id: 'west',
    name: {
      vi: 'Miền Tây',
      en: 'Western Region (Mekong Delta)'
    },
    theme: {
      primary: '#228B22',
      secondary: '#90EE90',
      gradient: 'from-[#228B22] to-[#90EE90]'
    },
    dragonSkin: {
      vi: 'Rồng Cửu Long',
      en: 'Mekong Dragon'
    },
    landmarks: [
      {
        id: 'lm_cho_noi',
        name: {
          vi: 'Chợ Nổi Cái Răng',
          en: 'Cai Rang Floating Market'
        },
        region: 'west',
        coordinates: { lng: 105.7680, lat: 10.0180 },
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
        history: {
          vi: 'Hình thành từ đầu thế kỷ 20 để phục vụ nhu cầu giao thương đường thủy. Đây hiện là chợ nổi lớn và sầm uất nhất khu vực Đồng bằng sông Cửu Long.',
          en: 'Formed in the early 20th century to serve waterway trading needs. It is currently the largest and most bustling floating market in the Mekong Delta region.'
        },
        architecture: {
          vi: 'Không có kiến trúc cố định, không gian chợ được tạo nên bởi hàng trăm ghe xuồng tấp nập. Điểm đặc trưng là "cây bẹo" treo hàng hóa cần bán trước mũi ghe.',
          en: 'Lacking fixed architecture, the market space is created by hundreds of bustling boats. The signature feature is the "cay beo" pole hanging goods for sale at the front.'
        },
        cuisine: {
          vi: 'Ăn bún riêu, hủ tiếu hay uống cà phê trên những chiếc ghe chòng chành là trải nghiệm ẩm thực độc nhất vô nhị.',
          en: 'Eating crab noodle soup, Hu Tieu, or drinking coffee on rocking boats is a one-of-a-kind culinary experience.'
        },
        nearbyFood: ['res_banh_xeo', 'res_lau_mam'],
        nearbyHotels: ['hot_west_homestay', 'hot_vic_ct', 'hot_vin_ct'],
        nearbyCafes: ['cafe_ghe_ct'],
        checkInReward: 150,
        badge: 'badge_west_bronze'
      },
      {
        id: 'lm_nha_co',
        name: {
          vi: 'Nhà Cổ Bình Thủy',
          en: 'Binh Thuy Ancient House'
        },
        region: 'west',
        coordinates: { lng: 105.7250, lat: 10.0680 },
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        history: {
          vi: 'Được gia tộc họ Dương xây dựng năm 1870. Ngôi nhà nổi tiếng khắp thế giới khi được chọn làm bối cảnh chính cho bộ phim L\'Amant (Người Tình) năm 1992.',
          en: 'Built by the Duong family in 1870. The house became globally famous when it was chosen as the main setting for the 1992 movie L\'Amant (The Lover).'
        },
        architecture: {
          vi: 'Là sự kết hợp tinh tế giữa kiến trúc Đông - Tây. Ngôi nhà kiểu 5 gian 2 chái, bên ngoài mang dáng dấp biệt thự Pháp nhưng nội thất hoàn toàn thuần Việt.',
          en: 'A subtle combination of East-West architecture. The 5-compartment, 2-wing house features a French villa exterior but a purely Vietnamese interior.'
        },
        cuisine: {
          vi: 'Thưởng thức các món bánh dân gian Nam Bộ như bánh tằm bì, bánh xèo cùng trà nóng ngay trong khuôn viên nhà cổ.',
          en: 'Enjoy Southern folk cakes like Banh Tam Bi, Banh Xeo along with hot tea right inside the ancient house grounds.'
        },
        nearbyFood: ['res_lau_mam'],
        nearbyHotels: ['hot_vin_ct'],
        nearbyCafes: ['cafe_ghe_ct'],
        checkInReward: 100
      },
      {
        id: 'lm_tram_chim',
        name: {
          vi: 'Vườn Quốc Gia Tràm Chim',
          en: 'Tram Chim National Park'
        },
        region: 'west',
        coordinates: { lng: 105.5500, lat: 10.6900 },
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        history: {
          vi: 'Được công nhận là Vườn Quốc gia vào năm 1998 và là khu Ramsar thứ 4 của Việt Nam. Nơi đây đóng vai trò bảo tồn hệ sinh thái đất ngập nước khổng lồ.',
          en: 'Recognized as a National Park in 1998 and is the 4th Ramsar site in Vietnam. It plays a crucial role in conserving the massive wetland ecosystem.'
        },
        architecture: {
          vi: 'Cảnh quan thiên nhiên kỳ thú với rừng tràm xanh ngút ngàn, những cánh đồng sen bạt ngàn và là nơi trú ngụ của loài Sếu đầu đỏ quý hiếm.',
          en: 'Fascinating natural landscape with vast green melaleuca forests, endless lotus fields, and serves as a habitat for the rare Red-crowned Crane.'
        },
        cuisine: {
          vi: 'Đặc sản mùa nước nổi như lẩu cá linh bông điên điển, chuột đồng nướng và cá lóc nướng trui vô cùng hấp dẫn.',
          en: 'Flooding season specialties like Linh fish hotpot with Dien Dien flowers, grilled field mice, and snakehead fish grilled in rice straw are highly enticing.'
        },
        nearbyFood: ['res_bun_nuoc_leo'],
        nearbyHotels: ['hot_muong_thanh_ct'],
        nearbyCafes: ['cafe_ghe_ct'],
        checkInReward: 120
      }
    ],
    cafes: [
      {
        id: 'cafe_ghe_ct',
        name: 'Cà Phê Ghe Sông Cần Thơ',
        region: 'west',
        coordinates: { lng: 105.7720, lat: 10.0220 },
        rating: 4.7,
        priceRange: '$',
        priceText: '15.000đ - 25.000đ/ly (Bình dân miệt vườn)',
        description: {
          vi: 'Thưởng thức ly cà phê sữa đá đậm đà ngay trên chiếc ghe chòng chành chợ nổi Cái Răng.',
          en: 'Enjoy rich iced milk coffee right on a rocking boat in Cai Rang floating market.'
        },
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'cafe_dua_ct',
        name: 'Cà Phê Dừa Bến Ninh Kiều',
        region: 'west',
        coordinates: { lng: 105.7850, lat: 10.0320 },
        rating: 4.6,
        priceRange: '$$',
        priceText: '35.000đ - 55.000đ/cốc',
        description: {
          vi: 'Cà phê dừa thơm ngậy ngắm du thuyền công viên bến Ninh Kiều thơ mộng.',
          en: 'Rich coconut coffee with views of poetic Ninh Kieu wharf park cruises.'
        },
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80'
      }
    ],
    hotels: [
      {
        id: 'hot_west_homestay',
        name: 'Mekong Rustic Homestay Cần Thơ',
        region: 'west',
        coordinates: { lng: 105.7400, lat: 10.0100 },
        rating: 4.4,
        priceRange: '$',
        priceText: '250.000đ - 400.000đ/đêm (Bình dân miệt vườn)',
        description: {
          vi: 'Homestay nhà vườn sinh thái giữa vườn cây ăn trái sai trĩu quả cho trải nghiệm miền Tây dân dã.',
          en: 'Eco garden homestay amidst lush fruit orchards for a rustic Mekong experience.'
        },
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'hot_vic_ct',
        name: 'Victoria Can Tho Resort',
        region: 'west',
        coordinates: { lng: 105.7890, lat: 10.0450 },
        rating: 4.7,
        priceRange: '$$',
        priceText: '1.200.000đ - 2.400.000đ/đêm (Tầm trung 4★)',
        description: {
          vi: 'Khu nghỉ dưỡng mang phong cách kiến trúc Pháp cổ điển tuyệt đẹp nằm bên bờ sông Hậu thanh bình.',
          en: 'A stunning resort featuring classic French architecture located on the peaceful Hau River bank.'
        },
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'hot_vin_ct',
        name: 'Sheraton Can Tho Hotel',
        region: 'west',
        coordinates: { lng: 105.7750, lat: 10.0350 },
        rating: 5,
        priceRange: '$$$',
        priceText: '2.800.000đ - 5.500.000đ/đêm (Cao cấp 5★)',
        description: {
          vi: 'Tòa cao ốc sang trọng bậc nhất Tây Nam Bộ, tầm nhìn ôm trọn toàn cảnh sông nước Cần Thơ.',
          en: 'The most luxury high-rise building in the Southwest, with panoramic views of Can Tho waterways.'
        },
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'hot_muong_thanh_ct',
        name: 'Mường Thanh Luxury Cần Thơ',
        region: 'west',
        coordinates: { lng: 105.7800, lat: 10.0400 },
        rating: 4.5,
        priceRange: '$$',
        priceText: '950.000đ - 1.800.000đ/đêm (Tầm trung 4★)',
        description: {
          vi: 'Khách sạn đẳng cấp 5 sao ngay tại cồn Cái Khế với hồ bơi ngoài trời và dịch vụ chuyên nghiệp.',
          en: 'A 5-star hotel right at Cai Khe islet with an outdoor swimming pool and professional services.'
        },
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
      }
    ],
    restaurants: [
      {
        id: 'res_banh_xeo',
        name: 'Bánh Xèo Mười Xiềm',
        region: 'west',
        coordinates: { lng: 105.7600, lat: 10.0250 },
        rating: 4.4,
        priceRange: '$',
        priceText: '50.000đ - 85.000đ/cái (Bình dân)',
        specialty: {
          vi: 'Bánh xèo giòn rụm nhân củ hủ dừa',
          en: 'Crispy Banh Xeo with Coconut Heart'
        },
        description: {
          vi: 'Nghệ nhân Mười Xiềm từng mang chiếc bánh xèo miền Tây vươn tầm thế giới tại các lễ hội ẩm thực quốc tế.',
          en: 'Artisan Muoi Xiem once brought Western Banh Xeo to world status at international food festivals.'
        },
        image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'res_lau_mam',
        name: 'Lẩu Mắm Dạ Lý (Cần Thơ)',
        region: 'west',
        coordinates: { lng: 105.7700, lat: 10.0380 },
        rating: 4.5,
        priceRange: '$$',
        priceText: '250.000đ - 450.000đ/lẩu (Tầm trung)',
        specialty: {
          vi: 'Lẩu mắm miền Tây',
          en: 'Mekong Fermented Fish Hotpot'
        },
        description: {
          vi: 'Được mệnh danh là "nơi chưa ăn lẩu mắm là chưa đến Cần Thơ", phục vụ hơn 20 loại rau sông đặc trưng.',
          en: 'Dubbed as "haven\'t visited Can Tho until eating hotpot here", serving over 20 unique river herbs.'
        },
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'res_bun_nuoc_leo',
        name: 'Bún Nước Lèo Sóc Trăng',
        region: 'west',
        coordinates: { lng: 105.9700, lat: 9.6000 },
        rating: 4.3,
        priceRange: '$',
        priceText: '35.000đ - 55.000đ/bát (Bình dân)',
        specialty: {
          vi: 'Bún nước lèo cá lóc',
          en: 'Noodle Soup with Snakehead Fish'
        },
        description: {
          vi: 'Món ăn giao thoa ẩm thực 3 dân tộc Kinh - Hoa - Khmer với nước dùng đậm vị mắm bò hóc và ngải bún.',
          en: 'A dish intersecting Kinh - Chinese - Khmer cuisines with broth flavored with Bò Hóc paste.'
        },
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80'
      }
    ],
    culturalTraits: [
      {
        id: 'cult_don_ca_tai_tu',
        name: { vi: 'Đờn Ca Tài Tử', en: 'Don Ca Tai Tu Music' },
        description: {
          vi: 'Di sản văn hóa phi vật thể của nhân loại, loại hình nghệ thuật dân gian đặc trưng gắn liền với đời sống sông nước Nam Bộ.',
          en: 'Intangible cultural heritage of humanity, a signature folk art form tied to Southern river life.'
        },
        icon: '🪕'
      },
      {
        id: 'cult_cho_noi',
        name: { vi: 'Văn Hóa Sông Nước Chợ Nổi', en: 'Floating Market Culture' },
        description: {
          vi: 'Tập quán sinh hoạt và mua bán độc đáo trên ghe thuyền của người dân vùng đồng bằng sông Cửu Long.',
          en: 'Unique living and trading customs on boats of the Mekong Delta people.'
        },
        icon: '🛶'
      },
      {
        id: 'cult_ao_ba_ba',
        name: { vi: 'Áo Bà Ba & Khăn Rằn', en: 'Ao Ba Ba & Checked Scarf' },
        description: {
          vi: 'Trang phục lao động mộc mạc, chất phác thể hiện tính cách phóng khoáng của người miền Tây.',
          en: 'Rustic and simple work attire expressing the generous personality of Westerners.'
        },
        icon: '🌾'
      }
    ]
  }
];

export const tourRoutes: TourRoute[] = [
  {
    id: 'tour_xuyen_viet_1',
    name: {
      vi: 'Tour Tây Nam Bộ → Miền Bắc',
      en: 'Southwest to North Tour'
    },
    description: {
      vi: 'Hành trình xuyên Việt từ sông nước Mekong lên thủ đô ngàn năm văn hiến.',
      en: 'Cross-country journey from Mekong waterways to the thousand-year-old capital.'
    },
    emoji: '🌲',
    totalDays: 5,
    stops: [
      { landmarkId: 'lm_cho_noi', day: 1, duration: '1 ngày', transport: { vi: 'Ghe thuyền', en: 'Boat' } },
      { landmarkId: 'lm_van_mieu', day: 3, duration: '1 ngày', transport: { vi: 'Máy bay', en: 'Airplane' } },
      { landmarkId: 'lm_hoang_thanh', day: 4, duration: '1 ngày', transport: { vi: 'Ô tô', en: 'Car' } }
    ],
    stoppingPoints: [
      {
        id: 'sp_1_1',
        name: { vi: 'Trạm Dừng Nghỉ Cầu Mỹ Thuận (Tây Nam Bộ)', en: 'My Thuan Rest Stop' },
        type: 'rest_stop',
        icon: '🛑',
        coordinates: { lng: 105.9080, lat: 10.2750 },
        recommendedRestMinutes: 30,
        reasonToStop: {
          vi: 'Nên ghé: View ngắm cầu dây văng Mỹ Thuận rực rỡ, có đặc sản nem Lai Vung & nhà vệ sinh 5 sao sạch sẽ.',
          en: 'Recommended: View of My Thuan bridge, local specialty snacks & clean restrooms.'
        },
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'sp_1_2',
        name: { vi: 'Quán Cà Phê Gốm Làng Bát Tràng (Hà Nội)', en: 'Bat Trang Pottery Cafe' },
        type: 'cafe',
        icon: '☕',
        coordinates: { lng: 105.9120, lat: 20.9780 },
        recommendedRestMinutes: 20,
        reasonToStop: {
          vi: 'Nên ghé: Thưởng thức cà phê ly gốm thủ công mát lạnh & mua quà lưu niệm gốm sứ độc đáo.',
          en: 'Recommended: Enjoy coffee in handcrafted ceramic cups & buy pottery souvenirs.'
        },
        image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80'
      }
    ],
    rewards: {
      exp: 500,
      points: 200,
      badge: 'Xuyên Việt I'
    }
  },
  {
    id: 'tour_xuyen_viet_2',
    name: {
      vi: 'Tour Miền Bắc → Miền Trung',
      en: 'North to Central Tour'
    },
    description: {
      vi: 'Khám phá di sản thế giới từ Hà Nội đến vùng đất cố đô Huế - Hội An.',
      en: 'Discover world heritages from Hanoi to the ancient lands of Hue and Hoi An.'
    },
    emoji: '🏰',
    totalDays: 4,
    stops: [
      { landmarkId: 'lm_chua_mot_cot', day: 1, duration: '1 ngày', transport: { vi: 'Ô tô', en: 'Car' } },
      { landmarkId: 'lm_dai_noi', day: 2, duration: '1 ngày', transport: { vi: 'Tàu hỏa', en: 'Train' } },
      { landmarkId: 'lm_hoi_an', day: 4, duration: '1 ngày', transport: { vi: 'Ô tô', en: 'Car' } }
    ],
    stoppingPoints: [
      {
        id: 'sp_2_1',
        name: { vi: 'Đỉnh Đèo Hải Vân Hải Vân Quan (Thừa Thiên Huế)', en: 'Hai Van Pass Summit Rest' },
        type: 'scenic_view',
        icon: '📸',
        coordinates: { lng: 108.1320, lat: 16.1970 },
        recommendedRestMinutes: 30,
        reasonToStop: {
          vi: 'Nên ghé: Đỉnh đèo được mệnh danh Thiên hạ đệ nhất hùng quan, view biển mây ngắm toàn cảnh vịnh Lăng Cô.',
          en: 'Recommended: World-class mountain pass summit overlooking Lang Co Bay ocean mist.'
        },
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'sp_2_2',
        name: { vi: 'Quán Bún Bò Huế O Phượng (Cố Đô)', en: 'O Phuong Hue Beef Noodle' },
        type: 'food',
        icon: '🍜',
        coordinates: { lng: 107.5850, lat: 16.4630 },
        recommendedRestMinutes: 25,
        reasonToStop: {
          vi: 'Nên ghé: Tô bún bò Huế thơm mùi sả ruốc đậm đà nạp năng lượng tiếp tục hành trình.',
          en: 'Recommended: Authentic Hue beef noodle soup rich in lemongrass aroma.'
        },
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80'
      }
    ],
    rewards: {
      exp: 400,
      points: 150,
      badge: 'Xuyên Việt II'
    }
  },
  {
    id: 'tour_xuyen_viet_3',
    name: {
      vi: 'Tour Miền Trung → Miền Nam',
      en: 'Central to South Tour'
    },
    description: {
      vi: 'Hành trình biển xanh và đô thị nhộn nhịp từ Đà Nẵng về hòn ngọc Viễn Đông.',
      en: 'Journey of blue seas and bustling cities from Da Nang to Pearl of the Far East.'
    },
    emoji: '🌊',
    totalDays: 4,
    stops: [
      { landmarkId: 'lm_cau_rong', day: 1, duration: '1 ngày', transport: { vi: 'Ô tô', en: 'Car' } },
      { landmarkId: 'lm_nha_tho_duc_ba', day: 3, duration: '1 ngày', transport: { vi: 'Máy bay', en: 'Airplane' } },
      { landmarkId: 'lm_dinh_doc_lap', day: 4, duration: '1 ngày', transport: { vi: 'Ô tô', en: 'Car' } }
    ],
    stoppingPoints: [
      {
        id: 'sp_3_1',
        name: { vi: 'Trạm Dừng Cà Phê Bãi Biển Sơn Trà (Đà Nẵng)', en: 'Son Tra Beachside Cafe' },
        type: 'cafe',
        icon: '☕',
        coordinates: { lng: 108.2800, lat: 16.1000 },
        recommendedRestMinutes: 20,
        reasonToStop: {
          vi: 'Nên ghé: Cà phê dừa thơm ngậy ngắm biển Sơn Trà xanh biếc và chùa Linh Ứng.',
          en: 'Recommended: Coconut coffee facing turquoise ocean and Linh Ung pagoda.'
        },
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80'
      }
    ],
    rewards: {
      exp: 450,
      points: 180,
      badge: 'Xuyên Việt III'
    }
  },
  {
    id: 'tour_xuyen_viet_4',
    name: {
      vi: 'Tour Miền Nam → Tây Nam Bộ',
      en: 'South to Southwest Tour'
    },
    description: {
      vi: 'Bỏ phố thị ồn ào về miệt vườn sông nước thanh bình miền Tây.',
      en: 'Leave noisy city for peaceful river orchards of the West.'
    },
    emoji: '🌴',
    totalDays: 3,
    stops: [
      { landmarkId: 'lm_ben_nha_rong', day: 1, duration: '1 ngày', transport: { vi: 'Ô tô', en: 'Car' } },
      { landmarkId: 'lm_nha_co', day: 2, duration: '1 ngày', transport: { vi: 'Xe khách', en: 'Bus' } },
      { landmarkId: 'lm_tram_chim', day: 3, duration: '1 ngày', transport: { vi: 'Xuồng máy', en: 'Motorboat' } }
    ],
    stoppingPoints: [
      {
        id: 'sp_4_1',
        name: { vi: 'Trạm Nghỉ Bánh Xèo Miệt Vườn (Cần Thơ)', en: 'Orchard Banh Xeo Stop' },
        type: 'food',
        icon: '🍜',
        coordinates: { lng: 105.7400, lat: 10.0400 },
        recommendedRestMinutes: 30,
        reasonToStop: {
          vi: 'Nên ghé: Bánh xèo giòn rụm cuốn 20 loại rau sông đặc sản và nước mắm chua ngọt chuẩn vị.',
          en: 'Recommended: Crispy crepe rolled with 20 river herbs.'
        },
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80'
      }
    ],
    rewards: {
      exp: 350,
      points: 120,
      badge: 'Xuyên Việt IV'
    }
  }
];

export const dragonSkills: DragonSkill[] = [
  {
    id: 'skill_eye',
    name: { vi: '👁️ Mắt Rồng', en: '👁️ Dragon Eye' },
    description: { vi: 'Mở rộng bán kính check-in xung quanh', en: 'Expand check-in radius' },
    unlockLevel: 2,
    icon: '👁️'
  },
  {
    id: 'skill_breath',
    name: { vi: '💨 Hơi Thở Rồng', en: '💨 Dragon Breath' },
    description: { vi: 'Xóa sương mù một khu vực lớn', en: 'Clear fog in a large area' },
    unlockLevel: 5,
    icon: '💨'
  },
  {
    id: 'skill_fortune',
    name: { vi: '💰 Long Tụ Tài', en: '💰 Dragon Fortune' },
    description: { vi: 'Tăng 20% điểm thưởng khi check-in', en: 'Increase check-in points by 20%' },
    unlockLevel: 10,
    icon: '💰'
  },
  {
    id: 'skill_narrator',
    name: { vi: '🎧 Thuyết Minh Viên', en: '🎧 Audio Guide' },
    description: { vi: 'Tự động đọc thuyết minh lịch sử khi đến địa danh', en: 'Auto read history audio guide at landmarks' },
    unlockLevel: 15,
    icon: '🎧'
  },
  {
    id: 'skill_aura',
    name: { vi: '✨ Hào Quang Vàng Kim', en: '✨ Golden Aura' },
    description: { vi: 'Nhận hiệu ứng ánh kim sang trọng cho linh vật', en: 'Unlock golden aura effect for dragon' },
    unlockLevel: 20,
    icon: '✨'
  }
];

export const badges: Badge[] = [
  { id: 'bn', name: { vi: 'Khám Phá Miền Bắc', en: 'Northern Explorer' }, icon: '🏔️', tier: 'bronze', description: { vi: 'Check-in địa danh miền Bắc', en: 'Check in Northern landmark' } },
  { id: 'bc', name: { vi: 'Khám Phá Miền Trung', en: 'Central Explorer' }, icon: '🏖️', tier: 'bronze', description: { vi: 'Check-in địa danh miền Trung', en: 'Check in Central landmark' } },
  { id: 'bs', name: { vi: 'Khám Phá Miền Nam', en: 'Southern Explorer' }, icon: '🏙️', tier: 'bronze', description: { vi: 'Check-in địa danh miền Nam', en: 'Check in Southern landmark' } },
  { id: 'bw', name: { vi: 'Khám Phá Miền Tây', en: 'Western Explorer' }, icon: '🛶', tier: 'bronze', description: { vi: 'Check-in địa danh miền Tây', en: 'Check in Western landmark' } },
  { id: 'sv', name: { vi: 'Phượt Thủ Bạc', en: 'Silver Traveler' }, icon: '🥈', tier: 'silver', description: { vi: 'Check-in đủ 6 địa danh', en: 'Check in 6 landmarks' } },
  { id: 'gv', name: { vi: 'Phượt Thủ Vàng', en: 'Gold Traveler' }, icon: '🥇', tier: 'gold', description: { vi: 'Check-in đủ 10 địa danh', en: 'Check in 10 landmarks' } },
  { id: 'dm', name: { vi: 'Xuyên Việt Master', en: 'Cross-Vietnam Master' }, icon: '💎', tier: 'diamond', description: { vi: 'Check-in trọn vẹn 12 địa danh', en: 'Check in all 12 landmarks' } }
];

export const rewardItems: RewardItem[] = [
  // --- QUÀ LƯU NIỆM & ĐẶC SẢN VÙNG MIỀN ---
  {
    id: 's1',
    name: { vi: 'Móc Khóa Rồng AI 3D Mạ Vàng', en: '3D Gold Dragon AI Keychain' },
    description: { vi: 'Móc khóa đồng đúc 3D mạ vàng tinh xảo hình linh vật Rồng Việt Nam kèm móc inox chống gỉ.', en: 'Exquisite 3D gold-plated brass dragon mascot keychain with stainless steel hook.' },
    cost: 500,
    icon: '🐉',
    category: 'souvenir',
    region: 'Toàn Quốc',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    material: { vi: 'Đồng mạ vàng 18K & Inox', en: '18K Gold Plated Brass & Inox' },
    dimensions: '4.5cm x 3.0cm',
    claimMethod: { vi: 'Giao tận nơi qua bưu điện hoặc nhận trực tiếp tại Trạm Du Lịch', en: 'Postal Home Delivery or Pick up at Tourism Hub' }
  },
  {
    id: 's2',
    name: { vi: 'Nón Lá Mini Trưng Bày Vẽ Tay Hà Nội', en: 'Hanoi Hand-painted Mini Conical Hat' },
    description: { vi: 'Nón lá mini thủ công từ lá cọ tự nhiên, vẽ tay phong cảnh Hồ Gươm và Tháp Rùa Hà Nội.', en: 'Handcrafted mini conical hat made of palm leaves, depicting Turtle Tower.' },
    cost: 350,
    icon: '👒',
    category: 'souvenir',
    region: 'Miền Bắc',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    material: { vi: 'Lá cọ tự nhiên & Mực vẽ nghệ thuật', en: 'Natural Palm Leaves & Art Ink' },
    dimensions: 'Đường kính 15cm',
    claimMethod: { vi: 'Gửi tận nơi cho du khách hoặc nhận tại Bưu điện TP. Hà Nội', en: 'Home delivery or Pick up at Hanoi City Post Office' }
  },
  {
    id: 's3',
    name: { vi: 'Bộ Thiệp Nổi 3D Địa Danh (Hội An, Chợ Bến Thành, Cầu Vàng)', en: '3D Popup Card Set (Hoi An, Ben Thanh, Golden Bridge)' },
    description: { vi: 'Bộ 3 thiệp giấy nổi 3D cắt laser công nghệ cao mô phỏng kiệt tác kiến trúc Việt Nam.', en: 'Set of 3 high-precision 3D laser-cut popup cards depicting Vietnam architecture.' },
    cost: 450,
    icon: '✉️',
    category: 'souvenir',
    region: 'Toàn Quốc',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    material: { vi: 'Giấy mỹ thuật Kishu Nhật Bản', en: 'Kishu Japanese Art Paper' },
    dimensions: '15cm x 20cm (Khi mở)',
    claimMethod: { vi: 'Gửi qua đường bưu điện miễn phí toàn quốc', en: 'Free postal delivery nationwide' }
  },
  {
    id: 's4',
    name: { vi: 'Tranh Lụa Thêu Tay Phố Cổ Hội An', en: 'Hoi An Hand-embroidered Silk Painting' },
    description: { vi: 'Tranh thêu tay tỉ mỉ trên nền lụa tơ tơ tằm Hà Đông khắc họa phố cổ đêm đèn lồng.', en: 'Meticulously hand-embroidered silk painting depicting Hoi An lantern street.' },
    cost: 1200,
    icon: '🖼️',
    category: 'souvenir',
    region: 'Miền Trung',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    material: { vi: 'Lụa tơ tằm tự nhiên & Khung gỗ gụ', en: 'Natural Silk & Mahogany Wood Frame' },
    dimensions: '30cm x 40cm',
    claimMethod: { vi: 'Đóng hộp quà chống sốc gửi tận nhà', en: 'Shipped in protective gift box to address' }
  },
  {
    id: 's5',
    name: { vi: 'Tượng Cầu Vàng Bà Nà 3D Mạ Vàng Đề Bàn', en: 'Desk 3D Golden Bridge Ba Na Statue' },
    description: { vi: 'Tượng mạ vàng 3D đề bàn đúc khuôn hợp kim mô phỏng Đôi bàn tay Cầu Vàng Đà Nẵng.', en: 'Desktop 3D gold statue simulating Golden Bridge hands in Da Nang.' },
    cost: 1500,
    icon: '🗽',
    category: 'souvenir',
    region: 'Miền Trung',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    material: { vi: 'Hợp kim mạ vàng 24K & Đế đá Marble', en: '24K Gold Plated Alloy & Marble Base' },
    dimensions: '18cm x 10cm x 12cm',
    claimMethod: { vi: 'Nhận tại Trung Tâm Du Lịch Đà Nẵng hoặc Chuyển phát nhanh', en: 'Pick up at Da Nang Tourism Center or Express Mail' }
  },
  {
    id: 's6',
    name: { vi: 'Hộp Quà Cà Phê Phin & Trà Ô Long Đặc Sản', en: 'Specialty Phin Coffee & Oolong Tea Gift Box' },
    description: { vi: 'Hộp quà cao cấp gồm Phin pha inox mạ vàng, 250g cà phê hạt Măng Đen & 100g Trà Ô Long.', en: 'Premium gift box with gold Phin filter, 250g Mang Den coffee & 100g Oolong tea.' },
    cost: 850,
    icon: '☕',
    category: 'souvenir',
    region: 'Tây Nguyên',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    material: { vi: 'Hộp gỗ sơn mài cao cấp & Phin mạ vàng', en: 'Lacquered Wooden Gift Box & Gold Phin' },
    dimensions: '25cm x 20cm x 10cm',
    claimMethod: { vi: 'Giao tận nơi hoặc tặng bạn bè quốc tế', en: 'Home delivery or international gift shipping' }
  },

  // --- VOUCHER GIẢM GIÁ QUÁN ĂN & QUÁN NƯỚC ---
  {
    id: 'v1',
    name: { vi: 'E-Voucher 50k Phở Thìn Lò Đúc Hà Nội', en: '50k Pho Thin Hanoi E-Voucher' },
    description: { vi: 'Giảm trực tiếp 50.000đ cho tô phở tái lăn chuẩn vị Hà Thành', en: '50,000 VND off authentic stir-fried beef Pho' },
    cost: 500,
    icon: '🍜',
    category: 'voucher',
    region: 'Miền Bắc',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    qrCode: 'VN-PHOTHIN-50K-88912',
    promoCode: 'PHOTHIN50K',
    expiryDate: '31/12/2026'
  },
  {
    id: 'v2',
    name: { vi: 'E-Voucher 30k Cà Phê Muối Chú Long', en: '30k Salt Coffee Chu Long E-Voucher' },
    description: { vi: 'Giảm 30.000đ khi mua cà phê muối đậm đà chuẩn vị Huế', en: '30,000 VND off rich salted coffee' },
    cost: 350,
    icon: '☕',
    category: 'voucher',
    region: 'Miền Trung',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    qrCode: 'VN-SALTCAFE-30K-9921',
    promoCode: 'SALTCAFE30',
    expiryDate: '31/12/2026'
  },
  {
    id: 'v3',
    name: { vi: 'E-Voucher Giảm 20% Bún Bò Huế O Phượng', en: '20% Off O Phuong Hue Beef Noodle' },
    description: { vi: 'Giảm 20% tổng hóa đơn ăn uống tại Bún Bò O Phượng Cố Đô', en: '20% discount on total bill at O Phuong Hue Beef Noodle' },
    cost: 600,
    icon: '🍲',
    category: 'voucher',
    region: 'Miền Trung',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    qrCode: 'VN-HUEBUN-20OFF-1102',
    promoCode: 'HUEBUN20',
    expiryDate: '31/12/2026'
  },
  {
    id: 'v4',
    name: { vi: 'Free Topping Trà Sữa Phúc Long / Highlands', en: 'Free Topping Milk Tea E-Voucher' },
    description: { vi: 'Miễn phí 1 phần Topping trân trùng hoàng kim hoặc thạch trái cây', en: 'Free extra Golden Boba or Fruit Jelly topping' },
    cost: 250,
    icon: '🧋',
    category: 'voucher',
    region: 'Toàn Quốc',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    qrCode: 'VN-TOPPING-FREE-7721',
    promoCode: 'FREETOPPING',
    expiryDate: '31/12/2026'
  },
  {
    id: 'v5',
    name: { vi: 'Voucher 100k Resort & Homestay Bãi Sao Phú Quốc', en: '100k Phu Quoc Homestay Voucher' },
    description: { vi: 'Giảm 100.000đ khi đặt phòng Homestay & Resort ven biển Phú Quốc', en: '100,000 VND off Phu Quoc beachside resort room' },
    cost: 1000,
    icon: '🏖️',
    category: 'voucher',
    region: 'Miền Nam',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    qrCode: 'VN-RESORT-100K-3391',
    promoCode: 'SAOBEACH100',
    expiryDate: '31/12/2026'
  }
];
