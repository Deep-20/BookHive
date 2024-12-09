// Import necessary components and providers
import {Toaster} from "react-hot-toast"; // For displaying toast notifications
import Router from './routes'; // Main routing configuration
import ThemeProvider from './theme'; // Custom theme wrapper component
import ScrollToTop from './components/scroll-to-top'; // Handles scrolling behavior

// Root component of the application
export default function App() {
  return (
    <ThemeProvider>
      {/* Toast notification container */}
      <div><Toaster/></div>
      
      {/* Scrolls to top on route changes */}
      <ScrollToTop/>
      
      {/* Main routing component */}
      <Router/>
    </ThemeProvider>
  );
}
