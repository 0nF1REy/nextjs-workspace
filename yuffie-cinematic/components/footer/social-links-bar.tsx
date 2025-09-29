import { socialLinks } from "./footer-data";

export function SocialLinksBar() {
  return (
    <div className="flex items-center justify-center gap-6 relative">
      {/* linha esquerda */}
      <div className="flex-1 h-0.5 bg-gray-700" />

      {/* ícones */}
      <div className="flex gap-6">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            aria-label={social.label}
            className="text-gray-500 transition-colors hover:text-white"
          >
            <social.icon className="size-5" />
          </a>
        ))}
      </div>

      {/* linha direita */}
      <div className="flex-1 h-0.5 bg-gray-700" />
    </div>
  );
}
