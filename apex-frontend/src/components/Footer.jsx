"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Footer = ({ footers = [], footerSettings = {} }) => {
  const pathname = usePathname();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeLang, setActiveLang] = useState("en");

  const settings = footerSettings?.data
    ? footerSettings.data
    : footerSettings;

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let lang = "en";

    if (pathname.startsWith("/zh")) {
      lang = "zh";
    } else if (pathname.startsWith("/ja")) {
      lang = "ja";
    } else if (pathname.startsWith("/ko")) {
      lang = "ko";
    } else if (pathname.startsWith("/ar")) {
      lang = "ar";
    }

    setActiveLang(lang);
    localStorage.setItem("language", lang);
  }, [pathname]);

  const companyInfo = {
    companyName: settings?.company_name || "",
    registerNo: settings?.register_no || "",
    description: settings?.description || "",
    email: settings?.email || "",
    supportEmail: settings?.support_email || "",
    phone: settings?.phone || "",
    registeredAddress: settings?.registered_address || "",
    physicalAddress: settings?.physical_address || "",
    riskDisclosure: settings?.risk_disclosure || "",
    restrictedRegions: settings?.restricted_regions || "",
  };

  const footerLanguageIndex = {
    en: 0,
    zh: 1,
    ja: 2,
    ko: 3,
    ar: 4,
  };

  const currentFooter =
    footers?.[footerLanguageIndex[activeLang]] || footers?.[0];

  const footerMenus = Array.isArray(currentFooter?.data)
    ? currentFooter.data.filter(
      (item) =>
        item?.name &&
        Array.isArray(item?.subMenus) &&
        item.subMenus.length
    )
    : [];

  const translations = {
    en: {
      registration: "Registration Number",
      registeredAddress: "Registered Address",
      physicalAddress: "Physical Address",
      risk: "Risk Warning",
      restricted: "Restricted Regions",
      copyright: "All Rights Reserved.",
      privacy: "Privacy Policy",
      cookies: "Cookies Policy",
      terms: "Terms & Conditions",
      disclosure: "Risk Disclosure",

      highlights: [
        "Secure Trading",
        "Fast Execution",
        "150+ Countries",
        "Low Spreads",
      ],
    },

    zh: {
      registration: "注册编号",
      registeredAddress: "注册地址",
      physicalAddress: "办公地址",
      risk: "风险提示",
      restricted: "受限制地区",
      copyright: "版权所有",
      privacy: "隐私政策",
      cookies: "Cookie 政策",
      terms: "条款和条件",
      disclosure: "风险披露",

      highlights: [
        "安全交易",
        "快速执行",
        "150多个国家",
        "低点差",
      ],
    },

    ja: {
      registration: "登録番号",
      registeredAddress: "登録住所",
      physicalAddress: "所在地",
      risk: "リスク警告",
      restricted: "制限地域",
      copyright: "無断転載を禁じます。",
      privacy: "プライバシーポリシー",
      cookies: "Cookieポリシー",
      terms: "利用規約",
      disclosure: "リスク開示",

      highlights: [
        "安全な取引",
        "高速約定",
        "150か国以上",
        "低スプレッド",
      ],
    },

    ko: {
      registration: "등록 번호",
      registeredAddress: "등록 주소",
      physicalAddress: "사업장 주소",
      risk: "위험 경고",
      restricted: "제한 지역",
      copyright: "모든 권리 보유.",
      privacy: "개인정보처리방침",
      cookies: "쿠키 정책",
      terms: "이용약관",
      disclosure: "위험 고지",

      highlights: [
        "안전한 거래",
        "빠른 체결",
        "150개 이상의 국가",
        "낮은 스프레드",
      ],
    },

    ar: {
      registration: "رقم التسجيل",
      registeredAddress: "العنوان المسجل",
      physicalAddress: "العنوان الفعلي",
      risk: "تحذير من المخاطر",
      restricted: "المناطق المحظورة",
      copyright: "جميع الحقوق محفوظة.",
      privacy: "سياسة الخصوصية",
      cookies: "سياسة ملفات تعريف الارتباط",
      terms: "الشروط والأحكام",
      disclosure: "إفصاح عن المخاطر",
    
      highlights: [
        "تداول آمن",
        "تنفيذ سريع",
        "أكثر من 150 دولة",
        "فروقات أسعار منخفضة",
      ],
    },
  };

  const socialIcons = [
    {
      icon: "fab fa-facebook-f",
      url: settings?.facebook,
    },
    {
      icon: "fab fa-twitter",
      url: settings?.twitter,
    },
    {
      icon: "fab fa-linkedin-in",
      url: settings?.linkedin,
    },
    {
      icon: "fab fa-instagram",
      url: settings?.instagram,
    },
    {
      icon: "fab fa-youtube",
      url: settings?.youtube,
    },
  ].filter((item) => item.url);

  const t = translations[activeLang] || translations.en;

  const highlightIcons = [
    "ri-shield-check-line",
    "ri-flashlight-line",
    "ri-global-line",
    "ri-funds-line",
  ];

  const highlights = highlightIcons.map((icon, index) => ({
    icon,
    title: t.highlights[index],
  }));

  return (
    <footer className="footer">
      <div className="footer-glow-one"></div>
      <div className="footer-glow-two"></div>

      <div className="footer-container">

        {/* ===========================
            TOP GRID
        =========================== */}

        <div className="footer-grid">

          {/* ===========================
              BRAND
          =========================== */}

          <div className="footer-brand">
            <Link
              href={activeLang === "en" ? "/" : `/${activeLang}`}
            >
              <img
                src="/images/DK-logo.png"
                alt={companyInfo.companyName || "Logo"}
              />
            </Link>

            {companyInfo.description && (
              <p>{companyInfo.description}</p>
            )}

            {socialIcons.length > 0 && (
              <div className="footer-social">
                {socialIcons.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            )}

            <div className="footer-contact">

              {companyInfo.email && (
                <a href={`mailto:${companyInfo.email}`}>
                  <i className="ri-mail-line"></i>
                  <span>{companyInfo.email}</span>
                </a>
              )}

              {companyInfo.supportEmail && (
                <a href={`mailto:${companyInfo.supportEmail}`}>
                  <i className="ri-customer-service-2-line"></i>
                  <span>{companyInfo.supportEmail}</span>
                </a>
              )}

              {companyInfo.phone && (
                <a href={`tel:${companyInfo.phone}`}>
                  <i className="ri-phone-line"></i>
                  <span>{companyInfo.phone}</span>
                </a>
              )}

            </div>

          </div>

          {/* ===========================
              DYNAMIC MENU COLUMNS
          =========================== */}

          {/* DYNAMIC MENU COLUMNS */}

          {footerMenus.map((menu, index) => (
            <div className="footer-column" key={index}>
              <h3>{menu.name}</h3>

              {menu.subMenus.map((sub, i) =>
                sub?.link ? (
                  <Link
                    key={i}
                    href={sub.link}
                    className="footer-link"
                  >
                    {sub.name}
                  </Link>
                ) : null
              )}
            </div>
          ))}

        </div>

        {/* ===========================
            COMPANY INFORMATION
        =========================== */}

        {(companyInfo.registerNo ||
          companyInfo.registeredAddress ||
          companyInfo.physicalAddress) && (
            <div className="footer-info-section">

              {companyInfo.registerNo && (
                <div className="footer-register-card">

                  <div className="footer-info-icon">
                    <i className="ri-file-list-3-line"></i>
                  </div>

                  <div className="footer-info-content">
                    <h4>{t.registration}</h4>
                    <p>{companyInfo.registerNo}</p>
                  </div>

                </div>
              )}

              <div className="footer-address-grid">

                {companyInfo.registeredAddress && (
                  <div className="footer-address-card">

                    <div className="footer-info-icon">
                      <i className="ri-map-pin-2-line"></i>
                    </div>

                    <div className="footer-info-content">
                      <h4>{t.registeredAddress}</h4>
                      <p>{companyInfo.registeredAddress}</p>
                    </div>

                  </div>
                )}

                {companyInfo.physicalAddress && (
                  <div className="footer-address-card">

                    <div className="footer-info-icon">
                      <i className="ri-building-2-line"></i>
                    </div>

                    <div className="footer-info-content">
                      <h4>{t.physicalAddress}</h4>
                      <p>{companyInfo.physicalAddress}</p>
                    </div>

                  </div>
                )}

              </div>

            </div>
          )}

        {/* ===========================
            HIGHLIGHT FEATURES
        =========================== */}

        <div className="footer-highlight">

          {highlights.map((item, index) => (
            <div
              className="highlight-card"
              key={index}
            >
              <div className="highlight-icon">
                <i className={item.icon}></i>
              </div>

              <div className="highlight-content">
                <span>{item.title}</span>
              </div>
            </div>
          ))}

        </div>

        {/* ===========================
            RISK DISCLOSURE
        =========================== */}

        {companyInfo.riskDisclosure && (
          <div className="footer-disclaimer">

            <div className="footer-disclaimer-title">

              <i className="ri-error-warning-line"></i>

              <h4>{t.risk}</h4>

            </div>

            <p>
              {companyInfo.riskDisclosure}
            </p>

          </div>
        )}

        {/* ===========================
            RESTRICTED REGIONS
        =========================== */}

        {companyInfo.restrictedRegions && (
          <div className="footer-restricted">

            <div className="footer-restricted-title">

              <i className="ri-forbid-line"></i>

              <h4>{t.restricted}</h4>

            </div>

            <p>
              {companyInfo.restrictedRegions}
            </p>

          </div>
        )}

        {/* ===========================
            FOOTER BOTTOM
        =========================== */}

        <div className="footer-bottom">

          <div className="footer-copyright">

            <p>
              © {new Date().getFullYear()}{" "}
              {companyInfo.companyName || "Company"}.
              {t.copyright}
            </p>

          </div>

          <div className="footer-bottom-links">

            <Link
              href={
                activeLang === "en"
                  ? "/privacy-policy"
                  : `/${activeLang}/privacy-policy`
              }
            >
              {t.privacy}
            </Link>

            <Link
              href={
                activeLang === "en"
                  ? "/cookie-policy"
                  : `/${activeLang}/cookie-policy`
              }
            >
              {t.cookies}
            </Link>

            <Link
              href={
                activeLang === "en"
                  ? "/terms-and-conditions"
                  : `/${activeLang}/terms-and-conditions`
              }
            >
              {t.terms}
            </Link>

            <Link
              href={
                activeLang === "en"
                  ? "/risk-disclosure"
                  : `/${activeLang}/risk-disclosure`
              }
            >
              {t.disclosure}
            </Link>

          </div>

        </div>

      </div>

      {/* ===========================
          SCROLL TO TOP
      =========================== */}

      {showScrollTop && (
        <button
          className="footer-scroll-top"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          aria-label="Scroll to top"
        >
          <i className="ri-arrow-up-line"></i>
        </button>
      )}

    </footer>
  );
};

export default Footer;
