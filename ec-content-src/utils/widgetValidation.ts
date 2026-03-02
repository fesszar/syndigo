import { Widget, WidgetType } from '@/types/widget';

export interface WidgetError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ValidationResult {
  isValid: boolean;
  errors: WidgetError[];
  warnings: WidgetError[];
}

const ALLOWED_IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];
const ALLOWED_VIDEO_DOMAINS = ['youtube.com', 'youtu.be', 'vimeo.com', 'wistia.com'];

function getFileExtension(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const ext = pathname.split('.').pop()?.toLowerCase() || '';
    return ext;
  } catch {
    return '';
  }
}

function isValidImageFormat(url: string): boolean {
  if (!url) return true; // Empty is handled separately
  const ext = getFileExtension(url);
  if (!ext) return true; // Can't determine format, allow it
  return ALLOWED_IMAGE_FORMATS.includes(ext);
}

function isValidVideoUrl(url: string): boolean {
  if (!url) return true;
  try {
    const parsedUrl = new URL(url);
    return ALLOWED_VIDEO_DOMAINS.some(domain => 
      parsedUrl.hostname.includes(domain)
    );
  } catch {
    return false;
  }
}

function validateImages(widget: Widget): WidgetError[] {
  const errors: WidgetError[] = [];
  
  // Check both new imageItems array and legacy images array
  const hasImageItems = widget.content.imageItems && widget.content.imageItems.length > 0;
  const hasLegacyImages = widget.content.images?.length && widget.content.images[0];
  
  if (!hasImageItems && !hasLegacyImages) {
    errors.push({
      field: 'images',
      message: 'At least one image is required',
      severity: 'error',
    });
  } else if (hasImageItems) {
    widget.content.imageItems?.forEach((item, index) => {
      if (item.url && !isValidImageFormat(item.url)) {
        errors.push({
          field: `imageItems.${index}`,
          message: `Image ${index + 1} has invalid format`,
          severity: 'error',
        });
      }
      // Check for missing alt text on images
      if (item.url && !item.altText?.trim()) {
        errors.push({
          field: `imageItems.${index}.altText`,
          message: `Image ${index + 1} is missing alt text`,
          severity: 'warning',
        });
      }
    });
  } else if (hasLegacyImages) {
    widget.content.images?.forEach((url, index) => {
      if (url && !isValidImageFormat(url)) {
        errors.push({
          field: `images.${index}`,
          message: `Image ${index + 1} has invalid format`,
          severity: 'error',
        });
      }
    });
  }

  if (!widget.content.header?.trim()) {
    errors.push({
      field: 'header',
      message: 'Section header is recommended for accessibility',
      severity: 'warning',
    });
  }

  return errors;
}

function validateVideos(widget: Widget): WidgetError[] {
  const errors: WidgetError[] = [];
  
  const videos = widget.content.videos;
  
  if (!videos?.length) {
    if (!widget.content.videoUrl?.trim()) {
      errors.push({
        field: 'videos',
        message: 'At least one video is required',
        severity: 'error',
      });
    } else if (!isValidVideoUrl(widget.content.videoUrl)) {
      errors.push({
        field: 'videoUrl',
        message: 'Invalid video URL. Supported: YouTube, Vimeo, Wistia',
        severity: 'error',
      });
    }
  } else {
    videos.forEach((video, index) => {
      if (!video.url?.trim()) {
        errors.push({
          field: `videos.${index}.url`,
          message: `Video ${index + 1} is missing a URL`,
          severity: 'warning',
        });
      } else if (!isValidVideoUrl(video.url)) {
        errors.push({
          field: `videos.${index}.url`,
          message: `Video ${index + 1} has invalid URL. Supported: YouTube, Vimeo, Wistia`,
          severity: 'warning',
        });
      }
      
      if (!video.caption?.trim()) {
        errors.push({
          field: `videos.${index}.caption`,
          message: `Video ${index + 1} is missing a caption`,
          severity: 'warning',
        });
      }
    });
  }

  if (!widget.content.header?.trim()) {
    errors.push({
      field: 'header',
      message: 'Video section title is recommended for SEO',
      severity: 'warning',
    });
  }

  return errors;
}

function validateFeatureSets(widget: Widget): WidgetError[] {
  const errors: WidgetError[] = [];
  
  if (!widget.content.features?.length) {
    errors.push({
      field: 'features',
      message: 'At least one feature is required',
      severity: 'error',
    });
  } else {
    widget.content.features.forEach((feature, index) => {
      if (!feature.title?.trim()) {
        errors.push({
          field: `features.${index}.title`,
          message: `Feature ${index + 1} is missing a title`,
          severity: 'error',
        });
      }
      if (!feature.description?.trim()) {
        errors.push({
          field: `features.${index}.description`,
          message: `Feature ${index + 1} is missing a description`,
          severity: 'warning',
        });
      }
    });
  }

  return errors;
}

function validateSpecificationTable(widget: Widget): WidgetError[] {
  const errors: WidgetError[] = [];
  
  if (!widget.content.specifications?.length) {
    errors.push({
      field: 'specifications',
      message: 'At least one specification is required',
      severity: 'error',
    });
  } else {
    widget.content.specifications.forEach((spec, index) => {
      if (!spec.label?.trim()) {
        errors.push({
          field: `specifications.${index}.label`,
          message: `Specification ${index + 1} is missing a label`,
          severity: 'error',
        });
      }
      if (!spec.value?.trim()) {
        errors.push({
          field: `specifications.${index}.value`,
          message: `Specification ${index + 1} is missing a value`,
          severity: 'error',
        });
      }
    });
  }

  return errors;
}

function validateTextHtml(widget: Widget): WidgetError[] {
  const errors: WidgetError[] = [];
  
  if (!widget.content.description?.trim()) {
    errors.push({
      field: 'description',
      message: 'Text content is required',
      severity: 'error',
    });
  }

  if (!widget.content.header?.trim()) {
    errors.push({
      field: 'header',
      message: 'Section heading is recommended for SEO',
      severity: 'warning',
    });
  }

  return errors;
}

function validateCarousel(widget: Widget): WidgetError[] {
  const errors: WidgetError[] = [];
  
  if (!widget.content.items?.length && !widget.content.images?.length) {
    errors.push({
      field: 'items',
      message: 'At least one item is required',
      severity: 'error',
    });
  }

  return errors;
}

function validateInteractiveTour(widget: Widget): WidgetError[] {
  const errors: WidgetError[] = [];
  
  if (!widget.content.header?.trim()) {
    errors.push({
      field: 'header',
      message: 'Interactive tour title is recommended',
      severity: 'warning',
    });
  }

  return errors;
}

function validate360View(widget: Widget): WidgetError[] {
  const errors: WidgetError[] = [];
  
  if (!widget.content.images?.length) {
    errors.push({
      field: 'images',
      message: 'Images are required for 360° view',
      severity: 'error',
    });
  }

  return errors;
}

function validateDocuments(widget: Widget): WidgetError[] {
  const errors: WidgetError[] = [];
  
  if (!widget.content.header?.trim()) {
    errors.push({
      field: 'header',
      message: 'Documents section title is recommended',
      severity: 'warning',
    });
  }

  return errors;
}

function validateIframe(widget: Widget): WidgetError[] {
  const errors: WidgetError[] = [];
  
  if (!widget.content.header?.trim()) {
    errors.push({
      field: 'header',
      message: 'iFrame title is recommended for accessibility',
      severity: 'warning',
    });
  }

  return errors;
}

function validateComparisonTable(widget: Widget): WidgetError[] {
  const errors: WidgetError[] = [];
  
  if (!widget.content.header?.trim()) {
    errors.push({
      field: 'header',
      message: 'Comparison table title is required',
      severity: 'warning',
    });
  }

  return errors;
}

const validators: Record<WidgetType, (widget: Widget) => WidgetError[]> = {
  'images': validateImages,
  'documents': validateDocuments,
  'videos': validateVideos,
  'feature-sets': validateFeatureSets,
  '360-view': validate360View,
  'carousel': validateCarousel,
  'interactive-tour': validateInteractiveTour,
  'comparison-table': validateComparisonTable,
  'specification-table': validateSpecificationTable,
  'text-html': validateTextHtml,
  'iframe': validateIframe,
};

export function validateWidget(widget: Widget): ValidationResult {
  const validator = validators[widget.type];
  const allErrors = validator ? validator(widget) : [];
  
  const errors = allErrors.filter(e => e.severity === 'error');
  const warnings = allErrors.filter(e => e.severity === 'warning');
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateAllWidgets(widgets: Widget[]): Map<string, ValidationResult> {
  const results = new Map<string, ValidationResult>();
  
  widgets.forEach(widget => {
    results.set(widget.id, validateWidget(widget));
  });
  
  return results;
}

export function getWidgetErrorCount(widgets: Widget[]): { errors: number; warnings: number } {
  let errors = 0;
  let warnings = 0;
  
  widgets.forEach(widget => {
    const result = validateWidget(widget);
    errors += result.errors.length;
    warnings += result.warnings.length;
  });
  
  return { errors, warnings };
}
