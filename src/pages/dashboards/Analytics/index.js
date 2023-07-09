import React, {useState} from 'react';
import {Container} from 'reactstrap';
import SimpleBar from 'simplebar-react';
import RecentActivity from './RecentActivity';

// import Section from './Section';
// import RecentOrders from './RecentOrders';
// import RecentActivity from './RecentActivity';

const Analytics = () => {
  // const [rightColumn, setRightColumn] = useState(true);
  // const toggleRightColumn = () => {
  //   setRightColumn(!rightColumn);
  // };
  const [rightColumn, setRightColumn] = useState(true);
  const toggleRightColumn = () => {
    setRightColumn(!rightColumn);
  };
  return (
    <React.Fragment>
      <Container fluid>
        <div className='app-page-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-2'>
          <div className='app-page-sidebar '>
            <SimpleBar
              className='p-2 pb-0'
              style={{height: 'calc(100vh - 130px)'}}
            >
              <div className=' d-flex flex-column h-100'>
                {/* {(() => {
                  let div = [];
                  for (let i = 1; i <= 1000; i++) {
                    div.push(
                      <button
                        type='button'
                        className='btn btn-soft-info btn-sm m-1'
                        key={i}
                      >
                        {i}
                      </button>,
                    );
                  }
                  return div;
                })()} */}
                <RecentActivity
                  rightColumn={rightColumn}
                  hideRightColumn={toggleRightColumn}
                />
              </div>
            </SimpleBar>
          </div>
          <div className='app-page-content w-100 p-4 pb-0 m-2'> content</div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Analytics;
