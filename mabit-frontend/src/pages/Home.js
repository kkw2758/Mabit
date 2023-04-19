import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Clock from '../components/Clock';
import { Col, Row } from 'react-bootstrap';

const StyledFlexContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledFlexContentContainerDiv = styled.div`
  display: flex;
  width: 900px;
  justify-content: space-between;
`;
const Home = () => {
  console.log('rendered');
  return (
    <StyledFlexContainerDiv>
      <Clock />
      <StyledFlexContentContainerDiv>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '350px',
            height: '250px',
            backgroundColor: '#ffeb98',
            fontSize: '20px',
          }}
        >
          <p>
            Memo
            <br />
            2023 1학기 시험
            <br />
            04.20(목) ~ 04.26(수) 중간고사
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '350px',
            height: '250px',
            backgroundColor: '#9de8d9',
            fontSize: '20px',
          }}
        >
          <p>
            TodoList
            <br />
            1. 3시 3끼 챙겨먹기
            <br />
            2. 코딩 2시간 이상 하기
          </p>
        </div>
      </StyledFlexContentContainerDiv>
      <StyledFlexContentContainerDiv>
        <div
          style={{
            paddingTop: '30px',
            width: '350px',
            fontSize: '17px',
          }}
        >
          <p style={{ fontWeight: 'bold' }}>메모</p>
          <p>사소한것이라도 메모하는 습관을 들여보세요!</p>
        </div>
        <div
          style={{
            paddingTop: '30px',
            width: '350px',
            fontSize: '17px',
          }}
        >
          <p style={{ fontWeight: 'bold' }}>TodoList</p>
          <p>하루를 시작하기전 할것들을 정리해서 낭비없는 하루를 보내보아요!</p>
        </div>
      </StyledFlexContentContainerDiv>
    </StyledFlexContainerDiv>
  );
};

export default Home;
