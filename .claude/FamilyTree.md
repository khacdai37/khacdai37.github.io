# Overview
Đây những mô tả về app Gia phả

## Mô hình dữ liệu

Frontmatter `.md` (parse ở `lib/familyGraph.ts` — `buildFamilyGraph`, dùng chung
cho server lẫn client) được ánh xạ sang `Person` + `Relationship[]`:

- Thuộc tính người: `id`, `name`, `gender`, `birth`, `death`, `death_lunar`,
  `birth_order`, `in_law`, `deceased`, `other_names`, `avatar`, `note`.
- Quan hệ: `parents: [idCha, idMẹ]` → cạnh `biological_child`; `spouses: [...]` →
  cạnh `marriage`; `adopted_parents` → `adopted_child`. "Con/cháu/danh xưng" được
  **suy ra** từ các cạnh này (không lưu ngược).
- `is_deceased` suy ra từ có `death`/`death_lunar` nếu không khai `deceased`.
- **`generation` (đời) KHÔNG lưu trong `.md`** — tính động ở `utils/generationHelpers.ts`
  (`computeGenerationMap`): gốc = đời 1, con = +1 đời, vợ/chồng cùng đời. `familyData.ts`
  gán "đời tuyệt đối" từ thủy tổ (dùng cho thống kê / danh xưng / trang chi tiết); trang
  cây tính lại "đời tương đối" theo **gốc hiển thị** đang chọn (đổi gốc → đổi đời).

  ## Quy ước
  
  - **`about.md` (trang Giới thiệu)**: tệp `.zip` có cấu trúc `data/members/*.md` +
  `data/about.md` (file `.md` để phẳng ở gốc vẫn đọc được). `membersZip.ts` tách
  `about.md` **ra khỏi** danh sách thành viên (nhận diện: basename `about.md` và
  **không** nằm trong thư mục `members/`) — nếu lọt vào `buildFamilyGraph` nó sẽ
  thành "thành viên ma". Vì vậy `about` lưu ở **META_STORE** (key `"about"`), không
  vào `FILES_STORE` (store đó đi thẳng vào `buildFamilyGraph`). **Không có** file nền
  `data/about.md` — nội dung chỉ đến từ `.zip`. Render bằng `components/MarkdownContent`
  (`react-markdown`, **cố ý bỏ qua raw HTML** vì `.zip` có thể do người khác gửi);
  style ở `.markdown-body` trong `globals.css` (dự án không dùng plugin typography).
  - **YAML & ngày**: ngày đầy đủ trong `birth`/`death` phải **để trong ngoặc kép**
  (`"1990-10-09"`) kẻo YAML hiểu thành kiểu Date.
- **Cache dữ liệu**: `getFamilyData()` cache trong tiến trình. Thêm/sửa `.md` khi
  đang chạy `dev` cần **restart dev** (hoặc `build`) để thấy thay đổi.
- **Read-only (server)**: app không ghi lên máy chủ. Trang **Tạo thành viên mới**
  (`/apps/family-tree/add`) chạy client, sinh `.md` và **tải về `.zip`** (`<id>.md`,
  zip tên `yyyyMMddhhmmss.zip`).
- **Nạp dữ liệu runtime từ tệp `.zip`**: `context/FamilyDataProvider` bọc ở
  **`app/apps/family-tree/layout.tsx`** — tức chỉ subtree gia phả, để trang
  portfolio không phải tải bundle dữ liệu. Đây là nguồn `persons/relationships/about`
  cho mọi trang gia phả — các component đọc qua `useFamilyData()` (không nhận qua props).
  Nút **"Thêm thành viên"** ở **Bảng điều khiển** (`DashboardLaunchpad`) đọc tệp `.zip`
  cục bộ (không lên mạng) → giải nén → **merge đè theo tên** lên dữ liệu nền → cache
  **IndexedDB** (`lib/memberStore.ts`); có nút **"Xoá"** về nền. Khi **chưa có dữ liệu**
  (`persons.length === 0`) launchpad chỉ hiện "Thêm thành viên" + "Giới thiệu"; các mục
  khác (cây, danh xưng, thống kê, tạo mới) hiện sau khi đã có dữ liệu. Không có
  URL/cloud/CORS: chia sẻ = gửi tệp `.zip` cho nhóm. Dữ liệu thật **không nên commit**
  vào `data/members` nếu muốn giữ riêng tư (Pages là công khai) — để trống thì launchpad
  vào đúng luồng "Thêm thành viên trước".