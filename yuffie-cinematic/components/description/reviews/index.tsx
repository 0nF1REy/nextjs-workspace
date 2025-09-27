"use client";

import { useState, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MovieDetails } from "./details";
import { ReviewsList } from "./reviews-list";
import { MovieDetailsProps, Review } from "./types";

interface MovieReviewsProps extends MovieDetailsProps {
  reviews: Review[];
  cinematicId: string;
}

export default function MovieReviews({
  genre,
  duration,
  reviews,
  cinematicId,
}: MovieReviewsProps) {
  const [activeTab, setActiveTab] = useState("details");

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  const handleNewReview = useCallback(() => {}, []);

  return (
    <aside className="bg-gradient-to-br from-gray-900 to-black border border-red-900/40 rounded-xl p-6 shadow-lg h-[600px] flex flex-col">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full h-full flex flex-col"
      >
        <TabsList className="grid grid-cols-2 gap-2 mb-6 flex-shrink-0">
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
            Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="flex-1 min-h-0">
          <MovieDetails genre={genre} duration={duration} />
        </TabsContent>

        <TabsContent value="reviews" className="flex-1 min-h-0">
          <ReviewsList
            reviews={reviews}
            cinematicId={cinematicId}
            onNewReview={handleNewReview}
          />
        </TabsContent>
      </Tabs>

      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #dc2626 #374151;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151;
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #dc2626;
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #b91c1c;
        }
      `}</style>
    </aside>
  );
}
