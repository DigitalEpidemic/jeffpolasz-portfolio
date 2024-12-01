import { Box, Link, Stack, Text } from "@chakra-ui/react";
import pdfWorkerURL from "pdfjs-dist/build/pdf.worker.min?url";
import { useEffect, useRef, useState } from "react";
import { BsFillCaretUpFill } from "react-icons/bs";
import { Document, Page, pdfjs } from "react-pdf";
import resumePdf from "../assets/jeffreypolasz-resume.pdf";
import { downloadFile, scrollToTop } from "../common/utils";
import FloatingActionButton from "../components/fab/FloatingActionButton";
import Footer from "../components/footer/Footer";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  pdfWorkerURL,
  import.meta.url
).toString();

export const Resume = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToTop();
  }, []);

  const getContainerWidth = () => {
    if (containerRef.current) {
      return containerRef.current.offsetWidth;
    }
    return 0;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      data-testid="Resume"
    >
      <Stack mt={"65px"} align="center" overflowY="auto">
        <Link
          onClick={() => downloadFile(resumePdf, "jeffreypolasz-resume.pdf")}
          alignSelf={"center"}
        >
          <Text as={"b"}>Download Resume as .PDF</Text>
        </Link>

        <Box ref={containerRef} width="100%" maxWidth="1080px">
          <Document
            file={resumePdf}
            onLoadError={(e) => console.log("Error loading PDF", e)}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            {numPages &&
              Array.from(new Array(numPages), (_, index) => (
                <Page
                  key={index}
                  pageNumber={index + 1}
                  width={getContainerWidth()}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              ))}
          </Document>
        </Box>
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
