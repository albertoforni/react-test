import React, { PropTypes } from 'react';

const MyLayout = props => (
  <div>
    {props.children}
  </div>
);

MyLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyLayout;
