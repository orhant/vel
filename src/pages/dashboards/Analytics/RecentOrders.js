import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import {Card, CardBody, CardHeader, Col} from 'reactstrap';
import {FullScreen, useFullScreenHandle} from 'react-full-screen';

const RecentOrders = () => {
  const {currentStock = {}} = useSelector(({financials}) => financials);
  const {name = 'Lütfen Hisse Seçiniz'} = currentStock;
  const [isFullScreenMode, setIsFullScreenMode] = useState(false);
  const handle = useFullScreenHandle();

  const toggleFullscreen = () => {
    if (isFullScreenMode) {
      handle.exit();
      setIsFullScreenMode(false);
    } else {
      handle.enter();
      setIsFullScreenMode(true);
    }
  };
  return (
    <React.Fragment>
      <FullScreen handle={handle}>
        <Col xl={12}>
          <Card>
            <CardHeader className='align-items-center d-flex'>
              <h4 className='card-title mb-0 flex-grow-1'>{name}</h4>
              <div className='flex-shrink-0'>
                <button type='button' className='btn btn-soft-info btn-sm'>
                  <i className='ri-file-list-3-line align-middle'></i> Kaydet
                </button>
                <button
                  type='button'
                  className='btn btn-soft-info btn-icon bx bx-fullscreen fs-22  btn-soft-info btn-sm'
                  onClick={handle.enter}
                >
                  <i className='ri-pulse-line'></i>
                </button>
                <button
                  onClick={toggleFullscreen}
                  type='button'
                  className='btn btn-icon btn-topbar btn-ghost-secondary rounded-circle'
                >
                  <i
                    className={
                      isFullScreenMode
                        ? 'bx bx-exit-fullscreen fs-22'
                        : 'bx bx-fullscreen fs-22'
                    }
                  ></i>
                </button>
              </div>
            </CardHeader>

            <CardBody>
              <div className='table-responsive table-card'>
                <table className='table table-borderless table-centered align-middle table-nowrap mb-0'>
                  <thead className='text-muted table-light'>
                    <tr>
                      <th scope='col'>Order ID</th>
                      <th scope='col'>Customer</th>
                      <th scope='col'>Product</th>
                      <th scope='col'>Amount</th>
                      <th scope='col'>Vendor</th>
                      <th scope='col'>Status</th>
                      <th scope='col'>Rating</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </FullScreen>
    </React.Fragment>
  );
};

export default RecentOrders;
