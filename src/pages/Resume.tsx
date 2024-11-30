import { Box, Link, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { BsFillCaretUpFill } from "react-icons/bs";
import resumePdf from "../assets/jeffreypolasz-resume.pdf";
import { downloadFile, scrollToTop } from "../common/utils";
import FloatingActionButton from "../components/fab/FloatingActionButton";
import Footer from "../components/footer/Footer";

export const Resume = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Box h={"100vh"} data-testid="Resume">
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
