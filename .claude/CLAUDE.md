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

Nếu liên quan đến dữ liệu App Gia Phả thì xem tại [FamimlyTree](FamilyTree.md)

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
