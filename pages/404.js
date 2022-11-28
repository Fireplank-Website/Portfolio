import { Box, Heading, Image } from "@chakra-ui/react";

// Using a custom 404 page as chakra UI's automatic dark mode doesn't work well with the default 404 page...
export default function Custom404() {
    return <Box position={"fixed"} top="50%" left="50%" marginRight="50%" transform={`translate(-50%, -50%)`}>
        <Heading fontSize={["2rem","3rem","4rem","5rem","6rem"]}>404</Heading>
        <Heading fontSize={["1rem","2rem"]}>Page Not Found</Heading>
    </Box>
  }