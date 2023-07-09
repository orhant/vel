import React, {useState, useEffect} from 'react';
import {Col, Dropdown, DropdownMenu, DropdownToggle, Row} from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {getLastTenDisclosureList} from 'redux/actions';

//SimpleBar
import SimpleBar from 'simplebar-react';

//import images

const DisclosureListDropdown = () => {
  const dispatch = useDispatch();
  const {currentStock = {}} = useSelector(({common}) => common);
  const {lastTenDisclosureList, lastTenDisclosureListTodayCount} = useSelector(
    ({disclosure}) => disclosure,
  );
  const {stock_code = null} = currentStock;

  useEffect(() => {
    if (stock_code) dispatch(getLastTenDisclosureList(stock_code));
    setIsCartDropdown(false);
  }, [stock_code]);

  const [isCartDropdown, setIsCartDropdown] = useState(false);

  const toggleCartDropdown = () => {
    setIsCartDropdown(!isCartDropdown);
  };

  if (!stock_code) return '';
  return (
    <React.Fragment>
      <Dropdown
        isOpen={isCartDropdown}
        toggle={toggleCartDropdown}
        className='topbar-head-dropdown ms-1 header-item'
      >
        <DropdownToggle
          type='button'
          tag='button'
          className='btn btn-icon btn-topbar btn-ghost-secondary rounded-circle'
        >
          <i className='bx bx-news fs-22 fs-22'></i>

          {lastTenDisclosureListTodayCount > 0 && (
            <span className='position-absolute cartitem-badge topbar-badge fs-10 translate-middle badge rounded-pill bg-info'>
              {lastTenDisclosureListTodayCount}
              <span className='visually-hidden'>
                bugun yayınlanan biidirimler
              </span>
            </span>
          )}
        </DropdownToggle>
        <DropdownMenu
          className='dropdown-menu-xl dropdown-menu-end p-0 dropdown-menu-cart'
          aria-labelledby='page-header-cart-dropdown'
        >
          <div className='p-3 border-top-0 border-start-0 border-end-0 border-dashed border'>
            <Row className='align-items-center'>
              <Col>
                <h6 className='m-0 fs-16 fw-semibold'>
                  {stock_code} - Bildirimler{' '}
                </h6>
              </Col>
              <div className='col-auto'>
                <span className='badge badge-soft-warning fs-13'>
                  <span className='cartitem-badge'>
                    Son yayınlanan 10 Bildirim
                  </span>
                </span>
              </div>
            </Row>
          </div>
          <SimpleBar style={{maxHeight: '300px'}}>
            <div className='p-2'>
              <div
                className='text-center empty-cart'
                id='empty-cart'
                style={{display: 'none'}}
              >
                <div className='avatar-md mx-auto my-3'>
                  <div className='avatar-title bg-soft-info text-info fs-36 rounded-circle'>
                    <i className='bx bx-cart'></i>
                  </div>
                </div>
                <h5 className='mb-3'>Your Cart is Empty!</h5>
                <Link
                  to='/apps-ecommerce-products'
                  className='btn btn-success w-md mb-3'
                >
                  Shop Now
                </Link>
              </div>

              {lastTenDisclosureList.map((item, key) => (
                <div
                  className='d-block dropdown-item text-wrap dropdown-item-cart px-3 py-2'
                  key={key}
                >
                  <div className='d-flex align-items-center'>
                    <div className='avatar-xs me-3'>
                      <span className='avatar-title bg-soft-info text-info rounded-circle fs-16'>
                        {key + 1}
                      </span>
                    </div>

                    {/* <img
                      src={item.img}
                      className='me-3 rounded-circle avatar-sm p-2 bg-light'
                      alt='user-pic'
                    /> */}
                    <div className='flex-1'>
                      <h6 className='mt-0 mb-1 fs-14'>
                        <Link
                          to={item.kapURL}
                          className='text-reset'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {item.subject}
                        </Link>
                      </h6>
                      <p className='mb-0 fs-12 text-muted'>{item.summary}</p>
                      <p className='mb-0 fs-11 fw-medium text-uppercase text-muted'>
                        <span>
                          <i className='mdi mdi-clock-outline'></i> {item.time}
                        </span>
                      </p>
                    </div>

                    <div className='ps-2'>
                      <Link
                        type='button'
                        to={item.kapURL}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-rese btn btn-icon btn-sm btn-ghost-secondary remove-item-btn'
                      >
                        <i className='bx bx-link fs-16'></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SimpleBar>
          <div
            className='p-3 border-bottom-0 border-start-0 border-end-0 border-dashed border'
            id='checkout-elem'
          >
            <Link
              to='/apps-ecommerce-checkout'
              className='btn btn-success text-center w-100'
            >
              {stock_code} - Tüm Bildirimler
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default DisclosureListDropdown;
