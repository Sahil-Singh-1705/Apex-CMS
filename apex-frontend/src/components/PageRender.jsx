"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Blog_home from "./Blog_home";
import Newsletter from "./Newsletter";
import Question_accordian from "./Question_accordian";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import Tscontactpage from "./ContactForm2";
import Award_Slider from "./Award_Slider";
import TidioChatWidget from "./TidioChatWidget";
import PopUp from "./PopUp";
import Scrolltotop from "./Scrolltotop";
import Sliderimg from "./Slider";

const PageRender = ({
  data,
  blog,
  headers,
  footers,
  footerSettings,
  popupData,
  sliderData,
  companydata
}) => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const router = useRouter();
  const cmsRef = useRef(null);

  // Original FAQ Accordion functionality (for .faq-item)
  useEffect(() => {
    if (!data?.data?.htmlCode) return;

    const initOriginalFaqAccordion = () => {
      const faqItems = document.querySelectorAll(".faq-item");

      if (!faqItems.length) return;

      faqItems.forEach((item) => {
        const button = item.querySelector(".faq-question");
        const icon = item.querySelector(".faq-icon i");

        if (!button) return;

        button.removeEventListener("click", item._faqClickHandler);

        const clickHandler = (e) => {
          e.preventDefault();

          faqItems.forEach((faq) => {
            if (faq !== item) {
              faq.classList.remove("active");

              const otherIcon = faq.querySelector(".faq-icon i");
              if (otherIcon) {
                otherIcon.classList.remove("ri-arrow-up-s-line");
                otherIcon.classList.add("ri-arrow-down-s-line");
              }
            }
          });

          item.classList.toggle("active");

          if (icon) {
            if (item.classList.contains("active")) {
              icon.classList.remove("ri-arrow-down-s-line");
              icon.classList.add("ri-arrow-up-s-line");
            } else {
              icon.classList.remove("ri-arrow-up-s-line");
              icon.classList.add("ri-arrow-down-s-line");
            }
          }
        };

        item._faqClickHandler = clickHandler;
        button.addEventListener("click", clickHandler);
      });
    };

    const timer = setTimeout(initOriginalFaqAccordion, 200);

    return () => {
      clearTimeout(timer);

      document.querySelectorAll(".faq-item").forEach((item) => {
        const button = item.querySelector(".faq-question");
        if (button && item._faqClickHandler) {
          button.removeEventListener("click", item._faqClickHandler);
          delete item._faqClickHandler;
        }
      });
    };
  }, [data?.data?.htmlCode]);

  // Contact Form Handler
  useEffect(() => {
    if (!data?.data?.htmlCode) return;
  
  
    const setupContactForm = () => {
  
      const form = document.querySelector("#contactForm");
  
      if (!form) return;
  
  
      // prevent duplicate listener
      if (form.dataset.listenerAttached === "true") return;
  
  
      form.addEventListener("submit", async (e) => {
  
        e.preventDefault();
  
  
        const submitBtn = form.querySelector(".ct-submit");
  
  
        const fields = form.querySelectorAll(
          "input, textarea"
        );
  
  
        const formData = {
  
          // based on CMS form order
          name: fields[0]?.value.trim() || "",
  
          email: fields[1]?.value.trim() || "",
  
          phone: fields[2]?.value.trim() || "",
  
          subject: fields[3]?.value.trim() || "",
  
          message: fields[4]?.value.trim() || "",
  
        };
  
  
        console.log(
          "CONTACT DATA:",
          formData
        );
  
  
        // validation
        if (!formData.name) {
  
          alert("Please enter your name");
          return;
  
        }
  
  
        if (!formData.email) {
  
          alert("Please enter your email");
          return;
  
        }
  
  
        if (!formData.message) {
  
          alert("Please enter your message");
          return;
  
        }
  
  
        if(submitBtn){
  
          submitBtn.disabled = true;
          submitBtn.innerText = "Sending...";
  
        }
  
  
        try {
  
          const response = await fetch(
  
            `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
  
            {
  
              method:"POST",
  
              headers:{
  
                "Content-Type":"application/json",
  
              },
  
              body:JSON.stringify(formData),
  
            }
  
          );
  
  
          const result = await response.json();
  
  
          console.log(
            "API RESPONSE:",
            result
          );
  
  
          if(result.success){
  
            alert(
              "Message sent successfully!"
            );
  
            form.reset();
  
          }
          else{
  
            alert(
              result.message ||
              "Something went wrong"
            );
  
          }
  
  
        } 
        catch(error){
  
          console.error(
            "CONTACT ERROR:",
            error
          );
  
          alert(
            "Server error. Please try again."
          );
  
        }
  
  
        finally{
  
          if(submitBtn){
  
            submitBtn.disabled = false;
            submitBtn.innerText = "Send Message";
  
          }
  
        }
  
  
      });
  
  
      form.dataset.listenerAttached = "true";
  
    };
  
  
  
    // Detect CMS HTML injection
    const observer = new MutationObserver(() => {
  
      const form = document.querySelector(
        "#contactForm"
      );
  
  
      if(form){
  
        setupContactForm();
  
        observer.disconnect();
  
      }
  
    });
  
  
  
    observer.observe(
  
      document.body,
  
      {
        childList:true,
        subtree:true
      }
  
    );
  
  
  
    // fallback
    const timer = setTimeout(
      setupContactForm,
      500
    );
  
  
  
    return () => {
  
      observer.disconnect();
  
      clearTimeout(timer);
  
    };
  
  
  }, [data?.data?.htmlCode]);

  // useEffect(() => {
  //   if (!data?.data?.htmlCode) return;

  //   const timer = setTimeout(() => {
  //     if (typeof window.initFAQ === "function") {
  //       window.initFAQ();
  //     }
  //   }, 200);

  //   return () => clearTimeout(timer);
  // }, [data?.data?.htmlCode]);

  // Rest of your existing code (video, link click, form listener, pip calculator, etc.)
  useEffect(() => {
    const playVideo = () => {
      const video = document.querySelector(".video-bg");
      if (video) {
        video.play().catch((error) => {
          console.log("Autoplay prevented:", error);
        });
      }
    };

    playVideo();
    document.addEventListener("visibilitychange", playVideo);

    return () => {
      document.removeEventListener("visibilitychange", playVideo);
    };
  }, []);

  useEffect(() => {
    const handleLinkClick = (e) => {
      const isModifiedClick = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
      if (isModifiedClick) return;

      let el = e.target;

      while (el && el !== document && el.tagName !== "A") {
        el = el.parentElement;
      }

      if (!el || el.tagName !== "A" || !el.href) return;

      const href = el.getAttribute("href");
      const isExternal = /^https?:\/\//.test(href);

      if (el.classList.contains("link-work")) {
        e.preventDefault();
        const win = window.open(href, "_blank");
        if (win) {
          win.focus();
        } else {
          alert("Popup blocked. Please allow popups.");
        }
        return;
      }

      if (
        el.classList.contains("nextjs-link") ||
        (!isExternal && href.startsWith("/"))
      ) {
        e.preventDefault();
        router.push(href);
        return;
      }
    };

    document.addEventListener("click", handleLinkClick);

    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, [router]);

  useEffect(() => {
    const setupFormListener = () => {
      const form = document.querySelector("#cntForm1");
      const submitButton = document.querySelector("#submitbtn1");

      if (!form || !submitButton) return;

      if (submitButton.hasAttribute("data-listener-attached")) return;

      submitButton.addEventListener("click", async (e) => {
        e.preventDefault();

        const formData = {
          email: form.querySelector("#email")?.value.trim(),
          subject: form.querySelector("#subject")?.value.trim(),
          message: form.querySelector("#message")?.value.trim(),
        };

        if (!formData.email || !formData.subject || !formData.message) {
          alert("Please fill in all required fields!");
          return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";

        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ticket/post`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
          }

          const result = await response.json();

          alert("ticket submitted successfully!");
          form.reset();
        } catch (error) {
          alert("An error occurred while submitting the form. Please try again.");
        } finally {
          submitButton.disabled = false;
          submitButton.textContent = "Submit";
        }
      });

      submitButton.setAttribute("data-listener-attached", "true");
    };

    if (data?.data?.htmlCode) {
      const observer = new MutationObserver(() => {
        setupFormListener();
      });

      observer.observe(document.body, { childList: true, subtree: true });

      return () => observer.disconnect();
    }
  }, [data?.data?.htmlCode]);

  // Pip Calculator Functions
  const calculatePipValue = () => {
    const currencyPair = document.getElementById('currencyPair')?.value || 'EUR/USD';
    const accountCurrency = document.getElementById('accountCurrency')?.value || 'USD';
    const positionSize = parseFloat(document.getElementById('positionSize')?.value) || 1;
    const pipAmount = parseFloat(document.getElementById('pipAmount')?.value) || 10;

    // Validate inputs
    if (!positionSize || positionSize <= 0) {
      showPipNotification('Please enter a valid position size', 'error');
      return;
    }

    if (!pipAmount || pipAmount <= 0) {
      showPipNotification('Please enter a valid pip amount', 'error');
      return;
    }

    // Get pip value based on currency pair
    let pipValue;

    // Common pip values for standard lots (100,000 units)
    const pipValues = {
      'EUR/USD': 10.00,
      'GBP/USD': 10.00,
      'USD/JPY': 9.09,
      'USD/CHF': 10.00,
      'AUD/USD': 10.00,
      'USD/CAD': 10.00,
      'NZD/USD': 10.00,
      'EUR/GBP': 10.00,
      'EUR/JPY': 9.09,
      'GBP/JPY': 9.09
    };

    pipValue = pipValues[currencyPair] || 10.00;

    // Adjust for account currency (simplified conversion)
    const conversionRates = {
      'USD': 1,
      'EUR': 1.10,
      'GBP': 1.25,
      'JPY': 0.0091,
      'CAD': 0.75,
      'AUD': 0.67,
      'CHF': 1.12,
      'NZD': 0.62
    };

    const conversionRate = conversionRates[accountCurrency] || 1;
    pipValue = pipValue * conversionRate;

    // Calculate results
    const contractSize = positionSize * 100000;
    const totalPipValue = pipValue * positionSize * pipAmount;
    const roundedPipValue = (pipValue * positionSize).toFixed(2);

    // Update results in DOM
    const pipValueElement = document.getElementById('pipValueResult');
    const totalValueElement = document.getElementById('totalValueResult');
    const pipCountElement = document.getElementById('pipCountResult');
    const sizeValueElement = document.getElementById('sizeValueResult');
    const contractValueElement = document.getElementById('contractValueResult');
    const resultsSection = document.getElementById('resultsSection');

    if (pipValueElement) pipValueElement.textContent = `${accountCurrency} ${roundedPipValue}`;
    if (totalValueElement) totalValueElement.textContent = `${accountCurrency} ${totalPipValue.toFixed(2)}`;
    if (pipCountElement) pipCountElement.textContent = pipAmount;
    if (sizeValueElement) sizeValueElement.textContent = positionSize.toFixed(2);
    if (contractValueElement) contractValueElement.textContent = contractSize.toLocaleString();

    // Show results section
    if (resultsSection) resultsSection.style.display = 'block';

    // Add animation to results
    const resultCards = document.querySelectorAll('.pip-result-card');
    resultCards.forEach((card, index) => {
      card.style.animation = 'none';
      setTimeout(() => {
        card.style.animation = `pip-fadeIn 0.5s ease-out ${index * 0.1}s forwards`;
      }, 10);
    });
  };

  const showPipNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = 'pip-notification';

    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    const bgColor = type === 'success' ? 'var(--primary)' : '#EF4444';

    notification.style.background = bgColor;
    notification.innerHTML = `
      <i class="fas ${icon}"></i>
      <span>${message}</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'pip-slideOut 0.3s ease-out';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  };

  // Initialize Pip Calculator in useEffect
  useEffect(() => {
    // Make calculatePipValue available globally for the onclick attribute
    window.calculatePipValue = calculatePipValue;

    // Auto-calculate after component mounts
    const timer = setTimeout(() => {
      if (document.getElementById('currencyPair')) {
        calculatePipValue();
      }
    }, 1000);

    // Add input validation
    const inputs = document.querySelectorAll('.pip-calculator-input');
    const handleInput = function () {
      if (this.value < 0) this.value = 0;
    };

    inputs.forEach(input => {
      input.addEventListener('input', handleInput);
      input._pipInputHandler = handleInput;
    });

    // Add hover effects
    const cards = document.querySelectorAll('.pip-feature-card, .pip-guide-step, .pip-result-card');
    const handleMouseEnter = function () {
      if (this.classList.contains('pip-feature-card')) {
        this.style.transform = 'translateY(-10px)';
      } else if (this.classList.contains('pip-guide-step')) {
        this.style.transform = 'translateY(-5px)';
      } else if (this.classList.contains('pip-result-card') && !this.classList.contains('pip-featured')) {
        this.style.transform = 'translateY(-5px)';
      }
    };

    const handleMouseLeave = function () {
      this.style.transform = 'translateY(0)';
    };

    cards.forEach(card => {
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
      card._pipMouseEnterHandler = handleMouseEnter;
      card._pipMouseLeaveHandler = handleMouseLeave;
    });

    // Add mouse move effect to animated lines
    const handleMouseMove = (e) => {
      const lines = document.querySelectorAll('.pip-line');
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      lines.forEach((line, index) => {
        const speed = index * 0.5 + 1;
        const x = (mouseX * 10 - 5) * speed;
        const y = (mouseY * 10 - 5) * speed;

        if (line.classList.contains('pip-line-1') || line.classList.contains('pip-line-2')) {
          line.style.transform = `translateX(${x}px)`;
        } else if (line.classList.contains('pip-line-3')) {
          line.style.transform = `translateY(${y}px)`;
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('pip-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.pip-feature-card, .pip-guide-step, .pip-section-header').forEach(element => {
      observer.observe(element);
    });

    // Cleanup
    return () => {
      // Remove from window
      delete window.calculatePipValue;

      clearTimeout(timer);

      inputs.forEach(input => {
        if (input._pipInputHandler) {
          input.removeEventListener('input', input._pipInputHandler);
          delete input._pipInputHandler;
        }
      });

      cards.forEach(card => {
        if (card._pipMouseEnterHandler) {
          card.removeEventListener('mouseenter', card._pipMouseEnterHandler);
          delete card._pipMouseEnterHandler;
        }
        if (card._pipMouseLeaveHandler) {
          card.removeEventListener('mouseleave', card._pipMouseLeaveHandler);
          delete card._pipMouseLeaveHandler;
        }
      });

      document.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!cmsRef.current) return;

    const scripts = cmsRef.current.querySelectorAll(
      'script[src*="tradingview.com"]'
    );

    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");

      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });

      newScript.innerHTML = oldScript.innerHTML;

      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  }, [data?.data?.htmlCode]);

  // Add CSS for the new FAQ accordion
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* New FAQ Accordion Styles */
      .home-faq-answer {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-out, opacity 0.2s ease-out, padding 0.3s ease-out;
        opacity: 0;
        padding: 0 1rem;
      }
      
      .home-faq-answer.active {
        max-height: 500px; /* Adjust based on your content */
        opacity: 1;
        padding: 1rem;
      }
      
      .home-faq-icon {
        transition: transform 0.3s ease;
      }
      
      .home-faq-icon.rotated {
        transform: rotate(45deg);
      }
      
      .home-faq-question {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        transition: background-color 0.2s ease;
      }
      
      .home-faq-question:hover {
        background-color: rgba(0, 0, 0, 0.02);
      }
    `;

    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <>
      <div className="bggg">
        <Header headers={headers} />

        <div
          ref={cmsRef}
          dangerouslySetInnerHTML={{
            __html: data?.data?.htmlCode,
          }}
        />

        {data?.data?.uniqueId === "1a3cac0bdf24c4233bc4" && (
          <>
            <Blog_home blog={blog} />
          </>
        )}

        <Footer footers={footers} footerSettings={footerSettings} />
      </div>
    </>
  );
};

export default PageRender;