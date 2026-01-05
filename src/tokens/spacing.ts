/**
 * Spacing Tokens
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 13498:371
 * 
 * Spacing tokens use numeric naming based on pixel values.
 * Do not invent new spacing values - all must come from Figma.
 */

export const spacing = {
  0: '0px',
  2: '2px',
  4: '4px',
  6: '6px',
  8: '8px',
  12: '12px',
  16: '16px',
  24: '24px',
  32: '32px',
  48: '48px',
  64: '64px',
} as const;

export type Spacing = typeof spacing;
export type SpacingKey = keyof typeof spacing;

/**
 * Spacing scale reference (px values)
 * 0  = 0px   - No spacing
 * 2  = 2px   - Micro spacing (borders, fine adjustments)
 * 4  = 4px   - Tight spacing (inline elements, compact gaps)
 * 6  = 6px   - Small spacing (icon gaps, tight padding)
 * 8  = 8px   - Compact spacing (button padding, small gaps)
 * 12 = 12px  - Default small spacing (compact padding)
 * 16 = 16px  - Default spacing (standard padding, gaps)
 * 24 = 24px  - Medium spacing (card padding, section gaps)
 * 32 = 32px  - Large spacing (section padding)
 * 48 = 48px  - Extra large spacing (major sections)
 * 64 = 64px  - Page spacing (page sections, major separations)
 */
