# CLAUDE.md

Hướng dẫn cấu trúc & quy ước cho dự án này (dành cho Claude Code và người mới).

## Tổng quan

Repo này chứa **hai thứ**, cùng một static export:

1. **Portfolio cá nhân** (tiếng Anh) ở root `/` — hero, about, kỹ năng, kinh
   nghiệm, danh sách apps, liên hệ. Deploy tại `khacdai37.github.io` (user site,
   **không** có basePath).
2. **Ứng dụng gia phả** (tiếng Việt) ở `/apps/family-tree/` — một mục trong
   category apps của portfolio. Dữ liệu là các file **Markdown** trong
   `data/members/`; đọc `.md` lúc build để dựng cây gia phả (d3), tra cứu danh
   xưng, thống kê, trang chi tiết.

**Không có backend, không database, không đăng nhập.**

> ⚠️ Kinh nghiệm trong `lib/portfolio.ts` **cố ý ẩn danh**: chỉ vai trò + tech,
> **không** nêu tên công ty hay tên dự án. Giữ nguyên quy ước này khi cập nhật.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **d3** (bố cục cây), **framer-motion** (hiệu ứng)
- **lunar-javascript** (ngày âm lịch / can chi), **js-yaml** (parse frontmatter)
- **react-markdown** + **remark-gfm** (render `about.md`)
- **jszip** (đóng gói .md khi "Thêm thành viên"), **jspdf** + **html-to-image**
  (xuất ảnh/PDF cây)

## Lệnh (yêu cầu Node ≥ 20)

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export -> thư mục out/
npx tsc --noEmit # type-check
```

> Ghi chú môi trường: nếu `node` hệ thống là 18, dùng Node 20 của Homebrew:
> `PATH="/opt/homebrew/opt/node@20/bin:$PATH" npm run dev`.

## Cấu trúc thư mục

```
data/members/*.md            # DỮ LIỆU NỀN (bundle): mặc định RỖNG (chỉ .gitkeep) để
                             #   deploy vào trạng thái "Thêm thành viên trước"; đổ .md
                             #   vào đây nếu muốn có dữ liệu nền công khai
demo-data/members/*.md       # 51 thành viên MẪU (Nguyễn Đình) — KHÔNG build; để tham chiếu/test
demo-data/about.md           # about.md MẪU (nội dung "Về dòng họ")
demo-data/<stamp>.zip        # zip mẫu để nạp thử (tên theo yyyyMMddhhmmss, vd 2607151500.zip)
                             #   — cả demo-data/ bị .gitignore, chỉ có ở máy local
lib/
  familyGraph.ts             # (thuần, không fs) buildFamilyGraph(files) -> { persons, relationships }
  familyData.ts              # (server) đọc .md bằng fs -> gọi buildFamilyGraph + cache
  memberStore.ts             # (client) IndexedDB "folder ảo": cache file .md đã nạp + about.md
  membersZip.ts              # (client) giải nén tệp .zip -> { members: RawFile[], about: string|null }
  memberMarkdown.ts          # (client) form Thêm thành viên -> nội dung .md, slug id, zip stamp
  asset.ts                   # prefix NEXT_PUBLIC_BASE_PATH vào src ảnh local (hiện rỗng → no-op)
  routes.ts                  # ⭐ MỌI đường dẫn nội bộ khai ở đây — đừng hardcode "/apps/..."
  portfolio.ts               # dữ liệu portfolio: profile, skills, experience, apps
app/
  page.tsx                   # PORTFOLIO landing (EN): hero, about, skills, experience, apps, contact
  layout.tsx                 # root layout: font + metadata portfolio, <html lang="en">
  sitemap.ts / robots.ts     # cần `export const dynamic = "force-static"` vì output: export
  apps/
    page.tsx                 # danh sách apps (EN)
    pomodoro/page.tsx        # chi tiết app iOS (EN)
    family-tree/             # ⬅ APP GIA PHẢ (tiếng Việt) — trước ở /dashboard + /about
      layout.tsx             # FamilyDataProvider + UserProvider + DashboardHeader, lang="vi"
      page.tsx               # launchpad (thẻ tính năng)
      members/page.tsx       # cây gia phả
      members/[id]/page.tsx  # chi tiết (generateStaticParams từ familyData)
      add/page.tsx           # Thêm thành viên (server wrapper) -> AddMembersForm
      kinship/page.tsx       # tra danh xưng
      stats/page.tsx         # thống kê
      about/page.tsx         # "Về dòng họ" (từ about.md, nếu có) + giới thiệu ứng dụng
components/                  # UI gia phả (FamilyTree, FamilyNodeCard, KinshipFinder, FamilyStats,
                             #     AddMembersForm, DashboardLaunchpad, DashboardHeader,
                             #     MarkdownContent…)
components/portfolio/        # UI portfolio (PortfolioShell, Sidebar, Hero, AboutSection,
                             #     SkillsSection, ExperienceSection, AppCard, ContactSection,
                             #     Reveal, BrandIcons, PortfolioFooter)
components/modal/MemberDetailModal.tsx
context/                    # MemberListContext, MemberDetailContent,
                             #   FamilyDataProvider (client: nguồn persons/relationships runtime)
utils/                      # kinshipHelpers, treeHelpers, dateHelpers, styleHelprs
hooks/usePanZoom.ts
types/index.ts              # Person, Relationship, Gender…
legacy/                     # app Vite đơn giản của bản trước (KHÔNG build; bị loại khỏi tsconfig)
```

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

Xem ví dụ đầy đủ trong [README.md](README.md).

## Quy ước & lưu ý quan trọng

- **Đường dẫn nội bộ**: khai ở **`lib/routes.ts`**, đừng hardcode. Trước đây
  `HeaderMenu` và `DashboardLaunchpad` giữ hai bản sao độc lập của cùng taxonomy
  nav nên rất dễ trôi dạt.
- **Static export**: `next.config.ts` đặt `output: "export"`, **không** basePath
  (repo là user site `khacdai37.github.io`, phục vụ ở root). Route động
  (`members/[id]`) cần `generateStaticParams` + `dynamicParams = false`; vì export
  đòi tối thiểu 1 path, khi bundle **rỗng** nó trả 1 id giữ chỗ
  (`khong-co-du-lieu`) ra trang "không tìm thấy". Thành viên chỉ-trong-tệp `.zip`
  xem qua **modal**, không có trang tĩnh riêng.
  ⚠️ **Không bao giờ link tới `/apps/family-tree/members/<id>` nếu id không có
  trang tĩnh** — dev sẽ ném `missing param ... in generateStaticParams()`, Pages
  thì 404. Dùng `staticPageIds` từ `useFamilyData()` (tập id build sẵn từ
  `data/members/`) để bọc điều kiện, như `MemberDetailModal` làm với nút "Xem
  trang". Vì `data/members/` mặc định **rỗng**, tập này thường rỗng → hầu như
  không thành viên nào deep-link được.
- **`sitemap.ts` / `robots.ts` cần `export const dynamic = "force-static"`** —
  thiếu là route trả **500** dưới `output: "export"`.
- **Font: Be Vietnam Pro cho cả site.** ⚠️ Đừng đổi sang Poppins / DM Sans /
  Inter-thay-thế kiểu geometric mà không kiểm tra `unicode-range` trước:
  Poppins, DM Sans và DM Mono **không có subset `vietnamese`** — latin-ext của
  chúng bỏ trống **U+1EA0–1EF1**, đúng dải chứa ả/ầ/ệ/ị/ố/ớ/ứ. Dùng chúng thì
  chữ Việt ở subtree gia phả rơi về font hệ thống theo từng ký tự. `font-mono`
  (DM Mono) **chỉ** dành cho nhãn ASCII: eyebrow, counter carousel, năm.
  `--font-serif` là bí danh "font tiêu đề", KHÔNG phải serif thật.
- **Ảnh local phải qua `asset()`** (`lib/asset.ts`) — `next/image` không tự thêm
  basePath khi export. Hiện `NEXT_PUBLIC_BASE_PATH` rỗng nên `asset()` là no-op,
  nhưng cứ giữ để basePath quay lại thì không phải sửa call site. Áp cho `icon`,
  avatar mặc định (`DefaultAvatar`), và `avatar_url`.
- **Hiệu ứng hiện dần (`.portfolio-reveal`)**: cố tình **không** có
  `animation-fill-mode`. Đừng đổi sang `both`/`backwards` và đừng thay bằng
  framer-motion `whileInView` — cả hai ghim `opacity: 0` vào HTML/keyframe đầu,
  nên khi JS/rAF không chạy (bot, no-JS, tab bị throttle) thì **cả trang trắng**.
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
- **`about.md` (trang Giới thiệu)**: tệp `.zip` có cấu trúc `data/members/*.md` +
  `data/about.md` (file `.md` để phẳng ở gốc vẫn đọc được). `membersZip.ts` tách
  `about.md` **ra khỏi** danh sách thành viên (nhận diện: basename `about.md` và
  **không** nằm trong thư mục `members/`) — nếu lọt vào `buildFamilyGraph` nó sẽ
  thành "thành viên ma". Vì vậy `about` lưu ở **META_STORE** (key `"about"`), không
  vào `FILES_STORE` (store đó đi thẳng vào `buildFamilyGraph`). **Không có** file nền
  `data/about.md` — nội dung chỉ đến từ `.zip`. Render bằng `components/MarkdownContent`
  (`react-markdown`, **cố ý bỏ qua raw HTML** vì `.zip` có thể do người khác gửi);
  style ở `.markdown-body` trong `globals.css` (dự án không dùng plugin typography).
- **Không thêm phụ thuộc Supabase/auth/DB** — đã gỡ bỏ có chủ đích.
- `legacy/` chỉ để tham khảo; đã loại khỏi `tsconfig.json` (`exclude`).

## Deploy

Push `main` → `.github/workflows/deploy.yml` chạy trên Node 20: `npm ci` →
`npm run build` → `touch out/.nojekyll` → `actions/deploy-pages`. Site:
`https://khacdai37.github.io/` (user site, phục vụ ở root — repo phải tên
`khacdai37.github.io`). `.nojekyll` bắt buộc để Pages phục vụ thư mục `_next/`.

⚠️ **Không commit `.pdf`** (CV chứa số điện thoại) — `.gitignore` đã chặn `*.pdf`.

## Giấy phép

Một phần mã nguồn kế thừa từ dự án gia phả mã nguồn mở theo giấy phép **MIT**.
