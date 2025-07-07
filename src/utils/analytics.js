/**
 * Analytics utility for tracking user interactions and page views
 * Supports Google Analytics 4 and custom event tracking
 */

// Configuration
const ANALYTICS_CONFIG = {
  GA4_MEASUREMENT_ID: import.meta.env.VITE_GA4_MEASUREMENT_ID || import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  DEBUG_MODE: import.meta.env.DEV,
  ENABLED: import.meta.env.VITE_ENABLE_ANALYTICS === 'true' && import.meta.env.PROD,
};

// Initialize Google Analytics 4
export const initializeAnalytics = () => {
  if (!ANALYTICS_CONFIG.ENABLED) {
    // Analytics disabled in development mode
    return;
  }

  // Load Google Analytics 4 script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.GA4_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', ANALYTICS_CONFIG.GA4_MEASUREMENT_ID, {
    debug_mode: ANALYTICS_CONFIG.DEBUG_MODE,
    send_page_view: true,
  });

  if (ANALYTICS_CONFIG.DEBUG_MODE) {
    // Analytics initialized with GA4 ID: ${ANALYTICS_CONFIG.GA4_MEASUREMENT_ID}
  }
};

// Track page views
export const trackPageView = (pagePath, pageTitle) => {
  if (!ANALYTICS_CONFIG.ENABLED || !window.gtag) {
    if (ANALYTICS_CONFIG.DEBUG_MODE) {
      // Page view tracked (debug): { pagePath, pageTitle }
    }
    return;
  }

  window.gtag('config', ANALYTICS_CONFIG.GA4_MEASUREMENT_ID, {
    page_path: pagePath,
    page_title: pageTitle,
  });

  if (ANALYTICS_CONFIG.DEBUG_MODE) {
    // Page view tracked: { pagePath, pageTitle }
  }
};

// Track custom events
export const trackEvent = (eventName, parameters = {}) => {
  if (!ANALYTICS_CONFIG.ENABLED || !window.gtag) {
    if (ANALYTICS_CONFIG.DEBUG_MODE) {
      // Event tracked (debug): { eventName, parameters }
    }
    return;
  }

  window.gtag('event', eventName, {
    event_category: parameters.category || 'engagement',
    event_label: parameters.label,
    value: parameters.value,
    ...parameters,
  });

  if (ANALYTICS_CONFIG.DEBUG_MODE) {
    // Event tracked: { eventName, parameters }
  }
};

// Predefined event tracking functions
export const trackButtonClick = (buttonName, location) => {
  trackEvent('button_click', {
    category: 'ui_interaction',
    label: buttonName,
    location: location,
  });
};

export const trackFormSubmission = (formName, success = true) => {
  trackEvent('form_submit', {
    category: 'form_interaction',
    label: formName,
    success: success,
  });
};

export const trackDownload = (fileName, fileType) => {
  trackEvent('file_download', {
    category: 'content_interaction',
    label: fileName,
    file_type: fileType,
  });
};

export const trackOutboundLink = (url, linkText) => {
  trackEvent('click', {
    event_category: 'outbound_link',
    event_label: linkText,
    transport_type: 'beacon',
    custom_parameters: {
      destination_url: url,
    },
  });
};

export const trackDonation = (amount, method) => {
  trackEvent('donation', {
    category: 'ecommerce',
    currency: 'BWP', // Botswana Pula
    value: amount,
    payment_method: method,
  });
};

export const trackVolunteerSignup = (program) => {
  trackEvent('volunteer_signup', {
    category: 'conversion',
    label: program,
  });
};

export const trackNewsletterSignup = (source) => {
  trackEvent('newsletter_signup', {
    category: 'conversion',
    label: source,
  });
};

export const trackShopInteraction = (action, productName, productPrice) => {
  trackEvent('shop_interaction', {
    category: 'ecommerce',
    action: action, // 'view', 'add_to_cart', 'purchase'
    label: productName,
    value: productPrice,
  });
};

export const trackGalleryView = (eventName, imageCount) => {
  trackEvent('gallery_view', {
    category: 'content_interaction',
    label: eventName,
    image_count: imageCount,
  });
};

export const trackAccessibilityFeature = (feature, enabled) => {
  trackEvent('accessibility_toggle', {
    category: 'accessibility',
    label: feature,
    enabled: enabled,
  });
};

// Performance tracking
export const trackPerformance = () => {
  if (!ANALYTICS_CONFIG.ENABLED || !window.gtag || !window.performance) {
    return;
  }

  // Track Core Web Vitals
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'navigation') {
        trackEvent('page_timing', {
          category: 'performance',
          metric_name: 'page_load_time',
          value: Math.round(entry.loadEventEnd - entry.loadEventStart),
        });
      }
    }
  });

  observer.observe({ entryTypes: ['navigation'] });

  // Track Largest Contentful Paint (LCP)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    trackEvent('web_vitals', {
      category: 'performance',
      metric_name: 'LCP',
      value: Math.round(lastEntry.startTime),
    });
  }).observe({ entryTypes: ['largest-contentful-paint'] });

  // Track First Input Delay (FID)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach((entry) => {
      trackEvent('web_vitals', {
        category: 'performance',
        metric_name: 'FID',
        value: Math.round(entry.processingStart - entry.startTime),
      });
    });
  }).observe({ entryTypes: ['first-input'] });
};

// Error tracking
export const trackError = (error, errorInfo = {}) => {
  if (!ANALYTICS_CONFIG.ENABLED) {
    // Error tracked (debug): error, errorInfo
    return;
  }

  trackEvent('exception', {
    category: 'error',
    description: error.message || error.toString(),
    fatal: errorInfo.fatal || false,
    error_stack: error.stack,
    error_component: errorInfo.componentStack,
  });
};

// User engagement tracking
export const trackUserEngagement = () => {
  let startTime = Date.now();
  let isActive = true;

  // Track time on page
  const trackTimeOnPage = () => {
    if (isActive) {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      trackEvent('user_engagement', {
        category: 'engagement',
        metric_name: 'time_on_page',
        value: timeSpent,
      });
    }
  };

  // Track when user becomes inactive
  const handleVisibilityChange = () => {
    if (document.hidden) {
      isActive = false;
      trackTimeOnPage();
    } else {
      isActive = true;
      startTime = Date.now();
    }
  };

  // Track scroll depth
  let maxScrollDepth = 0;
  const trackScrollDepth = () => {
    const scrollDepth = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );
    
    if (scrollDepth > maxScrollDepth) {
      maxScrollDepth = scrollDepth;
      
      // Track at 25%, 50%, 75%, and 100% scroll milestones
      if ([25, 50, 75, 100].includes(scrollDepth)) {
        trackEvent('scroll_depth', {
          category: 'engagement',
          label: `${scrollDepth}%`,
          value: scrollDepth,
        });
      }
    }
  };

  // Set up event listeners
  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('scroll', trackScrollDepth, { passive: true });
  window.addEventListener('beforeunload', trackTimeOnPage);

  // Cleanup function
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('scroll', trackScrollDepth);
    window.removeEventListener('beforeunload', trackTimeOnPage);
  };
};

// Export configuration for external use
export { ANALYTICS_CONFIG };