import { GRID_BG, NOISE_BG_URL } from "@/lib/brand";

export default function PremiumHeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Animated technical grid, faded toward the edges */}
      <div
        className="absolute inset-0 animate-grid-pan opacity-40"
        style={{
          ...GRID_BG,
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 15%, black 25%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 15%, black 25%, transparent 75%)",
        }}
      />

      {/* Drifting aurora glow */}
      <div className="animate-aurora-1 absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[#29B9F2]/20 blur-[130px]" />
      <div className="animate-aurora-2 absolute right-1/4 top-6 h-80 w-80 rounded-full bg-[#25D9C7]/15 blur-[120px]" />
      <div
        className="animate-aurora-1 absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-[#84D96C]/10 blur-[140px]"
        style={{ animationDelay: "-6s" }}
      />

      {/* Film grain for depth */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: NOISE_BG_URL }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,transparent_40%,rgba(0,0,0,0.45)_100%)]" />
    </div>
  );
}
