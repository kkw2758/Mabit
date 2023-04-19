import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const now = new Date();
  const weekday = new Array(7);
  weekday[0] = '일요일';
  weekday[1] = '월요일';
  weekday[2] = '화요일';
  weekday[3] = '수요일';
  weekday[4] = '목요일';
  weekday[5] = '금요일';
  weekday[6] = '토요일';

  const dayInfo = `${now.getFullYear()}년 ${
    now.getMonth() + 1
  }월 ${now.getDate()}일 ${weekday[now.getDay()]}`;
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <p style={{ fontSize: '70px', marginBottom: '10px' }}>
        {time.toLocaleTimeString()}
      </p>
      <p style={{ fontSize: '20px' }}>{dayInfo}</p>
    </>
  );
};

export default Clock;
