// Hotspot Override Types
// Manages default vs retailer-specific hotspot configurations

export interface HotspotOverride {
  retailerId: string;
  mockImage: string | null;
  widgetIds: string[]; // Widget IDs specific to this override
  createdAt: Date;
}

export interface HotspotConfiguration {
  // Default setup - applies to all retailers unless overridden
  default: {
    mockImage: string | null;
    widgetIds: string[]; // Default widget IDs
  };
  // Retailer-specific overrides
  overrides: Record<string, HotspotOverride>;
}

export type RetailerHotspotStatus = 'uses-default' | 'has-override';

export interface RetailerWithStatus {
  id: string;
  name: string;
  supportsHotspots: boolean;
  hotspotStatus: RetailerHotspotStatus;
}

// Check if a retailer has an override
export function hasRetailerOverride(
  config: HotspotConfiguration,
  retailerId: string
): boolean {
  return retailerId in config.overrides;
}

// Get widgets for a retailer (override or default)
export function getRetailerWidgetIds(
  config: HotspotConfiguration,
  retailerId: string
): string[] {
  if (hasRetailerOverride(config, retailerId)) {
    return config.overrides[retailerId].widgetIds;
  }
  return config.default.widgetIds;
}

// Get mock image for a retailer (override or default)
export function getRetailerMockImage(
  config: HotspotConfiguration,
  retailerId: string
): string | null {
  if (hasRetailerOverride(config, retailerId)) {
    return config.overrides[retailerId].mockImage;
  }
  return config.default.mockImage;
}
