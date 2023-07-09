/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getFinanceData} from 'redux/actions';
import {Table, Column, HeaderCell, Cell} from 'rsuite-table';
import {DebounceInput} from 'react-debounce-input';
import {Button, Input} from 'reactstrap';
import {NumericFormat} from 'react-number-format';
import {Link} from 'react-router-dom';
import useSortableData from '@hap/utility/hooks/useSortableData';
import {
  updateTemplateData,
  sortTemplateData,
  updateTemplateIndent,
} from 'redux/actions';

const BaseCell = React.forwardRef((props, ref) => {
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
const InputCell = React.memo(
  ({rowData, dataKey, value, onChange, ...props}) => {
    function handleChange(event) {
      rowData[dataKey] = event.target.value;
      console.log(rowData);
      onChange(rowData.id, event.target.value, rowData);
    }

    return (
      <BaseCell {...props}>
        <input value={rowData[dataKey]} onChange={handleChange} />
      </BaseCell>
    );
  },
);

//react-debounce-input
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
const TemplateTable = () => {
  const [sortColumn, setSortColumn] = React.useState('row');
  const [sortType, setSortType] = React.useState('desc');

  const dispatch = useDispatch();
  const renderSortIcon = (sortType) => {
    const iconStyle = {fontSize: 18};

    if (sortType === 'asc') {
      return <i className=' ri-arrow-drop-up-line mx-2 '></i>;
    } else if (sortType === 'desc') {
      return <i className='ri-arrow-drop-up-line mx-2'></i>;
    }

    return <i className='ri-arrow-drop-up-line  mx-2'></i>;
  };
  const {
    selectedTemplate = {},
    templateData = [],
    cols = [],
  } = useSelector(({template}) => template);
  const {loading} = useSelector(({common}) => common);

  const {currentStock = {}} = useSelector(({common}) => common);
  const {stock_code = null} = currentStock;
  useEffect(() => {
    if (selectedTemplate) {
      //   dispatch(onResetFinTables());
      dispatch(
        getFinanceData({
          stock_code: stock_code,
          template_id: selectedTemplate.template_id,
          template_type: selectedTemplate.template_type,
        }),
      );
    }
  }, [selectedTemplate]);
  const handleChange = (id, key, value, rowData) => {
    let data = {id, key, value, rowData};
    console.log(rowData);

    dispatch(updateTemplateData(data));
    // dispatch(onSetFinTables(data));
  };
  const {items, requestSort, sortConfig} = useSortableData(templateData);
  const sortTableData = () => {
    return templateData.sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortType === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortType === 'asc' ? 1 : -1;
      return 0;
    });
  };
  const getData = () => {
    if (sortColumn && sortType) {
      return templateData.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];

        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return templateData;
  };
  const handleSortColumn = (sortColumn, sortType) => {
    // setLoading(true);
    setTimeout(() => {
      // setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 5);
  };

  return (
    <>
      <Table
        fillHeight={true}
        sortColumn={sortColumn}
        data={sortTableData()}
        onSortColumn={handleSortColumn}
        sortType={sortType}
        loading={loading}
        cellBordered
        bordered
        rowHeight={42}
        // onRowClick={(data) => {
        //   console.log(data);
        // }}
        virtualized
        // onScroll={handleScroll}
      >
        <Column width={90} align='center' fixed>
          <HeaderCell>id</HeaderCell>
          <Cell dataKey='id'>
            {(rowData, rowIndex) => {
              return (
                <ul className='list-inline hstack gap-2 mb-0'>
                  <li
                    className='list-inline-item edit'
                    title='Azalt'
                    onClick={() => {
                      if (rowData.level > 0) {
                        rowData.level = rowData.level - 1;
                        dispatch(
                          updateTemplateIndent({
                            iid: rowData.id,
                            rowData,
                            type: 'decrease',
                          }),
                        );
                      }
                    }}
                  >
                    <Link to='#' className='text-muted d-inline-block'>
                      <i className='ri-indent-decrease fs-16'></i>
                    </Link>
                  </li>
                  <li
                    className='list-inline-item edit'
                    title='Arttır'
                    onClick={() => {
                      rowData.level = rowData.level + 1;
                      dispatch(
                        updateTemplateIndent({
                          iid: rowData.id,
                          rowData,
                          type: 'increase',
                        }),
                      );
                    }}
                  >
                    <Link to='#' className='text-muted d-inline-block'>
                      <i className='ri-indent-increase fs-16'></i>
                    </Link>
                  </li>
                </ul>
              );
            }}
          </Cell>
        </Column>
        <Column width={80} align='left' resizable fixed sortable>
          <HeaderCell>Row</HeaderCell>
          <Cell dataKey='row_number' />
        </Column>

        <Column width={350} align='left' resizable fixed sortable>
          <HeaderCell renderSortIcon={renderSortIcon}>label</HeaderCell>
          <Cell dataKey='label'>
            {(rowData, rowIndex) => {
              let str = '\t'.repeat(rowData.level) + rowData.label;

              return (
                <span
                  style={{
                    whiteSpace: 'pre',
                  }}
                >
                  {str}
                </span>
              );
            }}
          </Cell>
        </Column>
        <Column width={100} align='center' resizable fixed sortable>
          <HeaderCell renderSortIcon={renderSortIcon}>item code</HeaderCell>

          <EditCell dataKey='item_code' onChange={handleChange} />
        </Column>
        <Column width={350} align='center' resizable fixed>
          <HeaderCell renderSortIcon={renderSortIcon}>item_desc</HeaderCell>

          <EditCell dataKey='item_desc' onChange={handleChange} />
        </Column>

        {(cols || []).map((item, key) => (
          <Column key={item} width={120} align='right' resizable sortable>
            <HeaderCell renderSortIcon={renderSortIcon}>
              {item.period}
              <Link
                to={item.kapURL}
                // className='link-info'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button
                  type='button'
                  className='btn btn-icon btn-topbar btn-sm btn-ghost-secondary   mb-1 ml-2'
                >
                  <i className='ri-information-line'></i>
                </Button>
              </Link>
            </HeaderCell>
            <Cell dataKey={item.period}>
              {(rowData, rowIndex) => {
                let d = rowData[item.period] === 0 ? '' : rowData[item.period];
                return (
                  <NumericFormat
                    value={d}
                    allowLeadingZeros
                    thousandSeparator=','
                    displayType={'text'}
                  />
                );
              }}
            </Cell>
          </Column>
        ))}
      </Table>
    </>
  );
};

export default TemplateTable;
