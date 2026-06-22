// Single source of truth for motion across the site.
// Keep entrances on ONE curve, duration, and travel distance so the whole
// page reads as one intentional system — not a patchwork of timings.

/** Standard ease-out curve for all entrance animations. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const

/** Standard duration (seconds) for entrance animations. */
export const DURATION = 0.7

/** Standard travel distance (px) for fade/slide entrances. */
export const DISTANCE = 36

/** Standard spring for interactive hover/tap micro-interactions (buttons, cards). */
export const SPRING = { type: 'spring', stiffness: 380, damping: 22 } as const
