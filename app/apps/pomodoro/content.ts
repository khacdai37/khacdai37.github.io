import type { AppLandingCopy } from "@/components/app-landing/copy";
import type { Localized } from "@/lib/i18n";

export const pomodoroCopy: Localized<AppLandingCopy> = {
  en: {
    seo: {
      title: "Pomodoro — Focus, your way",
      description:
        "A focus timer that keeps the Pomodoro method honest: work, rest, repeat, with ambient sound to let you know you're still in the zone.",
    },
    navSections: [
      { id: "overview", label: "Overview" },
      { id: "how", label: "How it works" },
      { id: "features", label: "Features" },
      { id: "download", label: "Download" },
    ],
    hero: {
      pill: "Available on the App Store",
      headline: "Focus, one *tick* at a time.",
      lede: "A focus timer that keeps the Pomodoro method honest: work, rest, repeat, with ambient sound to let you know you're still in the zone.",
      meta: "iOS · Built with Swift & SwiftUI · 2025",
      imageAlt: "Pomodoro — focus timer mid-session",
    },
    overview: {
      eyebrow: "Overview",
      title: "What is Pomodoro",
      body: "Most focus timers today come loaded with features — enough to work against the very thing they're meant to help. This app keeps things as minimal as possible: pick a duration, hit start, add ambient sound — a default one or your own — to help you stay focused. Work, short break, long break, repeat — no account, no ads, no setup required before you begin.",
    },
    how: {
      eyebrow: "How it works",
      title: "Get started in 3 simple steps.",
      lede: "Swipe left to see more settings.",
      steps: [
        {
          title: "Set your focus duration",
          body: "Choose how long a session runs — this is the most important setting. Base it on how long you can actually focus on a given task, and give it a label that makes sense: need 25 minutes to study? Create a \"Study\" label with a 25-minute duration. That's it.",
        },
        {
          title: "Hit start and get to work",
          body: "Ambient sound keeps the rhythm going through the whole session, so you don't need to check the screen to know it's still running.",
        },
        {
          title: "Rest when the app says rest",
          body: "Take a short break, then get back to it. After a few rounds, the app gives you a longer break, and the cycle starts over.",
        },
      ],
    },
    features: {
      eyebrow: "Features",
      title: "Simple, on purpose.",
      lede: "Everything here earns its place — built around a philosophy of simplicity and effectiveness.",
      items: [
        {
          emoji: "🍅",
          title: "The classic cycle, done right",
          body: "Work, short break, long break. No gimmicks, no gamification — just the technique as it was meant to be.",
        },
        {
          emoji: "🔔",
          title: "Personalize your ambient sound",
          body: "Everyone reacts differently to sound. That's why you can bring in your own audio to find what actually helps you focus.",
        },
        {
          emoji: "🌙",
          title: "No interruptions",
          body: "Hit start and flip your phone over. A notification lets you know when it's time to switch — nothing else demands your attention.",
        },
        {
          emoji: "⚡️",
          title: "Nothing to configure",
          body: "No account, no onboarding screens, no settings to fill in. Open the app and the timer is already waiting.",
        },
        {
          emoji: "☕️",
          title: "Breaks that are actually breaks",
          body: "Short and long breaks are built into the cycle — not something you have to remember to take yourself.",
        },
      ],
    },
    screens: { eyebrow: "Screens", title: "A look at the app in action." },
    download: {
      eyebrow: "Download",
      title: "Get Pomodoro.",
      lede: "Available on the App Store for iPhone.",
      contactCta: "Found a bug or have an idea? Reach out →",
    },
  },

  vi: {
    seo: {
      title: "Pomodoro — Tập trung theo cách riêng của bạn",
      description:
        "Đồng hồ tập trung giữ đúng tinh thần Pomodoro: làm, nghỉ, lặp lại, kèm âm thanh nền giúp bạn biết mình vẫn đang trong trạng thái tập trung.",
    },
    navSections: [
      { id: "overview", label: "Tổng quan" },
      { id: "how", label: "Cách dùng" },
      { id: "features", label: "Tính năng" },
      { id: "download", label: "Tải về" },
    ],
    hero: {
      pill: "Đã có trên App Store",
      headline: "Tập trung theo nhịp *tích tắc*.",
      lede: "Đồng hồ tập trung giữ đúng tinh thần Pomodoro: làm, nghỉ, lặp lại, kèm âm thanh nền giúp bạn biết mình vẫn đang trong trạng thái tập trung.",
      meta: "iOS · Viết bằng Swift & SwiftUI · 2025",
      imageAlt: "Pomodoro — đồng hồ tập trung giữa một phiên làm việc",
    },
    overview: {
      eyebrow: "Tổng quan",
      title: "Pomodoro là gì",
      body: "Phần lớn app hẹn giờ tập trung hiện nay đi kèm quá nhiều tính năng, đến mức đi ngược lại mục tiêu ban đầu. App này giữ mọi thứ ở mức tối giản nhất: chọn thời gian, bấm chạy, thêm âm thanh nền — mặc định hoặc do bạn tự chọn — để giữ bạn tập trung tối đa. Làm, nghỉ ngắn, nghỉ dài, lặp lại — không tài khoản, không quảng cáo, không cần cấu hình gì trước khi bắt đầu.",
    },
    how: {
      eyebrow: "Cách dùng",
      title: "Bắt đầu với 3 bước đơn giản.",
      lede: "Vuốt nhẹ sang trái để xem thêm cài đặt.",
      steps: [
        {
          title: "Cài đặt thời gian tập trung",
          body: "Chọn phiên chạy bao lâu — đây là phần quan trọng nhất. Hãy dựa vào thói quen tập trung cho từng loại việc để đặt nhãn phù hợp, ví dụ: cần học 25 phút mỗi lần thì tạo nhãn \"Học\" với thời lượng 25 phút, đơn giản vậy thôi.",
        },
        {
          title: "Bấm chạy và bắt tay vào việc",
          body: "Âm thanh nền giữ nhịp cho cả phiên, nên bạn không cần nhìn màn hình mới biết nó vẫn đang chạy.",
        },
        {
          title: "Nghỉ đúng lúc app báo nghỉ",
          body: "Nghỉ ngắn, rồi quay lại làm. Sau vài vòng, app cho bạn một quãng nghỉ dài hơn, rồi chu kỳ lại bắt đầu.",
        },
      ],
    },
    features: {
      eyebrow: "Tính năng",
      title: "Đơn giản, nhưng có chủ đích.",
      lede: "Mọi thứ ở đây đều có lý do để tồn tại — theo đúng triết lý đơn giản và hiệu quả.",
      items: [
        {
          emoji: "🍅",
          title: "Vòng lặp kinh điển, giữ đúng luật",
          body: "Làm, nghỉ ngắn, nghỉ dài. Không chiêu trò, không game hoá — đúng kỹ thuật gốc như nó vốn có.",
        },
        {
          emoji: "🔔",
          title: "Cá nhân hoá âm thanh nền",
          body: "Mỗi người phản ứng khác nhau với từng loại âm thanh. Hiểu điều đó, app cho phép bạn thêm âm thanh từ nguồn khác để có trải nghiệm phù hợp nhất với mình.",
        },
        {
          emoji: "🌙",
          title: "Không chen ngang",
          body: "Bấm chạy rồi úp máy xuống. Thông báo chỉ xuất hiện khi cần chuyển phiên, ngoài ra không có gì đòi bạn phải chú ý.",
        },
        {
          emoji: "⚡️",
          title: "Không có gì phải cấu hình",
          body: "Không tài khoản, không màn hướng dẫn, không bảng điều khiển phải điền. Mở app lên là đồng hồ đã sẵn sàng.",
        },
        {
          emoji: "☕️",
          title: "Nghỉ ra nghỉ",
          body: "Nghỉ ngắn và nghỉ dài là một phần của chu kỳ, không phải thứ bạn phải tự nhớ để làm.",
        },
      ],
    },
    screens: { eyebrow: "Màn hình", title: "Nhìn qua lúc app đang chạy." },
    download: {
      eyebrow: "Tải về",
      title: "Cài Pomodoro.",
      lede: "Có trên App Store cho iPhone.",
      contactCta: "Gặp lỗi hay có ý tưởng? Nhắn cho mình →",
    },
  },
};
