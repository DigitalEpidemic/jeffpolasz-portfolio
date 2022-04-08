import { Container, Text } from "@chakra-ui/react";
import React from "react";
import Footer from "./components/footer/Footer";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";

const App = () => {
  return (
    <div className="App">
      <Navbar sticky />
      <Hero
        backgroundImage="https://jeffpolasz.com/css/images/bg.svg"
        profileImage=""
        firstName="Jeffrey"
        lastName="Polasz"
        tagline="I'm a Game and Web Developer"
      />
      <Container mt={20} mb={5}>
        <Text>Hello, World!</Text>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
