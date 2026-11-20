/**
 * TUẦN 12: DATA MANAGEMENT - SMART CATALOG DATASET
 * Project: The Smart Catalog (TechZone Electronics)
 * Author: Huỳnh Hữu Phước (MSSV: 125000155) - Đại học Lạc Hồng
 * File: challenge/data.js
 */

const productsData = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB Titan Tự Nhiên",
    category: "smartphone",
    categoryName: "Điện thoại",
    price: 29490000,
    originalPrice: 34990000,
    discountPercent: 16,
    rating: 4.9,
    reviewsCount: 342,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=70",
    inStock: true,
    isFeatured: true,
    badge: "BÁN CHẠY",
    description: "Khung viền titan chuẩn hàng không vũ trụ, chip Apple A17 Pro đỉnh cao hiệu năng gaming, camera zoom quang học 5x cực nét.",
    specs: {
      chip: "Apple A17 Pro (3nm)",
      ram: "8 GB",
      storage: "256 GB NVMe",
      battery: "4422 mAh (Sạc nhanh 20W)"
    }
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra 5G 12GB/512GB",
    category: "smartphone",
    categoryName: "Điện thoại",
    price: 28990000,
    originalPrice: 33990000,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 280,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=70",
    inStock: true,
    isFeatured: true,
    badge: "GALAXY AI",
    description: "Kỷ nguyên Galaxy AI quyền năng: dịch thuật cuộc gọi trực tiếp, khoanh tròn tìm kiếm thông minh, camera zoom mắt thần 200MP.",
    specs: {
      chip: "Snapdragon 8 Gen 3 for Galaxy",
      ram: "12 GB LPDDR5X",
      storage: "512 GB UFS 4.0",
      battery: "5000 mAh (Sạc nhanh 45W)"
    }
  },
  {
    id: 3,
    name: "MacBook Pro 14 M3 Pro (18GB / 512GB SSD)",
    category: "laptop",
    categoryName: "Laptop",
    price: 49990000,
    originalPrice: 54990000,
    discountPercent: 9,
    rating: 5.0,
    reviewsCount: 156,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=70",
    inStock: true,
    isFeatured: true,
    badge: "CAO CẤP",
    description: "Sức mạnh phi thường từ chip M3 Pro cho đồ họa, render 3D và lập trình viên chuyên nghiệp. Màn hình Liquid Retina XDR 120Hz rực rỡ.",
    specs: {
      chip: "Apple M3 Pro (11-Core CPU, 14-Core GPU)",
      ram: "18 GB Unified Memory",
      storage: "512 GB SSD siêu tốc",
      battery: "Thời lượng pin lên đến 18 giờ"
    }
  },
  {
    id: 4,
    name: "Laptop Gaming ASUS ROG Zephyrus G16 OLED",
    category: "laptop",
    categoryName: "Laptop",
    price: 46990000,
    originalPrice: 51990000,
    discountPercent: 10,
    rating: 4.9,
    reviewsCount: 112,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=70",
    inStock: true,
    isFeatured: false,
    badge: "GAMING PRO",
    description: "Laptop gaming siêu mỏng nhẹ với màn hình OLED 2.5K 240Hz, card đồ họa NVIDIA GeForce RTX 4070 cực khủng.",
    specs: {
      chip: "Intel Core Ultra 9 185H",
      ram: "32 GB LPDDR5X",
      storage: "1 TB PCIe 4.0 NVMe",
      battery: "90 Whrs (Hỗ trợ Type-C 100W)"
    }
  },
  {
    id: 5,
    name: "Tai nghe chống ồn Sony WH-1000XM5",
    category: "audio",
    categoryName: "Âm thanh",
    price: 6890000,
    originalPrice: 8490000,
    discountPercent: 19,
    rating: 4.8,
    reviewsCount: 420,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=70",
    inStock: true,
    isFeatured: true,
    badge: "GIẢM 19%",
    description: "Công nghệ chống ồn chủ động (ANC) số 1 thế giới với 2 bộ xử lý và 8 micro. Âm thanh Hi-Res Audio không dây chân thực.",
    specs: {
      chip: "Sony Integrated Processor V1 + QN1",
      ram: "Hỗ trợ codec LDAC, AAC, SBC",
      storage: "Driver 30mm màng sợi carbon",
      battery: "30 giờ nghe nhạc liên tục"
    }
  },
  {
    id: 6,
    name: "Tai nghe Apple AirPods Pro 2 USB-C (MagSafe)",
    category: "audio",
    categoryName: "Âm thanh",
    price: 5390000,
    originalPrice: 6190000,
    discountPercent: 13,
    rating: 4.9,
    reviewsCount: 530,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop&q=70",
    inStock: true,
    isFeatured: true,
    badge: "APPLE CARE",
    description: "Chip H2 mang lại khả năng chống ồn chủ động gấp đôi, chế độ Xuyên âm thích ứng và Âm thanh không gian cá nhân hóa.",
    specs: {
      chip: "Apple H2 Headphone Chip",
      ram: "Chống bụi & nước IP54",
      storage: "Hộp sạc USB-C có loa tìm kiếm",
      battery: "6 giờ sử dụng (30 giờ với hộp)"
    }
  },
  {
    id: 7,
    name: "Bàn phím cơ không dây Logitech MX Mechanical",
    category: "accessory",
    categoryName: "Phụ kiện",
    price: 3390000,
    originalPrice: 3890000,
    discountPercent: 13,
    rating: 4.7,
    reviewsCount: 184,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=70",
    inStock: true,
    isFeatured: false,
    badge: "OFFICE HERO",
    description: "Cảm giác gõ phím cơ êm ái low-profile, kết nối 3 thiết bị cùng lúc qua Bluetooth hoặc Logi Bolt, đèn nền thông minh tự sáng.",
    specs: {
      chip: "Logitech Tactile Quiet Switch",
      ram: "Kết nối Easy-Switch 3 máy",
      storage: "Cổng sạc Type-C nhanh",
      battery: "15 ngày (hoặc 10 tháng tắt đèn)"
    }
  },
  {
    id: 8,
    name: "Chuột không dây Logitech MX Master 3S",
    category: "accessory",
    categoryName: "Phụ kiện",
    price: 2390000,
    originalPrice: 2790000,
    discountPercent: 14,
    rating: 4.9,
    reviewsCount: 395,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=70",
    inStock: true,
    isFeatured: true,
    badge: "CHUỘT HUYỀN THOẠI",
    description: "Thiết kế công thái học đỉnh cao, cuộn siêu tốc MagSpeed cuộn 1000 dòng/giây, mắt đọc cảm biến 8000 DPI trên mọi bề mặt kể cả kính.",
    specs: {
      chip: "Cảm biến Darkfield 8000 DPI",
      ram: "Phím bấm Silent Clicks êm ái",
      storage: "Tùy biến với phần mềm Logi Options+",
      battery: "70 ngày sau 1 lần sạc đầy"
    }
  },
  {
    id: 9,
    name: "iPad Air 6 M2 11 inch Wi-Fi 128GB (2024)",
    category: "smartphone",
    categoryName: "Điện thoại & Tablet",
    price: 15990000,
    originalPrice: 16990000,
    discountPercent: 6,
    rating: 4.8,
    reviewsCount: 168,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=70",
    inStock: true,
    isFeatured: false,
    badge: "MỚI 2024",
    description: "Sức mạnh vượt trội từ chip Apple M2, hỗ trợ Apple Pencil Pro thế hệ mới, camera trước đặt ngang tối ưu cho gọi video.",
    specs: {
      chip: "Apple M2 (8-Core CPU, 10-Core GPU)",
      ram: "8 GB RAM",
      storage: "128 GB ROM",
      battery: "Pin dùng cả ngày 28.93 Wh"
    }
  },
  {
    id: 10,
    name: "Laptop Dell XPS 13 9340 (Core Ultra 7 / 16GB / 512GB)",
    category: "laptop",
    categoryName: "Laptop",
    price: 38990000,
    originalPrice: 42990000,
    discountPercent: 9,
    rating: 4.7,
    reviewsCount: 94,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=70",
    inStock: true,
    isFeatured: false,
    badge: "ULTRABOOK",
    description: "Tuyệt tác thiết kế nhôm nguyên khối và kính cường lực Gorilla Glass 3, hàng phím chức năng cảm ứng điện dung tương lai.",
    specs: {
      chip: "Intel Core Ultra 7 155H",
      ram: "16 GB LPDDR5x 7467 MT/s",
      storage: "512 GB PCIe 4.0 SSD",
      battery: "55 Whr kèm sạc Type-C 60W"
    }
  },
  {
    id: 11,
    name: "Loa Bluetooth di động Marshall Acton III",
    category: "audio",
    categoryName: "Âm thanh",
    price: 6490000,
    originalPrice: 7990000,
    discountPercent: 19,
    rating: 4.9,
    reviewsCount: 220,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=70",
    inStock: true,
    isFeatured: false,
    badge: "RETRO STYLE",
    description: "Âm thanh trường âm thanh rộng hơn người tiền nhiệm, thiết kế phong cách vintage hoài cổ đặc trưng của thương hiệu Anh Quốc.",
    specs: {
      chip: "Amp Class D công suất 60W",
      ram: "Bluetooth 5.2 LE Audio",
      storage: "Núm xoay chỉnh Bass/Treble kim loại",
      battery: "Cắm nguồn trực tiếp 220V"
    }
  },
  {
    id: 12,
    name: "Màn hình Gaming LG UltraGear 27GR95QE OLED 240Hz",
    category: "accessory",
    categoryName: "Phụ kiện & Màn hình",
    price: 18990000,
    originalPrice: 22990000,
    discountPercent: 17,
    rating: 4.9,
    reviewsCount: 135,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=70",
    inStock: true,
    isFeatured: true,
    badge: "OLED 240Hz",
    description: "Màn hình OLED 27 inch 2K đầu tiên thế giới đạt tần số quét 240Hz và thời gian phản hồi siêu tốc 0.03ms (GtG).",
    specs: {
      chip: "Tấm nền OLED độ phân giải 2K QHD",
      ram: "Tương thích NVIDIA G-SYNC, FreeSync",
      storage: "Độ phủ màu DCI-P3 98.5%",
      battery: "Cổng HDMI 2.1, DisplayPort 1.4"
    }
  },
  {
    id: 13,
    name: "Củ sạc nhanh Anker 735 GaNPrime 65W 3 Cổng",
    category: "accessory",
    categoryName: "Phụ kiện",
    price: 890000,
    originalPrice: 1290000,
    discountPercent: 31,
    rating: 4.8,
    reviewsCount: 680,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=70",
    inStock: true,
    isFeatured: false,
    badge: "SALE SỐC 31%",
    description: "Công nghệ GaN thế hệ mới sạc cùng lúc 3 thiết bị (2 Type-C, 1 Type-A) với kích thước nhỏ hơn 53% so với sạc laptop thông thường.",
    specs: {
      chip: "Anker GaNPrime PowerIQ 4.0",
      ram: "Công suất tối đa 65W",
      storage: "Cảm biến nhiệt Dynamic Temperature Sensor",
      battery: "Chân gập tiện lợi du lịch"
    }
  },
  {
    id: 14,
    name: "Webcam Elgato Facecam Pro 4K60 Ultra HD",
    category: "accessory",
    categoryName: "Phụ kiện",
    price: 7690000,
    originalPrice: 8990000,
    discountPercent: 14,
    rating: 4.7,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=600&auto=format&fit=crop&q=70",
    inStock: false,
    isFeatured: false,
    badge: "HẾT HÀNG",
    description: "Webcam đầu tiên trên thế giới quay video độ phân giải 4K ở tốc độ 60 khung hình/giây thực tế, cảm biến Sony STARVIS cỡ lớn.",
    specs: {
      chip: "Sony STARVIS CMOS Sensor",
      ram: "Ống kính Elgato Prime Lens f/2.0",
      storage: "Bộ nhớ trong lưu trực tiếp thiết lập",
      battery: "Kết nối chuẩn USB 3.0 Type-C"
    }
  },
  {
    id: 15,
    name: "Ổ cứng di động SSD Kingston XS1000 1TB USB 3.2 Gen 2",
    category: "accessory",
    categoryName: "Phụ kiện",
    price: 1950000,
    originalPrice: 2450000,
    discountPercent: 20,
    rating: 4.8,
    reviewsCount: 310,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&auto=format&fit=crop&q=70",
    inStock: true,
    isFeatured: false,
    badge: "HOT SALE",
    description: "Ổ cứng di động bỏ túi siêu nhỏ gọn chỉ nặng 29g, tốc độ đọc lên tới 1050 MB/s sao chép video 4K trong chớp mắt.",
    specs: {
      chip: "Chuẩn giao tiếp USB 3.2 Gen 2",
      ram: "Tốc độ đọc 1050MB/s, ghi 1000MB/s",
      storage: "Dung lượng thực 1 TB (1000GB)",
      battery: "Tương thích Windows, macOS, Android, iOS"
    }
  },
  {
    id: 16,
    name: "Đồng hồ thông minh Apple Watch Series 9 GPS 45mm",
    category: "accessory",
    categoryName: "Phụ kiện & Smartwatch",
    price: 9990000,
    originalPrice: 11290000,
    discountPercent: 11,
    rating: 4.9,
    reviewsCount: 290,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=70",
    inStock: true,
    isFeatured: true,
    badge: "SMARTWATCH",
    description: "Thao tác chạm hai lần ngón tay (Double Tap) diệu kỳ không cần chạm màn hình, chip S9 SiP mạnh mẽ hơn bao giờ hết, màn hình sáng 2000 nits.",
    specs: {
      chip: "Apple S9 SiP với 4-Core Neural Engine",
      ram: "Màn hình OLED Always-On 2000 nits",
      storage: "Dung lượng bộ nhớ 64 GB",
      battery: "Pin 18 giờ (36 giờ chế độ tiết kiệm)"
    }
  }
];

// Xuất dữ liệu để sử dụng trong trình duyệt hoặc nodejs
if (typeof module !== 'undefined' && module.exports) {
  module.exports = productsData;
}
