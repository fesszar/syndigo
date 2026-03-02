// Hotspot Experience Types
// Image-grouped experience architecture for per-retailer hotspot configuration

export interface WidgetHotspotPosition {
  widgetId: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
}

export interface HotspotExperience {
  id: string;
  name: string;
  // The reference image users upload to guide icon placement — NOT published
  mockImageUrl?: string;
  mockImageName?: string;
  // Retailer IDs assigned to this experience
  assignedRetailerIds: string[];
  // Per-experience widget IDs — which widgets are active for this experience
  // If empty (default), all hotspot widgets are included
  widgetIds: string[];
  // Link status per widget: 'linked' = edits sync globally, 'unlinked' = independent copy
  widgetLinks: Record<string, 'linked' | 'unlinked'>;
  // Hotspot positions per widget
  hotspotPositions: WidgetHotspotPosition[];
  // Hotspot icon overrides per widget
  iconOverrides: Record<string, string>; // widgetId -> iconId
  // Per-variant deactivated widget IDs (widgets toggled off for this specific variant)
  inactiveWidgetIds: string[];
  // Whether hotspots are active for this experience
  isActive: boolean;
  createdAt: Date;
}

// The full hotspot configuration for a product
export interface HotspotConfiguration {
  // Default experience — all unassigned hotspot-supporting retailers fall back here
  defaultExperience: HotspotExperience;
  // Additional named experiences (each covering specific retailers)
  experiences: HotspotExperience[];
}

// Create a blank experience
export function createExperience(
  id: string,
  name: string,
  assignedRetailerIds: string[] = [],
  widgetIds: string[] = [],
  widgetLinks: Record<string, 'linked' | 'unlinked'> = {}
): HotspotExperience {
  return {
    id,
    name,
    mockImageUrl: undefined,
    mockImageName: undefined,
    assignedRetailerIds,
    widgetIds,
    widgetLinks,
    hotspotPositions: [],
    iconOverrides: {},
    inactiveWidgetIds: [],
    isActive: true,
    createdAt: new Date(),
  };
}

// Get the experience for a given retailer
export function getExperienceForRetailer(
  config: HotspotConfiguration,
  retailerId: string
): HotspotExperience {
  const found = config.experiences.find(e => e.assignedRetailerIds.includes(retailerId));
  return found ?? config.defaultExperience;
}

// Check if a retailer is in any non-default experience
export function isRetailerOverridden(
  config: HotspotConfiguration,
  retailerId: string
): boolean {
  return config.experiences.some(e => e.assignedRetailerIds.includes(retailerId));
}

// Get all unassigned retailer IDs (those that fall through to default)
export function getUnassignedRetailerIds(
  config: HotspotConfiguration,
  allRetailerIds: string[]
): string[] {
  const assignedIds = config.experiences.flatMap(e => e.assignedRetailerIds);
  return allRetailerIds.filter(id => !assignedIds.includes(id));
}
