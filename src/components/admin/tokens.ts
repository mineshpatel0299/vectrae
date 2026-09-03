/**
 * Shared class strings for the admin panel.
 *
 * The panel is a dark, data-dense surface that deliberately reads as a separate
 * product from the marketing site, so its chrome is defined here once rather
 * than re-typed per page. Contrast pairs are chosen to clear WCAG AA on the
 * #08090A ground: body copy at white/70 or brighter, never dimmer.
 */

export const SURFACE = "rounded-2xl border border-white/10 bg-white/[0.025]";

export const CARD = `${SURFACE} p-5 sm:p-6`;

export const INPUT =
  "w-full rounded-xl border border-white/12 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors duration-200 focus:border-[#29B9F2] focus:ring-2 focus:ring-[#29B9F2]/25 disabled:cursor-not-allowed disabled:opacity-50";

export const LABEL = "block text-xs font-semibold uppercase tracking-wider text-white/50";

export const BUTTON_PRIMARY =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-black transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29B9F2] disabled:cursor-not-allowed disabled:opacity-55";

export const BUTTON_GHOST =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/12 px-5 text-sm font-medium text-white/80 transition-colors duration-200 hover:border-white/25 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29B9F2] disabled:cursor-not-allowed disabled:opacity-55";

export const BUTTON_DANGER =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-red-500/35 px-5 text-sm font-medium text-red-300 transition-colors duration-200 hover:border-red-500/60 hover:bg-red-500/10 hover:text-red-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 disabled:cursor-not-allowed disabled:opacity-55";

export const TABLE_HEAD =
  "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/45";

export const TABLE_CELL = "px-4 py-4 align-top text-sm text-white/75";
