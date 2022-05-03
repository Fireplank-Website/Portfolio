import { Box, Heading, Text } from "@chakra-ui/react"
import React, { useRef, useState, useEffect } from "react";
import { TimeLineData } from "../../constants/constants";

const TimeLine = () => {
    const [activeItem, setActiveItem] = useState(0);
    const carouselRef = useRef();

    const handleClick = (e, i) => {
        e.preventDefault();
    
        if (carouselRef.current) {
          const scrollLeft = Math.floor(carouselRef.current.scrollWidth * 0.7 * (i / TimeLineData.length));
          
          scroll(carouselRef.current, scrollLeft);
        }
    }

    return (
        <Box className="section" ml={{ base: 'none', md: '11rem' }} id="about">
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
                <Box
                ref={carouselRef}
                maxW="90%"
         
                padding={"0rem"}
                display={"flex"}
                listStyleType="none"
                justifyContent={"space-between"}
                marginBottom={"80px"}
                >
                    <>
                        {TimeLineData.map((item, index) => (
                            <Box key={index} final={index == TimeLineData.length-1} display={"flex"} minW={({ final }) => final ? `120%;` : `min-content`}>
                                <Box

                                borderRadius={"3px"}
                                maxW="124px"
                                alignContent={"start"}
                                scrollSnapAlign={"start"}
                                position={"relative"}
                                height="fit-content"
                                marginLeft={"32px"}
                                index = {index}
                                id={`carousel__item-${index}`}
                                _active={activeItem}
                                onClick={(e) => handleClick(e, index)}
                                >
                                    <Text
                                    as="h4"
                                    fontWeight={"bold"}
                                    fontSize={["16px" , "20px" , "24px"]}
                                    lineHeight={["24px", "28px", "32px"]}
                                    letterSpacing={"0.02em"}
                                    display={"flex"}
                                    background="linear-gradient(121.57deg, #FFFFFF 10%, rgba(255, 255, 255, 0.66) 30.15%);"
                                    backgroundClip={"text"}
                                    fill="transparent"
                                    marginBottom={"8px"}
                                    >
                                        {item.year}
                                        <Box
                                            as="svg"
                                            width="208"
                                            height="6"
                                            viewBox="0 0 208 6"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M2.5 5.5C3.88071 5.5 5 4.38071 5 3V3.5L208 3.50002V2.50002L5 2.5V3C5 1.61929 3.88071 0.5 2.5 0.5C1.11929 0.5 0 1.61929 0 3C0 4.38071 1.11929 5.5 2.5 5.5Z"
                                            fill="url(#paint0_linear)"
                                            fill-opacity="0.33"
                                            />
                                            <defs>
                                            <linearGradient
                                                id="paint0_linear"
                                                x1="-4.30412e-10"
                                                y1="0.5"
                                                x2="208"
                                                y2="0.500295"
                                                gradientUnits="userSpaceOnUse">
                                                <stop stop-color="white" />
                                                <stop
                                                offset="0.79478"
                                                stop-color="white"
                                                stop-opacity="0"
                                                />
                                            </linearGradient>
                                            </defs>
                                        </Box>
                                    </Text>
                                </Box>
                            </Box>
                        ))}
                    </>
                </Box>
            </Box>
        </Box>
    )
}
export default TimeLine