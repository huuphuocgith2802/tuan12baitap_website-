# BÁO CÁO KỸ THUẬT: CẤU TRÚC DỮ LIỆU & LOGIC XỬ LÝ (DATA LOGIC ARCHITECTURE)
## THÁCH THỨC TUẦN 12: "THE SMART CATALOG" — HỌC PHẦN THIẾT KẾ WEB (111101)
> **Trường Đại học Lạc Hồng (LHU) — Khoa Công Nghệ Thông Tin**  
> **Sinh viên thực hiện:** Huỳnh Hữu Phước  
> **Mã số sinh viên (MSSV):** 125000155  
> **Repository:** [`tuan12baitap_website-`](https://github.com/huuphuocgith2802/tuan12baitap_website-)  
> **Giáo trình tham chiếu:** Lạc Hồng · Trang 73  

---

## 📑 MỤC LỤC
1. [Triết lý thiết kế: Data + Logic = UI](#1-triết-lý-thiết-kế-data--logic--ui)
2. [Chi tiết Cấu trúc Object trong `data.js`](#2-chi-tiết-cấu-trúc-object-trong-datajs)
3. [Sơ đồ Luồng Dữ liệu (Data Flow Pipeline)](#3-sơ-đồ-luồng-dữ-liệu-data-flow-pipeline)
4. [Phân tích Thuật toán & Các Hàm Duyệt Mảng Nâng Cao](#4-phân-tích-thuật-toán--các-hàm-duyệt-mảng-nâng-cao)
   - [4.1. Hàm `filter()`: Bộ lọc đa chiều](#41-hàm-filter-bộ-lọc-đa-chiều)
   - [4.2. Hàm `map()`: Kiến trúc Render giao diện tự động](#42-hàm-map-kiến-trúc-render-giao-diện-tự-động)
   - [4.3. Hàm `sort()`: Động cơ sắp xếp với Comparator](#43-hàm-sort-động-cơ-sắp-xếp-với-comparator)
   - [4.4. Hàm `reduce()`: Tính toán lũy kế giỏ hàng & thống kê kho](#44-hàm-reduce-tính-toán-lũy-kế-giỏ-hàng--thống-kê-kho)
5. [Tính Bất biến (Immutability) & Trải nghiệm Người dùng (UX)](#5-tính-bất-biến-immutability--trải-nghiệm-người-dùng-ux)
6. [Định hướng Phát triển & Kết nối RESTful API / JSON](#6-định-hướng-phát-triển--kết-nối-restful-api--json)

---

## 1. TRIẾT LÝ THIẾT KẾ: DATA + LOGIC = UI

Trong phát triển Web hiện đại (Modern Web Development), việc viết mã HTML tĩnh (Hardcoded HTML) cho từng sản phẩm gây ra nhiều hạn chế nghiêm trọng:
- Khó mở rộng khi danh mục tăng lên hàng trăm/hàng nghìn sản phẩm.
- Không thể tìm kiếm, lọc hoặc sắp xếp trực tiếp theo thời gian thực mà không phải tải lại trang.
- Bất kỳ thay đổi nào về giao diện đều đòi hỏi phải sửa từng thẻ HTML thủ công.

Do đó, dự án **"The Smart Catalog"** áp dụng quy chuẩn phân tách rõ ràng:
$$\text{Dữ liệu (Data.js)} + \text{Thuật toán (smart\_catalog.js)} = \text{Giao diện (the\_smart\_catalog.html)}$$

- **Data (Tầng Dữ liệu):** Được định nghĩa tập trung trong `data.js` dưới dạng mảng các Object chuẩn JSON-ready.
- **Logic (Tầng Xử lý):** Quản lý trạng thái (`state`), xử lý chuỗi tìm kiếm, lọc nhiều điều kiện, sắp xếp, và tính tổng với Functional Programming methods.
- **UI (Tầng Giao diện):** Đóng vai trò là bản biểu diễn trực quan (view layer), nhận chuỗi HTML được sinh tự động từ `map()` và render vào DOM container.

---

## 2. CHI TIẾT CẤU TRÚC OBJECT TRONG `data.js`

Mỗi sản phẩm trong danh mục công nghệ TechZone được mô hình hóa thành một Object độc lập với cấu trúc phân cấp chi tiết:

```javascript
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
  image: "https://images.unsplash.com/...",
  inStock: true,
  isFeatured: true,
  badge: "BÁN CHẠY",
  description: "Khung viền titan chuẩn hàng không vũ trụ, chip Apple A17 Pro...",
  specs: {
    chip: "Apple A17 Pro (3nm)",
    ram: "8 GB",
    storage: "256 GB NVMe",
    battery: "4422 mAh (Sạc nhanh 20W)"
  }
}
```

### Bảng Giải Thích Ý Nghĩa & Kiểu Dữ Liệu Các Thuộc Tính:

| Thuộc tính | Kiểu dữ liệu | Ý nghĩa & Ứng dụng thực tế |
| :--- | :--- | :--- |
| `id` | `Number` | Mã định danh duy nhất (Primary Key), phục vụ thêm vào giỏ, xem chi tiết và xóa sản phẩm. |
| `name` | `String` | Tên đầy đủ của sản phẩm, mục tiêu chính cho thuật toán tìm kiếm thời gian thực. |
| `category` | `String` | Khóa phân loại chuẩn hóa slug (ví dụ: `smartphone`, `laptop`, `audio`, `accessory`). |
| `categoryName` | `String` | Tên danh mục hiển thị thân thiện với người dùng (tiếng Việt). |
| `price` | `Number` | Giá bán thực tế hiện tại (VNĐ), dùng để tính toán tổng giỏ hàng và lọc khoảng giá. |
| `originalPrice`| `Number` | Giá niêm yết ban đầu trước khi giảm giá (VNĐ), hiển thị gạch ngang (strike-through). |
| `discountPercent`| `Number` | Phần trăm giảm giá (%), dùng để tính huy hiệu SALE và lọc sản phẩm khuyến mãi. |
| `rating` | `Number` | Đánh giá sao trung bình (từ 1.0 đến 5.0), dùng để sắp xếp sản phẩm chất lượng cao. |
| `reviewsCount` | `Number` | Số lượng đánh giá thực tế của khách hàng, biểu thị mức độ phổ biến / bán chạy. |
| `image` | `String (URL)` | Đường dẫn hình ảnh chất lượng cao hiển thị trên card sản phẩm và modal chi tiết. |
| `inStock` | `Boolean` | Trạng thái còn hàng (`true`) hoặc hết hàng (`false`), kiểm soát việc vô hiệu hóa nút mua. |
| `isFeatured` | `Boolean` | Đánh dấu sản phẩm nổi bật để ưu tiên hiển thị ở vị trí đầu tiên. |
| `badge` | `String` | Nhãn nổi bật tùy biến (`"HOT"`, `"GALAXY AI"`, `"GIẢM 19%"`). |
| `description` | `String` | Đoạn văn bản tóm tắt tính năng chính, hiển thị trong Quick View Modal. |
| `specs` | `Object` | Object lồng nhau (Nested Object) chứa các thông số kỹ thuật phần cứng (`chip`, `ram`, `storage`, `battery`). |

---

## 3. SƠ ĐỒ LUỒNG DỮ LIỆU (DATA FLOW PIPELINE)

Quy trình dữ liệu di chuyển từ nguồn dữ liệu thô, qua chuỗi các hàm biến đổi logic, cho đến khi xuất hiện trên DOM được mô tả theo sơ đồ sau:

```
[Mảng 16 Objects ban đầu (data.js)]
                 │
                 ▼
 [Hàm filter: Từ khóa tìm kiếm (searchKeyword)]
                 │
                 ▼
 [Hàm filter: Danh mục sản phẩm (selectedCategory)]
                 │
                 ▼
 [Hàm filter: Khoảng giá người dùng chọn (priceBracket)]
                 │
                 ▼
 [Hàm filter: Lọc chỉ sản phẩm giảm giá (onlySale)]
                 │
                 ▼
 [Hàm sort: Sắp xếp theo giá / tên / đánh giá / nổi bật]
                 │
                 ▼
 [Hàm map: Chuyển đổi Object thành HTML Card Template String]
                 │
                 ▼
 [container.innerHTML = cardsHtml.join('')]
                 │
                 ▼
  [Giao diện Web hiển thị sống động trên màn hình]
```

---

## 4. PHÂN TÍCH THUẬT TOÁN & CÁC HÀM DUYỆT MẢNG NÂNG CAO

### 4.1. Hàm `filter()`: Bộ lọc đa chiều

Hàm `filter()` nhận một callback function trả về giá trị `true`/`false`. Một mảng mới được sinh ra chỉ chứa các phần tử thỏa mãn điều kiện, hoàn toàn **không làm biến đổi mảng ban đầu**.

Trong dự án `smart_catalog.js`, hàm `filter()` được áp dụng theo phương pháp dây chuyền (chaining):

```javascript
// 1. Lọc theo từ khóa tìm kiếm (Tên, mô tả, danh mục)
let result = productsData.filter(product => {
  if (!state.searchKeyword) return true;
  const nameMatch = product.name.toLowerCase().includes(state.searchKeyword);
  const descMatch = product.description.toLowerCase().includes(state.searchKeyword);
  return nameMatch || descMatch;
});

// 2. Lọc theo danh mục
if (state.selectedCategory !== 'all') {
  result = result.filter(product => product.category === state.selectedCategory);
}

// 3. Lọc theo khoảng giá
if (state.priceBracket === 'under5m') {
  result = result.filter(p => p.price < 5000000);
}
```

### 4.2. Hàm `map()`: Kiến trúc Render giao diện tự động

Hàm `map()` biến đổi từng phần tử trong mảng thành một phần tử mới với tỷ lệ 1-1. Trong thiết kế giao diện, `map()` chuyển đổi từng Object dữ liệu thành chuỗi HTML Template Literal:

```javascript
const cardsHtml = items.map(product => `
  <div class="product-card" data-id="${product.id}">
    <img src="${product.image}" alt="${product.name}" class="product-img">
    <h4>${product.name}</h4>
    <span>${formatVND(product.price)}</span>
    <button onclick="addToCart(${product.id})">Thêm vào giỏ</button>
  </div>
`).join('');

DOM.catalogGrid.innerHTML = cardsHtml;
```
*Ưu điểm:* Cực kỳ nhanh, chỉ thao tác ghi vào DOM một lần duy nhất với `join('')`, hạn chế tối đa hiện tượng Reflow/Repaint của trình duyệt.

### 4.3. Hàm `sort()`: Động cơ sắp xếp với Comparator

Hàm `sort()` nhận vào một hàm so sánh `(a, b)`:
- Sắp xếp giá tăng dần (Thấp đến Cao): `a.price - b.price`
- Sắp xếp giá giảm dần (Cao đến Thấp): `b.price - a.price`
- Sắp xếp tên tiếng Việt A-Z: `a.name.localeCompare(b.name, 'vi')`

> **Lưu ý kỹ thuật:** Vì `sort()` mặc định làm thay đổi trực tiếp mảng (mutate), dự án luôn tạo một bản sao bằng cú pháp Spread Operator `[...result].sort(...)` để đảm bảo an toàn dữ liệu.

### 4.4. Hàm `reduce()`: Tính toán lũy kế giỏ hàng & thống kê kho

Hàm `reduce()` duyệt qua mảng và gom toàn bộ dữ liệu về một giá trị duy nhất (Accumulator):

```javascript
// Tính tổng tiền giỏ hàng (Số lượng * Đơn giá từng món)
const tongTien = state.cart.reduce((accumulator, item) => {
  return accumulator + (item.price * item.quantity);
}, 0);

// Tính tổng giá trị toàn bộ kho hàng
const tongGiaTriKho = productsData.reduce((total, p) => total + p.price, 0);
```

---

## 5. TÍNH BẤT BIẾN (IMMUTABILITY) & TRẢI NGHIỆM NGƯỜI DÙNG (UX)

Dự án áp dụng chặt chẽ các nguyên tắc:
1. **Highlight từ khóa tìm kiếm:** Chuỗi ký tự khớp với ô tìm kiếm được tự động bọc trong thẻ `<mark>` giúp người dùng dễ dàng nhận diện lý do sản phẩm xuất hiện trong kết quả.
2. **Debounce & Instant Feedback:** Kết quả lọc hiển thị ngay lập tức khi người dùng nhập từng ký tự, kèm theo nhãn đếm số lượng sản phẩm khớp (`matchCount`).
3. **Empty State Thân thiện:** Khi không có sản phẩm nào khớp, giao diện hiển thị thông báo trực quan cùng nút bấm "Đặt lại bộ lọc" để người dùng tiếp tục thao tác.

---

## 6. ĐỊNH HƯỚNG PHÁT TRIỂN & KẾT NỐI RESTFUL API / JSON

Cấu trúc `data.js` hiện tại tuân thủ 100% định dạng JSON chuẩn. Trong các tuần học tiếp theo (khi làm việc với Backend hoặc API của bên thứ ba), chỉ cần thay thế việc nạp biến bằng hàm `fetch()`:

```javascript
// Tương lai kết nối API thực tế:
async function loadProductsFromAPI() {
  try {
    const response = await fetch('https://api.techzone.vn/v1/products');
    const data = await response.json();
    productsData = data;
    applyFiltersAndRender();
  } catch (error) {
    console.error("Lỗi khi nạp dữ liệu từ máy chủ:", error);
  }
}
```

Toàn bộ logic xử lý `filter()`, `map()`, `sort()`, `reduce()` đã được hoàn thiện sẽ hoạt động nguyên vẹn mà không cần thay đổi bất kỳ dòng mã nào!
