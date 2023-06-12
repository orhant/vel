import React from 'react';
import PropTypes from 'prop-types';

const AppParticlesAuth = ({children, background = true}) => {
  return (
    <React.Fragment>
      <div className='auth-page-wrapper pt-5'>
        {background ? (
          <div className='auth-one-bg-position auth-one-bg' id='auth-particles'>
            <div className='bg-overlay'></div>
            {children}
          </div>
        ) : (
          <div className='auth-one-bg-position  ' id='auth-particles'>
            <div className=' '></div>
            {children}
          </div>
        )}

        <footer className='footer'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='text-center'>
                  <p className='mb-0 text-muted'>
                    &copy; {new Date().getFullYear()} HAP. Bu site{' '}
                    <i className='mdi mdi-heart text-danger'></i> VEOBU
                    tarafından hazırlanmıştır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default AppParticlesAuth;
AppParticlesAuth.propTypes = {
  children: PropTypes.node.isRequired,
  background: PropTypes.bool,
};
