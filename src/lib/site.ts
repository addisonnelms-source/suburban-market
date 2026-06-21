export const site = {
  name: "Suburban Market",
  tagline: "Refinished furniture & antiques",
  established: 2013,
  hostStore: {
    name: "Gathered Goods",
    description: "Antique furniture and home décor",
    address: {
      street: "4377 N Thompson St",
      city: "Springdale",
      state: "AR",
      zip: "72764",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=4377+N+Thompson+St,+Springdale,+AR+72764",
  },
  owner: {
    name: "Leigh Nelms",
  },
  fusionPaint: {
    name: "Fusion Mineral Paint",
    website: "https://www.fusionmineralpaint.com",
    description:
      "A professional-grade furniture paint with a built-in top coat — no separate sealer required.",
  },
} as const;

export function formatAddress(): string {
  const { street, city, state, zip } = site.hostStore.address;
  return `${street}, ${city}, ${state} ${zip}`;
}
