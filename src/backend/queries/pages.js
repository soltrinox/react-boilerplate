// Module Start
// JS imports
import gql from 'graphql-tag';
import Pages from './fragments/pages';

// Queries
const PAGE_QUERY = {};

// Pages
PAGE_QUERY.pages = {
  home: gql`
    {
    }

    ${Pages.fragments.pageId}
  `,
};

// Module export
export default PAGE_QUERY;
// Module end
