import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  // Dados de filmes/series
  const items = [
    {
      title: "O Poderoso Chefão",
      poster: "/assets/images/the-godfather-1972.jpg",
      video: null,
      detail: "/pages/movie-description-01",
    },
    {
      title: "Amadeus",
      poster: "/assets/images/amadeus-1984.jpg",
      video: null,
      detail: "/pages/movie-description-02",
    },
    {
      title: "John Wick: Capítulo 2",
      poster: "/assets/images/john-wick-chapter-2-2017.jpg",
      video: null,
    },
    {
      title: "Tempo de Matar",
      poster: "/assets/images/a-time-to-kill-1996.jpg",
      video: null,
    },
    {
      title: "Ip Man",
      poster: "/assets/images/ip-man-2008.jpg",
      video: null,
    },
    {
      title: "Um Sonho de Liberdade",
      poster: "/assets/images/the-shawshank-redemption-1994.jpg",
      video: null,
    },
    {
      title: "Efeito Borboleta",
      poster: "/assets/images/the-butterfly-effect-2004.jpg",
      video: null,
    },
    {
      title: "O Jogo da Imitação",
      poster: "/assets/images/the-imitation-game-2014.jpg",
      video: null,
    },
    {
      title: "Parasita",
      poster: "/assets/images/parasite-2019.jpg",
      video: null,
    },
    {
      title: "Anjos Caídos",
      poster: "/assets/images/fallen-angels-1995.jpg",
      video: null,
    },
  ];

  const videoItems = items.filter((item) => item.video);

  function getRandomVideo() {
    if (videoItems.length === 0) return null;
    const idx = Math.floor(Math.random() * videoItems.length);
    return videoItems[idx].video;
  }

  const videoSrc = getRandomVideo();

  return (
    <section className="w-full max-w-4xl mx-auto px-2 py-4 flex flex-col gap-6">
      {/* Seção de Vídeo em Destaque */}
      <div className="w-full aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center">
        {videoSrc ? (
          <video
            src={videoSrc}
            controls
            autoPlay
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-muted-foreground text-center text-sm">
            Nenhum vídeo disponível
          </span>
        )}
      </div>
      {/* Filmes/Series */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {items.map((item, idx) => (
          <Card key={item.title} className="p-2 flex flex-col items-center">
            <CardHeader className="relative w-full h-56 mb-2">
              <Image
                src={item.poster}
                alt={item.title}
                fill
                className="rounded-lg object-cover"
                priority={idx < 2}
              />
            </CardHeader>
            <CardContent className="p-0 w-full flex flex-col items-center">
              <CardTitle className="text-xs sm:text-sm text-center mb-2">
                {item.title}
              </CardTitle>
              {/* Navegação */}
              {idx < 2 && item.detail && (
                <Link href={item.detail}>
                  <Button variant="secondary" size="sm" className="w-full">
                    Ver detalhes
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
