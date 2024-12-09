// Import core React and ReactDOM functionality
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./hooks/useAuth";

// Create a root element for React to render into
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app with necessary providers:
// - HelmetProvider: Manages document head tags
// - BrowserRouter: Enables client-side routing
// - AuthProvider: Handles authentication state
root.render(
  <HelmetProvider>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </HelmetProvider>
);

// Service worker configuration
// Currently disabled - enable for offline functionality
serviceWorker.unregister();

// Web Vitals performance measurement
// Can be used to track Core Web Vitals metrics
reportWebVitals();
