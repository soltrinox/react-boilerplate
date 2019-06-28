// Module Start
// App
// JS Imports
import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import '../sass/App.scss';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#',
      main: '#',
      dark: '#',
      contrastText: '#',
    },
    secondary: {
      light: '#',
      main: '#',
      dark: '#',
      contrastText: '#',
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
        <div className="App">
        </div>
      </>
    );
  }
}

// Moduel export
export default App;
// Module End
