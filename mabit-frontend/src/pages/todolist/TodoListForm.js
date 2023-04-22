import React, { useState } from 'react';
import DraftEditor from '../../components/DraftEditor';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initField } from '../../reducers/draftContent';
import ToDoListItem from '../../components/ToDoListItem';

const TodoListForm = () => {
  const { id } = useParams();
  const [todoLists, setTodoLists] = useState(['']);
  const [todoTitle, setTodoTitle] = useState('');
  const { content } = useSelector((state) => state.draftContent);
  const dispatch = useDispatch();

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

    fetch('http://localhost:8080/todos/' + id)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res !== null) {
          setTodoTitle(res.title);
        } else {
          alert('메모 등록에 실패하였습니다.');
        }
      });
  }, [id]);

  const onAddButtonClick = () => {
    fetch('http://localhost:8080/todo/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        content: content.content,
        status: false,
        todos: {
          id: id,
          title: todoTitle,
        },
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res !== null) {
          console.log(res);
          dispatch(initField());
          setTodoLists((state) => [...state, res]);
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
        <ToDoListItem
          key={idx}
          id={todoList.id}
          text={todoList.content}
          checked={todoList.status}
        />
      ))}
    </>
  );
};

export default TodoListForm;
