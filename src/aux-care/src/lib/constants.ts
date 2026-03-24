const FALLBACK_BASE_URL = "https://example.com";

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || FALLBACK_BASE_URL;

export const IS_PRODUCTION =
  (process.env.NODE_ENV || "").toLowerCase() === "production";
