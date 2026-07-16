# Gia phả (Family Tree)

Ứng dụng web hiển thị cây phả hệ, đọc dữ liệu từ các file Markdown (`.md`).
Mỗi thành viên là **một file** trong `data/members/`. App đọc toàn bộ file lúc
build và dựng cây tổ tiên (kiểu pedigree): đời cũ ở trên, con cháu ở dưới.

Stack: **React + Vite + TypeScript**. Phiên bản này **chỉ đọc** (read-only) và
build ra static site — deploy thẳng lên Netlify / Vercel / GitHub Pages.

## Chạy

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # xuất ra thư mục dist/ (static)
npm run preview  # xem thử bản build
```

## Định dạng file thành viên

Mỗi người là một file `data/members/<id>.md`. Phần đầu là YAML frontmatter,
phần dưới là tiểu sử viết bằng Markdown tự do.

```markdown
---
id: alice-butler-09101871        # trùng tên file; NÊN gắn ngày sinh để tránh trùng tên
name: Alice Butler
gender: female                   # male | female (dùng để tô màu viền)
birth: "1871-10-09"              # năm (1871) HOẶC ngày đầy đủ trong ngoặc kép
death: 1933                      # bỏ trống nếu còn sống
photo: ./photos/alice.jpg        # tuỳ chọn, đường dẫn ảnh
parents: [handel-stansfield, jane-doe]   # [id cha, id mẹ] — có thể để trống
spouses: [handel-stansfield]             # danh sách id vợ/chồng
---

## Tiểu sử
Nội dung Markdown tự do...
```

**Quy ước đặt `id`** — id là chuỗi tự do, chỉ cần **duy nhất**:
- Nên theo dạng `ten-ddmmyyyy`, ví dụ `alice-butler-09101871`, để **tránh trùng
  tên** khi có nhiều người cùng tên. Tên file `.md` chính là id.
- Mọi quan hệ (`parents`, `spouses`) trỏ tới id này, nên id đặt xong thì giữ ổn
  định (đổi id phải cập nhật tất cả nơi tham chiếu).

**Về ngày sinh/mất** (`birth`, `death`):
- Có thể ghi **chỉ năm** (`1871`) hoặc **ngày đầy đủ**. Nếu ghi ngày đầy đủ phải
  **để trong ngoặc kép**: `birth: "1871-10-09"` (không có ngoặc, YAML sẽ hiểu sai).
- Thẻ trên cây luôn hiển thị **năm**; panel chi tiết hiển thị **ngày đầy đủ** nếu có.

**Quan hệ nối bằng `id`**, không nhúng thông tin lồng nhau:
- `parents` của một người trỏ tới id của cha và mẹ.
- `spouses` trỏ tới id vợ/chồng (nên khai báo ở cả hai phía cho nhất quán).
- Quan hệ "con cái" được app **tự suy ra** từ `parents` của người khác.

## Cách app dựng cây

- Người gốc mặc định đặt trong `src/config.ts` (`DEFAULT_FOCUS_ID`).
- Mỗi ô là một **cặp vợ-chồng** (hoặc một người khi chưa biết bạn đời).
- Con của một ô là cặp cha-mẹ của từng người trong ô đó → tạo hình pedigree.
- Bấm vào bất kỳ ai để mở panel chi tiết; nút **"Đặt làm gốc cây"** vẽ lại cây
  quanh người đó. Ô tìm kiếm ở trên để nhảy nhanh tới một người.

## Cấu trúc thư mục

```
data/members/*.md        # dữ liệu — nguồn sự thật, mỗi người 1 file
src/config.ts            # người gốc mặc định
src/lib/loadMembers.ts   # đọc + parse frontmatter (build-time qua Vite glob)
src/lib/buildTree.ts     # dựng cây tổ tiên + tính toạ độ layout
src/components/          # FamilyTree, PersonMini, PersonDetail
```

## Ghi chú phiên bản sau

- v1 (hiện tại): chỉ đọc, dữ liệu build sẵn trong repo.
- Dự kiến: chỉnh sửa trong app, quản lý ảnh/media, và bản native.
