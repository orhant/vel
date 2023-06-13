import React, {useState} from 'react';
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
} from 'reactstrap';

import {useAuthMethod} from '@hap/utility/AuthHooks';

import {Link, useNavigate} from 'react-router-dom';
import {Form, Formik, Field} from 'formik';
import * as yup from 'yup';

import AppAnimateGroup from '@hap/core/AppAnimateGroup';
import AppParticlesAuth from '@hap/core/AppParticlesAuth';
import {useIntl} from 'react-intl';
import IntlMessages from '@hap/utility/IntlMessages';

import logoLight from '../../../assets/images/logo-light.png';

const Signin = () => {
  const navigate = useNavigate();

  const onGoToForgetPassword = () => {
    navigate('/forget-password', {tab: 'jwtAuth'});
  };
  const {signInUser} = useAuthMethod();
  const [passwordShow, setPasswordShow] = useState(false);

  const validationSchema = yup.object({
    username: yup
      .string()
      // .username(<IntlMessages id='validation.emailFormat' />)
      .required(<IntlMessages id='validation.emailRequired' />),
    password: yup
      .string()
      .required(<IntlMessages id='validation.passwordRequired' />),
  });

  document.title = 'Basic SignIn | Velzon - React Admin & Dashboard Template';
  const {messages} = useIntl();
  return (
    <React.Fragment>
      <AppAnimateGroup>
        <AppParticlesAuth>
          <div className='auth-page-content'>
            <Container>
              <Row>
                <Col lg={12}>
                  <div className='text-center mt-sm-5 mb-4 text-white-50'>
                    <div>
                      <Link to='/' className='d-inline-block auth-logo'>
                        <img src={logoLight} alt='' height='40' />
                      </Link>
                    </div>
                    <p className='mt-3 fs-15 fw-medium'>
                      Hisse Analiz Programı
                    </p>
                  </div>
                </Col>
              </Row>

              <Row className='justify-content-center'>
                <Col md={8} lg={6} xl={5}>
                  <Card className='mt-4'>
                    <CardBody className='p-4'>
                      <div className='text-center mt-2'>
                        <h5 className='text-primary'>Hoşgeldiniz !</h5>
                        <p className='text-muted'>
                          HAP a devam etmek için giriş yapın.
                        </p>
                      </div>

                      <div className='p-2 mt-4'>
                        <Formik
                          validateOnChange={true}
                          initialValues={{
                            username: 'crema.demo@gmail.com',
                            password: 'Pass@1!@all',
                          }}
                          validationSchema={validationSchema}
                          onSubmit={(data, {setSubmitting}) => {
                            setSubmitting(true);
                            signInUser({
                              username: data.username,
                              password: data.password,
                            });
                            setSubmitting(false);
                          }}
                        >
                          {({isSubmitting}) => (
                            <Form noValidate autoComplete='off' action='#'>
                              <div className='mb-3'>
                                <Label
                                  htmlFor='username'
                                  className='form-label'
                                >
                                  E-posta
                                </Label>
                                <Input
                                  tag={Field}
                                  name='username'
                                  className='form-control'
                                  placeholder={messages['common.email']}
                                  type='username'
                                />
                                {/* {validation.touched.username &&
                            validation.errors.username ? (
                              <FormFeedback type='invalid'>
                                {validation.errors.username}
                              </FormFeedback>
                            ) : null} */}
                              </div>

                              <div className='mb-3'>
                                <div className='float-end'>
                                  <Link
                                    to='/forgot-password'
                                    className='text-muted'
                                    onClick={onGoToForgetPassword}
                                  >
                                    Şifremi unuttum?
                                  </Link>
                                </div>
                                <Label
                                  className='form-label'
                                  htmlFor='password-input'
                                >
                                  Şifre
                                </Label>
                                <div className='position-relative auth-pass-inputgroup mb-3'>
                                  <Input
                                    tag={Field}
                                    type={passwordShow ? 'text' : 'password'}
                                    className='form-control pe-5'
                                    placeholder='Enter Password'
                                    name='password'
                                  />
                                  {/* {validation.touched.password &&
                              validation.errors.password ? (
                                <FormFeedback type='invalid'>
                                  {validation.errors.password}
                                </FormFeedback>
                              ) : null} */}
                                  <button
                                    className='btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted'
                                    type='button'
                                    id='password-addon'
                                    onClick={() =>
                                      setPasswordShow(!passwordShow)
                                    }
                                  >
                                    <i className='ri-eye-fill align-middle'></i>
                                  </button>
                                </div>
                              </div>

                              <div className='form-check'>
                                <Input
                                  className='form-check-input'
                                  type='checkbox'
                                  value=''
                                  id='auth-remember-check'
                                />
                                <Label
                                  className='form-check-label'
                                  htmlFor='auth-remember-check'
                                >
                                  Beni hatırla
                                </Label>
                              </div>

                              <div className='mt-4'>
                                <Button
                                  color='success'
                                  // disabled={error ? null : loading ? true : false}
                                  className='btn btn-success w-100'
                                  type='submit'
                                  disabled={isSubmitting}
                                >
                                  Giriş Yap
                                </Button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </CardBody>
                  </Card>

                  <div className='mt-4 text-center'>
                    <p className='mb-0'>
                      Pro Üyelik Başvurusu{' '}
                      <Link
                        to='/register'
                        className='fw-semibold text-primary text-decoration-underline'
                      >
                        {' '}
                        tiklayınız{' '}
                      </Link>{' '}
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </AppParticlesAuth>
      </AppAnimateGroup>
    </React.Fragment>
  );
};

export default Signin;
