/**
 * Radius Tokens
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk
 * 
 * Border radius tokens for rounded corners.
 * Do not invent new radius values - all must come from Figma.
 */

export const radius = {
  2: '2px',
  4: '4px',
  8: '8px',
  12: '12px',
  16: '16px',
} as const;

export type Radius = typeof radius;
export type RadiusKey = keyof typeof radius;

/**
 * Radius scale reference (px values)
 * 2  = 2px  - Micro radius (small indicators)
 * 4  = 4px  - Small radius (badges, tags, buttons, inputs)
 * 8  = 8px  - Medium radius (cards, small containers)
 * 12 = 12px - Large radius (panels, modals)
 * 16 = 16px - Extra large radius (major containers)
 */
