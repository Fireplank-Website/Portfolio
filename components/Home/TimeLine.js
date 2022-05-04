import { Box, Heading, Text } from "@chakra-ui/react"
import React, { useRef, useState, useEffect } from "react";
import { TimeLineData } from "../../constants/constants";
import Carousel from "../Carousel";

const TimeLine = () => {
    return (
        <Box className="section" ml={{ base: 'none', md: '11rem' }} id="about" maxW={"95%"} marginBottom="7.5rem">
            <Box className="section-container">
                <Heading
                fontSize={["2.5rem", "3rem", "3.5rem"]}
                lineHeight={["2.5rem", "3rem", "3.5rem"]}
                className="section-header">
                    About Me
                </Heading>
                <Text
                fontSize={["1rem", "1.1rem", "1.2rem", "1.3rem", "1.4rem", "1.5rem", "1.6rem", "1.7rem", "1.8rem", "1.9rem", "2rem"]}
                lineHeight={"2.5rem"}
                fontWeight={300}
                pb="2rem"
                color="gray.400">
                    I&apos;ve worked with a variety of technologies and frameworks, and done several projects with them.
                </Text>
                <Carousel slides={TimeLineData}/>
            </Box>
        </Box>
    )
}
export default TimeLine