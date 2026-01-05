/**
 * Logo Assets
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk
 * 
 * These are placeholder URLs from Figma MCP export.
 * For production, replace with actual hosted asset URLs or inline SVGs.
 */

// Syndigo Black Logo Assets
export const syndigoIconBlack = '/assets/logos/syndigo-icon-black.svg';
export const syndigoWordmarkBlack = '/assets/logos/syndigo-wordmark-black.svg';

// Syndigo Blue Logo Assets
export const syndigoIconBlue = '/assets/logos/syndigo-icon-blue.svg';
export const syndigoWordmarkBlue = '/assets/logos/syndigo-wordmark-blue.svg';

// Syndigo White Logo Assets
export const syndigoIconWhite = '/assets/logos/syndigo-icon-white.svg';
export const syndigoWordmarkWhite = '/assets/logos/syndigo-wordmark-white.svg';

// White Label Logo Assets
export const whiteLabelLogo = '/assets/logos/white-label-logo.png';

/**
 * Logo asset map for programmatic access
 */
export const logoAssets = {
  syndigo: {
    black: {
      icon: syndigoIconBlack,
      wordmark: syndigoWordmarkBlack,
    },
    blue: {
      icon: syndigoIconBlue,
      wordmark: syndigoWordmarkBlue,
    },
    white: {
      icon: syndigoIconWhite,
      wordmark: syndigoWordmarkWhite,
    },
  },
  whiteLabel: {
    fullColor: whiteLabelLogo,
  },
} as const;

export type LogoAssets = typeof logoAssets;
