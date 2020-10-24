// Module Start
// JS imports
import Reset from './components/Authentication/Reset';
import { navigationPaths } from './utils';

// Routes
const routes = [{
  path: '/reset',
  name: 'reset',
  exact: true,
  component: Reset
}];

// Module export
export default routes;
// Module End
