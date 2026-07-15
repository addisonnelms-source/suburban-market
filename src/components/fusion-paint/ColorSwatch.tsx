type ColorSwatchProps = {
  hex: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "h-10 w-10",
  md: "h-16 w-16",
  lg: "h-32 w-full min-h-[8rem]",
};

export function ColorSwatch({
  hex,
  label,
  size = "md",
  className = "",
}: ColorSwatchProps) {
  return (
    <div className={`flex flex-col items-center gap-1.5 ${className}`}>
      <div
        className={`${sizes[size]} rounded-lg border border-brown/15 shadow-inner`}
        style={{ backgroundColor: hex }}
        title={label}
      />
      {label && (
        <span className="max-w-[8rem] text-center text-xs text-brown/70">
          {label}
        </span>
      )}
    </div>
  );
}
