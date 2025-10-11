"use client";

import { useUserStore } from "@/stores";
import type { User } from "@/lib/user/types";
import { useRef } from "react";

function SessionInitializer({ user }: { user: User | null }) {
  const isInitialized = useRef(false);

  if (!isInitialized.current) {
    useUserStore.setState({ currentUser: user });
    isInitialized.current = true;
  }

  return null;
}

export default SessionInitializer;
