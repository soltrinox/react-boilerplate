// Jest - Setup
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

global.fetch = require('jest-fetch-mock');

configure({
  adapter: new Adapter(),
});
