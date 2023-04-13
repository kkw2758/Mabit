import React, { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  return (
    <div style={{ textAlign: "center", fontSize: "70px" }}>
      {time.toLocaleTimeString()}
    </div>
  );
};

export default Clock;
