// GeoJSON Inverted Mask and Glowing Border Line Data for Vietnam

export const VIETNAM_CONTOUR_COORDINATES: [number, number][] = [
  // Northern Border (Lao Cai, Ha Giang, Cao Bang, Lang Son, Quang Ninh)
  [102.14, 22.40],
  [103.00, 22.65],
  [104.00, 22.80],
  [104.90, 23.38], // Ha Giang top
  [105.80, 23.25],
  [106.70, 22.90],
  [107.50, 22.15],
  [108.05, 21.55], // Mong Cai, Quang Ninh

  // Tonkin Gulf Coastline & Eastern Maritime Zone
  [107.80, 20.80], // Ha Long Bay / Cat Ba
  [106.50, 20.20], // Thai Binh / Nam Dinh
  [105.90, 19.80], // Thanh Hoa
  [105.70, 18.70], // Nghe An
  [106.40, 17.80], // Quang Binh
  [107.20, 16.80], // Quang Tri

  // Central Coast & Eastern Sea Boundary including Hoang Sa Archipelago
  [108.20, 16.05], // Da Nang
  [112.50, 17.20], // Outer Hoang Sa (Paracel Islands Zone)
  [112.50, 15.80], // South Hoang Sa
  [109.10, 15.20], // Quang Ngai / Binh Dinh coast
  [109.30, 13.50], // Phu Yen
  [109.20, 12.20], // Nha Trang / Khanh Hoa

  // Southeastern Sea Boundary including Truong Sa Archipelago
  [114.50, 11.50], // Outer North Truong Sa (Spratly Islands Zone)
  [114.50, 7.50],  // Outer South Truong Sa / DK1 Platforms
  [108.80, 8.50],  // Ninh Thuan / Binh Thuan coast
  [107.00, 10.30], // Vung Tau
  [106.60, 9.60],  // Mekong Delta Estuaries (Soc Trang, Bac Lieu)
  [105.20, 8.50],  // Ca Mau Tip (Dat Mui)

  // Southwestern Waters & Gulf of Thailand (Phu Quoc Island)
  [103.80, 9.80],  // Phu Quoc Island
  [104.50, 10.40], // Ha Tien / Kien Giang

  // Western Inland Border (Cambodia & Laos Borders)
  [105.10, 10.90], // An Giang
  [106.00, 11.60], // Tay Ninh
  [107.50, 12.50], // Dak Lak / Gia Lai
  [107.70, 14.50], // Kon Tum
  [107.20, 16.00], // Quang Nam West
  [106.50, 16.70], // Quang Tri West
  [105.70, 18.20], // Ha Tinh West
  [105.00, 19.50], // Nghe An West
  [104.00, 20.80], // Son La
  [103.00, 21.50], // Dien Bien
  [102.14, 22.40]  // Back to SW Lao Cai corner
];

// Inverted GeoJSON Polygon: Covers the entire world (-180..180, -90..90) with Vietnam subtracted
export const BLACKOUT_OUTSIDE_MASK_GEOJSON: GeoJSON.Feature<GeoJSON.Polygon> = {
  type: 'Feature',
  properties: { name: 'Complete 100% Blackout Outside Mask' },
  geometry: {
    type: 'Polygon',
    coordinates: [
      // Outer World Ring
      [
        [-180, -90],
        [180, -90],
        [180, 90],
        [-180, 90],
        [-180, -90]
      ],
      // Subtracted Vietnam Inner Hole
      VIETNAM_CONTOUR_COORDINATES
    ]
  }
};

// GeoJSON LineString: Glowing border line around Vietnam
export const VIETNAM_GLOWING_CONTOUR_GEOJSON: GeoJSON.Feature<GeoJSON.LineString> = {
  type: 'Feature',
  properties: { name: 'Vietnam Glowing Border Contour' },
  geometry: {
    type: 'LineString',
    coordinates: VIETNAM_CONTOUR_COORDINATES
  }
};
