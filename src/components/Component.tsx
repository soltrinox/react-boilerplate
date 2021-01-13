// Module Start
// JS imports
import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import PAGE_QUERY from '../backend/queries/pages';

// Interfaces
interface Page {
  property: unknown;
}
interface PageData {
  entity: Page[];
}
interface PageVars {
  var: unknown;
}

// Demo component
const Component: FC = () => {
  const { loading, error, data } = useQuery<PageData, PageVars>(
    PAGE_QUERY.pages.home,
    { variables: { var: 'foo' } },
  );

  // Exception check
  if (error) {
    return error;
  }
  // DB fetching check
  if (loading) {
    return null;
  }

  const contents = data?.something;

  return <>Foo</>;
};

// Module export
export default Component;
// Module End
