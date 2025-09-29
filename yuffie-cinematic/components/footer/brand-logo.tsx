import Link from "next/link";
import Image from "next/image";

export function BrandLogo() {
  return (
    <div className="flex justify-center md:justify-start">
      <Link href="/">
        <Image
          src="/assets/images/brand/yuffie-cinematic-logotipo-02.png"
          alt="Yuffie's Cinematic Icon"
          width={120}
          height={120}
          className="hover:opacity-80 transition-opacity"
        />
      </Link>
    </div>
  );
}
