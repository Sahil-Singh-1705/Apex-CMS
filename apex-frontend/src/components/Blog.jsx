"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faNewspaper, faBolt, faChartLine, faEuroSign, faGem, faChartBar, faGlobe, faTags, faSortAmountDown, faClock, faHistory, faFire, faSortAlphaDown, faEye, faCalendarAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { useState, useEffect } from "react";

const Blog = (data) => {
  console.log("Blog data", data);
  
  // State for filtering
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredArticles, setFilteredArticles] = useState([]);
  
  // Extract unique categories from data
  const categories = data?.data 
    ? [...new Set(data.data.map(item => item.category).filter(Boolean))]
    : [];

  // Initialize filtered articles
  useEffect(() => {
    if (data?.data) {
      if (activeFilter === "all") {
        setFilteredArticles(data.data.filter(el => el?.published === "true" && el?.category_id === "News"));
      } else {
        setFilteredArticles(data.data.filter(el => 
          el?.published === "true" && 
          el?.category_id === "News" &&
          el?.category === activeFilter
        ));
      }
    }
  }, [data, activeFilter]);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <>
      {/* Hero Section */}
      <section 
        aria-labelledby="market-insights-title" 
        className="relative overflow-hidden mt-28 md:mt-32 lg:mt-40"
      >
        {/* Background Decorative Elements */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-yellow-100/5"
          style={{ 
            backgroundImage: `linear-gradient(rgba(59, 131, 246, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(227, 179, 90, 0.03) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 70%)'
          }}
          aria-hidden="true"
        />

        {/* Animated Gradient Circles */}
        <div 
          className="absolute top-20 left-10 w-96 h-96 bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,rgba(59,130,246,0)_70%)] rounded-full opacity-40 animate-pulse" 
          aria-hidden="true"
        />
        <div 
          className="absolute bottom-20 right-10 w-64 h-64 bg-[radial-gradient(circle,rgba(227,179,90,0.1)_0%,rgba(227,179,90,0)_70%)] rounded-full opacity-40 animate-pulse" 
          aria-hidden="true"
          style={{ animationDelay: '200ms' }}
        />

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20 pb-8 md:pb-12">
          <div className="text-center">
            <h1 
              id="market-insights-title" 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 md:mb-10"
            >
              <span 
                className="bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent mb-4 md:mb-8 drop-shadow-sm block"
              >
                Market Insights
              </span>
              <span className="text-3xl sm:text-4xl md:text-5xl text-gray-900 block drop-shadow-sm mt-4 md:mt-8 lg:mt-8">
                Real-time News & Analysis
              </span>
            </h1>
            <p className="text-lg lg:text-xl xl:text-2xl text-gray-800 max-w-4xl mx-auto mb-8 md:mb-12 font-medium drop-shadow-sm">
              Stay ahead with comprehensive market coverage, expert analysis, and real-time financial insights from ts Capitals' research team.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        {/* Filters Section */}
        <section 
          aria-labelledby="filters-heading" 
          className="bg-white/90 backdrop-blur-sm border border-yellow-200/20 rounded-2xl shadow-lg p-6 md:p-8 mb-8 md:mb-12 relative z-10"
        >
          <h2 id="filters-heading" className="sr-only">Article Filters and Sorting Options</h2>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 md:gap-8">
            {/* Category Filters */}
            <div className="w-full lg:w-auto">
              <div className="flex flex-wrap gap-3 md:gap-4" role="group" aria-label="Article categories">
                {/* All News Button */}
                <button
                  onClick={() => handleFilterClick("all")}
                  className={`inline-flex items-center px-5 py-2.5 rounded-full text-sm md:text-base font-bold shadow-lg transition-all duration-300 hover:shadow-xl ${
                    activeFilter === "all" 
                      ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-blue-500/20"
                      : "bg-transparent border-2 border-gray-200 text-gray-600 hover:border-blue-600 hover:text-blue-600 hover:-translate-y-0.5"
                  }`}
                  aria-pressed={activeFilter === "all"}
                >
                  <FontAwesomeIcon icon={faNewspaper} className="mr-2 text-base" aria-hidden="true" />
                  All News
                </button>

                {/* Dynamic Category Filters */}
                {categories.map((category, index) => {
                  // Map category names to icons
                  const getCategoryIcon = (cat) => {
                    const catLower = cat.toLowerCase();
                    if (catLower.includes('break')) return faBolt;
                    if (catLower.includes('analys')) return faChartLine;
                    if (catLower.includes('forex')) return faEuroSign;
                    if (catLower.includes('commod')) return faGem;
                    if (catLower.includes('crypto')) return faBitcoin;
                    if (catLower.includes('stock')) return faChartBar;
                    if (catLower.includes('econom')) return faGlobe;
                    return faNewspaper;
                  };

                  return (
                    <button
                      key={index}
                      onClick={() => handleFilterClick(category)}
                      className={`inline-flex items-center px-5 py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                        activeFilter === category
                          ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-blue-500/20"
                          : "bg-transparent border-2 border-gray-200 text-gray-600 hover:border-blue-600 hover:text-blue-600"
                      }`}
                      aria-pressed={activeFilter === category}
                    >
                      <FontAwesomeIcon icon={getCategoryIcon(category)} className="mr-2 text-base" aria-hidden="true" />
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sort & Filter Controls */}
            {/* <div className="flex items-center gap-4 flex-shrink-0 w-full lg:w-auto justify-end">
              <div className="relative">
                <button
                  id="tagsToggle"
                  className="inline-flex items-center gap-3 px-5 py-2.5 border-2 border-blue-200 text-blue-800 rounded-xl text-base font-medium hover:bg-blue-50 transition-all duration-300 w-full lg:w-auto justify-center relative z-20"
                  aria-expanded="false"
                  aria-controls="tagsDropdown"
                  aria-label="Filter by tags"
                >
                  <FontAwesomeIcon icon={faTags} className="text-blue-600 text-lg" aria-hidden="true" />
                  <span className="hidden sm:inline font-medium">Tags</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-sm font-bold">0</span>
                  <FontAwesomeIcon icon={faCaretRight} className="text-blue-600 text-sm ml-1 rotate-90" aria-hidden="true" />
                </button>
              </div>

              <div className="relative">
                <button
                  id="sortToggle"
                  className="inline-flex items-center gap-3 px-5 py-2.5 border-2 border-yellow-200 text-yellow-800 rounded-xl text-base font-medium hover:bg-yellow-50 transition-all duration-300 w-full lg:w-auto justify-center relative z-20"
                  aria-expanded="false"
                  aria-controls="sortDropdown"
                  aria-label="Sort articles"
                >
                  <FontAwesomeIcon icon={faSortAmountDown} className="text-yellow-600 text-lg" aria-hidden="true" />
                  <span id="sortText" className="whitespace-nowrap hidden sm:inline font-medium">Newest First</span>
                  <FontAwesomeIcon icon={faCaretRight} className="text-yellow-600 text-sm ml-1 rotate-90" aria-hidden="true" />
                </button>
              </div>
            </div> */}
          </div>
        </section>

        {/* Articles Grid */}
        <section aria-labelledby="articles-heading" className="relative z-0">
          <h2 id="articles-heading" className="sr-only">Market Insight Articles</h2>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-gray-600 font-medium">No articles found for this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredArticles.map((el) => (
                <article 
                  key={el.slug} 
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <Link href={`/news_and_analysis/${el.slug.replace(/\s+/g, "-")}`}>
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}/static/images/${el.thumbnail_image}`}
                      alt={el.title}
                      className="h-56 w-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 hover:text-blue-600 transition-colors duration-200">
                      <Link href={`/news_and_analysis/${el.slug.replace(/\s+/g, "-")}`}>
                        {el.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 my-4">
                      {el.excerpt?.length > 150 ? `${el.excerpt.substring(0, 150)}...` : el.excerpt}
                    </p>
                    
                    {/* Stats Row */}
                    <div className="text-gray-500 text-sm mb-4 flex justify-between flex-wrap gap-4">
                      <span>
                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" aria-hidden="true" />
                        {new Intl.DateTimeFormat("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }).format(new Date(el.createdAt))}
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faEye} className="mr-1" aria-hidden="true" />
                        {/* Add view count if available in your data */}
                        {el.views || "0"}
                      </span>
                    </div>
                    
                    <hr className="border border-t-gray-100 my-4" />
                    
                    {/* Author and Read More */}
                    <div className="text-gray-500 text-sm mb-4 flex justify-between flex-wrap gap-4">
                      <span>
                        <FontAwesomeIcon icon={faUser} className="mr-1" aria-hidden="true" />
                        {el.author || "ts Capitals"}
                      </span>
                      <Link 
                        href={`/news_and_analysis/${el.slug.replace(/\s+/g, "-")}`} 
                        className="text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Blog;