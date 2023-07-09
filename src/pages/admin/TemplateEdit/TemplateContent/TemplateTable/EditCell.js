import React from 'react';
import {Cell} from 'rsuite-table';
import {DebounceInput} from 'react-debounce-input';
import {Input} from 'reactstrap';

import PropTypes from 'prop-types';

const EditCell = ({rowData, dataKey, onChange, onFocus, ...props}) => {
  return (
    <Cell {...props}>
      {rowData.status != 'EDIT' ? (
        <DebounceInput
          element={Input}
          minLength={1}
          debounceTimeout={-1}
          forceNotifyOnBlur={true}
          className='input  w-100'
          value={rowData[dataKey] || ''}
          onFocus={(event) => {
            onFocus && onFocus(event);
          }}
          onChange={(event) => {
            rowData[dataKey] = event.target.value;
            onChange &&
              onChange(rowData.id, dataKey, event.target.value, rowData);
          }}
        />
      ) : (
        rowData[dataKey]
      )}
    </Cell>
  );
};

EditCell.propTypes = {
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  rowData: PropTypes.object,
  dataKey: PropTypes.string,
  value: PropTypes.any,
};

export default EditCell;
