import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {setSelectedTemplate} from 'redux/actions';

const TemplateList = ({item}) => {
  const dispatch = useDispatch();
  const {subItems = []} = item;

  const setTemplate = (item) => {
    // dispatch(onResetFinTables);
    dispatch(setSelectedTemplate(item));
  };
  return (
    <Card>
      <CardHeader className=' py-1'>
        {/* <button
          type='button'
          className='btn-close float-end fs-11'
          aria-label='Close'
        ></button> */}
        <div className='card-title mb-0'>
          {item.title}
          <span className='text-secondary'></span>
        </div>
      </CardHeader>
      <CardBody className='pt-2'>
        <div className='card-text text-muted mb-0'>
          <ol className='ps-3 text-muted mb-0 '>
            {(subItems || []).map((item, key) => (
              <li className='py-2' key={key}>
                <Link
                  to='#'
                  className='text-muted'
                  onClick={() => setTemplate(item)}
                >
                  {item.template_id}
                  <span className='float-end'>({item.cnt})</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </CardBody>
      {/* <div className='card-footer'>
        <Link to='#' className='link-success float-end'>
          Payment Now{' '}
          <i className='ri-arrow-right-s-line align-middle ms-1 lh-1'></i>
        </Link>
        <p className='text-muted mb-0'>5 days Left</p>
      </div> */}
    </Card>
    // <div className='p-3 pb-0  m-1 mb-0 border-bottom'>
    //   <h6 className='text-muted mb-3 text-uppercase fw-semibold '>
    //     {item.title}
    //   </h6>
    //   <ol className='ps-3 text-muted mb-0 '>
    //     {(subItems || []).map((item, key) => (
    //       <li className='py-1' key={key}>
    //         <Link to='#' className='text-muted'>
    //           {item.template_id}
    //           <span className='float-end'>({item.cnt})</span>
    //         </Link>
    //       </li>
    //     ))}
    //   </ol>
    // </div>
  );
};

TemplateList.propTypes = {
  item: PropTypes.object,
};

export default TemplateList;
