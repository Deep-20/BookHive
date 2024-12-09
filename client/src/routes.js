import { Navigate, useRoutes } from "react-router-dom";
import LibraryApp from "./layouts/dashboard";
import AuthorPage from "./sections/@dashboard/author/AuthorPage";
import LoginPage from "./sections/auth/login/LoginPage";
import SignupPage from './sections/auth/signup/SignupPage';
import Page404 from "./pages/Page404";
import BorrowalPage from "./sections/@dashboard/borrowal/BorrowalPage";
import BookPage from "./sections/@dashboard/book/BookPage";
import DashboardAppPage from "./sections/@dashboard/app/DashboardAppPage";
import UsersPage from "./sections/@dashboard/user/UserPage";
import GenrePage from "./sections/@dashboard/genre/GenrePage";
import { useAuth } from "./hooks/useAuth";

// ----------------------------------------------------------------------

// Main Router component that handles role-based routing
export default function Router() {
  const { user } = useAuth();

  // Admin routes - Full access to all features
  const adminRoutes = useRoutes([
    {
      path: "/",
      element: <LibraryApp />,
      children: [
        // Admin dashboard is the default landing page
        { element: <Navigate to="/dashboard" />, index: true },
        // Admin has access to all pages including dashboard and user management
        { path: "dashboard", element: <DashboardAppPage /> },
        { path: "authors", element: <AuthorPage /> },
        { path: "books", element: <BookPage /> },
        { path: "borrowals", element: <BorrowalPage /> },
        { path: "genres", element: <GenrePage /> },
        { path: "users", element: <UsersPage /> }
      ]
    },
    // Authentication routes
    {
      path: "login",
      element: <LoginPage />
    },
    {
      path: 'signup',
      element: <SignupPage />
    },
    {
      path: "404",
      element: <Page404 />
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />
    }
  ]);

  // Member routes - Limited access without admin features
  const memberRoutes = useRoutes([
    {
      path: "/",
      element: <LibraryApp />,
      children: [
        // Books page is the default landing page for members
        { element: <Navigate to="/books" />, index: true },
        // Members can access books, authors, genres, and their borrowals
        { path: "books", element: <BookPage /> },
        { path: "authors", element: <AuthorPage /> },
        { path: "genres", element: <GenrePage /> },
        { path: "borrowals", element: <BorrowalPage /> }
      ]
    },
    // Authentication routes
    {
      path: "login",
      element: <LoginPage />
    },
    {
      path: 'signup',
      element: <SignupPage />
    },
    {
      path: "404",
      element: <Page404 />
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />
    }
  ]);

  // Guest routes - Only authentication pages accessible
  const guestRoutes = useRoutes([
    // Guests can only access login and signup pages
    // All other paths redirect to login
    {
      path: "login",
      element: <LoginPage />
    },
    {
      path: 'signup',
      element: <SignupPage />
    },
    {
      path: "404",
      element: <Page404 />
    },
    {
      path: "*",
      element: <Navigate to="/login" replace />
    }
  ]);

  // Route selection based on user role
  if (user) {
    if (user.isAdmin) {
      return adminRoutes;
    }
    return memberRoutes;
  }
  return guestRoutes;
}
