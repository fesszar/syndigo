export type WidgetType = 
  | 'images'
  | 'documents'
  | 'videos'
  | 'feature-sets'
  | '360-view'
  | 'carousel'
  | 'interactive-tour'
  | 'comparison-table'
  | 'specification-table'
  | 'text-html'
  | 'iframe';

export type WidgetSection = 'hero' | 'inline';

export interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  tag?: string;
  isActive: boolean;
  content: WidgetContent;
  order: number;
  sections: WidgetSection[]; // Widget can appear in hero, inline, or both
  // Widget linking for copy/sync functionality
  sourceId?: string; // ID of the original widget this was copied from
  isLinked?: boolean; // If true, edits sync globally; if false, edits are independent
  context?: 'toolbar' | 'hotspot' | 'inline'; // Where this widget lives
  retailerId?: string; // For hotspot widgets - which retailer this belongs to
}

export type VideoLayout = 'focused' | 'slider' | 'grid' | 'stacked';
export type ImageLayout = 'focused' | 'slider';

export type IncludeOn = 'inline' | 'hotspot' | 'toolbar';

export interface ImageItem {
  id: string;
  url: string;
  caption?: string;
  description?: string;
  altText?: string;
  link?: string;
  width?: number;
  height?: number;
}

export const CONTENT_TAGS = [
  'Product Images',
  'Lifestyle',
  'Features',
  'Packaging',
  'Comparison',
  'How To',
  'Other',
] as const;

export type ContentTag = typeof CONTENT_TAGS[number];

export interface VideoItem {
  id: string;
  url: string;
  caption: string;
  description: string;
  reportingCode: string;
  snapshotUrl?: string;
  duration?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export interface VideoSettings {
  showCaptions?: boolean;
  showDescriptions?: boolean;
  allowFullscreen?: boolean;
  showControls?: boolean;
  aspectRatio?: '16:9' | '4:3' | '1:1' | '9:16';
  thumbnailPosition?: 'left' | 'right' | 'bottom';
  maxVideosVisible?: number;
}

export interface HotspotPosition {
  x: number;
  y: number;
}

export interface WidgetContent {
  header?: string;
  description?: string;
  images?: string[];
  imageItems?: ImageItem[];
  imageLayout?: ImageLayout;
  contentTag?: ContentTag;
  includeOn?: IncludeOn[];
  videoUrl?: string;
  videoLayout?: VideoLayout;
  videoSettings?: VideoSettings;
  videos?: VideoItem[];
  features?: Feature[];
  specifications?: Specification[];
  items?: CarouselItem[];
  // Feature Set specific settings
  featureLayout?: 'horizontal' | 'vertical';
  featureColumns?: number;
  horizontalAlignment?: 'image-left' | 'image-right' | 'alternating';
  showIcons?: boolean;
  iconStyle?: 'circle' | 'square' | 'none';
  showBullets?: boolean;
  bulletStyle?: 'numbers' | 'dots' | 'none';
  expandFirst?: boolean;
  imagePosition?: 'left' | 'right' | 'top' | 'none';
  // Hotspot specific properties
  hotspotPosition?: HotspotPosition;
  hotspotIcon?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
  imageUrl?: string;
  caption?: string;
  altText?: string;
  link?: string;
  linkAccessibilityText?: string;
  reportingCode?: string;
}

export interface Specification {
  id: string;
  label: string;
  value: string;
}

export interface CarouselItem {
  id: string;
  image: string;
  title: string;
  description?: string;
}

export interface WidgetTypeConfig {
  type: WidgetType;
  label: string;
  description: string;
  icon: string;
  defaultContent: Partial<WidgetContent>;
}

// Hero widgets - subset available in hero section
export const HERO_WIDGET_TYPES: WidgetType[] = [
  'images',
  'documents',
  'videos',
  'feature-sets',
  '360-view',
  'carousel',
  'interactive-tour',
  'text-html',
];

// Inline widgets - all widget types available
export const INLINE_WIDGET_TYPES: WidgetType[] = [
  'images',
  'documents',
  'videos',
  'feature-sets',
  '360-view',
  'carousel',
  'interactive-tour',
  'text-html',
  'comparison-table',
  'specification-table',
  'iframe',
];

export const WIDGET_TYPES: WidgetTypeConfig[] = [
  {
    type: 'images',
    label: 'Images',
    description: 'Image gallery or single image',
    icon: 'ImageIcon',
    defaultContent: {
      header: 'Images',
      imageItems: [],
      imageLayout: 'focused',
      // includeOn is set dynamically based on where widget is created
    },
  },
  {
    type: 'documents',
    label: 'Documents',
    description: 'Downloadable documents and files',
    icon: 'FileText',
    defaultContent: {
      header: 'Documents',
    },
  },
  {
    type: 'videos',
    label: 'Videos',
    description: 'Embed video content',
    icon: 'Video',
    defaultContent: {
      header: 'Videos',
      videoLayout: 'focused',
      videos: [],
    },
  },
  {
    type: 'feature-sets',
    label: 'Feature Sets',
    description: 'Highlight key product features',
    icon: 'LayoutList',
    defaultContent: {
      header: 'Feature Set Title',
      features: [
        { id: '1', title: 'Feature 1', description: 'Enter the feature description here. This is just placeholder text for this feature, meant to highlight a feature of this product.' },
        { id: '2', title: 'Feature 2', description: 'Enter the feature description here. This is just placeholder text for this feature, meant to highlight a feature of this product.' },
        { id: '3', title: 'Feature 3', description: 'Enter the feature description here. This is just placeholder text for this feature, meant to highlight a feature of this product.' },
        { id: '4', title: 'Feature 4', description: 'Enter the feature description here. This is just placeholder text for this feature, meant to highlight a feature of this product.' },
      ],
    },
  },
  {
    type: '360-view',
    label: '360° View',
    description: 'Interactive 360 degree spin view',
    icon: 'RotateCw',
    defaultContent: {
      header: '360° View',
      images: [],
    },
  },
  {
    type: 'carousel',
    label: 'Carousel',
    description: 'Scrollable image or content carousel',
    icon: 'GalleryHorizontal',
    defaultContent: {
      header: 'Carousel',
      items: [],
    },
  },
  {
    type: 'interactive-tour',
    label: 'Interactive Tour',
    description: 'Guided interactive product tour',
    icon: 'MousePointerClick',
    defaultContent: {
      header: 'Interactive Tour',
    },
  },
  {
    type: 'comparison-table',
    label: 'Comparison Table',
    description: 'Compare product variants',
    icon: 'TableProperties',
    defaultContent: {
      header: 'Product Comparison',
    },
  },
  {
    type: 'specification-table',
    label: 'Specification Table',
    description: 'Technical specifications table',
    icon: 'Table',
    defaultContent: {
      header: 'Technical Specifications',
      specifications: [
        { id: '1', label: 'Dimension', value: '10 x 5 x 3 inches' },
        { id: '2', label: 'Weight', value: '2.5 lbs' },
        { id: '3', label: 'Material', value: 'Premium Aluminum' },
      ],
    },
  },
  {
    type: 'text-html',
    label: 'Text/HTML',
    description: 'Rich text or HTML content section',
    icon: 'Code',
    defaultContent: {
      header: 'Section Title',
      description: 'Add your content here.',
    },
  },
  {
    type: 'iframe',
    label: 'iFrame',
    description: 'Embed external content via iframe',
    icon: 'Code2',
    defaultContent: {
      header: 'Embedded Content',
    },
  },
];
