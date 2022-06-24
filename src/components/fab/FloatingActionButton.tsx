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
  const [isDisabled, setIsDisabled] = React.useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      setIsDisabled(false);
    }
  };

  const handleOnClick = () => {
    if (!isDisabled) {
      setIsDisabled(true);
      onClick();
      if (hideAfterClick) {
        setIsVisible(false);
      }
    }
  };

  const variants = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
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
        disabled={isDisabled}
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
