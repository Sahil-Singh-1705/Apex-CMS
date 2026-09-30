"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const Header = ({ headers }) => {
  const languages = [
    {
      code: "en",
      name: "English",
      flag: "/images/Flag-United-Kingdom.webp",
    },
    {
      code: "zh",
      name: "中文",
      flag: "/images/Zh-logo.jpg",
    },
    // {
    //   code: "ja",
    //   name: "日本語",
    //   flag: "/images/ja-flag-logo.png",
    // },
    // {
    //   code: "ko",
    //   name: "한국어",
    //   flag: "/images/korea-logo.avif",
    // },
    // {
    //   code: "ar",
    //   name: "العربية",
    //   flag: "/images/arabic-flag.png",
    // },
  ];

  const translations = {
    en: {
      login: "Login",
      register: "Get Started",
    },

    zh: {
      login: "登录",
      register: "开始使用",
    },

    // ja: {
    //   login: "ログイン",
    //   register: "始める",
    // },

    // ko: {
    //   login: "로그인",
    //   register: "시작하기",
    // },
    // ar: {
    //   login: "تسجيل الدخول",
    //   register: "ابدأ الآن",
    // },
  };


  const [theme, setTheme] = useState("dark");
  const [activeLang, setActiveLang] = useState("en");
  const router = useRouter();
  const [languageOpen, setLanguageOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const lastScrollTop = useRef(0);
  const headerRef = useRef(null);
  const ticking = useRef(false);
  const [openIndex, setOpenIndex] = useState(null);
  const dropdownRef = useRef(null);

  // Handle mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effect with requestAnimationFrame for smooth performance
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

          // Add scrolled class
          setIsScrolled(scrollTop > 50);

          // Hide/show header on scroll
          if (scrollTop > lastScrollTop.current && scrollTop > 150) {
            // Scrolling down
            setHeaderHidden(true);
          } else if (scrollTop < lastScrollTop.current) {
            // Scrolling up
            setHeaderHidden(false);
          }

          lastScrollTop.current = scrollTop;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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

  useEffect(() => {
    const isArabic = activeLang === "ar";

    document.documentElement.setAttribute(
      "dir",
      isArabic ? "rtl" : "ltr"
    );

    document.documentElement.setAttribute(
      "lang",
      activeLang
    );

    return () => {
      document.documentElement.setAttribute("dir", "ltr");
    };
  }, [activeLang]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  // Close dropdowns when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        mobileMenuOpen &&
        !e.target.closest(".mobile-dropdown")
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  const handleResize = () => {
    if (window.innerWidth > 1024) {
      setMobileMenuOpen(false);
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);

    if (!mobileMenuOpen) {
      setOpenDropdown(null);
    }
  };

  const toggleDropdown = (index) => {
    console.log("clicked", index);

    setOpenDropdown((prev) => {
      console.log("prev =", prev);
      return prev === index ? null : index;
    });
  };

  const changeLanguage = (lang) => {
    if (lang === activeLang) {
      setLanguageOpen(false);
      return;
    }

    setActiveLang(lang);
    localStorage.setItem("language", lang);
    setLanguageOpen(false);

    // Remove existing language prefix
    let currentPath = pathname;

    currentPath = currentPath.replace(/^\/(zh|ja|ko|ar)/, "");

    // Make sure homepage becomes "/"
    if (!currentPath) {
      currentPath = "/";
    }

    // English
    if (lang === "en") {
      router.push(currentPath);
      return;
    }

    // Chinese
    if (lang === "zh") {
      router.push(
        `/zh${currentPath === "/" ? "" : currentPath}`
      );
      return;
    }

    // Japanese
    if (lang === "ja") {
      router.push(
        `/ja${currentPath === "/" ? "" : currentPath}`
      );
      return;
    }

    // Korean
    if (lang === "ko") {
      router.push(
        `/ko${currentPath === "/" ? "" : currentPath}`
      );
      return;
    }

    if (lang === "ar") {
      router.push(
        `/ar${currentPath === "/" ? "" : currentPath}`
      );
      return;
    }
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";

    setTheme(saved);

    document.documentElement.setAttribute(
      "data-theme",
      saved
    );
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";

    setTheme(next);

    document.documentElement.setAttribute(
      "data-theme",
      next
    );

    localStorage.setItem("theme", next);
  };

  const getPath = (url) => {
    try {
      return new URL(url).pathname;
    } catch {
      return url;
    }
  };

  const isActiveLink = (link) => {
    const itemPath = getPath(link);
    return itemPath === pathname;
  };

  // Prevent rendering if headers are not ready or not mounted
  if (!headers || !headers[0]?.data || !mounted) return null;

  const languageMenuIndex = {
    en: 0,
    zh: 1,
    ja: 2,
    ko: 3,
    ar: 4,
  };

  const currentMenu =
    headers?.[languageMenuIndex[activeLang]]?.data || [];

  return (
    <>
      <header ref={headerRef}
        className={`
    fixed
    top-0
    left-0
    w-full
    z-[999]
    border-b
    border-b-[var(--border)]
    transition-all
    duration-300
    overflow-visible
    ${isScrolled
            ? "bg-[var(--bg)] shadow-lg"
            : "bg-transparent border-transparent"
          }
  `}
      >
        <div className="max-w-[1400px] mx-auto px-4 overflow-visible">

          <nav className="h-[92px] flex items-center justify-between overflow-visible">
            {/* Logo */}
            <Link
              href={
                activeLang === "en"
                  ? "/"
                  : `/${activeLang}`
              }
              className="flex items-center shrink-0"
            >
              <img
                src="/images/DK-logo.png"
                alt="Logo"
                className="w-[80px] object-contain transition duration-300 hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-6 mx-auto">
              {currentMenu?.map((item, index) => {
                const hasSubMenus =
                  Array.isArray(item.subMenus) && item.subMenus.length > 0;

                const itemPath = getPath(item.link);

                const isSubActive = hasSubMenus
                  ? item.subMenus.some((sub) => getPath(sub.link) === pathname)
                  : false;

                const isActive = itemPath === pathname || isSubActive;

                return (
                  <li
                    key={index}
                    className="relative group"
                  >
                    {hasSubMenus ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setOpenIndex(openIndex === index ? null : index)
                          }
                          className={`flex items-center gap-1 text-sm mt-2 font-semibold transition-all duration-300 ${isActive
                            ? "text-[#d8a441]"
                            : "text-[var(--text)] hover:text-[#d8a441]"
                            }`}
                        >
                          {item.name}

                          <i
                            className={`ri-arrow-down-s-line text-lg transition-transform duration-300 ${openIndex === index
                              ? "rotate-180"
                              : "group-active:rotate-180"
                              }`}
                          />
                        </button>

                        <ul
                          className={`
                            absolute
                            ${activeLang === "ar" ? "right-0 left-auto" : "left-0"}
                            w-[260px]
                            rounded-2xl
                            border-2
                            border-[var(--border)]
                            bg-[var(--card)]
                            p-0.5
                            shadow-[0_30px_70px_rgba(0,0,0,.45)]
                            backdrop-blur-xl
                            overflow-hidden
                            transition-all
                            duration-300
                            ${openIndex === index
                              ? "opacity-100 visible translate-y-0"
                              : "opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0"
                            }
                        `}
                        >
                          {item.subMenus.map((sub, subIndex) => {
                            const subActive = pathname === getPath(sub.link);

                            return (
                              <li key={subIndex}>
                                <Link
                                  href={sub.link}
                                  onClick={() => {
                                    closeMenu();
                                    setOpenIndex(null);
                                  }}
                                  className={`
      flex
      items-center
      justify-between
      px-6
      py-3
      no-underline
      text-[14px]
      font-medium
      transition-all
      duration-300
      hover:bg-[#d8a441]/10
      hover:text-[#d8a441]
      ${activeLang === "ar" ? "hover:pr-7" : "hover:pl-7"}
      ${subActive
                                      ? "text-[#d8a441]"
                                      : "text-[var(--text)]"
                                    }
    `}
                                >
                                  <span>{sub.name}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    ) : (
                      <Link
                        href={item.link}
                        className={`relative text-[13px] font-semibold transition-all duration-300 after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:bg-[#d8a441] after:transition-all ${isActive
                          ? "text-[#d8a441] after:w-full"
                          : "text-[var(--text)] hover:text-[#d8a441] after:w-0 hover:after:w-full"
                          }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="https://crm.dkmaxtrading.com/login"
                className="
        hidden
        md:flex
        h-12
        px-7
        items-center
        justify-center
        rounded-xl
        no-underline
        border-1
        border-[var(--border)]
        bg-[var(--card)]
        text-[13px]
        font-semibold
        text-[var(--text)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#d8a441]
        hover:text-[#d8a441]
    "
              >
                {translations[activeLang].login}
              </a>

              {/* Register */}
              <a
                href="https://crm.dkmaxtrading.com/register/"
                className="
        hidden
        sm:flex
        h-12
        px-7
        items-center
        justify-center
        rounded-xl
        no-underline
        bg-gradient-to-br
        from-[#f8d878]
        via-[#d8a441]
        to-[#b97912]
        text-[13px]
        text-[var(--text)]
        font-semibold
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-1
    "
              >
                {translations[activeLang].register}
              </a>

              {/* Theme Button */}
              <button
                id="themeToggle"
                onClick={toggleTheme}
                className="
        relative
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-xl
        border-1
        border-[var(--border)]
        bg-[var(--card)]
        text-[var(--text)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#d8a441]
        hover:text-[#d8a441]
    "
              >
                <i
                  className={`
            ri-sun-line
            absolute
            text-[22px]
            transition-all
            duration-300
            ${theme === "dark"
                      ? "opacity-100 scale-100 rotate-0"
                      : "opacity-0 scale-50 rotate-90"
                    }
        `}
                />

                <i
                  className={`
            ri-moon-clear-line
            absolute
            text-[22px]
            transition-all
            duration-300
            ${theme === "light"
                      ? "opacity-100 scale-100 rotate-0"
                      : "opacity-0 scale-50 -rotate-90"
                    }
        `}
                />
              </button>

              {/* Language */}
              <div className="relative hidden md:block">

                <button
                  onClick={() => setLanguageOpen(!languageOpen)}
                  className="flex h-12 items-center gap-2 rounded-xl border-1 border-[var(--border)] bg-[var(--card)] px-3"
                >
                  <img
                    src={
                      languages.find(l => l.code === activeLang)?.flag
                    }
                    className="w-6 h-6 rounded-full object-cover"
                  />

                  <span className="text-[var(--text)]">
                    {activeLang.toUpperCase()}
                  </span>

                  <i
                    className={`ri-arrow-down-s-line text-[var(--text)] text-lg transition-transform duration-300 ${languageOpen ? "rotate-180" : "rotate-0"
                      }`}
                  />

                </button>

                {languageOpen && (

                  <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[var(--card)] border-1 border-[var(--border)] shadow-xl">

                    {languages.map(lang => (

                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#d8a441]/10"
                      >
                        <img
                          src={lang.flag}
                          className="w-6 h-6 rounded-full object-cover"
                        />

                        <span className="text-[var(--text)]">{lang.name}</span>

                      </button>

                    ))}

                  </div>

                )}

              </div>

              {/* Mobile Menu */}
              <button
                onClick={toggleMobileMenu}
                className="
        flex
        lg:hidden
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        bg-[#d8a441]
        text-[var(--text)]
        transition-all
        duration-300
        hover:scale-105
    "
              >
                <i className="ri-menu-3-line text-2xl"></i>
              </button>
            </div>
          </nav>
        </div>
      </header>
      {/* Overlay */}

      {/* Mobile Overlay */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]
  transition-all duration-300
  ${mobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
          }`}
      />

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 z-[9999] h-screen w-[320px] max-w-full
          bg-[var(--card)]
          shadow-2xl transition-transform duration-300
          flex flex-col
          ${activeLang === "ar"
            ? "left-0 border-r border-[var(--border)]"
            : "right-0 border-l border-[var(--border)]"
          }
          ${mobileMenuOpen
            ? "translate-x-0"
            : activeLang === "ar"
              ? "-translate-x-full"
              : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] p-6">
          <Link
            href={activeLang === "en" ? "/" : `/${activeLang}`}
            onClick={closeMenu}
          >
            <img
              src="/images/DK-logo.png"
              alt="Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>

          <button
            onClick={closeMenu}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d8a441]/10 text-[#d8a441] transition hover:bg-[#d8a441] hover:text-black"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <ul className="py-2">
            {currentMenu?.map((item, index) => {
              const hasSubMenus =
                Array.isArray(item.subMenus) &&
                item.subMenus.length > 0;

              const itemPath = getPath(item.link);

              const isSubActive = hasSubMenus
                ? item.subMenus.some(
                  (sub) => getPath(sub.link) === pathname
                )
                : false;

              const isActive =
                pathname === itemPath || isSubActive;

              return (
                <li
                  key={index}
                  className="mobile-dropdown border-b border-[var(--border)]"
                >
                  {hasSubMenus ? (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(index);
                        }}
                        className={`
                          w-full
                          flex
                          items-center
                          justify-between
                          px-6
                          py-4
                          font-semibold
                          transition
                          ${activeLang === "ar" ? "text-right" : "text-left"}
                          ${isActive
                            ? "text-[#d8a441]"
                            : "text-[var(--text)]"
                          }
                        `}
                      >
                        <span>{item.name}</span>

                        <i
                          className={`ri-arrow-down-s-line text-xl transition-transform duration-300 ${openDropdown === index
                            ? "rotate-180"
                            : ""
                            }`}
                        />
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ${openDropdown === index
                          ? "max-h-[600px]"
                          : "max-h-0"
                          }`}
                      >
                        <div className="overflow-hidden">
                          <ul className="pb-3">
                            {item.subMenus.map((sub, i) => {
                              const active =
                                pathname === getPath(sub.link);

                              return (
                                <li key={i}>
                                  <Link
                                    href={sub.link}
                                    onClick={closeMenu}
                                    className={`flex items-center justify-between no-underline px-10 py-3 text-sm transition ${active
                                      ? "text-[#d8a441]"
                                      : "text-[var(--text)] hover:text-[#d8a441]"
                                      }`}
                                  >
                                    <span>{sub.name}</span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.link}
                      onClick={closeMenu}
                      className={`block px-6 py-4 font-semibold ${isActive
                        ? "text-[#d8a441]"
                        : "text-[var(--text)] hover:text-[#d8a441]"
                        }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile Language Switcher */}
        <div className="border-t border-[var(--border)] p-5">

          <p className="text-sm font-semibold text-[var(--text)] mb-3">
            Language
          </p>

          <div className="grid grid-cols-2 gap-3">

            {languages.map((lang) => (

              <button
                key={lang.code}
                onClick={() => {
                  changeLanguage(lang.code);
                  closeMenu();
                }}
                className={`
        flex
        items-center
        justify-center
        gap-2
        h-11
        rounded-xl
        border
        transition-all
        duration-300
        ${activeLang === lang.code
                    ? "border-[#d8a441] bg-[#d8a441]/10 text-[#d8a441]"
                    : "border-[var(--border)] text-[var(--text)] hover:border-[#d8a441]"
                  }
      `}
              >

                <img
                  src={lang.flag}
                  alt={lang.name}
                  className="w-5 h-5 rounded-full object-cover"
                />

                <span className="text-sm font-medium">
                  {lang.name}
                </span>

              </button>

            ))}

          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-[var(--border)] p-5 space-y-3 shrink-0">
          <a
            href="https://crm.dkmaxtrading.com/login"
            onClick={closeMenu}
            className="flex h-12 items-center justify-center rounded-xl no-underline border-2 border-[var(--border)] text-[var(--text)] font-semibold transition hover:border-[#d8a441] hover:text-[#d8a441]"
          >
            {translations[activeLang].login}
          </a>

          <a
            href="https://crm.dkmaxtrading.com/register/"
            onClick={closeMenu}
            className="flex h-12 items-center justify-center rounded-xl no-underline bg-gradient-to-r from-[#f6d47a] via-[#d8a441] to-[#b68125] font-semibold text-black transition hover:scale-[1.02]"
          >
            {translations[activeLang].register}
          </a>
        </div>
      </aside>
    </>
  );
};

export default Header;