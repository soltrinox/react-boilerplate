// Module Start
// JS Imports
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Root from '../components/Root';
import client from '../backend/apollo';

const container = <Root client={client} />;

// Index Unit Testing
describe('Root unit test', () => {
  test('It renders the root', () => {
    const wrapper = mount(container);

    expect(wrapper.find('[className="App"]')).toHaveLength(1);
  });
});
// Snapshot testing
describe('Root snapshot test', () => {
  test('It matches snapshot', () => {
    const wrapper = shallow(container);

    expect(toJson(wrapper)).toMatchInlineSnapshot();
  });
});
// Module End
