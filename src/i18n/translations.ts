export const translations = {
  vi: {
    // Splash / Login Screen
    app_title: 'Khám Phá Du Lịch Việt Nam 3D',
    app_subtitle: 'Hệ thống chỉ đường & Hướng dẫn viên Rồng AI • 7 Kỳ Quan',
    username_label: 'Tài khoản (Nhập: 1)',
    password_label: 'Mật khẩu (Nhập: 1)',
    login_button: '🚀 ĐẮNG NHẬP NGAY',
    preload_status: 'Đang tải dữ liệu bản đồ 3D & Dữ liệu du lịch...',
    trial_account_hint: 'Tài khoản dùng thử: 1 | Mật khẩu: 1',
    login_error: 'Tài khoản hoặc mật khẩu không chính xác! (Gợi ý: 1 / 1)',
    switch_lang_btn: 'Đổi sang EN 🇬🇧',

    // Navigation & Header
    home: 'Trang Chủ 3D',
    custom_tour: 'Tự Thiết Kế Tour',
    preset_tours: 'Tuyến Tour Mẫu',
    badges: 'Huy Hiệu Di Sản',
    rewards: 'Đổi Quà & Mini-Games',
    search_placeholder: 'Tìm địa danh, quán ăn, khách sạn...',
    checkin: 'Check-in AR',

    // Custom Tour Builder
    custom_tour_title: '🗺️ Tự Thiết Kế Tour Du Lịch',
    custom_tour_sub: 'Chọn các điểm đến từ Miền Tây/Nam ra Bắc',
    route_selected_spots: '🚗 Rồng AI Chỉ Đường Đến Các Điểm Đã Chọn',
    select_at_least_2: 'Hãy chọn ít nhất 2 địa danh để tạo lộ trình',
    spots_selected: 'điểm đã chọn',

    // Travel Notes & Checklist
    travel_notes_title: '📝 Sổ Tay Ghi Chú & Hành Trang Du Lịch',
    travel_notes_sub: 'Lưu trữ danh sách chuẩn bị & nhắc nhở riêng',
    packing_checklist: '🎒 Danh Sách Đồ Dùng Cần Chuẩn Bị (Checklist)',
    add_item_placeholder: 'Thêm món đồ cần mang...',
    travel_reminders: '📌 Ghi Chú Nhắc Nhở Chuyến Đi (Reminders)',
    add_note_placeholder: 'Ví dụ: Ghé Phở Thìn lúc 8h sáng...',
    save_note_btn: '+ Lưu Ghi Chú',
    storage_hint: '💡 Ghi chú tự động được lưu vào trình duyệt (localStorage).',

    // Weather Widget
    weather_widget_title: '☀️ Dự Báo Thời Tiết Real-Time',
    weather_widget_sub: 'Thời tiết du lịch & Lời khuyên Rồng AI',
    weather_advice_msg: 'Thời tiết hôm nay khá đẹp, thích hợp cho việc tản bộ và tham quan ngoài trời!',

    // Dragon AI Mascot & Dialogue
    dragon_name: '🐉 Linh Vật Rồng AI',
    skip: 'Bỏ Qua ⏭️',
    next: 'Tiếp ➔',
    dragon_welcome_msg: 'Xin chào! Rồng AI rất vui được đồng hành cùng bạn khám phá Việt Nam. Hôm nay bạn muốn ghé thăm nơi đâu?',
    dragon_custom_route_msg: 'Bạn đã chọn xong lộ trình rồi đấy! Rồng AI sẽ lập tuyến đường tối ưu qua các điểm này ngay nhé.',

    // Common Buttons
    close: 'Đóng',
    cancel: 'Hủy'
  },
  en: {
    // Splash / Login Screen
    app_title: 'Discover Vietnam 3D Tourism',
    app_subtitle: '3D Navigation & Dragon AI Voice Guide • 7 Wonders',
    username_label: 'Username (Enter: 1)',
    password_label: 'Password (Enter: 1)',
    login_button: '🚀 LOGIN NOW',
    preload_status: 'Preloading 3D Map Data & Tourism Info...',
    trial_account_hint: 'Trial Account: 1 | Password: 1',
    login_error: 'Invalid username or password! (Hint: 1 / 1)',
    switch_lang_btn: 'Switch to VI 🇻🇳',

    // Navigation & Header
    home: '3D Home',
    custom_tour: 'Custom Tour',
    preset_tours: 'Preset Tours',
    badges: 'Heritage Badges',
    rewards: 'Rewards & Games',
    search_placeholder: 'Search landmarks, food, hotels...',
    checkin: 'AR Check-in',

    // Custom Tour Builder
    custom_tour_title: '🗺️ Custom Tour Builder',
    custom_tour_sub: 'Select Destinations from South to North',
    route_selected_spots: '🚗 Dragon AI Navigation To Selected Waypoints',
    select_at_least_2: 'Please select at least 2 spots to build a route',
    spots_selected: 'spots selected',

    // Travel Notes & Checklist
    travel_notes_title: '📝 Travel Notes & Checklist',
    travel_notes_sub: 'Manage your packing list & personal reminders',
    packing_checklist: '🎒 Packing List & Essentials (Checklist)',
    add_item_placeholder: 'Add item to pack...',
    travel_reminders: '📌 Personal Travel Reminders',
    add_note_placeholder: 'Example: Visit Pho Thin at 8 AM...',
    save_note_btn: '+ Save Note',
    storage_hint: '💡 Notes are automatically saved to your browser (localStorage).',

    // Weather Widget
    weather_widget_title: '☀️ Real-Time Weather Forecast',
    weather_widget_sub: 'Travel Weather & Dragon AI Advice',
    weather_advice_msg: 'The weather today is pleasant, perfect for outdoor sightseeing!',

    // Dragon AI Mascot & Dialogue
    dragon_name: '🐉 Dragon AI Mascot',
    skip: 'Skip ⏭️',
    next: 'Next ➔',
    dragon_welcome_msg: 'Hello! Dragon AI is thrilled to accompany you on your journey across Vietnam. Where would you like to explore today?',
    dragon_custom_route_msg: 'Your custom itinerary is ready! Dragon AI is generating the optimal route through your selected destinations.',

    // Common Buttons
    close: 'Close',
    cancel: 'Cancel'
  }
};

export type TranslationKey = keyof typeof translations.vi;
