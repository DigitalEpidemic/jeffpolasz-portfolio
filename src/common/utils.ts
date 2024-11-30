import { animateScroll } from "react-scroll";

export const scrollToTop = () => {
  animateScroll.scrollToTop({
    duration: 400,
    smooth: "easeInOutQuint",
    ignoreCancelEvents: true,
  });
};

export const downloadFile = (href: string, fileName: string) => {
  const link = document.createElement("a");
  link.href = href;
  link.download = fileName;
  link.click();
};
