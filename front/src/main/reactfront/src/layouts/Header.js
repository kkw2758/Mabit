import React from "react";
import Container from "react-bootstrap/Container";

const Header = () => {
  return (
    <header>
      <Container
        style={{
          verticalAlign: "center",
          backgroundColor: "#6cc3d5",
          height: "40px",
          fontSize: "30px",
        }}
        fluid
      >
        Mabit
      </Container>
    </header>
  );
};

export default Header;
