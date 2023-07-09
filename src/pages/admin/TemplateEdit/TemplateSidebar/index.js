import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardHeader,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import {getTemplateSummary} from 'redux/actions';
import TemplateList from './TemplateList';
// import SimpleBar from 'simplebar-react';
import {Link} from 'react-router-dom';

const TemplateSidebar = (props) => {
  const dispatch = useDispatch();
  const {currentStock = {}} = useSelector(({common}) => common);
  const {stock_code = null} = currentStock;
  useEffect(() => {
    if (stock_code) dispatch(getTemplateSummary(stock_code));
  }, [stock_code]);
  const {templateSummary = []} = useSelector(({template}) => template);
  const {templates, lastTenFinancials = []} = templateSummary;
  // const {lastTenDisclosureList} = useSelector(({disclosure}) => disclosure);
  if (!props.leftColumn) return '';
  if (!currentStock)
    return <div className='app-page-sidebar p-0 pb-0 mb-0 mt-2'></div>;

  return (
    <div className='app-page-sidebar p-0 pb-0 mb-0 mt-2'>
      {(templates || []).map((item, key) => (
        <TemplateList item={item} key={key}></TemplateList>
      ))}

      <div className='p-0'>
        <Card>
          <CardHeader className=' py-1'>
            <h5 className='card-title m-0 py-1'>
              Son Yaynlana Bilançolar
              <span className='text-secondary'></span>
            </h5>
          </CardHeader>
          <CardBody className='pt-1'>
            <div className='card-text text-muted m-0'>
              {lastTenFinancials.map((item, key) => (
                <div
                  className='d-block dropdown-item text-wrap dropdown-item-cart px-1 py-2 '
                  key={key}
                >
                  <div className='d-flex align-items-center'>
                    <div className='flex-1'>
                      <div className='mt-0 mb-1 fs-14'>
                        <Link
                          to={item.url}
                          className='text-reset'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {item.year} /{item.period} - {item.subject}
                        </Link>
                      </div>
                      <p className='mb-0 fs-12 text-muted'> {item.statement}</p>
                      <p className='mb-0 fs-12 text-muted'>{item.summary}</p>
                      <p className='mb-0 fs-11 fw-medium text-uppercase text-muted'>
                        <span>
                          <i className='mdi mdi-clock-outline'></i> {item.time}
                        </span>
                      </p>
                    </div>

                    <div className='ps-2'>
                      <div className='m-0'>
                        <UncontrolledDropdown className=''>
                          <DropdownToggle
                            type='button'
                            tag='button'
                            className='btn btn-icon btn-topbar btn-ghost-secondary rounded-circle'
                          >
                            <i className='bx bx-link fs-16'></i>
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem header>
                              <div className='fs-5 fs-bold'>
                                Bilanço Linkleri
                              </div>
                            </DropdownItem>

                            <Link
                              type='button'
                              to={item.kapURL}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='dropdown-item'
                            >
                              KAP
                            </Link>
                            <Link
                              type='button'
                              to={item.isyatirimURL}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='dropdown-item'
                            >
                              iŞ YATIRIM
                            </Link>
                            <Link
                              type='button'
                              to={item.isyatirinJsonURL}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='dropdown-item'
                            >
                              iŞ YATIRIM JSON
                            </Link>
                            <Link
                              type='button'
                              to={item.YFinanceURL}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='dropdown-item'
                            >
                              YFINANCE
                            </Link>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </div>
                  </div>
                </div>
              ))}{' '}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

TemplateSidebar.propTypes = {
  leftColumn: PropTypes.object,
};

export default TemplateSidebar;
