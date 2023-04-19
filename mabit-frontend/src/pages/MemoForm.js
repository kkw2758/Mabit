import React from 'react';
import DraftEditor from '../components/DraftEditor';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveMemo } from '../reducers/memos';

const MemoForm = () => {
  console.log('render');
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
      body: JSON.stringify({ title: memoTitle, content: content.value }),
    })
      .then((res) => {
        console.log(1, res);
        return res.json();
      })
      .then((res) => {
        // Catch는 여기서 오류가나야 실행됨.
        console.log('정상', res);
        if (res !== null) {
          dispatch(saveMemo({ title: memoTitle, content: content.value }));
          navigate('/');
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
