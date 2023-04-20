import React, { useEffect, useState } from 'react';
import DraftEditor from '../../components/DraftEditor';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ContentState, EditorState } from 'draft-js';
import { useParams } from 'react-router-dom';
import htmlToDraft from 'html-to-draftjs';
import { changeField } from '../../reducers/draftContent';

function MemoUpdate() {
  // 랜더링되자마자 content state값을 DB에서 가져와서 설정해줌
  // 그러면 DraftEditor.js에서 content state값을 들고와서 저장하고있게됨
  // 마지막으로 수정 완료 버튼을 눌렀을때 변경된 값을 content state에 반영해주고
  // /memo/:id에 PUT요청 보내고 나서 memo detail페이지를 뛰우면됨
  const dispatch = useDispatch();
  // const { content } = useSelector((state) => state.draftContent);
  const { id } = useParams();

  useEffect(() => {
    fetch('http://localhost:8080/memo/' + id, {
      method: 'GET',
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res !== null) {
          console.log('update 응답', res);
          dispatch(
            changeField({
              key: 'content',
              value: res.content,
            }),
          );
        } else {
          alert('메모 요청에 실패하였습니다.');
        }
      });
  }, [dispatch, id]);

  return (
    <>
      <h1>MemoUpdate</h1>
      <DraftEditor />
      <Button>추가</Button>
    </>
  );
}

export default MemoUpdate;
