// Module Start
// JS imports
import gql from 'graphql-tag';

// Fragments
const Pages = {};

// Pages
Pages.fragments = {
  pageId: gql`
    fragment PagesFragmentsPageId on Page {
      id
    }
  `,
};

// Module export
export default Pages;
// Module end
