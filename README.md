# Suburban Market

A custom website and interactive paint color-mixing tool for Suburban Market, a family-owned antique store and authorized Fusion Mineral Paint vendor in Springdale, Arkansas.

I built this with no prior formal coding background, teaching myself to design, build, and ship it using Claude Code. It's a real, working product the business uses.

## What it does

- **Paint Color Mixer** — lets customers explore and preview custom blends of Fusion Mineral Paint colors before buying, and gives staff a faster way to visualize mixing combinations. Includes a recipe gallery of preset blends and a "closest Fusion match" for each mix.
- **Shop** — a browsable catalog of antiques and refinished furniture available at the booth.
- **Self-serve content** — the store owner can add and update listings independently through a CMS, with no developer needed.

## How the mixer works

Each Fusion color is stored with a hex value — 81 of 82 sourced and cleaned from Fusion's official barcode workbook. Blends are computed by mixing those color values by percentage, then compared against the full catalog to surface the closest real Fusion color to any custom mix.

## Built with

- **Next.js** (React framework)
- **Sanity** (headless CMS for listings)
- **Vercel** (hosting and deployment)

## Live site

- Paint mixer: https://suburban-market.vercel.app/fusion-paint/mixer
- Home: https://suburban-market.vercel.app
