import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {fontSize, gridSize} from '@atlaskit/theme/constants';
import {InlineEditableTextfield} from '@atlaskit/inline-edit';

const CellContainer = styled.div`
  display: flex;
  flex: 1 0 100%;
  align-items: center;
  height: 100%;
  overflow: hidden;
  margin: 0 -5px;
  padding: 5px;
  border: 1px dashed transparent;
`;

const ReadViewContainer = styled.div`
  display: flex;
  font-size: ${fontSize()}px;
  line-height: ${(gridSize() * 2.5) / fontSize()};
  max-width: 100%;
  min-height: ${(gridSize() * 2.5) / fontSize()}em;
  padding: ${gridSize()}px ${gridSize() - 2}px;
  word-break: break-word;
`;

const EditableCell = (props) => {
  const [value, setValue] = useState(props.cellData);
  // const [editing, setEditing] = useState(false);

  const inputRef = useRef(null);
  const targetRef = useRef(null);

  /*function onClickOutSide(e) {
    // Check if user is clicking outside of <input>
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setEditing(false); // Disable text input
    }
  }

  useEffect(() => {
    // Handle outside clicks on mounted state
    if (editing) {
      document.addEventListener("mousedown", onClickOutSide);
    }

    // This is a necessary step to "dismount" unnecessary events when we destroy the component
    return () => {
      document.removeEventListener("mousedown", onClickOutSide);
    };
  });*/

  const getTargetRef = () => targetRef;

  //const handleClick = () => setEditing(true);

  //const handleHide = () => setEditing(false);

  const handleChange = (e) => setValue(e.target.value);

  //const handleBlur = (e) => setEditing(false);

  const {container, rowIndex, columnIndex} = props;

  return (
    <CellContainer ref={targetRef}>
      <InlineEditableTextfield
        defaultValue={value}
        onConfirm={(value) => setValue(value)}
        placeholder='Click to enter text'
      />
    </CellContainer>
  );
};

export default EditableCell;
