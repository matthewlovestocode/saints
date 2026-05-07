import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnvConfig } from "@next/env";
import type { NextConfig } from "next";

const webAppDir = path.dirname(fileURLToPath(import.meta.url));

loadEnvConfig(path.resolve(webAppDir, "../.."));
loadEnvConfig(webAppDir);

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  },
};

export default nextConfig;
