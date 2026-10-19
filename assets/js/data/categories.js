const categories = [
  {
    id: "quat-tran",
    slug: "quat-tran",
    name: "Quạt trần",
    description: "Quạt trần hiện đại, tiết kiệm điện, đa dạng kiểu dáng từ cổ điển đến công nghiệp. Phù hợp mọi không gian sống và làm việc.",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=450&fit=crop",
    icon: "fan",
    order: 1,
    subcategories: [
      { id: "quat-tran-hien-dai", slug: "quat-tran-hien-dai", name: "Quạt trần hiện đại" },
      { id: "quat-tran-den-led", slug: "quat-tran-den-led", name: "Quạt trần có đèn LED" },
      { id: "quat-tran-canh-go", slug: "quat-tran-canh-go", name: "Quạt trần cánh gỗ" },
      { id: "quat-tran-cao-cap", slug: "quat-tran-cao-cap", name: "Quạt trần cao cấp" },
      { id: "quat-tran-dieu-khien", slug: "quat-tran-dieu-khien", name: "Quạt trần điều khiển từ xa" },
      { id: "quat-tran-cong-nghiep", slug: "quat-tran-cong-nghiep", name: "Quạt trần công nghiệp" }
    ],
    filters: [
      { key: "brand", label: "Thương hiệu", type: "checkbox" },
      { key: "price", label: "Khoảng giá", type: "range" },
      { key: "blades", label: "Số cánh", type: "checkbox", options: ["3", "4", "5", "6"] },
      { key: "diameter", label: "Đường kính (cm)", type: "checkbox", options: ["90-110", "110-130", "130-150", "150+"] },
      { key: "power", label: "Công suất (W)", type: "checkbox", options: ["30-50", "50-70", "70-100", "100+"] },
      { key: "speedLevels", label: "Số cấp độ gió", type: "checkbox", options: ["3", "4", "5", "6"] },
      { key: "hasLight", label: "Có đèn", type: "boolean" },
      { key: "remoteControl", label: "Điều khiển từ xa", type: "boolean" },
      { key: "color", label: "Màu sắc", type: "checkbox", options: ["Trắng", "Đen", "Nâu", "Xám", "Vàng đồng"] },
      { key: "roomSize", label: "Diện tích phòng", type: "checkbox", options: ["Dưới 15m²", "15-25m²", "25-35m²", "Trên 35m²"] }
    ]
  },
  {
    id: "quat-ban",
    slug: "quat-ban",
    name: "Quạt bàn",
    description: "Quạt bàn nhỏ gọn, linh hoạt, phù hợp bàn làm việc, phòng ngủ và không gian nhỏ. Nhiều mẫu tích điện tiện dụng.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=450&fit=crop",
    icon: "fan",
    order: 2,
    subcategories: [
      { id: "quat-ban-mini", slug: "quat-ban-mini", name: "Quạt bàn mini" },
      { id: "quat-ban-gia-dinh", slug: "quat-ban-gia-dinh", name: "Quạt bàn gia đình" },
      { id: "quat-ban-tich-dien", slug: "quat-ban-tich-dien", name: "Quạt bàn tích điện" },
      { id: "quat-ban-usb", slug: "quat-ban-usb", name: "Quạt bàn USB" },
      { id: "quat-ban-cong-suat-lon", slug: "quat-ban-cong-suat-lon", name: "Quạt bàn công suất lớn" }
    ],
    filters: [
      { key: "brand", label: "Thương hiệu", type: "checkbox" },
      { key: "price", label: "Khoảng giá", type: "range" },
      { key: "power", label: "Công suất (W)", type: "checkbox", options: ["5-15", "15-30", "30-50", "50+"] },
      { key: "bladeDiameter", label: "Đường kính cánh (cm)", type: "checkbox", options: ["10-20", "20-30", "30-40", "40+"] },
      { key: "speedLevels", label: "Số cấp độ gió", type: "checkbox", options: ["2", "3", "4", "5"] },
      { key: "rechargeable", label: "Tích điện", type: "boolean" },
      { key: "batteryCapacity", label: "Dung lượng pin", type: "checkbox", options: ["2000-4000mAh", "4000-6000mAh", "6000mAh+"] },
      { key: "color", label: "Màu sắc", type: "checkbox", options: ["Trắng", "Đen", "Xanh", "Hồng", "Xám"] },
      { key: "noiseLevel", label: "Độ ồn", type: "checkbox", options: ["Rất êm (<40dB)", "Êm (40-50dB)", "Trung bình"] }
    ]
  },
  {
    id: "quat-dien-khac",
    slug: "quat-dien-khac",
    name: "Quạt điện khác",
    description: "Quạt đứng, quạt treo tường, quạt hộp, quạt lửng, quạt điều hòa và quạt thông gió cho mọi nhu cầu.",
    image: "https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?w=600&h=450&fit=crop",
    icon: "fan",
    order: 3,
    subcategories: [
      { id: "quat-dung", slug: "quat-dung", name: "Quạt đứng" },
      { id: "quat-treo-tuong", slug: "quat-treo-tuong", name: "Quạt treo tường" },
      { id: "quat-hop", slug: "quat-hop", name: "Quạt hộp" },
      { id: "quat-lung", slug: "quat-lung", name: "Quạt lửng" },
      { id: "quat-dieu-hoa", slug: "quat-dieu-hoa", name: "Quạt điều hòa" },
      { id: "quat-thong-gio", slug: "quat-thong-gio", name: "Quạt thông gió" }
    ],
    filters: [
      { key: "brand", label: "Thương hiệu", type: "checkbox" },
      { key: "price", label: "Khoảng giá", type: "range" },
      { key: "power", label: "Công suất (W)", type: "checkbox", options: ["30-50", "50-80", "80-120", "120+"] },
      { key: "speedLevels", label: "Số cấp độ gió", type: "checkbox", options: ["3", "4", "5"] },
      { key: "remoteControl", label: "Điều khiển từ xa", type: "boolean" },
      { key: "color", label: "Màu sắc", type: "checkbox", options: ["Trắng", "Đen", "Xám", "Xanh"] }
    ]
  },
  {
    id: "den-led",
    slug: "den-led",
    name: "Đèn LED",
    description: "Đèn LED tiết kiệm điện, tuổi thọ cao, đa dạng công suất và kiểu dáng từ bóng đèn đến đèn panel.",
    image: "https://images.unsplash.com/photo-1565814329452-1419d1e2e3e0?w=600&h=450&fit=crop",
    icon: "lightbulb",
    order: 4,
    subcategories: [
      { id: "bong-den-led", slug: "bong-den-led", name: "Bóng đèn LED" },
      { id: "den-led-bulb", slug: "den-led-bulb", name: "Đèn LED bulb" },
      { id: "den-led-tuyp", slug: "den-led-tuyp", name: "Đèn LED tuýp" },
      { id: "den-led-day", slug: "den-led-day", name: "Đèn LED dây" },
      { id: "den-led-panel", slug: "den-led-panel", name: "Đèn LED panel" },
      { id: "den-led-ngoai-troi", slug: "den-led-ngoai-troi", name: "Đèn LED ngoài trời" }
    ],
    filters: [
      { key: "brand", label: "Thương hiệu", type: "checkbox" },
      { key: "price", label: "Khoảng giá", type: "range" },
      { key: "power", label: "Công suất (W)", type: "checkbox", options: ["3-7", "7-12", "12-20", "20-40", "40+"] },
      { key: "luminousFlux", label: "Quang thông (lm)", type: "checkbox", options: ["300-600", "600-1000", "1000-2000", "2000+"] },
      { key: "colorTemp", label: "Nhiệt độ màu", type: "checkbox", options: ["3000K (Vàng)", "4000K (Trung tính)", "6500K (Trắng)"] },
      { key: "lightColor", label: "Màu ánh sáng", type: "checkbox", options: ["Vàng ấm", "Trung tính", "Trắng lạnh"] },
      { key: "baseType", label: "Loại đui", type: "checkbox", options: ["E27", "E14", "B22", "GU10", "T8"] },
      { key: "voltage", label: "Điện áp", type: "checkbox", options: ["220V", "12V", "24V"] },
      { key: "lifespan", label: "Tuổi thọ", type: "checkbox", options: ["15000h", "20000h", "25000h", "30000h+"] }
    ]
  },
  {
    id: "den-led-am-tran",
    slug: "den-led-am-tran",
    name: "Đèn LED âm trần",
    description: "Đèn LED âm trần siêu mỏng, downlight, COB chống chói, phù hợp trần thạch cao và mọi không gian hiện đại.",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=450&fit=crop",
    icon: "lightbulb",
    order: 5,
    subcategories: [
      { id: "den-am-tran-sieu-mong", slug: "den-am-tran-sieu-mong", name: "Đèn âm trần siêu mỏng" },
      { id: "den-am-tran-downlight", slug: "den-am-tran-downlight", name: "Đèn âm trần downlight" },
      { id: "den-am-tran-cob", slug: "den-am-tran-cob", name: "Đèn âm trần COB" },
      { id: "den-am-tran-chong-choi", slug: "den-am-tran-chong-choi", name: "Đèn âm trần chống chói" },
      { id: "den-am-tran-doi-mau", slug: "den-am-tran-doi-mau", name: "Đèn âm trần đổi màu" },
      { id: "den-am-tran-chong-am", slug: "den-am-tran-chong-am", name: "Đèn âm trần chống ẩm" }
    ],
    filters: [
      { key: "brand", label: "Thương hiệu", type: "checkbox" },
      { key: "price", label: "Khoảng giá", type: "range" },
      { key: "power", label: "Công suất (W)", type: "checkbox", options: ["3-7", "7-12", "12-18", "18-24", "24+"] },
      { key: "cutoutSize", label: "Kích thước lỗ khoét", type: "checkbox", options: ["75mm", "90mm", "110mm", "150mm", "200mm"] },
      { key: "diameter", label: "Đường kính đèn", type: "checkbox", options: ["80-100mm", "100-120mm", "120-150mm", "150mm+"] },
      { key: "colorTemp", label: "Nhiệt độ màu", type: "checkbox", options: ["3000K", "4000K", "6500K", "Đổi màu"] },
      { key: "lightColor", label: "Ánh sáng", type: "checkbox", options: ["Trắng", "Vàng", "Trung tính"] },
      { key: "ledChip", label: "Loại chip LED", type: "checkbox", options: ["SMD", "COB", "Samsung", "Osram"] },
      { key: "beamAngle", label: "Góc chiếu", type: "checkbox", options: ["15-30°", "30-60°", "60-90°", "90-120°"] },
      { key: "cri", label: "Chỉ số CRI", type: "checkbox", options: ["CRI>80", "CRI>90", "CRI>95"] },
      { key: "waterproof", label: "Chống ẩm", type: "boolean" }
    ]
  },
  {
    id: "den-trang-tri",
    slug: "den-trang-tri",
    name: "Đèn trang trí",
    description: "Đèn thả trần, đèn chùm, đèn tường, đèn bàn và đèn cây mang phong cách hiện đại hoặc cổ điển cho không gian sống.",
    image: "https://images.unsplash.com/photo-1524484487851-1b3e6c0f8f5a?w=600&h=450&fit=crop",
    icon: "chandelier",
    order: 6,
    subcategories: [
      { id: "den-tha-tran", slug: "den-tha-tran", name: "Đèn thả trần" },
      { id: "den-chum", slug: "den-chum", name: "Đèn chùm" },
      { id: "den-tuong", slug: "den-tuong", name: "Đèn tường" },
      { id: "den-ban-trang-tri", slug: "den-ban-trang-tri", name: "Đèn bàn trang trí" },
      { id: "den-cay-dung", slug: "den-cay-dung", name: "Đèn cây đứng" },
      { id: "den-phong-khach", slug: "den-phong-khach", name: "Đèn trang trí phòng khách" },
      { id: "den-phong-ngu", slug: "den-phong-ngu", name: "Đèn trang trí phòng ngủ" },
      { id: "den-phong-an", slug: "den-phong-an", name: "Đèn trang trí phòng ăn" },
      { id: "den-hien-dai", slug: "den-hien-dai", name: "Đèn trang trí hiện đại" },
      { id: "den-co-dien", slug: "den-co-dien", name: "Đèn trang trí cổ điển" }
    ],
    filters: [
      { key: "brand", label: "Thương hiệu", type: "checkbox" },
      { key: "price", label: "Khoảng giá", type: "range" },
      { key: "style", label: "Phong cách", type: "checkbox", options: ["Hiện đại", "Cổ điển", "Tối giản", "Industrial", "Nordic"] },
      { key: "material", label: "Chất liệu", type: "checkbox", options: ["Kim loại", "Gỗ", "Thủy tinh", "Vải", "Nhựa"] },
      { key: "color", label: "Màu sắc", type: "checkbox", options: ["Đen", "Trắng", "Vàng đồng", "Gỗ tự nhiên", "Bạc"] },
      { key: "size", label: "Kích thước", type: "checkbox", options: ["Nhỏ", "Trung bình", "Lớn"] },
      { key: "bulbCount", label: "Số bóng", type: "checkbox", options: ["1", "2-3", "4-6", "7+"] },
      { key: "lightType", label: "Loại ánh sáng", type: "checkbox", options: ["LED", "E27", "E14"] },
      { key: "power", label: "Công suất", type: "checkbox", options: ["Dưới 20W", "20-40W", "40-60W", "60W+"] },
      { key: "space", label: "Không gian sử dụng", type: "checkbox", options: ["Phòng khách", "Phòng ngủ", "Phòng ăn", "Hành lang", "Bàn làm việc"] }
    ]
  },
  {
    id: "phu-kien",
    slug: "phu-kien",
    name: "Phụ kiện",
    description: "Điều khiển quạt, bộ nguồn LED, driver, dây đèn và linh kiện thay thế chính hãng.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=450&fit=crop",
    icon: "settings",
    order: 7,
    subcategories: [
      { id: "dieu-khien-quat", slug: "dieu-khien-quat", name: "Điều khiển quạt" },
      { id: "bo-dieu-khien", slug: "bo-dieu-khien", name: "Bộ điều khiển" },
      { id: "bo-nguon-led", slug: "bo-nguon-led", name: "Bộ nguồn LED" },
      { id: "driver-led", slug: "driver-led", name: "Driver LED" },
      { id: "day-den", slug: "day-den", name: "Dây đèn" },
      { id: "phu-kien-lap-dat", slug: "phu-kien-lap-dat", name: "Phụ kiện lắp đặt" },
      { id: "linh-kien-thay-the", slug: "linh-kien-thay-the", name: "Linh kiện thay thế" }
    ],
    filters: [
      { key: "brand", label: "Thương hiệu", type: "checkbox" },
      { key: "price", label: "Khoảng giá", type: "range" },
      { key: "type", label: "Loại phụ kiện", type: "checkbox", options: ["Điều khiển", "Nguồn/Driver", "Dây & Cáp", "Lắp đặt", "Linh kiện"] }
    ]
  }
];

// Export for use
if (typeof window !== 'undefined') {
  window.categories = categories;
}