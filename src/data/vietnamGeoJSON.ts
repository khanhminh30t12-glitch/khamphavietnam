/**
 * Official Geographic GeoJSON Layer for Vietnam Islands (Hoang Sa & Truong Sa Archipelagos)
 */
export const vietnamIslandsGeoJSON: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [111.6083, 16.5388] // Hoang Sa Archipelago Center
      },
      properties: {
        id: 'hoang-sa',
        nameVi: 'Quần đảo Hoàng Sa (Việt Nam)',
        nameEn: 'Hoang Sa Archipelago (Vietnam)',
        province: 'TP. Đà Nẵng'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [111.9161, 8.8572] // Truong Sa Archipelago Center
      },
      properties: {
        id: 'truong-sa',
        nameVi: 'Quần đảo Trường Sa (Việt Nam)',
        nameEn: 'Truong Sa Archipelago (Vietnam)',
        province: 'Tỉnh Khánh Hòa'
      }
    }
  ]
};
