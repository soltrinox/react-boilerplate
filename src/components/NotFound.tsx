// Module Start
// JS imports
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import loadable from '@loadable/component';

const EmptyState = loadable(() => import('./EmptyState'));
const useStyles = makeStyles(() => ({
  emptyIcon: {
    color: '#0000008a',
    fontSize: 160,
    margin: '16px 0 0',
  },
}));

// 404
export default ({ staticContext = {} }) => {
  const classes = useStyles();

  staticContext.status = 404;

  return (
    <EmptyState
      title="Not Found"
      description="The requested section has not found."
    >
      <SearchIcon className={classes.emptyIcon} />
    </EmptyState>
  );
};
// Module End
