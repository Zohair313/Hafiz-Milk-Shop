import React, { useState, useEffect } from 'react';
import siteData from './site-data.json';
import enTranslations from './en.json';
import urTranslations from './ur.json';
import { PLACEHOLDER_IMAGES } from './placeholders.js';
import {
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Star,
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  Truck,
  ArrowRight,
  ArrowLeft,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('en');
  const [activeSection, setActiveSection] = useState('sec-hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const t = lang === 'ur' ? urTranslations : enTranslations;
  const isUr = lang === 'ur';

  // Synchronize document dir and lang attributes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isUr ? 'rtl' : 'ltr';
    document.title = isUr
      ? `${siteData.shop.nameUr} | خالص دیسی گھی، مکھن اور ڈیری (گڑھی شاہو، لاہور 1928 سے)`
      : `${siteData.shop.nameEn} | Pure Desi Ghee & Butter Since 1928 (Garhi Shahu, Lahore)`;
  }, [lang, isUr]);

  // Section scroll spy to update ledger rail active marker
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = [
        'sec-hero',
        'sec-products',
        'sec-story',
        'sec-order',
        'sec-purity',
        'sec-reviews',
        'sec-faq',
        'sec-visit'
      ];
      const scrollPosition = window.scrollY + 220;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ur' : 'en'));
  };

  // Helper for generating pre-filled WhatsApp URLs for products or general inquiries
  const createWhatsAppLink = (productName = null, size = null, price = null) => {
    const primaryPhone = siteData.shop.phones.find((p) => p.isPrimary) || siteData.shop.phones[0];
    let message = '';

    if (isUr) {
      if (productName) {
        message = `السلام علیکم حافظ ملک شاپ، میں "${productName}" (${size || 'معیاری وزن'}${price ? ` - ${price} روپے` : ''}) آرڈر کرنا چاہتا ہوں۔ برائے مہربانی کیش آن ڈیلیوری کا طریقہ اور کوریئر ٹائم بتا دیں۔`;
      } else {
        message = `السلام علیکم حافظ ملک شاپ، میں دیسی گھی اور ڈیری کے آرڈر کے لیے معلومات لینا چاہتا ہوں۔`;
      }
    } else {
      if (productName) {
        message = `Hello Hafiz Milk Shop, I would like to order "${productName}" (${size || 'standard'}${price ? ` - PKR ${price}` : ''}) via Cash on Delivery. Please confirm courier charges and delivery timing to my city.`;
      } else {
        message = `Hello Hafiz Milk Shop, I would like to inquire about ordering pure desi ghee and butter.`;
      }
    }

    return `https://wa.me/${primaryPhone.clean}?text=${encodeURIComponent(message)}`;
  };

  const getProductImage = (prod) => {
    return prod.image || PLACEHOLDER_IMAGES[prod.fallbackImageKey];
  };

  const ArrowIcon = isUr ? ArrowLeft : ArrowRight;

  return (
    <div className="ledger-wrapper">
      {/* ------------------------------------------------------------------ */}
      {/* DESKTOP SIDE RAIL: Old shop ledger index (01 - 08)                  */}
      {/* ------------------------------------------------------------------ */}
      <aside className="ledger-rail" aria-label="Ledger section navigation">
        <div className="rail-brand-year">{siteData.shop.established}</div>

        <ul className="rail-sections-list">
          {[
            { id: 'sec-hero', num: '01', title: t.nav.section01 },
            { id: 'sec-products', num: '02', title: t.nav.section02 },
            { id: 'sec-story', num: '03', title: t.nav.section03 },
            { id: 'sec-order', num: '04', title: t.nav.section04 },
            { id: 'sec-purity', num: '05', title: t.nav.section05 },
            { id: 'sec-reviews', num: '06', title: t.nav.section06 },
            { id: 'sec-faq', num: '07', title: t.nav.section07 },
            { id: 'sec-visit', num: '08', title: t.nav.section08 }
          ].map((sec) => (
            <li
              key={sec.id}
              className={`rail-section-item ${activeSection === sec.id ? 'active' : ''}`}
            >
              <a href={`#${sec.id}`} title={sec.title}>
                <span>{sec.num}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="rail-stamp-bottom">LAHORI DAIRY</div>
      </aside>

      {/* ------------------------------------------------------------------ */}
      {/* MAIN VIEWPORT CONTAINER                                            */}
      {/* ------------------------------------------------------------------ */}
      <div className="ledger-main">
        {/* Slim Mobile Top Rail Bar (01 - 08) inside main content */}
        <nav className="mobile-ledger-rail" aria-label="Mobile section quick-jump">
          <div className="mobile-rail-scroll">
            {[
              { id: 'sec-hero', num: '01', label: '1928' },
              { id: 'sec-products', num: '02', label: isUr ? 'کھاتہ' : 'Ledger' },
              { id: 'sec-story', num: '03', label: isUr ? 'تاریخ' : 'Story' },
              { id: 'sec-order', num: '04', label: isUr ? 'آرڈر' : 'Order' },
              { id: 'sec-purity', num: '05', label: isUr ? 'خالص پن' : 'Purity' },
              { id: 'sec-reviews', num: '06', label: isUr ? 'آراء' : 'Reviews' },
              { id: 'sec-faq', num: '07', label: isUr ? 'سوالات' : 'FAQ' },
              { id: 'sec-visit', num: '08', label: isUr ? 'پتہ' : 'Visit' }
            ].map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className={`mobile-rail-link ${activeSection === sec.id ? 'active' : ''}`}
              >
                <span className="mobile-rail-num">{sec.num}</span>
                <span className="mobile-rail-text">{sec.label}</span>
              </a>
            ))}
          </div>
        </nav>
        {/* 1. TOP UTILITY BAR: Direct numbers, WhatsApp, Hours, Language */}
        <section className="top-utility-bar" aria-label="Quick contact and language switch">
          <div className="top-bar-inner">
            <div className="top-bar-contact-group">
              <a
                href={`tel:${siteData.shop.phones[0].clean}`}
                className="top-bar-link"
                title="Direct Phone Call"
              >
                <Phone size={13} aria-hidden="true" />
                <span>{siteData.shop.phones[0].display}</span>
              </a>

              <a
                href={createWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="top-bar-link"
                title="Order on WhatsApp"
              >
                <MessageCircle size={13} aria-hidden="true" />
                <span>{t.topBar.whatsappDirect}</span>
              </a>

              <span className="top-bar-hours">
                <Clock size={13} style={{ display: 'inline', marginInlineEnd: 4, verticalAlign: 'middle' }} />
                {isUr ? siteData.shop.hours.timeUr : siteData.shop.hours.timeEn}
              </span>
            </div>

            <div>
              <button
                type="button"
                onClick={toggleLanguage}
                className="lang-switch-btn"
                aria-label={`Switch language to ${t.topBar.switchLang}`}
              >
                <span>{t.topBar.switchLang}</span>
              </button>
            </div>
          </div>
        </section>

        {/* 2. HEADER & ANCHOR NAVIGATION */}
        <header className="site-header">
          <div className="header-inner">
            <div className="brand-logotype">
              <span className="brand-name">
                {isUr ? siteData.shop.nameUr : siteData.shop.nameEn}
              </span>
              <span className="brand-est">1928</span>
            </div>

            <nav>
              <ul className={`header-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                <li>
                  <a
                    href="#sec-products"
                    className="nav-anchor"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.products}
                  </a>
                </li>
                <li>
                  <a
                    href="#sec-story"
                    className="nav-anchor"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.ourStory}
                  </a>
                </li>
                <li>
                  <a
                    href="#sec-order"
                    className="nav-anchor"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.howToOrder}
                  </a>
                </li>
                <li>
                  <a
                    href="#sec-reviews"
                    className="nav-anchor"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.reviews}
                  </a>
                </li>
                <li>
                  <a
                    href="#sec-visit"
                    className="nav-anchor"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.visitUs}
                  </a>
                </li>
              </ul>
            </nav>

            <div className="header-action-group">
              <a
                href={createWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent btn-sm"
              >
                <MessageCircle size={15} aria-hidden="true" />
                <span>{t.nav.orderWhatsApp}</span>
              </a>

              <button
                type="button"
                className="mobile-nav-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                <span>{t.nav.menuToggle}</span>
              </button>
            </div>
          </div>
        </header>

        {/* ------------------------------------------------------------------ */}
        {/* 3. HERO SECTION (Asymmetric Ledger, Oversized 1928, Zero Centering) */}
        {/* ------------------------------------------------------------------ */}
        <section id="sec-hero" className="hero-section">
          <div className="hero-oversized-year">{t.hero.foundedYear}</div>

          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-stamp-badge">
                <span>{t.hero.stamp}</span>
              </div>

              <h1 className="hero-h1">
                <span>{t.hero.headlineLead} </span>
                <span style={{ color: 'var(--color-brick-stamp)' }}>
                  {t.hero.headlineHighlight}
                </span>{' '}
                <span>{t.hero.headlineTail}</span>
              </h1>

              <p className="hero-lead-text">{t.hero.subheadline}</p>

              <div className="hero-actions">
                <a
                  href={createWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  <span>{t.hero.ctaWhatsApp}</span>
                </a>

                <a
                  href={`tel:${siteData.shop.phones[0].clean}`}
                  className="btn-secondary"
                >
                  <Phone size={16} aria-hidden="true" />
                  <span>{t.hero.ctaCall}</span>
                </a>
              </div>

              {/* Strict Facts Row: 1928, 4.2 Rating, Nationwide COD */}
              <div className="hero-facts-row">
                <div className="fact-item">
                  <span className="fact-label">{t.hero.badge1Label}</span>
                  <div className="fact-value">{t.hero.badge1Value}</div>
                </div>
                <div className="fact-item">
                  <span className="fact-label">{t.hero.badge2Label}</span>
                  <div className="fact-value">{t.hero.badge2Value}</div>
                </div>
                <div className="fact-item">
                  <span className="fact-label">{t.hero.badge3Label}</span>
                  <div className="fact-value">{t.hero.badge3Value}</div>
                </div>
              </div>
            </div>

            {/* Asymmetric Offset Hero Media */}
            <div className="hero-media">
              <div className="hero-image-frame">
                <img
                  src="/images/hero-ghee.webp"
                  onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGES.heroGhee; }}
                  alt={isUr ? 'خالص دیسی گھی حافظ ملک شاپ' : 'Hafiz Milk Shop pure desi ghee tin'}
                  loading="eager"
                  width="800"
                  height="600"
                />
                <div className="hero-caption">
                  <span>CANISTER NO. GH-1928 • TRADITIONAL SLOW CLARIFICATION</span>
                  <span>GARHI SHAHU</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 4. PRODUCTS: Ledger Style Price List with Dotted Leader Lines      */}
        {/* ------------------------------------------------------------------ */}
        <section id="sec-products" className="ledger-section">
          <div className="section-container">
            <header className="section-header-meta">
              <span className="section-label">{t.products.sectionNum}</span>
              <h2 className="section-title">{t.products.title}</h2>
              <p className="section-subtitle">{t.products.subtitle}</p>
            </header>

            <div className="products-ledger-layout">
              {/* Main Ledger Table */}
              <div className="ledger-table-container">
                <div className="ledger-header-row">
                  <div>{t.products.columnItem}</div>
                  <div>{t.products.columnAvail}</div>
                  <div>{t.products.columnPrice}</div>
                  <div>{t.products.columnAction}</div>
                </div>

                <div className="ledger-body">
                  {siteData.products.map((prod) => (
                    <article
                      key={prod.id}
                      className={`ledger-row ${prod.featured ? 'featured' : ''}`}
                    >
                      <div className="ledger-row-main">
                        <div className="product-title-group">
                          <img
                            src={getProductImage(prod)}
                            alt={isUr ? prod.nameUr : prod.nameEn}
                            className="product-thumbnail"
                            loading="lazy"
                            width="52"
                            height="52"
                          />
                          <div className="product-info-text">
                            <span className="product-code-tag">{prod.code}</span>
                            <h3 className="product-name">
                              {isUr ? prod.nameUr : prod.nameEn}
                            </h3>
                            <p className="product-desc-snippet">
                              {isUr ? prod.descUr : prod.descEn}
                            </p>
                          </div>
                        </div>

                        <div>
                          {prod.availableNationwide ? (
                            <span className="scope-badge nationwide">
                              <Truck size={12} style={{ display: 'inline', marginInlineEnd: 4 }} />
                              {t.products.nationwideTag}
                            </span>
                          ) : (
                            <span className="scope-badge local">
                              <MapPin size={12} style={{ display: 'inline', marginInlineEnd: 4 }} />
                              {t.products.lahoreOnlyTag}
                            </span>
                          )}
                        </div>

                        <div>
                          <span style={{ fontWeight: 700, fontSize: '0.98rem' }}>
                            PKR {prod.variants[0].pricePkr.toLocaleString()}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-ink-subtle)', display: 'block' }}>
                            {isUr ? prod.variants[0].sizeUr : prod.variants[0].size}
                          </span>
                        </div>

                        <div>
                          <a
                            href={createWhatsAppLink(
                              isUr ? prod.nameUr : prod.nameEn,
                              isUr ? prod.variants[0].sizeUr : prod.variants[0].size,
                              prod.variants[0].pricePkr
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary btn-sm"
                            aria-label={`Order ${prod.nameEn} on WhatsApp`}
                          >
                            <span>{t.products.orderButton}</span>
                          </a>
                        </div>
                      </div>

                      {/* Dotted Leader Rows for Multiple Sizes / Pack Variants */}
                      {prod.variants.length > 1 && (
                        <div style={{ marginTop: '10px' }}>
                          {prod.variants.slice(1).map((variant, vIdx) => (
                            <div key={vIdx} className="ledger-leader-row">
                              <span className="leader-item-name">
                                {isUr ? variant.sizeUr : variant.size}
                              </span>
                              <span className="leader-dots" />
                              <span className="leader-price">
                                PKR {variant.pricePkr.toLocaleString()}
                              </span>
                              <a
                                href={createWhatsAppLink(
                                  isUr ? prod.nameUr : prod.nameEn,
                                  isUr ? variant.sizeUr : variant.size,
                                  variant.pricePkr
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  marginInlineStart: '14px',
                                  fontSize: '0.75rem',
                                  color: 'var(--color-brick-stamp)',
                                  fontWeight: 600,
                                  textDecoration: 'underline'
                                }}
                              >
                                {t.products.orderButton}
                              </a>
                            </div>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>

                <div style={{ padding: '12px 18px', fontSize: '0.78rem', color: 'var(--color-ink-subtle)', background: 'var(--color-stone-warm)' }}>
                  {t.products.unconfirmedNote}
                </div>
              </div>

              {/* Side Callout with Texture Specimen */}
              <aside className="ledger-side-card featured-ghee-card">
                <img
                  src="/images/featured-ghee-texture.webp"
                  onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGES.featuredGheeTexture; }}
                  alt={isUr ? 'دیسی گھی کی ساخت' : 'Pure clarified butterfat grain texture'}
                  loading="lazy"
                  width="600"
                  height="750"
                />
                <h3 className="featured-card-title">
                  {isUr ? 'دیسی گھی کی دانے دار ساخت' : 'Granular Butterfat Texture'}
                </h3>
                <p className="featured-card-body">
                  {isUr
                    ? 'گڑھی شاہو کی کڑاہی میں گھنٹوں دھیمی آنچ پر پکنے والا گھی جس کے دانے اس کے قدرتی اور خالص ہونے کی تصدیق کرتے ہیں۔'
                    : 'Slow simmered in Garhi Shahu over controlled heat until the golden curd forms authentic coarse crystalline grains.'}
                </p>
                <a
                  href={createWhatsAppLink('Pure Desi Ghee (Famous Packaged)', '1 kg Tin', 3200)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent"
                  style={{ width: '100%' }}
                >
                  <MessageCircle size={16} />
                  <span>{t.hero.ctaWhatsApp}</span>
                </a>
              </aside>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 5. OUR STORY: Dated Ledger Rows (No dots, no generic timeline)     */}
        {/* ------------------------------------------------------------------ */}
        <section id="sec-story" className="ledger-section alt-bg">
          <div className="section-container">
            <header className="section-header-meta">
              <span className="section-label">{t.story.sectionNum}</span>
              <h2 className="section-title">{t.story.title}</h2>
              <p className="section-subtitle">{t.story.subtitle}</p>
            </header>

            <div className="story-ledger-table">
              {siteData.milestones.map((m) => (
                <div key={m.year} className="story-dated-row">
                  <div className="story-year">{m.year}</div>
                  <div className="story-content">
                    <h3>{isUr ? m.titleUr : m.titleEn}</h3>
                    <p>{isUr ? m.descUr : m.descEn}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 6. HOW TO ORDER: Styled Like an Order Slip with 4 Steps & City Tariffs*/}
        {/* ------------------------------------------------------------------ */}
        <section id="sec-order" className="ledger-section">
          <div className="section-container">
            <header className="section-header-meta">
              <span className="section-label">{t.orderGuide.sectionNum}</span>
              <h2 className="section-title">{t.orderGuide.title}</h2>
              <p className="section-subtitle">{t.orderGuide.subtitle}</p>
            </header>

            <div className="order-slip-container">
              <div className="order-slip-header">
                <span className="slip-title">{t.orderGuide.slipHeader}</span>
                <p className="slip-subtitle">
                  {isUr
                    ? 'کوئی پیشگی کارڈ یا آن لائن اکاؤنٹ ضروری نہیں۔ رقم وصولی پر دیں۔'
                    : 'Direct WhatsApp booking • Cash on delivery door-to-door'}
                </p>
              </div>

              <div className="slip-lines-list">
                <div className="slip-line-item">
                  <div className="slip-num-box">01</div>
                  <div className="slip-line-text">
                    <h4>{t.orderGuide.step1Title}</h4>
                    <p>{t.orderGuide.step1Desc}</p>
                  </div>
                </div>

                <div className="slip-line-item">
                  <div className="slip-num-box">02</div>
                  <div className="slip-line-text">
                    <h4>{t.orderGuide.step2Title}</h4>
                    <p>{t.orderGuide.step2Desc}</p>
                  </div>
                </div>

                <div className="slip-line-item">
                  <div className="slip-num-box">03</div>
                  <div className="slip-line-text">
                    <h4>{t.orderGuide.step3Title}</h4>
                    <p>{t.orderGuide.step3Desc}</p>
                  </div>
                </div>

                <div className="slip-line-item">
                  <div className="slip-num-box">04</div>
                  <div className="slip-line-text">
                    <h4>{t.orderGuide.step4Title}</h4>
                    <p>{t.orderGuide.step4Desc}</p>
                  </div>
                </div>
              </div>

              {/* Courier transit tariffs & delivery timing breakdown */}
              <div className="slip-city-rates">
                <h4 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '6px' }}>
                  {t.orderGuide.cityRatesTitle}
                </h4>
                <table className="city-rates-table">
                  <thead>
                    <tr>
                      <th>{t.orderGuide.cityCol}</th>
                      <th>{t.orderGuide.timeCol}</th>
                      <th>{t.orderGuide.chargeCol}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {siteData.nationwideDelivery.cities.map((city, idx) => (
                      <tr key={idx}>
                        <td><strong>{isUr ? city.nameUr : city.nameEn}</strong></td>
                        <td>{isUr ? city.timeUr : city.timeEn}</td>
                        <td>PKR {city.deliveryChargePkr} ({t.orderGuide.chargeUnit})</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div style={{ marginTop: '24px', textAlign: 'center' }}>
                  <a
                    href={createWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-accent"
                  >
                    <MessageCircle size={18} />
                    <span>{t.hero.ctaWhatsApp}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 7. PACKAGING AND PURITY: Factual list & real kitchen process        */}
        {/* ------------------------------------------------------------------ */}
        <section id="sec-purity" className="ledger-section alt-bg">
          <div className="section-container">
            <header className="section-header-meta">
              <span className="section-label">{t.purity.sectionNum}</span>
              <h2 className="section-title">{t.purity.title}</h2>
              <p className="section-subtitle">{t.purity.subtitle}</p>
            </header>

            <div className="purity-grid">
              <div className="purity-cards-list">
                {siteData.purityGuarantees.map((item) => (
                  <div key={item.num} className="purity-card">
                    <div className="purity-card-header">
                      <span className="purity-card-num">{item.num}</span>
                      <h3 className="purity-card-title">
                        {isUr ? item.titleUr : item.titleEn}
                      </h3>
                    </div>
                    <p className="purity-card-desc">
                      {isUr ? item.descUr : item.descEn}
                    </p>
                  </div>
                ))}
              </div>

              <div className="purity-visual-frame">
                <img
                  src="/images/kitchen-process.webp"
                  onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGES.kitchenProcess; }}
                  alt={isUr ? 'روایتی کڑاہی میں گھی پکنے کا عمل' : 'Traditional simmering kadai process'}
                  loading="lazy"
                  width="1200"
                  height="675"
                />
                <div className="purity-caption">
                  {t.purity.processImageCaption}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 8. REVIEWS: Pull-Quote Layout with Large Google Score (Not Carousel)*/}
        {/* ------------------------------------------------------------------ */}
        <section id="sec-reviews" className="ledger-section">
          <div className="section-container">
            <header className="section-header-meta">
              <span className="section-label">{t.reviews.sectionNum}</span>
              <h2 className="section-title">{t.reviews.title}</h2>
              <p className="section-subtitle">{t.reviews.subtitle}</p>
            </header>

            <div className="reviews-pullquote-layout">
              {/* Left Score Box */}
              <div className="reviews-score-block">
                <div className="big-rating-number">{siteData.shop.rating}</div>
                <div className="rating-scale-sub">{t.reviews.ratingMax}</div>
                <div className="stars-row" aria-label="Rated 4.2 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < 4 ? 'currentColor' : 'none'}
                      stroke="currentColor"
                    />
                  ))}
                </div>
                <div className="verified-counter-badge">
                  {t.reviews.totalReviews}
                </div>
                <a
                  href={siteData.shop.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.82rem',
                    color: 'var(--color-brick-stamp)',
                    fontWeight: 700,
                    marginTop: '14px'
                  }}
                >
                  <span>{t.reviews.viewOnGoogle}</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Right Pull-Quote Stream */}
              <div className="reviews-quotes-stream">
                {siteData.googleReviews.map((rev, idx) => (
                  <blockquote key={idx} className="quote-ledger-card">
                    <p className="quote-text">
                      {isUr ? rev.quoteUr : rev.quoteEn}
                    </p>
                    <footer className="quote-author-meta">
                      <cite className="quote-author-name">{rev.author}</cite>
                      <span className="quote-author-loc">
                        {isUr ? rev.cityUr : rev.city} • {rev.date}
                      </span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 9. FAQ: Interactive Accordion                                       */}
        {/* ------------------------------------------------------------------ */}
        <section id="sec-faq" className="ledger-section alt-bg">
          <div className="section-container">
            <header className="section-header-meta">
              <span className="section-label">{t.faq.sectionNum}</span>
              <h2 className="section-title">{t.faq.title}</h2>
              <p className="section-subtitle">{t.faq.subtitle}</p>
            </header>

            <div className="faq-accordion-list">
              {siteData.faqs.map((faq, fIdx) => {
                const isOpen = openFaqIndex === fIdx;
                return (
                  <div key={fIdx} className="faq-item">
                    <button
                      type="button"
                      className="faq-trigger"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : fIdx)}
                      aria-expanded={isOpen}
                    >
                      <span>{isUr ? faq.qUr : faq.qEn}</span>
                      <ChevronDown
                        size={18}
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'none',
                          transition: 'transform var(--transition-fast)'
                        }}
                      />
                    </button>
                    {isOpen && (
                      <div className="faq-body">
                        {isUr ? faq.aUr : faq.aEn}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 10. VISIT US: Map, Address, Hours & Get Directions                 */}
        {/* ------------------------------------------------------------------ */}
        <section id="sec-visit" className="ledger-section">
          <div className="section-container">
            <header className="section-header-meta">
              <span className="section-label">{t.visit.sectionNum}</span>
              <h2 className="section-title">{t.visit.title}</h2>
              <p className="section-subtitle">{t.visit.subtitle}</p>
            </header>

            <div className="visit-grid">
              <div className="visit-info-card">
                <div className="visit-block">
                  <div className="visit-block-label">{t.visit.addressTitle}</div>
                  <div className="visit-block-content">
                    <strong>{isUr ? siteData.shop.nameUr : siteData.shop.nameEn}</strong><br />
                    {isUr ? siteData.shop.address.line1Ur : siteData.shop.address.line1}<br />
                    {isUr ? siteData.shop.address.cityUr : siteData.shop.address.city} 54000, Pakistan
                  </div>
                </div>

                <div className="visit-block">
                  <div className="visit-block-label">{t.visit.hoursTitle}</div>
                  <div className="visit-block-content">
                    {isUr ? siteData.shop.hours.daysUr : siteData.shop.hours.daysEn}<br />
                    <strong>{isUr ? siteData.shop.hours.timeUr : siteData.shop.hours.timeEn}</strong>
                  </div>
                </div>

                <div className="visit-block">
                  <div className="visit-block-label">{t.visit.phonesTitle}</div>
                  <div className="visit-block-content">
                    {siteData.shop.phones.map((phone, pIdx) => (
                      <div key={pIdx} style={{ marginBottom: 4 }}>
                        <a
                          href={`tel:${phone.clean}`}
                          style={{ fontWeight: 700, color: 'var(--color-brick-stamp)' }}
                        >
                          {phone.display}
                        </a>
                        <span style={{ fontSize: '0.82rem', color: 'var(--color-ink-subtle)', marginInlineStart: 8 }}>
                          ({isUr ? phone.labelUr : phone.labelEn})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a
                    href={siteData.shop.address.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <MapPin size={16} />
                    <span>{t.visit.getDirections}</span>
                  </a>

                  <a
                    href={`tel:${siteData.shop.phones[0].clean}`}
                    className="btn-secondary"
                  >
                    <Phone size={16} />
                    <span>{t.visit.callPrimary}</span>
                  </a>
                </div>
              </div>

              {/* Embedded Google Maps Frame */}
              <div className="map-wrapper">
                <iframe
                  title="Hafiz Milk Shop Garhi Shahu Lahore Map"
                  src="https://maps.google.com/maps?q=56+Allama+Iqbal+Rd,+Garhi+Shahu,+Lahore&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 11. FOOTER                                                         */}
        {/* ------------------------------------------------------------------ */}
        <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <h4>{isUr ? siteData.shop.nameUr : siteData.shop.nameEn}</h4>
              <p>{t.footer.since}</p>
              <p style={{ marginTop: 8, fontSize: '0.82rem', color: '#9E998E' }}>
                {t.footer.tag}
              </p>
            </div>

            <div>
              <div className="footer-col-title">{t.nav.products}</div>
              <ul className="footer-links-list">
                {siteData.products.slice(0, 4).map((p) => (
                  <li key={p.id}>
                    <a href="#sec-products">{isUr ? p.nameUr : p.nameEn}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Navigation</div>
              <ul className="footer-links-list">
                <li><a href="#sec-hero">{t.nav.section01}</a></li>
                <li><a href="#sec-story">{t.nav.ourStory}</a></li>
                <li><a href="#sec-order">{t.nav.howToOrder}</a></li>
                <li><a href="#sec-reviews">{t.nav.reviews}</a></li>
                <li><a href="#sec-visit">{t.nav.visitUs}</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <span>© 1928–2026 {t.footer.legalName}. {t.footer.allRights}</span>
            <a href="#sec-hero" style={{ color: 'var(--color-ghee-yellow)' }}>
              ↑ {t.footer.backToTop}
            </a>
          </div>
        </footer>

        {/* Floating WhatsApp Quick Order Button */}
        <a
          href={createWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-whatsapp"
          title={t.floating.tooltip}
          aria-label={t.floating.tooltip}
        >
          <MessageCircle size={20} />
          <span>{t.nav.orderWhatsApp}</span>
        </a>
      </div>
    </div>
  );
}
