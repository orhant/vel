import React from 'react';
import {useDrag, useDrop} from 'react-dnd';

import PropTypes from 'prop-types';

const ItemTypes = {
  COLUMN: 'column',
  ROW: 'row',
};

const DragableRow = ({children, onDrag, rowData, plugin, selected}) => {
  const ref = React.useRef(null);
  const [{canDrop, isOver}, drop] = useDrop(() => ({
    accept: ItemTypes.ROW,
    // hover(props, monitor, component) {
    //   const monitorItem = monitor.getItem();

    //   // Get size and position of the hovered page
    //   const domNode = ReactDOM.findDOMNode(component);
    //   if (!domNode) {
    //     return;
    //   }
    //   const hoverBoundingRect = domNode.getBoundingClientRect(),
    //     // Get vertical middle
    //     hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2,
    //     // Determine mouse position
    //     clientOffset = monitor.getClientOffset(),
    //     // Get pixels to the top
    //     hoverClientY = clientOffset.y - hoverBoundingRect.top;

    //   const direction = dragIndex < hoverIndex ? 'down' : 'up';
    //   // Dragging downwards
    //   if (direction === 'down' && hoverClientY < hoverMiddleY) {
    //     return;
    //   }

    //   // Dragging upwards
    //   if (direction === 'up' && hoverClientY > hoverMiddleY) {
    //     return;
    //   }

    //   if (direction === 'down') {
    //     // movedTo = monitorItem.onDragSwap(...);
    //   }
    //   if (direction === 'up') {
    //     // movedTo = monitorItem.onDragSwap(...);
    //   }
    // },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: (item) => {
      onDrag?.(item.id, rowData.id);
    },
  }));

  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.ROW,
    // item: {id: rowData.id},
    end: () => {
      plugin.onDragEnd();
    },
    item: () => {
      // This function is invoked when the drag operation starts
      // You can specify the data associated with the dragged item here
      console.log('start');
      plugin.onDragStart();
      return {id: rowData.id};
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  //   const opacity = isDragging ? 0 : 1;
  const isActive = canDrop && isOver;

  drag(drop(ref));

  const styles = {
    cursor: 'grab',
    opacity: isDragging ? 0.5 : 1,
    background: isActive ? '#ddd' : selected ? 'rgba(243, 246, 249,1)' : null,
    width: '100%',
    height: '100%',
    borderTop: isActive ? '2px solid #2589f5' : null,
  };

  return (
    <div ref={ref} className='abc' style={styles}>
      {children}
    </div>
  );
};

DragableRow.propTypes = {
  onDrag: PropTypes.func,
  children: PropTypes.node,

  rowData: PropTypes.object,
  plugin: PropTypes.object,
  selected: PropTypes.object,
};

export default DragableRow;
