# DEVELOPER.md
## Technical Documentation for Hafiz Milk Shop Landing Page

---

### 1. Overview and Goal
This project is a high-performance, single-page bilingual landing page (English default LTR / Urdu RTL) built specifically for **Hafiz Milk Shop** (Garhi Shahu, Lahore — operating continuously since 1928).

The commercial objective is to translate nearly a century of local Lahore culinary goodwill into immediate direct telephone and WhatsApp orders for packaged pure desi ghee and churned white butter across Pakistan (with Cash on Delivery), while serving walk-in visitors with store timings and directions.

There is no user login, no shopping cart, and no online credit card gateway. Transactions are carried out through pre-populated WhatsApp message links and direct calls.

---

### 2. Tech Stack and Rationale
- **React 19 & Vite 6**: Instant hot-module replacement (HMR), tree-shaking, lightweight runtime, and minimal client-side overhead.
- **Pure CSS Variables (Custom Tokens)**: Zero dependency on generic utility frameworks or uncustomized Tailwind palettes. Every color, border, and font rule is defined as semantic CSS custom properties in `src/index.css`.
- **CSS Logical Properties**: Native bidirectional layout support (`margin-inline`, `padding-inline`, `inset-inline-start`, `border-inline-end`, `text-align: start`) ensuring clean, un-hacked switching between English LTR and Urdu RTL.
- **Lucide React**: Crisp, unstyled line icons used strictly for utility (phone, WhatsApp, location, rating stars) with zero decorative fluff or rounded background bubbles.
- **Zero Heavy Libraries**: No animation dependencies (like Framer Motion), no carousel bloat, no heavy i18n runtimes. All business data lives in `src/site-data.json`.

---

### 3. Project Structure
```text
e:\Hafiz Milk Shop\
├── public\
│   └── images\                   # Droppable directory for final WebP images
│       ├── hero-ghee.webp        # Hero featured ghee tin
│       ├── featured-ghee-texture.webp # Macro texture of clarified butterfat
│       ├── butter-block.webp     # Safaid makhan on kraft paper
│       ├── khoya-tray.webp       # Fresh khoya in stainless steel tray
│       ├── zafrani-kheer.webp    # Kheer in terracotta clay pot
│       ├── kitchen-process.webp  # Kadai simmering process
│       └── courier-packaging.webp# Airtight shipping carton
├── src\
│   ├── App.jsx                   # Single-page layout containing all 11 sections & side rail
│   ├── main.jsx                  # React DOM root entry
│   ├── index.css                 # Custom design tokens, typography, ledger styling, RTL rules
│   ├── site-data.json            # SINGLE SOURCE OF TRUTH for shop data, products, prices, FAQs
│   ├── en.json                   # English translations & editorial ledger copy
│   ├── ur.json                   # Natural Lahori Urdu translations & editorial ledger copy
│   └── placeholders.js           # SVG data-URI fallbacks matching documentary art direction
├── index.html                    # SEO meta tags, Google Fonts, JSON-LD Schema.org data
├── package.json                  # Dependencies & scripts
├── vite.config.js                # Vite build configuration
├── IMAGE-PROMPTS.md              # Image generation briefs and photographic art direction
├── DEVELOPER.md                  # Developer & architecture documentation
├── OWNER-GUIDE.md                # Plain English maintenance guide for the shop owner
└── OWNER-GUIDE.ur.md             # Urdu maintenance guide for the shop owner
```

---

### 4. Setup and Run
Requirements: Node.js (version 18 or higher) and npm.

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Start development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.
3. **Build production bundle**:
   ```bash
   npm run build
   ```
   Outputs an optimized bundle to `dist/`.
4. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

### 5. Content and Data (`src/site-data.json`)
All editable business data is separated from component logic so that the shop owner or a junior developer can update prices, timings, or milestones without editing JSX.

#### Schema Breakdown:
- `shop`: Name, founding date (1928), Google rating (4.2), review count (534), contact numbers, address, and operating hours.
  - `phones[]`: Contains `display` (formatted string for UI), `clean` (digits only for `tel:` and WhatsApp links), `hasWhatsApp`, and `isPrimary`.
- `nationwideDelivery`: General terms, Cash on Delivery note, and `cities[]` list with delivery timing estimates and standard courier fees.
- `products[]`: List of products.
  - `id`: Unique slug.
  - `nameEn` / `nameUr`: Bilingual product titles.
  - `code`: Ledger inventory code (e.g. `GHEE-01`).
  - `availableNationwide`: Boolean flag (`true` displays nationwide COD badge; `false` displays Lahore counter badge).
  - `variants[]`: Array of sizes and prices:
    ```json
    { "size": "1 kg Tin / Jar", "sizeUr": "1 کلو ٹن / جار", "pricePkr": 3200, "isPendingClientConfirm": true }
    ```
- `milestones[]`: Chronological historical rows (Year, Title, Description in EN & UR).
- `purityGuarantees[]`: Factual dairy quality standards.
- `googleReviews[]`: Quotes, authors, and cities extracted from Google Maps reviews.
- `faqs[]`: Accordion questions and answers in English and Urdu.

#### How to Add a New Product:
Append an object to the `products` array in `src/site-data.json`:
```json
{
  "id": "desi-panjeeri",
  "nameEn": "Winter Desi Panjeeri",
  "nameUr": "دیسی پنجیری",
  "code": "PNJ-07",
  "availableNationwide": true,
  "variants": [
    { "size": "1 kg Tin", "sizeUr": "1 کلو ڈبہ", "pricePkr": 2800 }
  ],
  "descEn": "Roasted in pure desi ghee with almonds, pistachios, and gond.",
  "descUr": "خالص دیسی گھی میں بھنی ہوئی پنجیری، گری میوہ جات کے ساتھ۔",
  "image": "/images/panjeeri.webp",
  "fallbackImageKey": "heroGhee"
}
```

---

### 6. Design System & Ledger Layout Concept
The design departs intentionally from standard "SaaS landing page" tropes. It adopts the visual rhythm of an old Lahori bahi-khata (traditional shop ledger):

- **Color Tokens**:
  - `--color-paper-cream`: `#F8F4EA` (Base parchment background)
  - `--color-stone-warm`: `#EFE8D8` (Alternating section paper tone)
  - `--color-ink-black`: `#1C1C1A` (Primary typography and firm ink borders)
  - `--color-ghee-yellow`: `#E2B33C` (Clarified butter single accent color)
  - `--color-brick-stamp`: `#8C3B2A` (Red stamp tone for dates and heritage notes)
- **Typography**:
  - English: `DM Serif Display` for editorial headings; `DM Sans` for body copy.
  - Urdu: `Noto Nastaliq Urdu` for titles; `Noto Naskh Arabic` for body text.
  - Heading line-height is set to 2.1 in Urdu to prevent any clipping of calligraphic marks.
- **Section Differentiation**:
  - Rail: Sticky vertical index (01–08).
  - Hero: Asymmetric layout with an oversized, partially-clipped `1928` watermark.
  - Products: Ledger price list featuring dotted leader lines (`.leader-dots`) between variant titles and prices.
  - Story: Dated rows (`140px` year column | narrative column), eliminating generic dot-and-line timelines.
  - How to Order: Formatted like a paper dispatch slip / receipt.
  - Reviews: Asymmetric pull-quote layout paired with a prominent Google rating badge.

---

### 7. Internationalization (i18n) and RTL
Language toggling operates via React state:
- When the user clicks the language toggle button, `lang` alternates between `'en'` and `'ur'`.
- An effect hook synchronously updates:
  ```javascript
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
  ```
- All layout rules use CSS Logical Properties (`padding-inline`, `margin-inline`, `border-inline-start`, `inset-inline-start`).
- When direction switches to `rtl`, the desktop side rail automatically aligns to the right side, dotted ledger leaders reverse direction, and arrow icons flip appropriately.

---

### 8. Images and Real Photo Replacement
- AI prompts and specifications are detailed in `IMAGE-PROMPTS.md`.
- In production, place generated or real client photographs in `public/images/` using the specified file names (`hero-ghee.webp`, `butter-block.webp`, etc.).
- Convert all client photos to `.webp` format using `cwebp` or Squoosh at 85% quality to keep file sizes under 150KB.
- In `src/placeholders.js`, inline SVG data URIs serve as immediate visual fallbacks if disk images are absent.

---

### 9. WhatsApp Link Generator
The helper function `createWhatsAppLink(productName, size, price)` in `src/App.jsx` constructs an encoded WhatsApp click-to-chat URL:
```javascript
https://wa.me/923224111063?text=URL_ENCODED_MESSAGE
```
- In English: Pre-populates the customer's desired item, weight, and a request for Cash on Delivery courier details.
- In Urdu: Automatically composes a natural Urdu message:
  *"السلام علیکم حافظ ملک شاپ، میں [آئٹم کا نام] ([وزن]) آرڈر کرنا چاہتا ہوں..."*
- To change the recipient phone number, update `siteData.shop.phones[0].clean` in `src/site-data.json`.

---

### 10. SEO and Performance Checklist
- [x] Responsive `<meta name="viewport">` configuration.
- [x] Open Graph preview tags (`og:title`, `og:description`, `og:image`).
- [x] Schema.org `FoodEstablishment` / `LocalBusiness` JSON-LD snippet injected into `<head>`.
- [x] Accessible HTML semantic tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`, `<blockquote`, `<cite>`).
- [x] Preconnected Google Fonts CDN.
- [x] Fast static build with Gzip footprint under 90KB.

---

### 11. Accessibility (a11y)
- Checked color contrast: Dark ink (`#1C1C1A`) on paper cream (`#F8F4EA`) achieves a contrast ratio of > 13:1, exceeding WCAG AAA standards.
- Interactive touch targets for buttons and telephone links meet or exceed 44px x 44px.
- Visible `:focus-visible` keyboard outlines.
- All non-text content includes descriptive `alt` attributes in both languages.

---

### 12. Deployment Guide
Since the build produces static HTML, CSS, and JS, it can be deployed to any static host:

#### Deploying to Netlify / Vercel / Cloudflare Pages:
1. **Build Command**: `npm run build`
2. **Publish Directory**: `dist`
3. Point your DNS records (e.g., `hafizmilkshop.com`) to the host's nameservers or CNAME.
4. Ensure automatic HTTPS / SSL certificate is active.

---

### 13. Known Limitations and Roadmap
- **No Direct Shopping Cart**: Orders are placed directly via WhatsApp or phone. If the shop's volume exceeds WhatsApp capacity in the future, a lightweight headless checkout or a direct courier API (e.g. Trax, Leopards, TCS COD API) can be connected.
- **Client Price Confirmation**: Certain dairy prices in `site-data.json` are marked with `isPendingClientConfirm: true`. Once the Hafiz family provides their seasonal rates, update the figures in `site-data.json`.

