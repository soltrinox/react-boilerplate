// Module Start
// Module Imports
import {
  dataFetch
} from '../utils';

// Data Fetching Unit Testing
describe('Data fetching test', () => {
  // Startup
  beforeEach(() => {
    fetch.resetMocks();
  });
  // Home Test
  test('It returns the Home Page data', () => {
    const onResponse = jest.fn();
    const onError = jest.fn();
    const mocks = {
      data: {
      }
    };

    fetch.mockResponseOnce(JSON.stringify(mocks));

    return dataFetch('/graphql', PAGE_QUERY.pages.home)
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
        expect(onResponse.mock.calls[0][0]).toEqual(mocks);
      });
  });
});
