export interface LandingFeature {
  /** Emoji thay cho icon set: mỗi tính năng một hình riêng mà không cần asset. */
  emoji: string;
  title: string;
  body: string;
}

export default function FeatureGrid({ items }: { items: LandingFeature[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f) => (
        <li
          key={f.title}
          className="rounded-2xl border border-border bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-hover"
        >
          <span aria-hidden className="mb-3 block text-2xl leading-none">
            {f.emoji}
          </span>
          <h3 className="mb-1.5 font-serif text-base font-bold text-primary">
            {f.title}
          </h3>
          <p className="text-sm leading-relaxed text-secondary">{f.body}</p>
        </li>
      ))}
    </ul>
  );
}
