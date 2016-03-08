import React, { PropTypes } from 'react';

function InspectorLayout({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}

InspectorLayout.propTypes = {
  children: PropTypes.node,
};

export default InspectorLayout;
