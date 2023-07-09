import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import BaseTable, {Column} from 'react-base-table';
import DraggableTable from './trash';
import {AutoResizer} from 'react-base-table';
import 'react-base-table/styles.css';
import {Link} from 'react-router-dom';
import {
  getFinanceData,
  updateTemplateIndent,
  updateTemplateData,
  sortFinanceData,
} from 'redux/actions';
const BTable = ({showHiddenRow}) => {
  const dispatch = useDispatch();

  // get stock codes
  const {loading, currentStock} = useSelector(({common}) => common);
  const {stock_code = null} = currentStock;

  // get template data
  const {
    selectedTemplate = {},
    templateData = [],
    cols = [],
  } = useSelector(({template}) => template);
  const columns = [
    {
      key: 'action',
      dataKey: 'action',
      width: 100,
      align: Column.Alignment.CENTER,
      frozen: Column.FrozenDirection.LEFT,
      cellRenderer: (data) => {
        const {rowData} = data;
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
                    id: rowData.id,
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
                    id: rowData.id,
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
      },
    },
    {
      key: 'id',
      title: 'ID',
      dataKey: 'id',
      width: 150,
      resizable: true,
      sortable: true,
      editable: true,
      frozen: Column.FrozenDirection.LEFT,
    },
    {
      key: 'level',
      title: 'level',
      dataKey: 'level',
      width: 150,
      resizable: true,
      sortable: true,
      editable: true,
      frozen: Column.FrozenDirection.LEFT,
    },
    {
      key: 'row_number',
      title: 'row_number',
      dataKey: 'row_number',
      width: 150,
      resizable: true,
      sortable: true,
      editable: true,
      frozen: Column.FrozenDirection.LEFT,
    },
    {
      key: 'label',
      title: 'label',
      dataKey: 'label',
      width: 200,
      resizable: true,
      sortable: true,
      editable: false,
      frozen: Column.FrozenDirection.LEFT,
      cellRenderer: (data) => {
        const {rowData, rowIndex: dataKey} = data;

        let cLevel = rowData.level;
        let nLevel =
          dataKey + 1 in templateData
            ? templateData[dataKey + 1]['level']
            : cLevel;

        let str = '\t'.repeat(rowData.level) + rowData.label;
        let styles = {
          whiteSpace: 'pre',
          tabSize: 4,
          textTransform: cLevel < nLevel ? 'uppercase' : null,
          fontWeight: cLevel < nLevel ? 'bolder' : null,
        };
        return <span style={styles}>{str}</span>;
      },
    },
    // {
    //   key: 'label',
    //   dataKey: 'label',
    //   width: 100,
    //   align: Column.Alignment.CENTER,
    //   frozen: Column.FrozenDirection.RIGHT,
    //   cellRenderer: ({rowData}) => (
    //     <button
    //       onClick={() =>
    //         setDataset((dataset) =>
    //           dataset.filter((elem) => elem.id !== rowData.id),
    //         )
    //       }
    //     >
    //       Remove
    //     </button>
    //   ),
    //},
  ];
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
  const rowProps = ({rowData, rowIndex}) => {
    return {
      ...{id: `row-${rowIndex}`},
    };
  };
  const width = 700;
  const height = 700;
  return (
    <div className='App'>
      <h1>React base table</h1>
      <div style={{width: 500, height: 700}}>
        <BaseTable
          fixed
          selectable
          columns={columns}
          width={500}
          height={700}
          data={templateData}
        />
      </div>
    </div>
  );
};

export default BTable;
