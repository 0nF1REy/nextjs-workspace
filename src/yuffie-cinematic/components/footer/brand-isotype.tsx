import Image from "next/image";
import Link from "next/link";

export function BrandIsotype() {
  return (
    <div className="flex items-center justify-center lg:justify-end">
      <Link href="/">
        <Image
          src="/assets/images/brand/yuffie-cinematic-isotipo.png"
          alt="Yuffie's Cinematic Isotype"
          width={80}
          height={80}
          className="hover:opacity-80 transition-opacity"
        />
      </Link>
    </div>
  );
}
