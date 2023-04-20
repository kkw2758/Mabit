import { ContentState, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { changeField } from '../../reducers/draftContent';

function MemoDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [memoTitle, setMemoTitle] = useState('');
  const [memoContent, setMemoContent] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    let htmlToEditor = '';
    fetch('http://localhost:8080/memo/' + id, {
      method: 'GET',
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res !== null) {
          htmlToEditor = res.content;
          initEditorState(htmlToEditor);
          setMemoTitle(res.title);
          setMemoContent(res.content);
        } else {
          alert('메모 요청에 실패하였습니다.');
        }
      });
  }, [id]);

  const initEditorState = (htmlToEditor) => {
    const blocksFromHtml = htmlToDraft(htmlToEditor);

    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      // https://draftjs.org/docs/api-reference-content-state/#createfromblockarray
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap,
      );
      // ContentState를 EditorState기반으로 새 개체를 반환.
      // https://draftjs.org/docs/api-reference-editor-state/#createwithcontent
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  };

  const editorToHtml = draftToHtml(
    convertToRaw(editorState.getCurrentContent()),
  );

  const onBtnClick = () => {
    dispatch(
      changeField({
        title: memoTitle,
        content: memoContent,
      }),
    );
    navigate('/memo/modify/' + id);
  };
  return (
    <>
      <Card style={{ marginTop: '1rem' }}>
        <Card.Header>{memoTitle}</Card.Header>
        <Card.Body>
          <Card.Text
            dangerouslySetInnerHTML={{ __html: editorToHtml }}
          ></Card.Text>
          <Button onClick={onBtnClick} variant="primary">
            수정
          </Button>
        </Card.Body>
      </Card>
      {/* <div dangerouslySetInnerHTML={{ __html: editorToHtml }}></div> */}
    </>
  );
}

export default MemoDetail;
