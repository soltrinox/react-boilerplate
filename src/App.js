import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import './App.scss';

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

class App extends Component {
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

export default App;
