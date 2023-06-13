import React from 'react';
import PropTypes from 'prop-types';

//constants
import {layoutModeTypes} from 'shared/constants/AppConst';

const LightDark = ({layoutMode, onChangeLayoutMode}) => {
  const mode =
    layoutMode === layoutModeTypes['DARKMODE']
      ? layoutModeTypes['LIGHTMODE']
      : layoutModeTypes['DARKMODE'];

  return (
    <div className='ms-1 header-item d-none d-sm-flex'>
      <button
        onClick={() => onChangeLayoutMode(mode)}
        type='button'
        className='btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode'
      >
        <i className='bx bx-moon fs-22'></i>
      </button>
    </div>
  );
};

export default LightDark;
LightDark.propTypes = {
  layoutMode: PropTypes.string,
  onChangeLayoutMode: PropTypes.func,
};
