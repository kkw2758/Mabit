import React from "react";
import Clock from "./Clock";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";

const BoxOne = styled.div`
  background-color: #ffeb98;
  width: 300px;
  height: 230px;
  margin: 0 auto;
  margin-top: 20px;
  padding-left: 10px;
`;

const BoxTwo = styled.div`
  background-color: #9de8d9;
  width: 300px;
  height: 230px;
  margin: 0 auto;
  margin-top: 20px;
  padding-left: 10px;
`;
const Comment = styled.div`
  //   background-color: blue;
  width: 300px;
  margin: 0 auto;
  margin-top: 20px;
`;

const MainContent = () => {
  return (
    <>
      <Clock />
      <Row>
        <Col>
          <BoxOne>
            Memo <br />
            2023 1학기 시험 04.20(목) ~ 04.26(수)
            <br /> 중간고사
          </BoxOne>
          <Comment>
            <p style={{ fontWeight: "bold" }}>메모</p>
            <p style={{ fontSize: "14px" }}>
              사소한것이라도 메모하는 습관을 들여보세요!
            </p>
          </Comment>
        </Col>
        <Col>
          <BoxTwo>
            TodoList <br />
            <span style={{ textDecoration: "line-through" }}>
              1. 3시 3끼 챙겨먹기
            </span>
            <br />
            2. 코딩 2시간 이상 하기
          </BoxTwo>
          <Comment>
            <p style={{ fontWeight: "bold" }}>TodoList</p>
            <p style={{ fontSize: "14px" }}>
              하루를 시작하기전 할것들을 정리해서 낭비없는 하루를 보내보아요!
            </p>
          </Comment>
        </Col>
      </Row>
    </>
  );
};

export default MainContent;
