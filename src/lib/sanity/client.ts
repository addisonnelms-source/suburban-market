import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "../../../sanity/env";

export function getSanityClient(): SanityClient | null {
  if (!isSanityConfigured) return null;

  return createClient({
    projectId,
    dataset,
    apiVersion,
    // Fresh reads so newly published listings show without long CDN lag
    useCdn: false,
  });
}
