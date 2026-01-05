/**
 * Shadow/Elevation Tokens
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk
 * 
 * Shadow tokens for elevation and depth.
 * Do not invent new shadow values - all must come from Figma.
 */

export const shadow = {
  // Elevation shadows
  sm: '0px 1px 3px rgba(0, 0, 0, 0.1)',
  md: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  lg: '0px 14px 18px rgba(77, 92, 110, 0.15)',
  
  // Button shadows
  buttonPrimaryHover: '0px 0px 0px 3px rgba(45, 117, 226, 0.25)',
  buttonSecondaryDefault: '0px 1px 3px rgba(0, 0, 0, 0.1)',
  buttonSecondaryHover: '0px 1px 3px rgba(0, 0, 0, 0.1)',
  buttonCriticalHover: '0px 0px 0px 3px rgba(219, 58, 58, 0.25)',
} as const;

export type Shadow = typeof shadow;
export type ShadowKey = keyof typeof shadow;

/**
 * Shadow reference (from Figma)
 * 
 * sm                    - Small elevation (cards, inputs)
 * md                    - Medium elevation (dropdowns, tooltips)
 * lg                    - Large elevation (modals, dialogs)
 * buttonPrimaryHover    - Primary button hover state (blue glow)
 * buttonSecondaryDefault - Secondary button default state (subtle)
 * buttonSecondaryHover  - Secondary button hover state (subtle)
 * buttonCriticalHover   - Critical/danger button hover state (red glow)
 */
