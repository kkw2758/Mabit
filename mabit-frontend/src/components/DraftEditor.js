import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled from 'styled-components';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { useCallback } from 'react';
import draftToHtml from 'draftjs-to-html';
import { useEffect } from 'react';
import htmlToDraft from 'html-to-draftjs';
import { changeField } from '../reducers/draftContent';

const MyBlock = styled.div`
  .wrapper-class {
    margin: 0 auto;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
  .editor {
    height: 400px !important;
    border: 1px solid #f1f1f1 !important;
    padding: 5px !important;
    border-radius: 2px !important;
  }
`;

const IntroduceContent = styled.div`
  position: relative;
  border: 0.0625rem solid #d7e2eb;
  border-radius: 0.75rem;
  overflow: hidden;
  padding: 1.5rem;
  width: 50%;
  margin: 0 auto;
  margin-bottom: 4rem;
`;

const DraftEditor = (props) => {
  // // useState로 상태관리하기 초기값은 EditorState.createEmpty()
  // // EditorState의 비어있는 ContentState 기본 구성으로 새 개체를 반환 => 이렇게 안하면 상태 값을 나중에 변경할 수 없음.
  // const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // const onEditorStateChange = (editorState) => {
  //   // editorState에 값 설정
  //   setEditorState(editorState);
  // };

  // redux 사용을 위한 dispatch 가져오기
  const dispatch = useDispatch();
  const { content } = useSelector((state) => state.draftContent);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const rendered = useRef(false); // useRef는 리렌더링 하지 않는다. 컴포넌트의 속성만 조회&수정한다.

  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );

  const editorToHtml = (editorState) => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    // 리덕스 changeField
    onChangeField({
      key: 'content',
      value: editorToHtml(editorState),
    });
  };

  useEffect(() => {
    if (rendered.current) return;
    rendered.current = true;
    const blocksFromHtml = htmlToDraft(content.value);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap,
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [content]);
  return (
    <>
      <MyBlock>
        <h1>{props.title}</h1>
        <Editor
          // 에디터와 툴바 모두에 적용되는 클래스
          wrapperClassName="wrapper-class"
          // 에디터 주변에 적용된 클래스
          editorClassName="editor"
          // 툴바 주위에 적용된 클래스
          toolbarClassName="toolbar-class"
          // 툴바 설정
          toolbar={{
            // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: false },
          }}
          placeholder="내용을 작성해주세요."
          // 한국어 설정
          localization={{
            locale: 'ko',
          }}
          // 초기값 설정
          editorState={editorState}
          // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
          onEditorStateChange={onEditorStateChange}
        />
      </MyBlock>
      <IntroduceContent
        dangerouslySetInnerHTML={{ __html: editorToHtml(editorState) }}
      />
    </>
  );
};

export default DraftEditor;
