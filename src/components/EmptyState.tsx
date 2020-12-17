// Module Start
// JS imports
import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Button, Zoom } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CommonProps, EmptyProps } from './global';

const useStyles = makeStyles(() => ({
  center: {
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  emptyStateCta: {
    margin: '.5em 0 0',
  },
  emptyStateDescription: {
    margin: '1em 0',
  },
  emptyStateTitle: {
    margin: '.2em 0 0',
  },
}));
// CTA setter
const handleCta = (url: string) =>
  React.forwardRef((props, ref) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <RouterLink ref={ref} to={url} {...props} />
  ));

// Empty State
const EmptyState: FC<CommonProps & EmptyProps> = (props) => {
  const {
    children,
    title,
    description,
    cta,
    action,
    url,
  }: CommonProps & EmptyProps = props;
  const classes = useStyles();

  return (
    <Zoom
      in
      timeout={{
        enter: 150,
        exit: 75,
      }}
    >
      <div className={classes.emptyState}>
        {children}
        {/* Title Start */}
        <Typography variant="h6" className={classes.emptyStateTitle}>
          {title}
        </Typography>
        {/* Title End */}
        {/* Description Start */}
        <Typography
          variant="body1"
          className={`${classes.emptyStateDescription} ${classes.center}`}
        >
          {description}
        </Typography>
        {/* Description End */}
        {/* CTA Start */}
        {action && action === 'link' && (
          <Button
            variant="contained"
            color="primary"
            className={classes.emptyStateCta}
            component={handleCta(url)}
          >
            {cta}
          </Button>
        )}
        {/* CTA End */}
      </div>
    </Zoom>
  );
};

// Properties initialization
EmptyState.defaultProps = {
  cta: '',
  action: '',
  url: '',
};
// Properties validation
EmptyState.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cta: PropTypes.string,
  action: PropTypes.string,
  url: PropTypes.string,
};

// Module export
export default EmptyState;
// Module End
