// Module Start
// JS imports
import { RouteProps } from 'react-router-dom';
import { navigationPaths } from './utils';

// Types
type RouteName = {
  name: string;
};

// Routes
const routes: Array<RouteProps & RouteName> = [
  {
    path: navigationPaths,
    name: 'Index',
    component: undefined,
  },
];

// Module export
export default routes;
// Module End
