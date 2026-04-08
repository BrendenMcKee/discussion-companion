import type { NextConfig } from "next";

/** Prefer this repo as the trace root when other lockfiles exist higher in the tree. */
const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
