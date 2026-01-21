/**
 * Icon Conversion Script
 * Extracts SVG paths from React icon components and generates a Lit-compatible icon paths file
 * 
 * Usage: node scripts/convert-icons.js
 */

const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, '../../src/components/Icons');
const OUTPUT_FILE = path.join(__dirname, '../src/components/icon-paths.ts');

function toKebabCase(str) {
  return str.replace(/Icon$/, '').replace(/([a-z])([A-Z])/g, '$1-$2').replace(/([A-Z])([A-Z][a-z])/g, '$1-$2').toLowerCase();
}

function extractSvgContent(content) {
  const svgMatch = content.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  if (!svgMatch) return null;
  const svgContent = svgMatch[1];
  const elements = [];
  
  const pathMatches = svgContent.matchAll(/<path\s+([^>]+)\/>/g);
  for (const match of pathMatches) {
    const d = match[1].match(/d="([^"]+)"/)?.[1];
    if (d) elements.push({ type: 'path', d });
  }

  const circleMatches = svgContent.matchAll(/<circle\s+([^>]+)\/>/g);
  for (const match of circleMatches) {
    const attrs = match[1];
    const cx = attrs.match(/cx="?([^"\s]+)"?/)?.[1];
    const cy = attrs.match(/cy="?([^"\s]+)"?/)?.[1];
    const r = attrs.match(/\sr="?([^"\s]+)"?/)?.[1];
    if (cx && cy && r) elements.push({ type: 'circle', cx, cy, r });
  }

  return elements.length > 0 ? elements : null;
}

function generateTemplate(elements) {
  if (!elements) return null;
  return elements.map(el => {
    if (el.type === 'path') return `<path d="${el.d}" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
    if (el.type === 'circle') return `<circle cx="${el.cx}" cy="${el.cy}" r="${el.r}" stroke="currentColor" stroke-width="1.5" fill="none"/>`;
    return '';
  }).join('');
}

function convertIcons() {
  console.log('Starting icon conversion...');
  const iconFiles = fs.readdirSync(ICONS_DIR).filter(f => f.endsWith('Icon.tsx'));
  const icons = {};
  
  for (const file of iconFiles) {
    const content = fs.readFileSync(path.join(ICONS_DIR, file), 'utf-8');
    const name = toKebabCase(file.replace('.tsx', ''));
    const template = generateTemplate(extractSvgContent(content));
    if (template) icons[name] = template;
  }

  const output = `export const iconPaths: Record<string, string> = ${JSON.stringify(icons, null, 2)};\nexport const availableIconNames = Object.keys(iconPaths);`;
  
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, output);
  console.log(`Generated ${Object.keys(icons).length} icons`);
}

convertIcons();
