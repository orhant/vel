import React, {useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Table, Column, HeaderCell, Cell} from 'rsuite-table';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import {NumericFormat} from 'react-number-format';
import DragableRow from 'components/table/DragableRow';
import PropTypes from 'prop-types';
import EditCell from './EditCell';
import SmoothScrollPlugin from 'components/table/SmoothScrollPlugin';

import {
  getFinanceData,
  updateTemplateIndent,
  updateTemplateData,
  sortFinanceData,
} from 'redux/actions';

const TemplateTable = ({showHiddenRow}) => {
  const [dragedItem, setDragedItem] = useState(null);
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  //selector
  const {loading, currentStock} = useSelector(({common}) => common);
  const {stock_code = null} = currentStock;
  const {
    selectedTemplate = {},
    templateData = [],
    cols = [],
  } = useSelector(({template}) => template);

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

  const renderSortIcon = (sortType) => {
    // const iconStyle = {fontSize: 18};

    if (sortType === 'asc') {
      return <i className=' ri-arrow-drop-up-line mx-2 '></i>;
    } else if (sortType === 'desc') {
      return <i className='ri-arrow-drop-up-line mx-2'></i>;
    }

    return <i className='ri-arrow-drop-up-line  mx-2'></i>;
  };

  const handleChange = (id, key, value, rowData) => {
    let data = {id, key, value, rowData};

    dispatch(updateTemplateData(data));
  };
  const handleDragRow = (sourceId, targetId) => {
    if (sourceId != targetId) {
      dispatch(sortFinanceData({sourceId, targetId}));
      setDragedItem(sourceId);
    }
  };

  const filteredData = templateData.filter(
    (item) => item.isHidden == showHiddenRow,
  );

  // const onDragEnd = (result) => {
  //   console.log(result);
  // };

  const plugin = new SmoothScrollPlugin(tableRef);

  const handleRowClick = (item) => {
    console.log(item);
  };
  return (
    <Table
      // className='app-page-content-scroll'
      data={filteredData}
      fillHeight={true}
      loading={loading}
      cellBordered
      bordered
      rowHeight={42}
      virtualized
      rowKey='id'
      onRowClick={handleRowClick}
      //disabledScroll
      ref={tableRef}
      // renderRow={(children, rowData, rowIndex) => {
      //   return rowData ? (
      //     <Droppable droppableId={rowData['id'].toString()}>
      //       {(provided) => (
      //         <div {...provided.droppableProps} ref={provided.innerRef}>
      //           <Draggable
      //             key={rowData.id}
      //             draggableId={rowData['id'].toString()}
      //             index={rowData['id']}
      //           >
      //             {(provided) => (
      //               <div
      //                 {...provided.draggableProps}
      //                 {...provided.dragHandleProps}
      //                 ref={provided.innerRef}
      //               >
      //                 {children}
      //               </div>
      //             )}
      //           </Draggable>

      //           {provided.placeholder}
      //         </div>
      //       )}
      //     </Droppable>
      //   ) : (
      //     children
      //   );
      // }}
      renderRow={(children, rowData) => {
        return rowData && !showHiddenRow ? (
          <DragableRow
            key={rowData.id}
            rowData={rowData}
            id={rowData.id}
            onDrag={handleDragRow}
            plugin={plugin}
            selected={rowData.id === dragedItem}
          >
            {children}
          </DragableRow>
        ) : (
          children
        );
      }}
    >
      <Column width={90} align='center' fixed>
        <HeaderCell>id</HeaderCell>
        <Cell dataKey='id'>
          {(rowData) => {
            return (
              <ul className='list-inline hstack gap-0 mb-0'>
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

                <li
                  className='list-inline-item edit'
                  title='Arttır'
                  onClick={() => {
                    rowData.isHidden = !showHiddenRow;
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
                    <i
                      className={
                        showHiddenRow
                          ? '  ri-eye-fill fs-16 '
                          : '  ri-eye-off-fill fs-16'
                      }
                    ></i>
                  </Link>
                </li>
              </ul>
            );
          }}
        </Cell>
      </Column>
      <Column width={80} align='left' resizable fixed>
        <HeaderCell>Row</HeaderCell>
        <Cell dataKey='row_number' />
      </Column>
      <Column width={350} align='left' resizable fixed>
        <HeaderCell>label</HeaderCell>
        <Cell dataKey='label'>
          {(rowData, dataKey) => {
            let cLevel = rowData.level;
            let nLevel =
              dataKey + 1 in filteredData
                ? filteredData[dataKey + 1]['level']
                : cLevel;

            let str = '\t'.repeat(rowData.level) + rowData.label;
            let styles = {
              whiteSpace: 'pre',
              tabSize: 8,
              textTransform: cLevel < nLevel ? 'uppercase' : null,
              fontWeight: cLevel < nLevel ? 'bolder' : null,
            };
            return <span style={styles}>{str}</span>;
          }}
        </Cell>
      </Column>
      <Column width={100} align='center' resizable fixed>
        <HeaderCell>item code</HeaderCell>

        <EditCell dataKey='item_code' onChange={handleChange} />
      </Column>
      <Column width={350} align='center' resizable fixed>
        <HeaderCell>item_desc</HeaderCell>

        <EditCell dataKey='item_desc' onChange={handleChange} />
      </Column>

      {(cols || []).map((item) => (
        <Column key={item} width={120} align='right' resizable>
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
            {(rowData) => {
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
  );
};

TemplateTable.propTypes = {
  showHiddenRow: PropTypes.any,
};
export default TemplateTable;
