import { Box, Button, Flex, Link, Stack, Text } from "@chakra-ui/react";
import pdfWorkerURL from "pdfjs-dist/build/pdf.worker.min?url";
import { useEffect, useRef, useState } from "react";
import { BsFillCaretUpFill } from "react-icons/bs";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import resumePdf from "../assets/jeffreypolasz-resume.pdf";
import { downloadFile, scrollToTop } from "../common/utils";
import FloatingActionButton from "../components/fab/FloatingActionButton";
import Footer from "../components/footer/Footer";
import "./resume.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  pdfWorkerURL,
  import.meta.url
).toString();

const MAX_ZOOM_LEVEL = 4;
const MIN_ZOOM_LEVEL = 0.5;
const ZOOM_STEP = 0.25;

export const Resume = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1); // State to track zoom level
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

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + ZOOM_STEP, MAX_ZOOM_LEVEL));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - ZOOM_STEP, MIN_ZOOM_LEVEL));
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

        <Box ref={containerRef} className="pdf-container" width="100%">
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
                  scale={zoom}
                  renderAnnotationLayer={false}
                />
              ))}
          </Document>
        </Box>
      </Stack>

      <Flex
        position="fixed"
        bottom="15px"
        left="50%"
        transform="translateX(-50%)"
        direction="row"
        justify="center"
        align="center"
        zIndex={10}
        gap={2}
      >
        <Button onClick={handleZoomOut} size="md" rounded={"full"}>
          -
        </Button>
        <Button onClick={handleZoomIn} size="md" rounded={"full"}>
          +
        </Button>
      </Flex>

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
