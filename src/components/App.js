// Module Start
// App
// JS Imports
import React, { Component } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
import TagManager from 'react-gtm-module';
import loadable from '@loadable/component';
import routes from '../routes';
import {
  googleTagManagerAuthDev,
  googleTagManagerAuthProd,
  handleCookiesCheck
} from '../utils';

const NotFound = loadable(() => import('./Error/NotFound'));
const contrastText = '#';
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#',
      main: '#',
      dark: '#',
      contrastText: contrastText,
    },
    secondary: {
      light: '#',
      main: '#',
      dark: '#',
      contrastText: contrastText,
    },
  },
});

/**
 * @description App
 * @author Luca Cattide
 * @date 2019-06-27
 * @class App
 * @extends {Component}
 */
class App extends Component {
  /**
   * @description Component mounting cycle
   * @author Luca Cattide
   * @date 2020-06-11
   * @memberof App
   */
  componentDidMount() {
    // Cookie check
    if (handleCookiesCheck('google') !== '') {
      TagManager.initialize({
        gtmId: 'GTM-',
        auth: process.env.NODE_ENV === 'production' ?
          googleTagManagerAuthProd :
          googleTagManagerAuthDev,
        preview: process.env.NODE_ENV === 'production' ?
          'env-' :
          'env-'
      });
    }
  }

  /**
   * @description App rendering
   * @author Luca Cattide
   * @date 2019-06-27
   * @returns
   * @memberof App
   */
  render() {
    return (
      <>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <div className="App">
            <Container maxWidth="lg">
              <Switch>
                {routes.map((route) => (
                  <Route key={route.name} {...route} />
                ))}
                <Route component={NotFound} />
              </Switch>
            </Container>
          </div>
        </ThemeProvider>
      </>
    );
  }
}

// Moduel export
export default App;
// Module End
