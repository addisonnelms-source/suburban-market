import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { getSanityClient } from "./client";

export function urlFor(source: SanityImageSource) {
  const client = getSanityClient();
  if (!client) return null;
  return imageUrlBuilder(client).image(source);
}
