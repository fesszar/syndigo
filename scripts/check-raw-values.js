#!/usr/bin/env node

/**
 * Guardrail Script: Check for Raw CSS Values
 * 
 * This script scans component source files and fails if it detects:
 * - Hex colors (#xxx, #xxxxxx)
 * - rgb( or rgba( color functions
 * - hsl( or hsla( color functions
 * - Hardcoded spacing/radius values (e.g., padding: 12px, margin: 8px, border-radius: 4px)
 * 
 * Usage: node scripts/check-raw-values.js
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const COMPONENTS_DIR = 'src/components';
const EXTENSIONS = ['.tsx', '.ts', '.css'];

// Patterns to detect raw values
const PATTERNS = [
  {
    name: 'Hex color',
    regex: /#(?:[0-9a-fA-F]{3}){1,2}\b/g,
    message: 'Use token CSS variables instead of hex colors',
  },
  {
    name: 'RGB color',
    regex: /\brgba?\s*\(/gi,
    message: 'Use token CSS variables instead of rgb/rgba',
  },
  {
    name: 'HSL color',
    regex: /\bhsla?\s*\(/gi,
    message: 'Use token CSS variables instead of hsl/hsla',
  },
  {
    name: 'Hardcoded spacing (padding)',
    regex: /padding\s*:\s*\d+px/gi,
    message: 'Use spacing tokens instead of hardcoded padding values',
  },
  {
    name: 'Hardcoded spacing (margin)',
    regex: /margin\s*:\s*-?\d+px/gi,
    message: 'Use spacing tokens instead of hardcoded margin values',
  },
  {
    name: 'Hardcoded spacing (gap)',
    regex: /gap\s*:\s*\d+px/gi,
    message: 'Use spacing tokens instead of hardcoded gap values',
  },
  {
    name: 'Hardcoded radius',
    regex: /border-radius\s*:\s*\d+px/gi,
    message: 'Use radius tokens instead of hardcoded border-radius values',
  },
];

// Files/patterns to ignore
const IGNORE_PATTERNS = [
  /\.d\.ts$/,
  /node_modules/,
  /dist/,
];

function shouldIgnore(filepath) {
  return IGNORE_PATTERNS.some(pattern => pattern.test(filepath));
}

function getAllFiles(dir, files = []) {
  try {
    const items = readdirSync(dir);
    for (const item of items) {
      const fullPath = join(dir, item);
      if (shouldIgnore(fullPath)) continue;

      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        getAllFiles(fullPath, files);
      } else if (EXTENSIONS.includes(extname(fullPath))) {
        files.push(fullPath);
      }
    }
  } catch (err) {
    // Directory doesn't exist yet, that's OK
  }
  return files;
}

function checkFile(filepath) {
  const content = readFileSync(filepath, 'utf-8');
  const lines = content.split('\n');
  const violations = [];

  lines.forEach((line, lineIndex) => {
    // Skip comments
    if (line.trim().startsWith('//') || line.trim().startsWith('*')) return;

    for (const pattern of PATTERNS) {
      const matches = line.match(pattern.regex);
      if (matches) {
        violations.push({
          file: filepath,
          line: lineIndex + 1,
          pattern: pattern.name,
          message: pattern.message,
          match: matches[0],
          content: line.trim(),
        });
      }
    }
  });

  return violations;
}

function main() {
  console.log('🔍 Checking for raw CSS values in components...\n');

  const files = getAllFiles(COMPONENTS_DIR);

  if (files.length === 0) {
    console.log('ℹ️  No component files found to check. This is OK for initial setup.\n');
    process.exit(0);
  }

  let allViolations = [];

  for (const file of files) {
    const violations = checkFile(file);
    allViolations = allViolations.concat(violations);
  }

  if (allViolations.length === 0) {
    console.log('✅ No raw CSS values detected. All components use tokens correctly.\n');
    process.exit(0);
  }

  console.log('❌ Found raw CSS values that should use design tokens:\n');

  for (const v of allViolations) {
    console.log(`  ${v.file}:${v.line}`);
    console.log(`    Pattern: ${v.pattern}`);
    console.log(`    Found: ${v.match}`);
    console.log(`    Line: ${v.content}`);
    console.log(`    Fix: ${v.message}\n`);
  }

  console.log(`\n❌ ${allViolations.length} violation(s) found. Please use design tokens instead.\n`);
  process.exit(1);
}

main();
