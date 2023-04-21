import React, { useState } from 'react';
import DraftEditor from '../../components/DraftEditor';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const TodoListForm = () => {
  const { id } = useParams();
  const [todoLists, setTodoLists] = useState(['']);
  useEffect(() => {
    fetch('http://localhost:8080/todo/' + id)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res !== null) {
          setTodoLists(res);
        } else {
          alert('메모 등록에 실패하였습니다.');
        }
      });
  }, [id]);

  const onAddButtonClick = () => {
    fetch('http://localhost:8080/todo/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        title: document.getElementById('todoListTitle').value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res !== null) {
          setTodoLists(res);
        } else {
          alert('메모 등록에 실패하였습니다.');
        }
      });
  };

  return (
    <>
      <DraftEditor />
      <Button onClick={onAddButtonClick}>추가</Button>
      {todoLists.map((todoList, idx) => (
        <h1 key={idx}>{todoList.content}</h1>
      ))}
    </>
  );
};

export default TodoListForm;
