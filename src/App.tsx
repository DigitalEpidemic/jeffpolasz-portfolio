import { Container, Text } from "@chakra-ui/react";
import React from "react";
import Footer from "./components/footer/Footer";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import Portfolio from "./components/portfolio/Portfolio";

const App = () => {
  return (
    <div className="App">
      <Navbar sticky />
      <Hero
        backgroundImage="https://arlo-static-demo-dark.netlify.app/static/40a019176f85445c7910d98269bfbd0b/f3a00/bg-image-02.webp"
        profileImage="https://i.pravatar.cc/200"
        firstName="Jeffrey"
        lastName="Polasz"
        tagline="I'm a Game and Web Developer"
        actionText="Learn More"
      />
      <Portfolio title="Game Projects" />
      {/* <Container mt={5} mb={5}>
        <Text>Hello, World!</Text>
      </Container> */}
      <Footer />
    </div>
  );
};

export default App;
