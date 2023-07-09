import React from 'react';
import {Cell} from 'rsuite-table';

import PropTypes from 'prop-types';

export const BaseCell = React.forwardRef((props, ref) => {
  const {children, rowData, ...rest} = props;

  return (
    <Cell
      ref={ref}
      rowData={rowData}
      onDoubleClick={() => {
        console.log(rowData);
      }}
      {...rest}
    >
      {children}
    </Cell>
  );
});

BaseCell.propTypes = {
  children: PropTypes.node,
  rowData: PropTypes.object,
};

export default BaseCell;
