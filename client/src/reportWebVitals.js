// Function to report Core Web Vitals metrics using the web-vitals library
const reportWebVitals = (onPerfEntry) => {
  // Only execute if callback is provided and is a valid function
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import web-vitals library and destructure the metric functions
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Report Cumulative Layout Shift (CLS) - measures visual stability
      getCLS(onPerfEntry);
      // Report First Input Delay (FID) - measures interactivity
      getFID(onPerfEntry);
      // Report First Contentful Paint (FCP) - measures loading performance
      getFCP(onPerfEntry);
      // Report Largest Contentful Paint (LCP) - measures loading performance
      getLCP(onPerfEntry);
      // Report Time to First Byte (TTFB) - measures server response time
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
