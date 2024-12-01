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

const MAX_ZOOM_LEVEL = 4;
const MIN_ZOOM_LEVEL = 1;
const ZOOM_STEP = 0.25;
const PDF_FILENAME = "jeffreypolasz-resume.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  pdfWorkerURL,
  import.meta.url
).toString();

export const Resume = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToTop();
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const getContainerWidth = () => {
    const width = containerRef.current?.offsetWidth || 0;
    return Math.min(width, 1080);
  };

  const handleZoomIn = () => {
    if (zoom < MAX_ZOOM_LEVEL) {
      setZoom((prevZoom) => Math.min(prevZoom + ZOOM_STEP, MAX_ZOOM_LEVEL));
    }
  };

  const handleZoomOut = () => {
    if (zoom > MIN_ZOOM_LEVEL) {
      setZoom((prevZoom) => Math.max(prevZoom - ZOOM_STEP, MIN_ZOOM_LEVEL));
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      maxHeight="100vh"
      data-testid="Resume"
    >
      <Stack mt="65px" align="center" overflowY="auto">
        <DownloadLink />
        <PdfViewer
          containerRef={containerRef}
          zoom={zoom}
          numPages={numPages}
          onDocumentLoadSuccess={onDocumentLoadSuccess}
          containerWidth={getContainerWidth()}
        />
      </Stack>

      <ZoomControls
        zoom={zoom}
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
      />

      <Footer />

      <FloatingActionButton
        label="Scroll to Top"
        size="lg"
        hideAfterClick
        icon={<BsFillCaretUpFill />}
        onClick={scrollToTop}
      />
    </Box>
  );
};

const DownloadLink = () => (
  <Link
    onClick={() => downloadFile(resumePdf, PDF_FILENAME)}
    alignSelf="center"
  >
    <Text as="b">Download Resume as .PDF</Text>
  </Link>
);

const PdfViewer = ({
  containerRef,
  zoom,
  numPages,
  onDocumentLoadSuccess,
  containerWidth,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
  zoom: number;
  numPages: number | null;
  onDocumentLoadSuccess: (params: { numPages: number }) => void;
  containerWidth: number;
}) => (
  <Box
    ref={containerRef}
    className="pdf-container"
    width="100%"
    overflow="auto"
  >
    <Document
      file={resumePdf}
      onLoadError={(e) => console.error("Error loading PDF", e)}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      {numPages &&
        Array.from(new Array(numPages), (_, index) => (
          <Page
            key={index}
            pageNumber={index + 1}
            width={containerWidth}
            scale={zoom}
            renderAnnotationLayer={false}
          />
        ))}
    </Document>
  </Box>
);

const ZoomControls = ({
  zoom,
  handleZoomIn,
  handleZoomOut,
}: {
  zoom: number;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}) => (
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
    <Button
      onClick={handleZoomOut}
      colorScheme="green" // TODO: Create custom color scheme
      size="md"
      rounded="full"
      isDisabled={zoom <= MIN_ZOOM_LEVEL}
    >
      -
    </Button>
    <Button
      onClick={handleZoomIn}
      colorScheme="green" // TODO: Create custom color scheme
      size="md"
      rounded="full"
      isDisabled={zoom >= MAX_ZOOM_LEVEL}
    >
      +
    </Button>
  </Flex>
);
