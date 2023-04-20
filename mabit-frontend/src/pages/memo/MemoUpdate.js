import React, { useState } from 'react';
import DraftEditor from '../../components/DraftEditor';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { initField } from '../../reducers/draftContent';
import { updateMemo } from '../../reducers/memos';

function MemoUpdate() {
  // 랜더링되자마자 content state값을 DB에서 가져와서 설정해줌 - MemoDetail페이지에서 수정버튼 누르면 수행하도록하면 여기서안해도됨
  // 마지막으로 수정 완료 버튼을 눌렀을때 변경된 값을 content state에 반영해주고
  // /memo/:id에 PUT요청 보내고 나서 memo detail페이지를 뛰우면됨
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { content } = useSelector((state) => state.draftContent);
  const { id } = useParams();
  const [title, setTitle] = useState(content.title);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onBtnClick = () => {
    fetch('http://localhost:8080/memo/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ title: title, content: content.content }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res !== null) {
          console.log('업데이트', res);
          // 메모 수정
          dispatch(updateMemo(res));
          // 다음 content에 영향이 없도록 초기화
          dispatch(initField());
          navigate('/memo/' + res.id);
        } else {
          alert('메모 등록에 실패하였습니다.');
        }
      });
  };
  return (
    <>
      <Form.Control
        type="text"
        placeholder="title"
        value={title}
        onChange={onTitleChange}
        autoFocus
      />
      <DraftEditor />

      <Button onClick={onBtnClick}>수정완료</Button>
    </>
  );
}

export default MemoUpdate;
