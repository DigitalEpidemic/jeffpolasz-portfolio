import { Box, Stack } from "@chakra-ui/react";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";

export const Resume = () => {
  return (
    <Box h={"100vh"} data-testid="Resume">
      <Navbar sticky />
      <Stack mt={"65px"} h={"100%"}>
        <div>Download Resume as .PDF</div>
        <iframe
          width={"100%"}
          height={"100%"}
          src="https://drive.google.com/file/d/16KzzDWwR7_TX2BmeobE4-uihwT1OnYiD/preview?pli=1"
        />
      </Stack>
      <Footer />
    </Box>
  );
};
