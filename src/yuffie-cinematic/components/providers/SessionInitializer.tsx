"use client";

import {
  useUserStore,
  useFavoritesStore,
  useRatingsStore,
  useReviewsStore,
} from "@/stores";
import type { User } from "@/lib/user/types";
import { useRef, useEffect } from "react";

function SessionInitializer({ user }: { user: User | null }) {
  const isInitialized = useRef(false);

  useEffect(() => {
    async function fetchAndSetUserData() {
      try {
        const res = await fetch("/api/user/data");
        if (res.ok) {
          const data = await res.json();
          useFavoritesStore.getState().setFavorites(data.favorites || []);
          useRatingsStore.getState().setRatings(data.ratings || {});
          useReviewsStore.getState().setLikes(data.likedReviewIds || []);
        }
      } catch (error) {
        console.error("Failed to fetch user data on init:", error);
      }
    }

    if (!isInitialized.current && user) {
      useUserStore.setState({ currentUser: user });
      fetchAndSetUserData();
      isInitialized.current = true;
    } else if (!user) {
      useUserStore.setState({ currentUser: null });
    }
  }, [user]);

  return null;
}

export default SessionInitializer;
