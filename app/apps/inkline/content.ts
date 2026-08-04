import type { AppLandingCopy } from "@/components/app-landing/copy";
import type { Localized } from "@/lib/i18n";

/** Inkline có thêm mục "Thư viện" mà các app khác không có. */
export interface InklineCopy extends AppLandingCopy {
  library: {
    eyebrow: string;
    title: string;
    lede: string;
    sources: { name: string; body: string }[];
    note: string;
  };
}

export const inklineCopy: Localized<InklineCopy> = {
  en: {
    seo: {
      title: "Inkline — English Dictation",
      description:
        "Improve your listening and writing by transcribing exactly what you hear.",
    },
    navSections: [
      { id: "overview", label: "Overview" },
      { id: "how", label: "How it works" },
      { id: "features", label: "Features" },
      { id: "library", label: "Library" },
      { id: "download", label: "Download" },
    ],
    hero: {
      pill: "Available on the App Store",
      headline: "Write down *exactly* what you hear.",
      lede: "Improve your listening and writing by transcribing exactly what you hear.",
      meta: "iPhone & iPad · 2026",
      imageAlt: "Inkline",
    },
    overview: {
      eyebrow: "Overview",
      title: "Sharper focus through dictation.",
      body: "Dictation forces you to listen closely to every word — no skimming for the gist and moving on. Inkline is built around that: lessons are split into sentences, audio pauses at the end of each one, and what you type is checked against the original word by word. Beyond the built-in lessons, you can add your own audio to personalize what you practice with.",
    },
    how: {
      eyebrow: "How it works",
      title: "Three steps to get started.",
      steps: [
        {
          title: "Pick a lesson to listen to",
          body: "Start with the built-in library, or import a podcast episode, a lecture, or a recording of your own. Lessons are organized into topic folders.",
          imageAlt:
            "Library screen listing lesson groups with lesson and sentence counts",
        },
        {
          title: "Set up the lesson content",
          body: "Tell the app what you have — audio only, audio with a transcript, or audio with an .srt/.vtt file — and it splits sentences and aligns timing automatically. You can still fine-tune the content afterward.",
          imageAlt:
            "Add lesson screen with three options: audio only, audio with transcript, audio with subtitle file",
        },
        {
          title: "Write down what you hear",
          body: "Audio pauses at the end of each sentence. Type on the keyboard, or write by hand with Apple Pencil — then check your result instantly.",
          imageAlt:
            "Dictation screen: waveform, hint masked with asterisks, and an input field",
        },
      ],
    },
    features: {
      eyebrow: "Features",
      title: "Train your ear, sharpen your eye.",
      lede: "Beyond dictation, the app also lets you follow along with subtitles while listening.",
      items: [
        {
          emoji: "🎧",
          title: "Sentence-by-sentence playback",
          body: "Audio stops at the end of every sentence, and you can jump back to any part easily. Adjust playback speed from 0.5× to 1.5× to match your level.",
        },
        {
          emoji: "🎯",
          title: "Word-by-word checking",
          body: "Comparison is sequence-based, not position-based — missing a word early on won't throw off the rest of the sentence. Misspelled, missing, and extra words each get their own color.",
        },
        {
          emoji: "✳️",
          title: "Hints, not answers",
          body: "Sentences are masked with asterisks, but word count and length are still visible — enough to guide you, not enough to give it away.",
        },
        {
          emoji: "✏️",
          title: "Handwriting on iPad",
          body: "Write with Apple Pencil on warm-toned ruled paper, even in dark mode. Autocorrect and predictive text are disabled while typing, so the keyboard doesn't do the work for you.",
        },
        {
          emoji: "📥",
          title: "Bring your own audio",
          body: "Import audio with subtitles (SRT/VTT), audio with a transcript, or audio alone — the app detects sentence boundaries on-device. Package a full lesson into a single file to share with others.",
        },
        {
          emoji: "🔒",
          title: "Private, and no distractions",
          body: "No account, no ads, no tracking. Your progress stays on your device.",
        },
      ],
    },
    library: {
      eyebrow: "Library",
      title: "54 free lessons, built right in.",
      lede: "Over 3,500 sentences spanning A2 to C1 — slow, clear news readings in American English, plus Aesop's fables. Download once and study offline.",
      sources: [
        {
          name: "VOA Learning English",
          body: "Science, health, culture, education, American life, and the origins of idioms — read slowly and clearly.",
        },
        {
          name: "LibriVox",
          body: "Aesop's fables read by volunteers — short lessons with simple, easy-to-follow narration.",
        },
      ],
      note: "Both sources are in the public domain and used under their original licenses.",
    },
    screens: { eyebrow: "Screens", title: "A look at the app in action." },
    download: {
      eyebrow: "Download",
      title: "Get Inkline.",
      lede: "Built for people preparing for English certification exams, professionals sharpening their listening for work, and self-learners who want concrete feedback instead of passive listening.",
      contactCta: "Found a bug or have an idea? Reach out →",
      note: "Requires iPhone or iPad running iOS 18 or later. Automatic sentence splitting from audio alone requires iOS 26 or later.",
    },
  },

  vi: {
    seo: {
      title: "Inkline — Chép chính tả tiếng Anh",
      description:
        "Luyện kỹ năng nghe và viết bằng cách chép lại những gì bạn nghe được.",
    },
    navSections: [
      { id: "overview", label: "Tổng quan" },
      { id: "how", label: "Cách dùng" },
      { id: "features", label: "Tính năng" },
      { id: "library", label: "Thư viện" },
      { id: "download", label: "Tải về" },
    ],
    hero: {
      pill: "Đã có trên App Store",
      headline: "Chép lại *đúng* những gì bạn nghe được.",
      lede: "Luyện kỹ năng nghe và viết bằng cách chép lại những gì bạn nghe được.",
      meta: "iPhone & iPad · 2026",
      imageAlt: "Inkline",
    },
    overview: {
      eyebrow: "Tổng quan",
      title: "Tập trung hơn với nghe chép chính tả.",
      body: "Chép chính tả buộc bạn phải nghe kỹ từng chữ, không thể nghe lướt rồi đoán ý. Inkline hỗ trợ đúng cách học đó: bài học được cắt sẵn theo câu, audio tự dừng ở cuối mỗi câu, và mỗi câu bạn viết được đối chiếu với bản gốc từng chữ một. Bên cạnh bài học có sẵn, bạn có thể thêm nội dung của riêng mình để cá nhân hoá việc luyện tập.",
    },
    how: {
      eyebrow: "Cách dùng",
      title: "Ba bước để bắt đầu.",
      steps: [
        {
          title: "Chọn bài học để nghe",
          body: "Bắt đầu từ các bài có sẵn, hoặc nạp vào audio podcast, bài giảng, hay đoạn ghi âm bạn đã lưu. Bài học được xếp theo thư mục chủ đề.",
          imageAlt:
            "Thư viện, liệt kê các nhóm bài kèm số bài học và số câu của từng nhóm",
        },
        {
          title: "Chuẩn bị nội dung bài học",
          body: "Cho app biết bạn đang có gì — chỉ audio, audio kèm bản chép, hay audio kèm tệp .srt/.vtt — app sẽ tự tách câu và khớp thời điểm. Bạn vẫn có thể chỉnh lại nội dung dễ dàng nếu cần.",
          imageAlt:
            "Màn thêm bài học với ba lựa chọn: chỉ audio, audio kèm bản chép, audio kèm tệp phụ đề",
        },
        {
          title: "Viết lại điều bạn nghe",
          body: "Audio dừng ở cuối mỗi câu. Gõ bằng bàn phím hoặc viết tay bằng Apple Pencil, rồi xem kết quả ngay.",
          imageAlt:
            "Màn chép chính tả: sóng âm, phần gợi ý che bằng dấu sao, và ô trống để viết",
        },
      ],
    },
    features: {
      eyebrow: "Tính năng",
      title: "Luyện tai, luyện mắt.",
      lede: "Ngoài chép chính tả, app còn giúp bạn đọc kèm phụ đề khi nghe.",
      items: [
        {
          emoji: "🎧",
          title: "Nghe theo từng câu",
          body: "Audio dừng ở cuối mỗi câu, dễ dàng tua lại đoạn cần nghe. Điều chỉnh tốc độ từ 0.5× đến 1.5× theo khả năng của bạn.",
        },
        {
          emoji: "🎯",
          title: "Chấm từng chữ",
          body: "So sánh theo trình tự chứ không theo vị trí, nên sót một chữ ở đầu câu không làm lệch cả phần sau. Chữ sai, chữ thiếu, chữ thừa — mỗi loại một màu riêng.",
        },
        {
          emoji: "✳️",
          title: "Gợi ý, không phải đáp án",
          body: "Câu được che bằng dấu sao nhưng vẫn giữ số chữ và độ dài từng chữ — đủ để gợi ý, không đủ để chép lại.",
        },
        {
          emoji: "✏️",
          title: "Viết tay trên iPad",
          body: "Viết bằng Apple Pencil trên nền giấy kẻ dòng ấm màu, cả ở chế độ tối. Khi gõ phím, tự động sửa lỗi và gợi ý từ đều được tắt để bàn phím không làm bài thay bạn.",
        },
        {
          emoji: "📥",
          title: "Mang audio của bạn vào",
          body: "Nạp audio kèm phụ đề (SRT/VTT), audio kèm bản chép, hoặc chỉ audio — app tự tách câu ngay trên máy. Có thể đóng gói cả bài học thành một tệp để chia sẻ.",
        },
        {
          emoji: "🔒",
          title: "Riêng tư, không làm phiền",
          body: "Không tài khoản, không quảng cáo, không theo dõi. Bài làm và tiến độ chỉ lưu trên máy bạn.",
        },
      ],
    },
    library: {
      eyebrow: "Thư viện",
      title: "54 bài học miễn phí, có sẵn trong app.",
      lede: "Hơn 3.500 câu, trải từ trình độ A2 đến C1 — gồm tin tức đọc chậm, rõ bằng giọng Mỹ chuẩn và truyện ngụ ngôn Aesop. Tải một lần, học ngoại tuyến mọi lúc.",
      sources: [
        {
          name: "VOA Learning English",
          body: "Khoa học, sức khoẻ, văn hoá, giáo dục, chuyện nước Mỹ và nguồn gốc thành ngữ — đọc chậm, rõ, dễ nghe.",
        },
        {
          name: "LibriVox",
          body: "Truyện ngụ ngôn Aesop do tình nguyện viên đọc — bài ngắn, mạch kể đơn giản, dễ theo.",
        },
      ],
      note: "Cả hai nguồn đều thuộc phạm vi công cộng, được sử dụng theo giấy phép gốc.",
    },
    screens: { eyebrow: "Màn hình", title: "Điểm lại các tính năng của ứng dụng." },
    download: {
      eyebrow: "Tải về",
      title: "Cài Inkline.",
      lede: "Phù hợp với người đang ôn thi chứng chỉ tiếng Anh, người cần luyện nghe cho công việc, và người tự học muốn có phản hồi cụ thể thay vì chỉ nghe thụ động.",
      contactCta: "Gặp lỗi hay có ý tưởng? Nhắn cho mình →",
      note: "Cần iPhone hoặc iPad chạy iOS 18 trở lên. Tự động tách câu từ audio thuần cần iOS 26 trở lên.",
    },
  },
};
