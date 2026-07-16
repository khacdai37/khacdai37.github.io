import { profile } from "@/lib/portfolio";

export default function PortfolioFooter() {
  return (
    <footer className="mx-6 mb-8 py-5 border-t border-border md:mx-12">
      <p className="text-sm text-secondary text-center md:text-left">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js.
      </p>
    </footer>
  );
}
