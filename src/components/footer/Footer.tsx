import React from "react";
import {
  Box,
  useColorModeValue,
  Text,
  Container,
  Stack,
  VisuallyHidden,
  Link,
} from "@chakra-ui/react";
import { BsEnvelopeFill, BsGithub, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        py={4}
        direction={"column"}
        spacing={4}
        justify={"center"}
        textAlign={"center"}
        align={"center"}
      >
        <Text>Copyright © {new Date().getFullYear()} Jeffrey Polasz.</Text>
        <Stack direction={"row"} spacing={6}>
          <SocialIcon label="GitHub" href="https://github.com/DigitalEpidemic">
            <BsGithub size={32} />
          </SocialIcon>
          <SocialIcon
            label="LinkedIn"
            href="https://linkedin.com/in/jeffrey-polasz"
          >
            <BsLinkedin size={32} />
          </SocialIcon>
          <SocialIcon label="Email" href="mailto:jeff_polasz@hotmail.com">
            <BsEnvelopeFill size={32} />
          </SocialIcon>
        </Stack>
      </Container>
    </Box>
  );
};

interface SocialIconProps {
  label: string;
  href: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ label, href, children }) => {
  return (
    <Link
      href={href}
      _hover={{
        color: useColorModeValue("black", "gray.200"),
        textDecoration: "none",
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Link>
  );
};

export default Footer;
