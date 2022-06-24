import React, { useEffect } from "react";
import { ReactElement } from "react";
import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface FloatingActionButtonProps {
  icon: ReactElement;
  label: string;
  onClick: () => void;
  size?: IconButtonProps["size"];
  hideAfterClick?: boolean;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  label,
  size,
  hideAfterClick,
  onClick,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleOnClick = () => {
    onClick();
    if (hideAfterClick) {
      setIsVisible(false);
    }
  };

  const variants = {
    visible: {
      opacity: 1,
      display: "inline-flex",
    },
    hidden: {
      opacity: 0,
      applyAtEnd: { display: "none" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.4 }}
    >
      <IconButton
        zIndex={102}
        position={"fixed"}
        size={size}
        bottom={2}
        right={2}
        borderRadius={30}
        onClick={handleOnClick}
        aria-label={label}
      >
        {icon}
      </IconButton>
    </motion.div>
  );
};

export default FloatingActionButton;
