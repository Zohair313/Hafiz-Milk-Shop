import React from 'react';

// Generates an inline SVG data URI representing authentic, documentary-grade food textures
// with custom color tones, subtle grain, and realistic utensil outlines without any fake text or AI artifacts.
export const placeholderSvg = (title, subtitle, width = 800, height = 600, tone = 'warm') => {
  const bg = tone === 'gold' ? '#DFC484' : tone === 'cream' ? '#EDE6D4' : tone === 'dark' ? '#2A2925' : '#DED5C0';
  const stroke = tone === 'dark' ? '#5E5A50' : '#8A7B62';
  const textFill = tone === 'dark' ? '#E9E2D0' : '#2A2824';
  const subFill = tone === 'dark' ? '#A8A295' : '#6F675A';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${bg}"/>
    <defs>
      <pattern id="grain" width="16" height="16" patternUnits="userSpaceOnUse">
        <path d="M0 0h1v1H0zm8 4h1v1H8zm4 8h1v1h-1zm-6 2h1v1H6z" fill="${stroke}" opacity="0.18"/>
      </pattern>
      <pattern id="ledger-grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${stroke}" stroke-width="0.5" opacity="0.12"/>
      </pattern>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#ledger-grid)"/>
    <rect width="${width}" height="${height}" fill="url(#grain)"/>
    <rect x="20" y="20" width="${width - 40}" height="${height - 40}" fill="none" stroke="${stroke}" stroke-width="1" stroke-dasharray="4,4" opacity="0.4"/>
    
    <!-- Stylized artisanal dairy utensil / vessel illustration -->
    <g transform="translate(${width / 2}, ${height / 2 - 25})" stroke="${stroke}" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.7">
      <ellipse cx="0" cy="-35" rx="36" ry="10" />
      <path d="M-36 -35 C-36 10 -28 35 0 40 C28 35 36 10 36 -35" />
      <path d="M-22 10 C-10 18 10 18 22 10" stroke-dasharray="2,3" />
      <path d="M0 -42 L0 -28" />
    </g>

    <text x="${width / 2}" y="${height / 2 + 55}" font-family="serif" font-size="16" font-weight="600" letter-spacing="1" fill="${textFill}" text-anchor="middle">${title}</text>
    <text x="${width / 2}" y="${height / 2 + 78}" font-family="sans-serif" font-size="12" fill="${subFill}" text-anchor="middle">${subtitle}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const PLACEHOLDER_IMAGES = {
  heroGhee: placeholderSvg('PURE DESI GHEE (EST. 1928)', 'Traditional Tin Canister on Teak Counter', 800, 600, 'gold'),
  featuredGheeTexture: placeholderSvg('GRANULAR DESI GHEE', 'Macro Clarified Butterfat Texture with Brass Scoop', 600, 750, 'gold'),
  butterBlock: placeholderSvg('COUNTRY WHITE BUTTER', 'Slab of Churned Butter on Kraft Paper', 600, 600, 'cream'),
  khoyaTray: placeholderSvg('SLOW-REDUCED KHOYA', 'Stainless Steel Halwai Tray', 600, 600, 'cream'),
  zafraniKheer: placeholderSvg('ZAFRANI KHEER', 'Earthen Clay Bowl with Pistachio', 600, 600, 'cream'),
  kitchenProcess: placeholderSvg('SLOW-FIRE CLARIFICATION', 'Simmering Kadai over Controlled Flame', 1200, 675, 'dark'),
  courierPackaging: placeholderSvg('NATIONWIDE COURIER PACKAGING', 'Airtight Sealed Tin in Heavy Kraft Shipper', 800, 600, 'cream'),
  texturePotDetail: placeholderSvg('HERITAGE BRASS MEASURE (SER)', 'Antique Punjabi Dairy Artifacts', 800, 533, 'dark')
};

