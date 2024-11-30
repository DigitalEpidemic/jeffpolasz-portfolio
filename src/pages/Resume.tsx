import { Box, Link, Stack, Text } from "@chakra-ui/react";
import { BsFillCaretUpFill } from "react-icons/bs";
import { downloadFile, scrollToTop } from "../common/utils";
import FloatingActionButton from "../components/fab/FloatingActionButton";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import resumePdf from "../assets/jeffreypolasz-resume.pdf";

export const Resume = () => {
  // TODO: Redirect to home page when clicking on Logo, game projects and web projects

  return (
    <Box h={"100vh"} data-testid="Resume">
      <Navbar sticky />
      <Stack mt={"65px"} h={"100%"}>
        <Link
          onClick={() => downloadFile(resumePdf, "jeffreypolasz-resume.pdf")}
          alignSelf={"center"}
        >
          <Text as={"b"}>Download Resume as .PDF</Text>
        </Link>
        <iframe
          width={"100%"}
          height={"100%"}
          src="https://drive.google.com/file/d/16KzzDWwR7_TX2BmeobE4-uihwT1OnYiD/preview"
        />
      </Stack>
      <Footer />
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
