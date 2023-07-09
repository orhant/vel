import React, {useState, useEffect} from 'react';
import {Container} from 'reactstrap';
import {useSelector} from 'react-redux';
import TemplateSidebar from './TemplateSidebar';
import TemplateContent from './TemplateContent';

const TemplateEdit = () => {
  const [leftColumn, setLeftColumn] = useState(false);
  const {currentStock = {}} = useSelector(({common}) => common);
  const toggleLeftColumn = () => {
    setLeftColumn(!leftColumn);
  };
  useEffect(() => {
    setLeftColumn(currentStock ? true : false);
  }, [currentStock]);
  return (
    <Container fluid>
      <div className='app-page-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-2'>
        <TemplateSidebar leftColumn={leftColumn} />
        <TemplateContent
          leftColumn={leftColumn}
          hideLeftColumn={toggleLeftColumn}
        />
      </div>
    </Container>
  );
};

export default TemplateEdit;
