# 🇻🇳 QUY TRÌNH VẬN HÀNH HỆ THỐNG KHÁM PHÁ VIỆT NAM (SYSTEM OPERATIONAL WORKFLOW)

Tài liệu này quy định 5 bước vận hành chuẩn cho hệ thống ứng dụng Web 3D Khám Phá Việt Nam.

---

## 📌 BƯỚC 1: KHỞI TẠO GIAO DIỆN & BẢN ĐỒ
- **Phông nền & Hiệu ứng 120Hz:** Nạp phông nền màu Be (`#F5F2EB` / `#EFEAD8`) cùng dàn ngôi sao đỏ lấp lánh (`StarryBackgroundCanvas.tsx`) nhấp nháy mượt mà.
- **Giới hạn Lãnh thổ Việt Nam (Max Bounds):**
  - Khóa góc nhìn Camera trung tâm bản đồ tại `[15.2, 109.0]` (Center Việt Nam) với Zoom Level mặc định `5.2`.
  - Giới hạn camera di chuyển `[[6.5, 100.5], [24.5, 114.8]]` đảm bảo duy trì toàn bộ lãnh thổ Việt Nam trên màn hình.
  - Phủ mặt nạ màu tối ngoài ranh giới Việt Nam (`vietnamMaskLayer.ts`), làm nổi bật dải đất hình chữ S và 2 Quần đảo thiêng liêng 🇻🇳 **Hoàng Sa (TP. Đà Nẵng)** và 🇻🇳 **Trường Sa (Tỉnh Khánh Hòa)** dưới dạng **Nhãn Địa Lý Tự Nhiên (Native Map Text Labels)**.

---

## 📌 BƯỚC 2: KÍCH HOẠT LINH VẬT NGÔI SAO AI & TOUR HƯỚNG DẪN TỰ ĐỘNG
- **Khởi tạo Linh vật Ngôi Sao AI (`StarMascot.tsx`):**
  - Hiển thị nhân vật Ngôi Sao dạng con người với đầu hình ngôi sao 5 cánh đỏ rực rỡ, tay chân trong trang phục du lịch Việt Nam.
- **Tour Hướng Dẫn Tự Động (`AppOnboardingTour.tsx`):**
  - Khi du khách load xong Web, hệ thống tự động bộc phát hiệu ứng tia sáng đỏ (Sparkle Entrance) và khởi chạy Tour Hướng dẫn 5 bước:
    1. *Chào mừng Trợ lý Ngôi sao AI.*
    2. *Hướng dẫn khám phá Bản đồ 3D & 2 Quần đảo Hoàng Sa - Trường Sa.*
    3. *Hướng dẫn tìm Quán ăn, Khách sạn & Bộ lọc bán kính 5km - 30km.*
    4. *Hướng dẫn nút [🚗 Chỉ đường] kết nối Google Maps real-time.*
    5. *Hướng dẫn tích điểm nâng cấp Cấp độ từ Lv.1 đến Lv.20.*

---

## 📌 BƯỚC 3: XỬ LÝ TƯƠNG TÁC ĐỊA ĐIỂM & BỘ LỌC BÁN KÍNH DỊCH VỤ
- **Bảng Chi Tiết Địa Điểm (`LandmarkDetailPanel.tsx`):**
  - Khi du khách nhấp chọn một danh thắng -> Bản đồ tự động xoay góc camera (Fly-to) và mở Bảng Chi Tiết Địa Điểm.
- **Tính toán Khoảng cách Haversine & Bộ lọc Bán kính:**
  - Áp dụng công thức Haversine tính toán khoảng cách tọa độ thực tế giữa địa danh với các điểm dịch vụ xung quanh.
  - Cung cấp bộ lọc bán kính linh hoạt: **[ 5km | 10km | 20km | 30km ]** để liệt kê ngay danh sách Quán ăn, Quán nước và Khách sạn đạt chuẩn.

---

## 📌 BƯỚC 4: ĐIỀU HƯỚNG CHỈ ĐƯỜNG REAL-TIME (OUTDOOR MAP DEEP LINKING)
- **Cơ chế Mở Bản đồ Thực tế (`src/utils/navigation.ts`):**
  - Khi du khách nhấp vào nút **[🚗 Chỉ Đường]** tại bất kỳ Quán ăn hay Khách sạn nào:
    - **iOS (iPhone/iPad):** Tự động chuyển tiếp đến Apple Maps (`https://maps.apple.com/?saddr=...`).
    - **Android & Web Browser:** Tự động chuyển tiếp đến Google Maps (`https://www.google.com/maps/dir/?api=1&origin=...`).
  - Giao diện floating modal sẽ tự động ẩn giúp du khách tập trung vào hành trình di chuyển thực tế.

---

## 📌 BƯỚC 5: ĐỒNG BỘ TIẾN TRÌNH & NÂNG CẤP LEVEL (LV.1 -> LV.20)
- **Tích lũy Điểm Trải Nghiệm (EXP):**
  - Du khách nhận điểm EXP khi: Check-in bằng camera AR, xem thông tin danh thắng, tạo Tour cá nhân, hoặc tham gia Vòng quay may mắn.
- **Tiến hóa Cấp độ Ngôi Sao AI (`GameContext.tsx` & `StarMascot.tsx`):**
  - **Lv.1 - Lv.5 (Sao Tập Sự):** Ngôi sao đỏ mầm nhỏ nhắn, lấp lánh nhẹ nhàng.
  - **Lv.6 - Lv.10 (Sao Dẫn Đường):** Đeo kính mát du lịch + đuôi sao băng.
  - **Lv.11 - Lv.15 (Sao Hoàng Gia):** Đội vương miện vàng + vòng hào quang đỏ rực.
  - **Lv.16 - Lv.20 (Tối Cao Vũ Trụ):** Cánh ánh sáng vũ trụ + hiệu ứng nổ Supernova 3D.
