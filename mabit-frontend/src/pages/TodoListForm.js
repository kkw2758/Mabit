import React from 'react';
import DraftEditor from '../components/DraftEditor';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const TodoListForm = () => {
  const { todoListTitle } = useParams();
  console.log('todoListTitle', todoListTitle);
  return (
    <>
      {/* <h1>{memoTitle}</h1> */}
      <DraftEditor title={todoListTitle} />
      <Button>추가</Button>
    </>
  );
};

export default TodoListForm;
