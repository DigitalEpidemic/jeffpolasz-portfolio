#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Post-build script to extract metadata from Next.js JavaScript bundles
 * and inject them as proper HTML meta tags in the head section.
 */

function extractMetadataFromJS(htmlContent) {
  // Look for the specific pattern: 17:{"metadata":[...
  const metadataRegex =
    /\d+:\{\\"metadata\\":\[.*?\],\\"error\\":null,\\"digest\\":\\".*?\\"\}/s;
  const match = htmlContent.match(metadataRegex);

  if (!match) {
    // console.log(' \x1b[33m!\x1b[0m No metadata found in JavaScript');
    return null;
  }

  try {
    // Extract the JSON string and clean it up
    let jsonString = match[0];

    // Parse the outer object to get the metadata array
    const outerMatch = jsonString.match(/\d+:(.+)/);
    if (!outerMatch) {
      // console.log(' \x1b[33m!\x1b[0m Could not extract outer JSON');
      return null;
    }

    // Unescape the JSON string
    let escapedJson = outerMatch[1];
    escapedJson = escapedJson.replace(/\\\\/g, '\\');
    escapedJson = escapedJson.replace(/\\\"/g, '"');

    const outerObject = JSON.parse(escapedJson);
    const metadataArray = outerObject.metadata;

    const metaTags = [];

    if (Array.isArray(metadataArray) && metadataArray.length > 0) {
      metadataArray.forEach((item) => {
        if (Array.isArray(item) && item.length >= 3) {
          const [, tagType, , attributes] = item;

          if (tagType === 'title' && attributes && attributes.children) {
            metaTags.push(`<title>${escapeHtml(attributes.children)}</title>`);
          } else if (tagType === 'meta' && attributes) {
            const attrs = [];
            Object.entries(attributes).forEach(([key, value]) => {
              if (value && typeof value === 'string') {
                attrs.push(`${key}="${escapeHtml(value)}"`);
              }
            });
            if (attrs.length > 0) {
              metaTags.push(`<meta ${attrs.join(' ')} />`);
            }
          } else if (tagType === 'link' && attributes) {
            const attrs = [];
            Object.entries(attributes).forEach(([key, value]) => {
              if (value && typeof value === 'string') {
                attrs.push(`${key}="${escapeHtml(value)}"`);
              }
            });
            if (attrs.length > 0) {
              metaTags.push(`<link ${attrs.join(' ')} />`);
            }
          }
        }
      });
    }

    // console.log(` \x1b[32m✓\x1b[0m Extracted ${metaTags.length} meta tags`);
    return metaTags;
  } catch (error) {
    console.error(' \x1b[31m✗\x1b[0m Error parsing metadata:', error.message);
    return null;
  }
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function injectMetadata(htmlContent, metaTags) {
  if (!metaTags || metaTags.length === 0) {
    return htmlContent;
  }

  // Find the insertion point - after the existing meta tags but before closing </head>
  const headEndRegex = /<\/head>/;
  // Keep it minified - no line breaks, just join with nothing
  const metaTagsHtml = metaTags.join('');

  return htmlContent.replace(headEndRegex, `${metaTagsHtml}</head>`);
}

function processHtmlFile(filePath) {
  // console.log(` \x1b[36m▶\x1b[0m Processing: ${filePath}`);

  try {
    const htmlContent = fs.readFileSync(filePath, 'utf8');

    // Extract metadata from JavaScript
    const metaTags = extractMetadataFromJS(htmlContent);

    if (metaTags && metaTags.length > 0) {
      // Replace the default layout meta tags with page-specific ones
      let updatedContent = htmlContent;

      // Remove the default title and meta tags from layout - handle both quote styles
      updatedContent = updatedContent.replace(
        /<title>Jeffrey Polasz - Portfolio<\/title>/,
        ''
      );
      updatedContent = updatedContent.replace(
        /<meta name="description" content="[^"]*"\/>/g,
        ''
      );
      updatedContent = updatedContent.replace(
        /<meta name="author" content="Jeffrey Polasz"\/>/g,
        ''
      );
      updatedContent = updatedContent.replace(
        /<meta name="keywords" content="[^"]*"\/>/g,
        ''
      );
      updatedContent = updatedContent.replace(
        /<link rel="canonical" href="[^"]*"\/>/g,
        ''
      );

      // Remove OpenGraph tags
      updatedContent = updatedContent.replace(
        /<meta property="og:[^"]*" content="[^"]*"\/>/g,
        ''
      );

      // Remove Twitter tags
      updatedContent = updatedContent.replace(
        /<meta name="twitter:[^"]*" content="[^"]*"\/>/g,
        ''
      );

      // Inject the new metadata
      updatedContent = injectMetadata(updatedContent, metaTags);

      // Write the updated content back
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      // console.log(` \x1b[32m✓\x1b[0m Updated ${filePath} with ${metaTags.length} meta tags`);
      return { success: true }; // Return success
    } else {
      // console.log(` \x1b[33m!\x1b[0m No metadata to inject for ${filePath}`);
      return { success: false, reason: 'no metadata found' }; // Return failure with reason
    }
  } catch (error) {
    console.error(
      ` \x1b[31m✗\x1b[0m Error processing ${filePath}:`,
      error.message
    );
    return { success: false, reason: `error: ${error.message}` }; // Return failure with error
  }
}

function findHtmlFiles(dir, files = []) {
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      findHtmlFiles(fullPath, files);
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  });

  return files;
}

function main() {
  const outDir = path.join(process.cwd(), 'out');

  // Check for silent flag
  const silent =
    process.argv.includes('--silent') || process.argv.includes('-s');

  if (!fs.existsSync(outDir)) {
    console.error(
      ' \x1b[31m✗\x1b[0m Output directory does not exist. Run build first.'
    );
    process.exit(1);
  }
  console.log(`   Fixing metadata tags ...`);

  // Find all HTML files
  const htmlFiles = findHtmlFiles(outDir);

  console.log(` \x1b[32m✓\x1b[0m Found ${htmlFiles.length} HTML files`);
  console.log(' \x1b[32m✓\x1b[0m Injecting metadata into HTML files');

  let processedCount = 0;
  const skippedFiles = [];

  htmlFiles.forEach((file) => {
    // Skip index.html as it already has metadata from layout.tsx
    if (path.basename(file) === 'index.html') {
      if (!silent) {
        console.log(
          `    ${path.basename(file)}: \x1b[33mskipped\x1b[0m (hardcoded in layout.tsx)`
        );
      }
      skippedFiles.push({
        file: path.basename(file),
        reason: 'metadata was already hardcoded in layout.tsx',
      });
      return;
    }

    const result = processHtmlFile(file);
    if (result.success) {
      processedCount++;
      if (!silent) {
        console.log(`    ${path.basename(file)}: \x1b[32msuccess\x1b[0m`);
      }
    } else {
      if (!silent) {
        console.log(
          `    ${path.basename(file)}: \x1b[33mskipped\x1b[0m (${result.reason})`
        );
      }
      skippedFiles.push({ file: path.basename(file), reason: result.reason });
    }
  });

  // Final summary
  const totalFiles = htmlFiles.length;
  const skippedCount = skippedFiles.length;

  console.log(
    ` \x1b[32m✓\x1b[0m Processed ${totalFiles} HTML file${totalFiles !== 1 ? 's' : ''}`
  );

  if (processedCount > 0) {
    console.log(
      `    \x1b[32m${processedCount}\x1b[0m file${processedCount !== 1 ? 's' : ''} updated with metadata`
    );
  }

  if (skippedCount > 0) {
    console.log(
      `    \x1b[33m${skippedCount}\x1b[0m file${skippedCount !== 1 ? 's' : ''} skipped`
    );
  }

  console.log(' \x1b[32m✓\x1b[0m Metadata processing complete');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { processHtmlFile, extractMetadataFromJS, injectMetadata };
