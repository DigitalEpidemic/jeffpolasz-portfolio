import React from "react";
import {
  Flex,
  Text,
  VStack,
  useBreakpointValue,
  useColorModeValue,
  Avatar,
  Box,
  keyframes,
} from "@chakra-ui/react";

interface HeroProps {
  backgroundImage: string;
  profileImage: string;
  firstName: string;
  lastName: string;
  tagline: string;
}

const Hero: React.FC<HeroProps> = ({
  backgroundImage,
  profileImage,
  firstName,
  lastName,
  tagline,
}) => {
  return (
    <Flex
      w={"full"}
      h={"100vh"}
      backgroundImage={backgroundImage}
      backgroundPosition={"center"}
      backgroundSize={"cover"}
    >
      <VStack w={"full"} justify={"center"}>
        <ProfilePicture profileImage={profileImage} size="200px" animate />
        <Flex>
          <Text
            color={useColorModeValue("gray.800", "white")}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
            textTransform={"uppercase"}
          >
            {firstName}{" "}
            <Text
              d={"inline"}
              color={useColorModeValue("white", "gray.800")}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
              textTransform={"uppercase"}
            >
              {lastName}
            </Text>
          </Text>
        </Flex>
        <Text mt={"0 !important"}>{tagline}</Text>
      </VStack>
    </Flex>
  );
};

interface ProfilePictureProps {
  size: string;
  profileImage: string;
  animate?: boolean;
}

const pulseRing = keyframes`
	0% {
    transform: scale(0.33);
  }
  40%,
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
	`;

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  size,
  profileImage,
  animate: animation,
}) => {
  return (
    <Box
      as="div"
      position="relative"
      w={size}
      h={size}
      _before={
        animation
          ? {
              content: "''",
              position: "relative",
              display: "block",
              width: "250%",
              height: "250%",
              boxSizing: "border-box",
              marginLeft: "-75%",
              marginTop: "-75%",
              borderRadius: "50%",
              bgColor: useColorModeValue("white", "gray.800"),
              animation: `5s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
            }
          : {}
      }
    >
      <Avatar src={profileImage} size="full" position="absolute" top={0} />
    </Box>
  );
};

export default Hero;
