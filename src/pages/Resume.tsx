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
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2)); // Zoom in with max zoom level of 2
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5)); // Zoom out with min zoom level of 0.5
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

        {/* Document container with zoom effect */}
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
                  width={getContainerWidth()} // Apply zoom based on state
                  scale={zoom}
                  renderAnnotationLayer={false}
                />
              ))}
          </Document>
        </Box>
      </Stack>

      {/* Floating Zoom In and Zoom Out buttons */}
      <Flex
        position="fixed"
        bottom="15px"
        left="50%"
        transform="translateX(-50%)"
        direction="row"
        justify="center"
        align="center"
        zIndex={10} // Ensure the buttons stay on top
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
