import React, {useState} from 'react';
import {Row, Button} from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';

import PropTypes from 'prop-types';
import TemplateTable from './TemplateTable';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {FullScreen, useFullScreenHandle} from 'react-full-screen';
import withScrolling from 'react-dnd-scrolling';
const ScrollingComponent = withScrolling('div');

import {hideFinanceData} from 'redux/actions';
const TemplateContent = ({hideLeftColumn, leftColumn}) => {
  const dispatch = useDispatch();
  const [isFullScreenMode, setIsFullScreenMode] = useState(false);
  const [showHiddenRow, setShowHiddenRow] = useState(false);
  const {currentStock = {}} = useSelector(({common}) => common);
  const {stock_code = null, stock_name = ''} = currentStock;
  const {selectedTemplate = {}, isDirty} = useSelector(
    ({template}) => template,
  );

  const {label = '', template_id = ''} = selectedTemplate;
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
  const onHideFinanceData = () => {
    dispatch(hideFinanceData());
  };
  console.log(showHiddenRow);
  return (
    <FullScreen className='app-page-content w-100 p-2 pb-0 m-2' handle={handle}>
      <Row className='mt-2 mb-2 g-0'>
        <div className='col-auto order-1 d-block mx-1'>
          <button
            type='button'
            className='btn btn-icon btn-sm fs-16 file-menu-btn btn-ghost-primary'
            onClick={() => hideLeftColumn()}
          >
            {leftColumn ? (
              <i className='ri-menu-2-fill align-bottom'></i>
            ) : (
              <i className=' ri-arrow-right-line align-bottom'></i>
            )}
          </button>
        </div>
        <div className='d-flex col-sm order-3 order-sm-2 align-items-center  '>
          <h5 className='fw-semibold mb-0'>
            {stock_code ? (
              <>
                {stock_code} - {stock_name}
                {template_id ? (
                  <span className='badge bg-primary align-bottom ms-2'>
                    {label}-{template_id}
                  </span>
                ) : (
                  <span className='badge bg-primary align-bottom ms-2'>
                    Template Seciniz
                  </span>
                )}
              </>
            ) : (
              <>Hisse Seciniz</>
            )}
          </h5>
        </div>
        <div className='col-auto order-2 order-sm-3 ms-auto'>
          <div className='hstack gap-1'>
            {/* <div className='flex-shrink-0'>
              <div className='form-check form-switch form-switch-right form-switch-md'>
                <label className='form-label text-muted form-label'>
                  Show Code
                </label>
                <input
                  type='checkbox'
                  className='form-check-input code-switcher form-check-input'
                />
              </div>
            </div> */}
            {/* <div className='flex-shrink-0'>
              <div className='form-check form-switch form-switch-right form-switch-md'>
                <Label className='form-label text-muted'>
                  Gizli Olanları Göster
                </Label>
                <Input
                  className='form-check-input code-switcher'
                  type='switch'
                  checked={showHiddenRow}
                  onClick={() => {
                    setShowHiddenRow(!showHiddenRow);
                  }}
                />
              </div>
            </div> */}
            <Button
              onClick={() => {
                onHideFinanceData();
              }}
              type='button'
              className='btn btn-icon btn-topbar btn-ghost-secondary rounded-circle'
            >
              <i className='bx bxs-no-entry fs-16'></i>
            </Button>
            <Button
              onClick={() => {
                setShowHiddenRow(!showHiddenRow);
              }}
              type='button'
              className='btn btn-icon btn-topbar btn-ghost-secondary rounded-circle'
            >
              <i
                className={
                  showHiddenRow
                    ? '  ri-eye-off-fill fs-16 '
                    : '  ri-eye-fill fs-16'
                }
              ></i>
            </Button>
            <Button
              color='info'
              disabled={!isDirty}
              className='btn-label btn-success'
              // onClick={() => updateItems()}
            >
              <i className='ri-save-3-fill label-icon align-middle fs-16 me-2'></i>
              Kaydet
            </Button>

            <Button
              color='success'
              className='btn-label '
              // onClick={() => updateItems()}
            >
              <i className='ri-save-3-fill label-icon align-middle fs-16 me-2'></i>
              Excele aktar
            </Button>
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
        </div>
      </Row>
      <div
        className='h-100'
        id='dashboard-link'
        // onClick={(e) => console.log(e)}
      >
        {' '}
        <DndProvider backend={HTML5Backend}>
          <ScrollingComponent className='app-page-content-scroll w-100  py-0'>
            <TemplateTable showHiddenRow={showHiddenRow}></TemplateTable>
          </ScrollingComponent>
        </DndProvider>
      </div>
    </FullScreen>
  );
};

TemplateContent.propTypes = {
  hideLeftColumn: PropTypes.object,
  leftColumn: PropTypes.any,
};
export default TemplateContent;
