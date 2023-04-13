import React from "react";
import { Col } from "react-bootstrap";
import styled from "styled-components";
import "../Toggle.css";

const Content = styled.div`
  background-color: #87cbb9;
  font-size: 30px;
`;

const Sidebar = () => {
  function myFunction() {
    var x = document.getElementById("myLinks");
    console.log("A");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
  return (
    <>
      <Col
        xs={2}
        style={{
          height: "100vh",
          padding: "0px",
          borderRight: "2px solid #c4c4c4",
        }}
      >
        <Content>TodoList</Content>
        <Content>Memo</Content>
      </Col>
    </>
  );
};

export default Sidebar;
