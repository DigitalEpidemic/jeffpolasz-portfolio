import {
  Link,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import { scrollToTop } from "../../common/utils";
import { useNavbar } from "../../providers/NavbarProvider";

interface LogoProps {
  logoText: string;
}

const Logo: React.FC<LogoProps> = ({ logoText }) => {
  const { onClose, isAnimating } = useNavbar();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (location.pathname === "/resume") {
      navigate("/");
    }

    scrollToTop();
    onClose();
  };

  return (
    <Text
      as={Link}
      onClick={handleClick}
      textAlign={useBreakpointValue({ base: "center", md: "left" })}
      fontFamily={"heading"}
      fontSize={"2xl"}
      fontWeight={"semibold"}
      color={useColorModeValue("gray.800", "white")}
      p={1}
      style={isAnimating ? { pointerEvents: "none" } : {}}
      _hover={{
        textDecoration: "none",
      }}
    >
      {logoText}
    </Text>
  );
};

export default Logo;
