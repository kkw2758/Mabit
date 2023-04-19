import React, { memo, useState } from 'react';
import styled from 'styled-components';
import {
  IoChevronDownSharp,
  IoChevronForwardOutline,
  IoAddSharp,
} from 'react-icons/io5';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
  background-color: #87cbb9;
  background-color: #b9eddd;
  font-size: xx-large;
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

  const { memos } = useSelector((state) => state.memos);
  console.log('memos', memos);
  return (
    <>
      <StyledContentDiv>Content</StyledContentDiv>
      <StyledTodoListDiv>
        <span
          onClick={() => {
            setTodoListToggle(!todoListToggle);
            console.log('todo', todoListToggle);
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
      {memos.map((memo, idx) => (
        <StyledMemoDiv key={idx}>{memo.title}</StyledMemoDiv>
      ))}

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
              todoListHandleClose();
              const todoListTitle =
                document.getElementById('todoListTitle').value;
              navigate('/create/todoList/' + todoListTitle);
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
