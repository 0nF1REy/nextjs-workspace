"use client";

import { useState, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MovieDetailsProps {
  genre?: string[];
  duration?: number;
}

interface Review {
  id: string;
  author: string;
  content: string;
  rating?: number;
}

const RATING_MAX = 5;

function MovieDetails({ genre, duration }: MovieDetailsProps) {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-black border border-red-900/40 text-gray-200 shadow-xl">
      <CardHeader>
        <CardTitle className="text-red-500">Detalhes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {genre && (
          <div>
            <span className="font-semibold">Gênero: </span>
            {genre.join(", ")}
          </div>
        )}
        {duration && (
          <div>
            <span className="font-semibold">Duração: </span>
            {duration} minutos
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ReviewsList({ reviews }: { reviews: Review[] }) {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-black/40 border border-gray-800 p-4 rounded-lg shadow-md"
        >
          <p className="font-semibold text-red-500">{review.author}</p>
          <p className="italic text-gray-300">&ldquo;{review.content}&rdquo;</p>
          {review.rating && (
            <div className="text-yellow-400">
              {Array.from({ length: RATING_MAX }).map((_, idx) => (
                <span key={`review-${review.id}-star-${idx}`}>
                  {idx < review.rating! ? "★" : "☆"}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function MovieReviews({
  genre,
  duration,
  reviews,
}: MovieDetailsProps & { reviews: Review[] }) {
  const [activeTab, setActiveTab] = useState("details");

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  return (
    <aside className="bg-gradient-to-br from-gray-900 to-black border border-red-900/40 rounded-xl p-6 shadow-lg">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 gap-2 mb-6">
          <TabsTrigger
            value="details"
            className="data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-lg"
          >
            Detalhes
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-lg"
          >
            Resenhas
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <MovieDetails genre={genre} duration={duration} />
        </TabsContent>
        <TabsContent value="reviews">
          <ReviewsList reviews={reviews} />
        </TabsContent>
      </Tabs>
    </aside>
  );
}
