import React from 'react';
import PropTypes from 'prop-types';
import BaseCell from './BaseCell';

const InputCell = React.memo(({rowData, dataKey, onChange, ...props}) => {
  function handleChange(event) {
    rowData[dataKey] = event.target.value;
    onChange(rowData.id, event.target.value, rowData);
  }

  return (
    <BaseCell {...props}>
      <input value={rowData[dataKey]} onChange={handleChange} />
    </BaseCell>
  );
});

InputCell.propTypes = {
  onChange: PropTypes.func,
  rowData: PropTypes.object,
  dataKey: PropTypes.string,
  value: PropTypes.any,
};

export default InputCell;
