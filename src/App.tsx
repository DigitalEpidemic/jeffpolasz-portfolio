import { Container, Text } from "@chakra-ui/react";
import React from "react";
import Navbar from "./components/navbar/Navbar";

const App = () => {
  return (
    <div className="App">
      <Navbar sticky />
      <Container mt={20}>
        <Text>Hello, World!</Text>
      </Container>
    </div>
  );
};

export default App;
