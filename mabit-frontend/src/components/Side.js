import React, { useState } from 'react';
import styled from 'styled-components';
import {
  IoChevronDownSharp,
  IoChevronForwardOutline,
  IoAddSharp,
} from 'react-icons/io5';
import { AiOutlineDelete } from 'react-icons/ai';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteMemo, initMemo } from '../reducers/memos';
import {
  deleteTodoLists,
  initTodoLists,
  saveTodoLists,
} from '../reducers/todolists';

const StyledContentDiv = styled.div`
  height: 5vh;
  background-color: #569daa;
  font-size: xx-large;
  margin-bottom: 10px;
`;
const StyledTodoListDiv = styled.div`
  height: 5vh;
  background-color: #87cbb9;
  font-size: xx-large;
  margin-bottom: 10px;
`;
const StyledMemoDiv = styled.div`
  height: 5vh;
  background-color: #87cbb9;
  font-size: xx-large;
`;

const StyledMemoChildDiv = styled.div`
  height: 5vh;
  background-color: ${(props) => props.background || '#b9eddd'};
  font-size: xx-large;
  display: ${(props) => props.display || ''};
`;

const Side = () => {
  const [memoShow, setMemoShow] = useState(false);
  const [todoListShow, setTodoListShow] = useState(false);
  const [memoToggle, setMemoToggle] = useState(false);
  const [todoListToggle, setTodoListToggle] = useState(false);

  const memoHandleClose = () => setMemoShow(false);
  const momoHandleShow = () => setMemoShow(true);
  const todoListHandleClose = () => setTodoListShow(false);
  const todoListHandleShow = () => setTodoListShow(true);
  const navigate = useNavigate();
  // reducer가 많아지면 action상수가 중복될 수 있으니
  // 액션이름 앞에 파일 이름을 넣어준다.
  const dispatch = useDispatch();
  useEffect(() => {
    fetch('http://localhost:8080/memos')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res !== null) {
          dispatch(initMemo(res));
        } else {
          alert('메모 등록에 실패하였습니다.');
        }
      });

    fetch('http://localhost:8080/todos')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res !== null) {
          dispatch(initTodoLists(res));
        } else {
          alert('에러 발생');
        }
      });
  }, [dispatch]);

  const onMemoDeleteButtonClick = (e) => {
    console.log(e);
    console.log(e.target);
    const id = e.target.dataset.id;
    fetch('http://localhost:8080/memo/' + id, {
      method: 'DELETE',
    })
      .then((res) => {
        console.log(1, res);
        return res.text();
      })
      .then((res) => {
        if (res === 'OK') {
          console.log(typeof id);
          dispatch(deleteMemo(Number(id)));
          console.log('삭제후', memos);
          navigate('/');
        } else {
          alert('메모 삭제에 실패하였습니다.');
        }
      });
  };

  // todos 삭제 부분
  const onTodoDeleteButtonClick = (e) => {
    console.log(e);
    console.log(e.target);
    const id = e.target.dataset.id;
    fetch('http://localhost:8080/todos/' + id, {
      method: 'DELETE',
    })
      .then((res) => {
        console.log(1, res);
        return res.text();
      })
      .then((res) => {
        if (res === 'OK') {
          dispatch(deleteTodoLists(Number(id)));
          console.log('삭제후', memos);
          navigate('/');
        } else {
          alert('todolists 삭제에 실패하였습니다.');
        }
      });
  };

  const { memos } = useSelector((state) => state.memos);
  const { todolists } = useSelector((state) => state.todolists);
  return (
    <>
      <StyledContentDiv>Content</StyledContentDiv>
      <StyledTodoListDiv>
        <span
          onClick={() => {
            setTodoListToggle(!todoListToggle);
          }}
        >
          {todoListToggle === false ? (
            <IoChevronForwardOutline />
          ) : (
            <IoChevronDownSharp />
          )}
        </span>
        TodoList
        <span onClick={todoListHandleShow}>
          <IoAddSharp />
        </span>
      </StyledTodoListDiv>

      {/* DB에서 가져온 todolist 출력 부분 */}
      {todolists.map((todolist, idx) => (
        <StyledMemoChildDiv
          key={idx}
          background={idx % 2 === 1 ? '#87cbb9' : ''}
          display={!todoListToggle ? 'none' : ''}
        >
          <Link to={'/todos/' + todolist.id}>{todolist.title}</Link>
          <span data-id={todolist.id} onClick={onTodoDeleteButtonClick}>
            <AiOutlineDelete data-id={todolist.id} />
          </span>
        </StyledMemoChildDiv>
      ))}

      <StyledMemoDiv>
        <span
          onClick={() => {
            setMemoToggle(!memoToggle);
            console.log('memo', memoToggle);
          }}
        >
          {memoToggle === false ? (
            <IoChevronForwardOutline />
          ) : (
            <IoChevronDownSharp />
          )}
        </span>
        Memo
        <span onClick={momoHandleShow}>
          <IoAddSharp />
        </span>
      </StyledMemoDiv>

      {/* DB에서 가져온 memo 출력 부분 */}
      {memos.map((memo, idx) => (
        <StyledMemoChildDiv
          key={idx}
          background={idx % 2 === 1 ? '#87cbb9' : ''}
          display={!memoToggle ? 'none' : ''}
        >
          <Link to={'/memo/' + memo.id}>{memo.title}</Link>
          <span data-id={memo.id} onClick={onMemoDeleteButtonClick}>
            <AiOutlineDelete data-id={memo.id} />
          </span>
        </StyledMemoChildDiv>
      ))}

      {/* Memo, todoList Modla 부분 */}
      <Modal show={memoShow} onHide={memoHandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>새로운 Memo 생성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="memoTitle">
              <Form.Label>제목</Form.Label>
              <Form.Control
                type="text"
                placeholder="제목을 입력해주세요"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={memoHandleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              memoHandleClose();
              const memoTitle = document.getElementById('memoTitle').value;
              navigate('/create/memo/' + memoTitle);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={todoListShow} onHide={todoListHandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>새로운 TodoList 생성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="todoListTitle">
              <Form.Label>제목</Form.Label>
              <Form.Control
                type="text"
                placeholder="제목을 입력해주세요"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={todoListHandleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              fetch('http://localhost:8080/todos', {
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
                    // dispatch 들어가야함
                    dispatch(saveTodoLists(res));
                    navigate('/todos/' + res.id);
                    console.log(res);
                    todoListHandleClose();
                  } else {
                    alert('TodoList 등록에 실패하였습니다.');
                  }
                });
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Side;
