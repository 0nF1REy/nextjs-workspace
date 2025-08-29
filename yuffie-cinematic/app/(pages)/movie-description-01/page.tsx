import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
export default function MovieDescriptionOnePage() {
  const movie = {
    title: "Tempo de Matar",
    synopsis:
      "Em Canton, Mississippi, um jovem advogado destemido e seu assistente defendem um homem negro acusado de assassinar dois homens brancos que estupraram sua filha de 10 anos, desencadeando uma intensa batalha judicial e agitação social.",
    year: 1996,
    director: "Joel Schumacher",
    cover: "/assets/images/a-time-to-kill-1996.jpg",
    cast: [
      "Matthew McConaughey",
      "Sandra Bullock",
      "Samuel L. Jackson",
      "Kevin Spacey",
    ],
    carouselImages: [
      "/assets/images/a-time-to-kill-1996.jpg",
      "/assets/images/the-godfather-1972.jpg",
      "/assets/images/the-shawshank-redemption-1994.jpg",
      "/assets/images/amadeus-1984.jpg",
    ],
  };
  return (
    <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      {/* Carrossel */}
      <div className="relative w-full max-w-xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent>
            {movie.carouselImages.map((img, idx) => (
              <CarouselItem
                key={idx}
                className="flex justify-center items-center"
              >
                <Image
                  src={img}
                  alt={`Movie scene ${idx + 1}`}
                  width={400}
                  height={250}
                  className="rounded-lg object-cover w-full h-56 sm:h-72"
                  priority={idx === 0}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Cartão de detalhes do filme */}
      <Card className="w-full">
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="w-full sm:w-1/3 flex justify-center">
            <Image
              src={movie.cover}
              alt={movie.title}
              width={200}
              height={300}
              className="rounded-lg object-cover w-40 h-60 shadow-md"
              priority
            />
          </div>
          <div className="flex-1 w-full">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl font-bold mb-2">
                {movie.title}
              </CardTitle>
              <CardDescription className="mb-2">
                {movie.year} &bull; Dirigido por {movie.director}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-base text-gray-700 mb-4">{movie.synopsis}</p>
              <div>
                <span className="font-semibold text-gray-800">
                  Elenco Principal:
                </span>
                <ul className="list-disc list-inside text-gray-600 text-sm mt-1">
                  {movie.cast.map((actor, idx) => (
                    <li key={idx}>{actor}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </div>
        </div>
        <CardFooter className="justify-end mt-4">
          <Link href="/">
            <Button variant="secondary" size="lg" className="rounded-full px-6">
              &larr; Voltar para Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
