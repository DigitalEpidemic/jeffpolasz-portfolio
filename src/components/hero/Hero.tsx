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
  Button,
} from "@chakra-ui/react";

interface HeroProps {
  backgroundImage: string;
  profileImage: string;
  firstName: string;
  lastName: string;
  tagline: string;
  actionText?: string;
}

const Hero: React.FC<HeroProps> = ({
  backgroundImage,
  profileImage,
  firstName,
  lastName,
  tagline,
  actionText,
}) => {
  return (
    <Box mt={15}>
      <Flex
        aria-label="hero-background-image"
        w={"full"}
        h={"100vh"}
        backgroundImage={backgroundImage}
        backgroundPosition={"center"}
        backgroundSize={"cover"}
      >
        <BackgroundImageOverlay backgroundColor={"black"} opacity={0.6} />
        <VStack w={"full"} justify={"center"} zIndex={1}>
          <ProfilePicture profileImage={profileImage} size="200px" animate />
          <Flex>
            <Text
              color={useColorModeValue("green.500", "green.200")}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
              textTransform={"uppercase"}
            >
              {firstName}{" "}
              <Text
                d={"inline"}
                as={"span"}
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
          <Text color={"white"} mt={"0 !important"}>
            {tagline}
          </Text>
          {/* TODO: Create colorSchemes of Black and White to remove needing to manually apply styles */}
          {actionText && (
            <Button background={useColorModeValue("white", "gray.800")}>
              {/* TODO: Scroll to About Page onClick */}
              {actionText}
            </Button>
          )}
        </VStack>
      </Flex>
    </Box>
  );
};

interface BackgroundImageOverlayProps {
  backgroundColor?: string;
  opacity?: number;
}

const BackgroundImageOverlay: React.FC<BackgroundImageOverlayProps> = ({
  opacity = 0.45,
  backgroundColor = "black",
}) => {
  return (
    <Box
      position={"absolute"}
      zIndex={0}
      w={"full"}
      h={"100vh"}
      backgroundColor={backgroundColor}
      opacity={opacity}
    />
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
      zIndex={101}
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
      <Avatar
        name="profile-picture"
        src={profileImage}
        size="full"
        position="absolute"
        top={0}
      />
    </Box>
  );
};

export default Hero;
