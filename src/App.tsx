import { Container, Text } from "@chakra-ui/react";
import React from "react";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";

const App = () => {
  return (
    <div className="App">
      <Navbar sticky />
      <Container mt={20} mb={5}>
        <Text>Hello, World!</Text>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
