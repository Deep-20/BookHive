import PropTypes from 'prop-types'
import {Navigate} from "react-router-dom";

/**
 * A wrapper component that protects routes from unauthorized access.
 * Redirects to the landing page if no user is authenticated.
 * 
 * @param {Object} props
 * @param {Object} props.user - The current user object, null if not authenticated
 * @param {React.ReactNode} props.children - The child components to render if authenticated
 * @returns {React.ReactElement} The protected children or a redirect component
 */
const ProtectedRoute = ({user, children}) => {
  if (!user) {
    return <Navigate to="/landing" replace/>;
  }

  return children;
};

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node,
}
