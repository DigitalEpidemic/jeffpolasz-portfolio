import { Box, Container, Text } from "@chakra-ui/react";
import React from "react";
import { BsFillCaretUpFill } from "react-icons/bs";
import { scrollToTop } from "../common/utils";
import FloatingActionButton from "../components/fab/FloatingActionButton";
import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";
import Portfolio from "../components/portfolio/Portfolio";
import { gameProjects } from "../data/gameProjects";
import { webProjects } from "../data/webProjects";
import { useNavbar } from "../providers/NavbarProvider";

export const Home = () => {
  const { onClose } = useNavbar();

  return (
    <Box data-testid="Home" overflowX={"hidden"}>
      <Box onClick={onClose}>
        <Hero
          backgroundImage="https://arlo-static-demo-dark.netlify.app/static/40a019176f85445c7910d98269bfbd0b/f3a00/bg-image-02.webp"
          profileImage="https://i.pravatar.cc/200"
          firstName="Jeffrey"
          lastName="Polasz"
          tagline="I'm a Game and Web Developer"
          actionText="Learn More"
        />
        <Portfolio
          title="Game Projects"
          portfolioData={gameProjects}
          excludeFilters={["Android", "iOS"]}
          forceSameHeight
        />
        <Portfolio
          title="Web Projects"
          portfolioData={webProjects}
          forceSameHeight
        />
        <Container mt={5} mb={5}>
          <Text>Hello, World!</Text>
        </Container>
        <Footer />
      </Box>
      <FloatingActionButton
        label="Scroll to Top"
        size={"lg"}
        hideAfterClick
        icon={<BsFillCaretUpFill />}
        onClick={scrollToTop}
      />
    </Box>
  );
};
