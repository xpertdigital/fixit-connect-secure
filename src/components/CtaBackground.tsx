import Silk from "./Silk";

interface CtaBackgroundProps {
  color?: string;
  speed?: number;
  scale?: number;
  noiseIntensity?: number;
  rotation?: number;
  className?: string;
}

/**
 * Animated Silk background designed to sit behind CTA section content.
 * Place this as the first child of a `relative overflow-hidden` container,
 * then put your CTA content in a sibling with `relative z-10`.
 */
export function CtaBackground({
  color = "#1e3a8a",
  speed = 4,
  scale = 1,
  noiseIntensity = 1.4,
  rotation = 0,
  className = "",
}: CtaBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      <Silk
        color={color}
        speed={speed}
        scale={scale}
        noiseIntensity={noiseIntensity}
        rotation={rotation}
      />
    </div>
  );
}

export default CtaBackground;
