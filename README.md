# TUẦN 12: QUẢN LÝ DỮ LIỆU VỚI MẢNG NÂNG CAO & ĐỐI TƯỢNG (DATA MANAGEMENT)
### HỌC PHẦN 111101 · THIẾT KẾ WEB — ĐẠI HỌC LẠC HỒNG (LHU)
> **Giáo trình giảng dạy:** Lạc Hồng · Trang 73  
> **Sinh viên thực hiện:** Huỳnh Hữu Phước  
> **Mã số sinh viên (MSSV):** 125000155  
> **Email sinh viên:** [125000155@lachong.edu.vn](mailto:125000155@lachong.edu.vn)  
> **GitHub Username:** [huuphuocgith2802](https://github.com/huuphuocgith2802)  
> **Tên Repository:** [`tuan12baitap_website-`](https://github.com/huuphuocgith2802/tuan12baitap_website-)  
> **Link GitHub Repo:** [https://github.com/huuphuocgith2802/tuan12baitap_website-](https://github.com/huuphuocgith2802/tuan12baitap_website-)  

---

## 📌 GIỚI THIỆU DỰ ÁN

Dự án này là sản phẩm thực hành hoàn chỉnh của **Tuần 12: Quản lý Dữ liệu với Mảng Nâng cao & Đối tượng** trong chương trình đào tạo ngành Công nghệ Thông tin tại Trường Đại học Lạc Hồng. 

Dự án hiện thực hóa triết lý phát triển web cốt lõi:
$$\text{Data (Dữ liệu)} + \text{Logic (JavaScript)} = \text{Giao diện (UI)}$$

Tất cả các thành phần giao diện không còn bị hardcode thủ công trong HTML mà được sinh ra và điều khiển hoàn toàn tự động từ nguồn dữ liệu tập trung thông qua các hàm duyệt mảng hiện đại ES6+ (`map`, `filter`, `sort`, `reduce`, `forEach`).

---

## 🎯 CÁC CHUẨN ĐẦU RA BÀI HỌC ĐÃ ĐẠT ĐƯỢC (LLO)

- ✅ **LLO 3.5.1:** Khai báo và truy xuất dữ liệu từ Object (Đối tượng) thành thạo; xây dựng phương thức nội tại (method) sử dụng từ khóa `this` để tự tính năm sinh và in lời giới thiệu.
- ✅ **LLO 3.5.2:** Sử dụng hàm `filter()` để lọc danh sách dữ liệu đa chiều (theo từ khóa, giá, trạng thái giảm giá) và hàm `map()` để hiển thị danh sách ra giao diện HTML.
- ✅ **LLO 3.5.3:** Kết hợp kiến thức Tuần 10 (DOM) để tự động đổ dữ liệu từ một mảng Object lên trang web, tách biệt hoàn toàn dữ liệu khỏi cấu trúc HTML.
- ✅ **LLO 3.5.4:** Sử dụng Prompt AI để xây dựng cấu trúc dữ liệu JSON mẫu chuẩn hóa cho chủ đề thương mại điện tử công nghệ và tối ưu thuật toán Functional Programming.

---

## 📁 CẤU TRÚC THƯ MỤC DỰ ÁN

```
tuan12baitap_website/
├── index.html                  # Master Dashboard: Điều hướng toàn bộ bài tập & xem nhanh
├── data_logic.md               # Tài liệu báo cáo kỹ thuật phân tích cấu trúc Object & Logic
├── README.md                   # Báo cáo tổng kết dự án & hướng dẫn chạy
│
├── assets/
│   ├── css/
│   │   └── style.css           # Toàn bộ CSS phong cách Modern UI, Toast, animations, modals
│   └── js/
│       └── main.js             # Logic dùng chung: Toast, copy clipboard, định dạng VNĐ, console logger
│
├── in-class/                   # 3 Hoạt động thực hành trên lớp (In-Class Activities - 105 phút)
│   ├── hoatdong1.html          # HĐ 1: "Object Identity" - Khai báo Object, tính năm sinh & giới thiệu
│   ├── hoatdong2.html          # HĐ 2: "The Product Filter" - Bộ lọc 10 sản phẩm (filter, map)
│   └── hoatdong3.html          # HĐ 3: "Dynamic UI Render" - Đổ dữ liệu tự động (map vs forEach)
│
├── homework/                   # 6 Bài tập tự rèn luyện tại nhà (Homework)
│   ├── bai1.html               # Bài 1: Danh bạ điện thoại (Tìm kiếm tên và số điện thoại)
│   ├── bai2.html               # Bài 2: Tính tổng giỏ hàng (Hàm reduce & thay đổi số lượng real-time)
│   ├── bai3.html               # Bài 3: Sắp xếp danh sách (Hàm sort giá tăng dần, giảm dần, tên A-Z)
│   ├── bai4.html               # Bài 4: Quản lý sinh viên (Hàm gán thuộc tính ketQua "Đậu"/"Rớt")
│   ├── bai5.html               # Bài 5: Biến đổi mảng (Hàm map chuyển chuỗi thành mảng thẻ <li>)
│   └── bai6.html               # Bài 6: Xóa phần tử (Nút Xóa sản phẩm và cập nhật DOM với filter)
│
└── challenge/                  # 🎯 THÁCH THỨC TUẦN 12: "THE SMART CATALOG" (NHÓM)
    ├── the_smart_catalog.html  # Giao diện Catalog thông minh (Search, Filter, Sort, Cart, Modal)
    ├── data.js                 # File dữ liệu trung tâm chứa 16 Object sản phẩm công nghệ TechZone
    └── smart_catalog.js        # Logic xử lý tìm kiếm real-time, bộ lọc đa tầng, giỏ hàng reduce()
```

---

## 🚀 CHI TIẾT CÁC PHẦN NỘI DUNG

### 1. Hoạt động trên lớp (In-class Activities)
1. **Hoạt động 1: "Object Identity" (`in-class/hoatdong1.html`)**
   - Khởi tạo Object `user` gồm: `ten`, `tuoi`, `chuyenNganh`, `kyNang`.
   - Vibe Coding: Thêm phương thức `tinhNamSinh()` sử dụng `new Date().getFullYear() - this.tuoi` và `gioiThieu()`.
   - Hộp giả lập Console trực tiếp trên giao diện và in đồng thời ra F12 DevTools.
2. **Hoạt động 2: "The Product Filter" (`in-class/hoatdong2.html`)**
   - Mảng 10 sản phẩm công nghệ có trạng thái `onSale`, giá gốc và giá bán.
   - Nút chạy prompt mẫu: Lọc sản phẩm có giá lớn hơn 1 triệu và `map()` in danh sách tên ra màn hình.
   - Các nút lọc: Tất cả, Đang giảm giá, Giá > 1 triệu, Giá < 500k.
3. **Hoạt động 3: "Dynamic UI Render" (`in-class/hoatdong3.html`)**
   - Đổ danh sách khóa học công nghệ từ mảng Object ra giao diện.
   - So sánh trực quan thời gian thực thi (execution time) giữa 2 phương pháp: `map().join('') + innerHTML` và `forEach() + createElement()`.
   - Form thêm mới khóa học để chứng minh dữ liệu thay đổi thì giao diện tự động render lại.

### 2. 6 Bài tập tự rèn luyện tại nhà (Homework)
- **Bài 1 - Danh bạ điện thoại (`homework/bai1.html`):** Tìm kiếm liên hệ theo tên bằng `filter()` kết hợp `toLowerCase()`, thêm mới liên hệ và sao chép số điện thoại nhanh.
- **Bài 2 - Tính tổng giỏ hàng (`homework/bai2.html`):** Sử dụng `reduce()` để tính lũy kế tiền hàng $\sum (\text{giá} \times \text{số lượng})$, tính thuế VAT 8%, mã giảm giá `LACHONG10` (-10%) và nút tăng giảm số lượng.
- **Bài 3 - Sắp xếp danh sách (`homework/bai3.html`):** Sử dụng `[...products].sort()` với comparator function để sắp xếp giá từ thấp đến cao, cao đến thấp, và tên A-Z với `localeCompare('vi')`.
- **Bài 4 - Quản lý sinh viên (`homework/bai4.html`):** Hàm kiểm tra điểm: nếu `diemSo >= 5` thì gán thêm thuộc tính `ketQua: "Đậu"`, ngược lại `ketQua: "Rớt"`, kèm bảng thống kê tỷ lệ đậu và điểm trung bình bằng `reduce()`.
- **Bài 5 - Biến đổi mảng (`homework/bai5.html`):** Sử dụng `map()` để biến một mảng tên thành mảng các thẻ `<li>Tên</li>`, hiển thị trực quan 3 bước của pipeline.
- **Bài 6 - Xóa phần tử (`homework/bai6.html`):** Bấm nút "Xóa" cạnh sản phẩm để loại bỏ khỏi mảng bằng `filter(item => item.id !== idCanXoa)` kèm tính năng Hoàn tác (Undo).

### 3. Thách thức Tuần 12: "The Smart Catalog" (`challenge/`)
- **`data.js`:** Quản lý tập trung 16 sản phẩm công nghệ cao cấp (iPhone 15 Pro Max, Galaxy S24 Ultra, MacBook Pro M3, ROG Zephyrus, Sony WH-1000XM5,...).
- **`the_smart_catalog.html` & `smart_catalog.js`:**
  - Tự động hiển thị toàn bộ 16 sản phẩm lên trang chủ.
  - Ô tìm kiếm thời gian thực (Live Search) tự động lọc theo tên, mô tả và highlight từ khóa khớp.
  - Tab lọc danh mục: Điện thoại, Laptop, Âm thanh, Phụ kiện.
  - Lọc theo khoảng giá (Dưới 5tr, 5-15tr, 15-30tr, trên 30tr) và chỉ xem hàng giảm giá.
  - Drawer giỏ hàng mini tính tổng tiền bằng `reduce()`.
  - Quick View Modal xem chi tiết thông số kỹ thuật phần cứng (`specs`).
- **`data_logic.md`:** Báo cáo chi tiết về cấu trúc dữ liệu, sơ đồ luồng dữ liệu (Data Flow Pipeline) và phân tích các hàm duyệt mảng.

---

## 🛠 HƯỚNG DẪN CÀI ĐẶT & CHẠY DỰ ÁN

1. **Clone repository về máy tính:**
   ```bash
   git clone https://github.com/huuphuocgith2802/tuan12baitap_website-.git
   cd tuan12baitap_website-
   ```

2. **Chạy ứng dụng:**
   - **Cách 1 (Đơn giản nhất):** Mở trực tiếp file `index.html` bằng bất kỳ trình duyệt web nào (Chrome, Edge, Firefox).
   - **Cách 2 (Khuyên dùng):** Cài extension **Live Server** trong VS Code, click chuột phải vào `index.html` và chọn **Open with Live Server** (cổng mặc định `http://127.0.0.1:5500`).

---

## 👨‍💻 THÔNG TIN TÁC GIẢ
- **Sinh viên:** Huỳnh Hữu Phước
- **MSSV:** 125000155
- **Lớp / Khóa:** Đại học Lạc Hồng (LHU) — Khoa Công Nghệ Thông Tin
- **GitHub:** [https://github.com/huuphuocgith2802](https://github.com/huuphuocgith2802)
- **Email:** [125000155@lachong.edu.vn](mailto:125000155@lachong.edu.vn)
