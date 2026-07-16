# Gia phả (bản Markdown, chỉ-đọc)

Ứng dụng web xem gia phả dòng họ. Mỗi thành viên là **một file `.md`** trong
`data/members/`; app đọc toàn bộ lúc build và dựng sơ đồ cây, tra danh xưng và
thống kê. Không cần đăng nhập, không cần database — build ra **static site** và
deploy thẳng lên GitHub Pages.

Giao diện cây, engine tra danh xưng và thống kê kế thừa từ một dự án gia phả
mã nguồn mở (giấy phép MIT), nhưng đã **thay nguồn dữ liệu bằng file `.md`** và
**bỏ toàn bộ phần đăng ký/đăng nhập/chỉnh sửa/cơ sở dữ liệu**.

## Tính năng

- **Cây gia phả**: sơ đồ dòng họ tương tác (pan/zoom, đổi gốc, xem chi tiết).
- **Tra cứu danh xưng**: tự tính cách gọi (con, mẹ, bác, chú, cô, dì…) giữa 2 người.
- **Thống kê**: số thành viên, giới tính, kết hôn, đã mất…
- **Chi tiết thành viên**: ngày sinh/mất (kèm can chi, âm lịch), hưởng thọ, ghi chú.
- **Thêm thành viên**: nhập thông tin nhiều người rồi tải về file `.md`
  (đóng gói `.zip`) để chép vào `data/members/` — xem mục bên dưới.

Trừ mục "Thêm thành viên", toàn bộ app là **chỉ-đọc** (không sửa dữ liệu trực
tiếp trong app, không đăng nhập, không database).

## Chạy trên máy

Yêu cầu **Node.js ≥ 20**.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # xuất static site vào thư mục out/
```

## Định dạng file thành viên

Mỗi người là một file `data/members/<id>.md`:

```markdown
---
id: alice-butler-09101871     # trùng tên file, duy nhất; nên gắn ngày sinh
name: Alice Butler
gender: female                # male | female | other
birth: "1871-10-09"           # chỉ năm (1871) hoặc ngày đầy đủ (để trong ngoặc kép)
death: 1933                   # bỏ trống nếu còn sống
death_lunar: "1933-08-15"     # (tuỳ chọn) ngày giỗ âm lịch
birth_order: 1                # (tuỳ chọn) thứ tự sinh trong nhánh
in_law: true                  # (tuỳ chọn) là dâu/rể (kết hôn vào dòng họ)
other_names: "Tên gọi khác"   # (tuỳ chọn)
avatar: /avatars/alice.jpg    # (tuỳ chọn)
parents: [handel-stansfield]  # id cha/mẹ ruột -> quan hệ cha-con
spouses: [handel-stansfield]  # id vợ/chồng -> quan hệ hôn nhân
adopted_parents: []           # (tuỳ chọn) id cha/mẹ nuôi
---

## Tiểu sử
Nội dung Markdown tự do (hiển thị ở phần ghi chú).
```

Quan hệ nối bằng `id`; "con cái", "cháu" được app tự suy ra từ `parents` của
người khác. Ngày đầy đủ trong `birth`/`death` **phải để trong ngoặc kép** để
YAML không hiểu nhầm.

## Tạo thành viên mới (tạo file `.md`)

Trang **Bảng điều khiển → Tạo thành viên mới** (`/apps/family-tree/add`) là một form chạy
hoàn toàn ở trình duyệt. Vì app là static (không có máy chủ ghi file), form
**không tự lưu** mà **sinh ra các file `.md` và tải về dạng `.zip`**; bạn giải
nén, chép vào `data/members/`, rồi build lại / commit để cây cập nhật.

Đặc điểm form (theo yêu cầu):

- **Tạo nhiều thành viên một lúc** (thêm/xoá từng khối); mỗi người thành một
  file `<id>.md`. Zip đặt tên theo dấu thời gian `yyyyMMddhhmmss.zip`.
- **`id` tự sinh** từ Họ tên + Ngày sinh (dạng `ten-ddmmyyyy`, ví dụ
  `nguyen-khac-dai-1990`) và **chỉ hiển thị** (không sửa tay).
- Các trường: họ tên, tên gọi khác, giới tính, ngày sinh/mất (ô text: năm hoặc
  `yyyy-mm-dd`), thứ tự sinh, dâu/rể, ghi chú, và **avatar chỉ nhập URL**.
- Liên kết **Cha / Mẹ / Vợ-Chồng** bằng ô nhập id có **gợi ý dropdown** (gồm cả
  người đã có lẫn các thành viên khác đang tạo cùng lô).
- **Trạng thái "đã mất" suy ra từ ngày mất** (không có checkbox riêng); nếu ngày
  mất là ngày dương đầy đủ, tự tính kèm ngày giỗ âm lịch (`death_lunar`).
- Trường **"đời thứ" (`generation`) KHÔNG lưu trong file** — app tự tính theo
  **gốc hiển thị** đang chọn (đổi gốc → đổi đời), xem `utils/generationHelpers.ts`.

## Nạp dữ liệu từ tệp `.zip` (không cần build lại)

Ngoài dữ liệu nền build sẵn trong `data/members/`, có thể **xem dữ liệu riêng mà
không công khai** bằng cách nạp trực tiếp một tệp `.zip` ngay trên trình duyệt:

- Vào **Bảng điều khiển** → bấm **"Thêm thành viên"**, chọn tệp do trang **Tạo thành
  viên mới** xuất ra. Tệp được đọc **cục bộ** (không tải lên mạng), giải nén và **ghi
  đè theo tên file** lên dữ liệu nền; áp cho cả cây / thống kê / danh xưng / chi tiết.
- Cấu trúc tệp `.zip` (file `.md` để phẳng ở gốc vẫn đọc được):

  ```
  data/
    members/*.md   # mỗi thành viên một file
    about.md       # (tuỳ chọn) nội dung trang Giới thiệu — xem mục dưới
  ```
- Khi **chưa có dữ liệu**, Bảng điều khiển chỉ hiện nút **"Thêm thành viên"** (và
  "Giới thiệu"); các mục còn lại xuất hiện **sau khi đã nạp** dữ liệu.
- Kết quả **lưu vào IndexedDB** của trình duyệt → lần sau vào **không phải chọn lại**
  (đặc biệt tiện trên điện thoại). Bấm **"Xoá"** để quay về dữ liệu nền.
- **Chia sẻ cho một nhóm** = gửi tệp `.zip` (Zalo/email…) cho người trong họ; không
  cần host/đăng nhập. Đổi lại, dữ liệu **không mã hoá** — ai có tệp thì xem được.
- Muốn giữ riêng tư: **đừng commit dữ liệu thật** vào `data/members/` (GitHub Pages
  là công khai). Mặc định `data/members/` **để trống** (chỉ `.gitkeep`) nên site vào
  đúng trạng thái "Thêm thành viên trước"; bộ **51 thành viên mẫu** nằm ở
  `demo-data/members/` (không build) và `demo-data/<stamp>.zip` (nạp thử). Nếu
  muốn có dữ liệu nền công khai thì đổ `.md` vào `data/members/`.
- Giới hạn: deep-link `/apps/family-tree/members/<id>` chỉ có sẵn cho thành viên **build
  sẵn**; thành viên chỉ-trong-tệp xem qua cửa sổ chi tiết (modal) trên trang cây.

## Giới thiệu dòng họ (`about.md`)

Đặt file `about.md` **ngang hàng** thư mục `members/` trong tệp `.zip` (xem cấu trúc
ở trên). Nội dung sẽ hiện thành mục **"Về dòng họ"** ở đầu trang **Giới thiệu** —
tiện để ghi nguồn gốc dòng họ, địa chỉ nhà thờ họ, ngày giỗ tổ, email/link liên hệ…

- **Markdown thuần**, không cần frontmatter: tiêu đề, đoạn văn, danh sách, **bảng**,
  trích dẫn, link, email (`[tên](mailto:a@b.com)`) đều dùng được. Link ra ngoài tự
  mở tab mới.
- File mẫu: `demo-data/about.md` (đóng sẵn trong zip mẫu).
- Cũng **lưu vào IndexedDB** như file thành viên; bấm **"Xoá"** ở Bảng điều khiển là
  mất luôn. Nạp tệp `.zip` **không có** `about.md` thì nội dung cũ được **giữ nguyên**.
- Thẻ HTML thô trong `about.md` bị **bỏ qua** có chủ đích (tệp `.zip` có thể do người
  khác gửi) — chỉ cú pháp Markdown được render.
- Không nạp tệp nào thì trang Giới thiệu chỉ hiện phần giới thiệu ứng dụng như cũ.

## Cấu trúc

```
data/members/*.md     # DỮ LIỆU NỀN (bundle) — mặc định rỗng (.gitkeep)
demo-data/            # 51 thành viên mẫu (members/*.md) + about.md + zip mẫu
                      #   (KHÔNG build, bị .gitignore — chỉ để tham chiếu/nạp thử)
lib/familyGraph.ts    # buildFamilyGraph(files) — parse .md (dùng chung server/client)
lib/familyData.ts     # (server) đọc .md bằng fs -> buildFamilyGraph lúc build
lib/memberStore.ts    # (client) cache IndexedDB cho dữ liệu nạp từ .zip (kể cả about.md)
lib/membersZip.ts     # (client) đọc & giải nén tệp .zip chọn từ máy -> members + about
lib/memberMarkdown.ts # form "Tạo thành viên mới" -> nội dung .md (client)
lib/asset.ts          # prefix basePath cho ảnh (hiện rỗng → no-op)
lib/routes.ts         # mọi đường dẫn nội bộ
lib/portfolio.ts      # dữ liệu portfolio (profile, skills, experience, apps)
app/                  # portfolio ở "/" + "/apps"; app gia phả ở "/apps/family-tree/*"
components/portfolio/ # UI portfolio (sidebar, hero, app card, contact…)
components/, utils/    # UI + logic gia phả (cây d3, kinshipHelpers, dateHelpers…)
context/FamilyDataProvider.tsx # nguồn persons/relationships runtime (client)
legacy/               # app Vite đơn giản ở bản trước (giữ để tham khảo)
```

Chi tiết cấu trúc & quy ước: xem [CLAUDE.md](.claude/CLAUDE.md).

## Deploy

Push lên nhánh `main` → GitHub Actions build static export và deploy lên
GitHub Pages (`.github/workflows/deploy.yml`). Repo là **user site** nên site
chạy ở root: `https://khacdai37.github.io/` — portfolio ở `/`, app gia phả ở
`/apps/family-tree/`. Không dùng `basePath`.

## Giấy phép

Một phần mã nguồn kế thừa từ một dự án gia phả mã nguồn mở theo giấy phép **MIT**.
