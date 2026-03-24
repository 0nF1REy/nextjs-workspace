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
            className="
              text-gray-500 
              transition-all 
              duration-300 
              ease-in-out
              hover:text-white 
              hover:scale-125 
              hover:rotate-12 
              hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]
              hover:brightness-125
              hover:animate-pulse
            "
          >
            <social.icon className="w-6 h-6" />
          </a>
        ))}
      </div>

      {/* linha direita */}
      <div className="flex-1 h-0.5 bg-gray-700" />
    </div>
  );
}
