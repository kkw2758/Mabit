import React from 'react';
import {
  MdCheckBox,
  MdModeEditOutline,
  MdRemoveCircleOutline,
  MdCheckBoxOutlineBlank,
} from 'react-icons/md';
function ToDoListItem(props) {
  const { id, text, checked } = props;
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div className={checked ? 'checkbox checked' : 'checkbox'}>
          {/* checked=true일 때 checked라는 class를 추가 */}
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          {/* checked=true면 체크된 박스 아이콘이 false면 빈 박스 아이콘이 뜸 */}
        </div>
        <div className="text">{text}</div>
        <div className="edit">
          <MdModeEditOutline />
        </div>
        <div className="remove">
          <MdRemoveCircleOutline />
        </div>
      </div>
    </>
  );
}

export default ToDoListItem;
