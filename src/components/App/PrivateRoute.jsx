import PropTypes from 'prop-types';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const selectedProject = useSelector(state => state.project.project);
  const location = useLocation();

  return selectedProject ? (
    children ? children : <Outlet />
  ) : (
    <Navigate to="/projects" state={{ from: location }} replace />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
