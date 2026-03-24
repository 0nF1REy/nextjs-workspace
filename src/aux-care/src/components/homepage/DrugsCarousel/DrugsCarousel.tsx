"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function DrugsCarousel() {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [windowWidth, setWindowWidth] = React.useState<number>(0);

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getFontSize = (base: number) => {
    if (windowWidth >= 1536) return base * 2.5;
    if (windowWidth >= 1280) return base * 2;
    if (windowWidth >= 1024) return base * 1.7;
    if (windowWidth >= 768) return base * 1.4;
    if (windowWidth >= 640) return base * 1.2;
    return base;
  };

  const drugs = [
    {
      title: "Maconha",
      img: "/assets/images/maconha.webp",
      text: "A maconha afeta a coordenação motora, a memória de curto prazo e a capacidade de concentração. Pode causar ansiedade, paranoia e dependência psicológica. O uso frequente pode prejudicar o desenvolvimento cognitivo em jovens e aumentar o risco de problemas respiratórios quando fumada.",
    },
    {
      title: "Cocaína",
      img: "/assets/images/cocaina.webp",
      text: "A cocaína é um estimulante poderoso que aumenta a frequência cardíaca e a pressão arterial, podendo causar arritmias e infartos. Pode gerar euforia intensa, mas também ansiedade, irritabilidade e comportamento impulsivo. O uso contínuo aumenta o risco de dependência severa e danos neurológicos.",
    },
    {
      title: "Álcool",
      img: "/assets/images/alcool.webp",
      text: "O álcool é um depressor do sistema nervoso central, prejudicando julgamento, coordenação e percepção. O consumo excessivo pode causar problemas hepáticos, cardiovasculares e neurológicos, além de risco elevado de acidentes. Pode gerar dependência física e psicológica com uso prolongado.",
    },
    {
      title: "Crack",
      img: "/assets/images/crack.webp",
      text: "O crack é altamente viciante e produz efeitos intensos e rápidos no cérebro, causando euforia extrema seguida de depressão. O uso contínuo pode levar a sérios problemas cardiovasculares, respiratórios e mentais, além de isolamento social e comportamento agressivo.",
    },
    {
      title: "Ecstasy",
      img: "/assets/images/ecstasy.jpg",
      text: "O ecstasy (MDMA) é um estimulante e alucinógeno que aumenta a liberação de serotonina, causando euforia e sensação de empatia. Pode provocar desidratação, hipertermia, taquicardia e alterações de humor intensas. O uso frequente prejudica a memória e aumenta risco de depressão.",
    },
    {
      title: "Heroína",
      img: "/assets/images/heroina.jpg",
      text: "A heroína é um depressor extremamente viciante que causa sensação intensa de prazer seguida de sonolência. O uso contínuo provoca dependência física grave, depressão respiratória e risco elevado de overdose fatal. Pode gerar problemas sociais, financeiros e de saúde severos.",
    },
    {
      title: "Cigarro",
      img: "/assets/images/cigarro.webp",
      text: "O cigarro contém nicotina, que causa dependência física e psicológica. O uso prolongado aumenta significativamente o risco de câncer de pulmão, doenças cardiovasculares e respiratórias. Também prejudica a circulação sanguínea, a capacidade pulmonar e o bem-estar geral.",
    },
  ];

  return (
    <div className="mt-4 w-full flex flex-col items-center px-2 sm:px-4 lg:px-6">
      <h2 className="text-2xl font-semibold text-gray-800 lg:text-4xl mb-8">
        Drogas e seus efeitos
      </h2>

      <div className="w-full max-w-4xl relative">
        <Carousel className="w-full" opts={{ align: "start", loop: true }}>
          <CarouselContent className="flex gap-1 sm:gap-2">
            {drugs.map((drug, index) => {
              const isActive = activeIndex === index;
              return (
                <CarouselItem
                  key={index}
                  className="flex-shrink-0 w-32 sm:w-36 md:w-40"
                >
                  <Card
                    className="relative cursor-pointer overflow-hidden rounded-lg p-0"
                    onClick={() => setActiveIndex(isActive ? null : index)}
                  >
                    <div className="relative w-full aspect-[3/2]">
                      <Image
                        src={drug.img}
                        alt={drug.title}
                        fill
                        className={`object-cover transition-transform duration-300 ${
                          isActive ? "scale-105 blur-sm" : ""
                        }`}
                        priority={index < 3}
                      />

                      {isActive && (
                        <CardContent className="absolute top-0 left-0 w-full h-full p-1 sm:p-2 bg-white/80 backdrop-blur-md flex flex-col justify-center items-start transition-all duration-300">
                          <h3
                            style={{ fontSize: `${getFontSize(12)}px` }}
                            className="font-bold mb-1"
                          >
                            {drug.title}
                          </h3>
                          <p
                            style={{ fontSize: `${getFontSize(10)}px` }}
                            className="text-gray-800"
                          >
                            {drug.text}
                          </p>
                        </CardContent>
                      )}
                    </div>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <div className="flex justify-between mt-1">
            <CarouselPrevious className="text-gray-700 hover:text-gray-900" />
            <CarouselNext className="text-gray-700 hover:text-gray-900" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
