// const SCROLL_OFFSET = 200;

// function scrollDown(tableRef) {
//   if (tableRef.current) {
//     tableRef.current.scrollTop(
//       Math.abs(tableRef.current.body.getBoundingClientRect().y - 200),
//     );
//   }
// }

// function scrollUp(tableRef) {
//   if (tableRef.current) {
//     console.log(tableRef.current.body.getBoundingClientRect().y);
//     if (Math.abs(tableRef.current.body.getBoundingClientRect().y) > 100) {
//       tableRef.current.scrollTop(0);
//     }
//   }
// }

export default class SmoothScrollPlugin {
  data = {
    isDragging: false,
  };
  constructor(tableRef) {
    this.tableRef = tableRef;
    this.addEventListeners();
  }

  onDragStart = () => {
    this.data = {
      isDragging: true,
      lastMouseClientY: undefined,
    };
    this.smoothscroll(this.tableRef);
  };

  onDragEnd = () => {
    this.data = {
      isDragging: false,
      lastMouseClientY: undefined,
    };
  };

  addEventListeners = () => {
    if (this.tableRef.current)
      this.tableRef.current.root.addEventListener('dragover', (e) => {
        // console.log(e.clientY, e.offsetY);
        this.data.lastMouseClientY = e.clientY;
      });
  };

  smoothscroll = () => {
    // const {isDragging, lastMouseClientY} = this.data;
    // if (isDragging) {
    //   console.log(this.tableRef.current.body.getBoundingClientRect());
    //   if (lastMouseClientY !== undefined) {
    //     if (lastMouseClientY > this.tableRef.current.root.clientHeight + 50) {
    //       scrollDown(this.tableRef);
    //     } else if (lastMouseClientY < 205) {
    //       scrollUp(this.tableRef);
    //     }
    //   }
    //   //scrollDown(this.tableRef);
    //   window.requestAnimationFrame(this.smoothscroll);
    // }
  };
}
