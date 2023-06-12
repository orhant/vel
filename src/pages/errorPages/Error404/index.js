import React from 'react';
import {Link} from 'react-router-dom';
import {Col, Container, Row} from 'reactstrap';
import AppParticlesAuth from '@hap/core/AppParticlesAuth';
import AppAnimateGroup from '@hap/core/AppAnimateGroup';
import {ReactComponent as Logo} from '../../../assets/images/svg/404.svg';
import AppPageMetadata from '@hap/core/AppPageMetadata';

// Import Images
// import error from '../../../assets/images/error.svg';

const Error404 = () => {
  document.title =
    '404 Error Basic | Velzon - React Admin & Dashboard Template';
  return (
    <AppAnimateGroup type='bottom'>
      <AppPageMetadata title='Sayfa Bulunamadı' />
      <div className='auth-page-wrapper'>
        <AppParticlesAuth background={false}>
          <div className='auth-page-content'>
            <Container>
              <Row>
                <Col lg={12}>
                  <div className='text-center pt-4'>
                    <div className=''>
                      <Logo className='error-basic-img move-animation' />
                    </div>
                    <div className='mt-n4'>
                      <h1 className='display-1 fw-medium'>404</h1>
                      <h3 className='text-uppercase'>Sayfa Bulunamadı 😭</h3>
                      <p className='text-muted mb-4'>
                        Üzgünüz, istediğiniz sayfayı bulamadık!
                      </p>
                      <Link to='/' className='btn btn-success'>
                        <i className='mdi mdi-home me-1'></i>Ana Sayfa
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </AppParticlesAuth>
      </div>
    </AppAnimateGroup>
  );
};

export default Error404;
