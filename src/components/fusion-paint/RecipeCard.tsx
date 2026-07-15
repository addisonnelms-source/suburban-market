import { ColorSwatch } from "./ColorSwatch";

type RecipeCardProps = {
  mixName: string;
  mixHex: string;
  ratioLine: string;
  closestName: string;
  closestHex: string;
  isCustomBlend: boolean;
  tagline?: string;
  onUse?: () => void;
  compact?: boolean;
};

export function RecipeCard({
  mixName,
  mixHex,
  ratioLine,
  closestName,
  closestHex,
  isCustomBlend,
  tagline,
  onUse,
  compact = false,
}: RecipeCardProps) {
  return (
    <div
      className={`rounded-xl border border-brown/10 bg-white p-4 ${
        onUse
          ? "cursor-pointer transition hover:border-brown/30 hover:shadow-sm"
          : ""
      }`}
      onClick={onUse}
      onKeyDown={
        onUse
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onUse();
            }
          : undefined
      }
      role={onUse ? "button" : undefined}
      tabIndex={onUse ? 0 : undefined}
    >
      <div className="flex gap-4">
        <ColorSwatch hex={mixHex} size={compact ? "md" : "lg"} className="flex-1" />
        {!compact && (
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
            <h3 className="font-serif text-lg font-semibold text-brown">
              {mixName}
            </h3>
            {tagline && (
              <p className="text-sm italic text-brown/60">{tagline}</p>
            )}
          </div>
        )}
      </div>

      {compact && (
        <>
          <h3 className="mt-3 font-serif text-base font-semibold text-brown">
            {mixName}
          </h3>
          {tagline && (
            <p className="text-sm italic text-brown/60">{tagline}</p>
          )}
        </>
      )}

      <p className="mt-3 text-sm text-brown/70">{ratioLine}</p>

      <div className="mt-4 rounded-lg bg-cream p-3">
        {isCustomBlend ? (
          <p className="text-sm font-medium text-terracotta">
            No close match — this is a custom blend!
          </p>
        ) : (
          <div className="flex items-center gap-3">
            <ColorSwatch hex={closestHex} size="sm" />
            <div>
              <p className="text-xs uppercase tracking-wide text-brown/50">
                Closest Fusion match
              </p>
              <p className="font-medium text-brown">{closestName}</p>
            </div>
          </div>
        )}
      </div>

      {onUse && (
        <p className="mt-3 text-xs text-brown/40">Tap to open in Mixer →</p>
      )}
    </div>
  );
}
