# AEROLUX — Website Thương mại điện tử Quạt điện & Thiết bị chiếu sáng

Website frontend thuần HTML/CSS/JS bán quạt điện, đèn LED và thiết bị chiếu sáng gia đình.

## Công nghệ

- HTML5, CSS3 (Flexbox, Grid, Variables, Media Queries)
- JavaScript ES6+ thuần (không framework)
- localStorage cho giỏ hàng, wishlist, đánh giá demo
- Google Fonts (Inter)

## Cách chạy

Vì dùng script thường (không ES modules), có thể mở trực tiếp file HTML hoặc dùng local server:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .

# VS Code Live Server
```

Truy cập: http://localhost:8080

## Cấu trúc

```
/
├── index.html          # Trang chủ
├── category.html       # Danh mục + bộ lọc động
├── product.html        # Chi tiết sản phẩm
├── cart.html           # Giỏ hàng
├── checkout.html       # Thanh toán demo
├── search.html         # Tìm kiếm
├── wishlist.html       # Yêu thích
├── about.html, contact.html, policy.html, 404.html
├── assets/
│   ├── css/            # Design system
│   └── js/
│       ├── data/       # categories, products (60+), brands
│       ├── core/       # storage, utils, product-service, cart-service
│       ├── components/ # header, product-card, toast
│       └── pages/      # Logic từng trang
└── README.md
```

## Tính năng hoạt động (frontend)

| Tính năng | Trạng thái |
|-----------|------------|
| Duyệt danh mục & sản phẩm | ✅ |
| Bộ lọc động theo danh mục | ✅ |
| Tìm kiếm (có/không dấu) | ✅ |
| Chi tiết sản phẩm, variants | ✅ |
| Giỏ hàng (localStorage) | ✅ |
| Wishlist | ✅ |
| Mã giảm giá demo | ✅ |
| Checkout & tạo mã đơn demo | ✅ |
| Đánh giá demo (localStorage) | ✅ |
| Responsive | ✅ |
| Toast thông báo | ✅ |

## Cần backend (chưa có)

- Đăng nhập / tài khoản
- Thanh toán thật
- Đồng bộ đơn hàng, tồn kho
- Đánh giá dùng chung
- Admin quản lý sản phẩm
- API Laravel + MySQL

## Dữ liệu mẫu

- **62 sản phẩm** phân bố 7 danh mục
- Danh mục: Quạt trần, Quạt bàn, Quạt điện khác, Đèn LED, Đèn âm trần, Đèn trang trí, Phụ kiện
- Thương hiệu: Panasonic, Philips, AEROLUX, Sharp, Asia, Rạng Đông...

## Mã giảm giá demo

- `AEROLUX10` — giảm 10% (đơn ≥ 500k)
- `AEROLUX50K` — giảm 50.000đ (đơn ≥ 1tr)
- `FREESHIP` — miễn phí ship (đơn ≥ 300k)

## Mở rộng

Thêm danh mục/sản phẩm: chỉ cần bổ sung dữ liệu trong `assets/js/data/`. Bộ lọc và trang danh mục tự nhận cấu hình từ `categories.js`.

Thiết kế sẵn sàng tích hợp API: thay `ProductService` / `CartService` gọi endpoint thay vì dữ liệu local.
