import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc';
import styled from 'styled-components';
import React, {useState, useEffect} from 'react';
import BaseTable, {Column, AutoResizer} from 'react-base-table';
import EditableCell from './EditableCell';

const DraggableContainer = sortableContainer(({children}) => children);
const DraggableElement = sortableElement(({children}) => children);
const DraggableHandle = sortableHandle(({children}) => children);

const Handle = styled.div`
  flex: none;
  width: 7.5px;
  height: 100%;

  &::before {
    content: '';
    border-left: 4px dotted #ccc;
    display: block;
    height: 20px;
    margin: 15px 3px;
  }

  &:hover::before {
    border-color: #888;
  }
`;

const Row = ({key, index, children, ...rest}) => (
  <DraggableElement key={key} index={index}>
    <div {...rest}>
      <DraggableHandle>
        <Handle />
      </DraggableHandle>
      {children}
    </div>
  </DraggableElement>
);

const rowProps = ({rowIndex}) => ({
  tagName: Row,
  index: rowIndex,
});

const DraggableTable = (props) => {
  const [data, setData] = useState(props.data);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const table = React.createRef();

  const getContainer = () => {
    return table.current.getDOMNode().querySelector('.BaseTable__body');
  };

  const getHelperContainer = () => {
    return table.current.getDOMNode().querySelector('.BaseTable__table');
  };

  const rowProps = (args) => {
    // don't forget to passing the incoming rowProps
    const extraProps = props.rowProps;
    return {
      ...extraProps,
      tagName: Row,
      index: args.rowIndex,
    };
  };

  const handleSortEnd = ({oldIndex, newIndex}) => {
    const dataArr = [...data];
    const [removed] = dataArr.splice(oldIndex, 1);
    dataArr.splice(newIndex, 0, removed);
    setData(dataArr);
  };

  return (
    <DraggableContainer
      useDragHandle
      getContainer={getContainer}
      helperContainer={getHelperContainer}
      onSortEnd={handleSortEnd}
    >
      <BaseTable
        {...props}
        ref={table}
        data={props.data}
        fixed={false}
        rowProps={rowProps}
        forceUpdateTable
      />
    </DraggableContainer>
  );
};

export default DraggableTable;
