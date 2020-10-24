// Module Start
// JS Imports
import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import Root from '../components/Root';
import client from '../apollo';
import {
  setup,
  teardown
} from '../utils';

let container = null;

// App Unit Testing
describe('App test', () => {
  setup(container);
  test('It renders the root App without crashing', () => {
      act(() => {
        shallow(
          <BrowserRouter>
            <Root client={client} />
          </BrowserRouter>,
          container
        );
      });
  });
  teardown(container);
});
// Module End
