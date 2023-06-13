import React, {useState} from 'react';
import {Col, Container, Row} from 'reactstrap';
import {useAuthUser} from '@hap/utility/AuthHooks';
import Section from './Section';

const Analytics = () => {
  const {user} = useAuthUser();
  const [rightColumn, setRightColumn] = useState(true);
  const toggleRightColumn = () => {
    setRightColumn(!rightColumn);
  };
  console.log(user);
  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col>
            {' '}
            <div className='h-100'>
              <Section rightClickBtn={toggleRightColumn} />
            </div>{' '}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Analytics;
