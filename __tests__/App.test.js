// Module Start
// Module Imports
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';

// App Unit Testing
describe('App test', () => {
  test('It renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
