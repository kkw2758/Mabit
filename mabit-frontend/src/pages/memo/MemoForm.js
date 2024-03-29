import React from 'react';
import DraftEditor from '../../components/DraftEditor';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveMemo } from '../../reducers/memos';
import { initField } from '../../reducers/draftContent';

const MemoForm = () => {
  const { memoTitle } = useParams();
  const navigate = useNavigate();

  const { content } = useSelector((state) => state.draftContent);
  const dispatch = useDispatch();

  // const testRedux = () => {
  //   console.log(JSON.stringify({ title: memoTitle, content: content.value }));
  //   dispatch(
  //     saveMemo(JSON.stringify({ title: memoTitle, content: content.value })),
  //   );
  // };

  const save = (e) => {
    fetch('http://localhost:8080/memo/' + memoTitle, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ title: memoTitle, content: content.content }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // Catch는 여기서 오류가나야 실행됨.
        if (res !== null) {
          // 다음 content에 영향이 없도록 초기화
          dispatch(initField());
          // 메모 추가
          dispatch(saveMemo(res));
          navigate('/memo/' + res.id);
        } else {
          alert('메모 등록에 실패하였습니다.');
        }
      });
  };

  return (
    <>
      <DraftEditor title={memoTitle} />
      <Button onClick={save}>추가</Button>
    </>
  );
};

export default MemoForm;
