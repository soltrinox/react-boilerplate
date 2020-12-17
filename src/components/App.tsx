// Module Start
// App
// JS Imports
import React, { FC, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Theme, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TagManager from 'react-gtm-module';
import loadable from '@loadable/component';
import routes from '../routes';
import {
  googleTagManagerAuthDev,
  googleTagManagerAuthProd,
  handleCookiesCheck,
  refresh,
} from '../utils';

const NotFound = loadable(() => import('./NotFound'));
const contrastText: string = '#';
const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      light: '#',
      main: '#',
      dark: '#',
      contrastText,
    },
    secondary: {
      light: '#',
      main: '#',
      dark: '#',
      contrastText,
    },
  },
});

// App
const App: FC = () => {
  useEffect(() => {
    // Cookie check
    if (handleCookiesCheck('google') !== '') {
      TagManager.initialize({
        gtmId: 'GTM-',
        auth:
          process.env.NODE_ENV === 'production'
            ? googleTagManagerAuthProd
            : googleTagManagerAuthDev,
        preview: process.env.NODE_ENV === 'production' ? 'env-' : 'env-',
      });
    }

    refresh();
  }, []);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div className="App">
          <Container maxWidth="lg">
            <Switch>
              {routes.map((route) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <Route key={route.name} {...route} />
              ))}
              <Route component={NotFound} />
            </Switch>
          </Container>
        </div>
      </ThemeProvider>
    </>
  );
};

// Moduel export
export default App;
// Module End
