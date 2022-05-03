import { Heading, Box, Text } from "@chakra-ui/react";
import { words } from "../../constants/constants";
import React from 'react';
import Typed from 'typed.js';
const Hero = () => {
    // Create reference to store the DOM element containing the animation
	const el = React.useRef(null);
    // Create reference to store the Typed instance itself
    const typed = React.useRef(null);

    React.useEffect(() => {

        const options = {
            strings: words,
            typeSpeed: 60,
            backSpeed: 50,
            loop: true,
            cursorChar: "|",
        };
        
        // elRef refers to the <span> rendered below
        typed.current = new Typed(el.current, options);
        
        return () => {
          // Make sure to destroy Typed instance during cleanup
          // to prevent memory leaks
          typed.current.destroy();
        }
      }, [])

    return (
        <Box className="section" ml={{ base: 'none', md: '11rem' }}>
            <Box className="section-container">
                <Heading
                    fontSize={["2.5rem", "3rem", "3.5rem"]}
                    whiteSpace={"nowrap"}
                    lineHeight={["2.5rem", "3rem", "3.5rem"]}
                    className="section-header"
                >
                    Hi! I&apos;m a<br />
                    <Heading as="span"
                    fontWeight={800}
                    fontFamily={["monospace"]}
                    fontSize={["1.9rem", "2.0rem", "2.25rem", "2.5rem", "3rem", "3.5rem"]}
                    lineHeight={["2.5rem", "3rem", "3.5rem"]}
                    bgGradient='linear-gradient(270deg, #00DBD8 0%, #B133FF 100%)'
                    transition={"0.5 ease"}
                    backgroundClip="text"
                    textColor="transparent"
                    style={{ whiteSpace: 'pre' }}
                    ref={el}>​</Heading>
                </Heading>
                <Text
                    fontSize={["1rem", "1.1rem", "1.2rem", "1.3rem", "1.4rem", "1.5rem", "1.6rem", "1.7rem", "1.8rem", "1.9rem", "2rem"]}
                    lineHeight={["1.0rem", "1.5rem", "2.0rem"]}
                    fontWeight={300}
                    pb="2rem"
                    color="gray.400"
                    width="max-content"
                    maxW="90%"
                >
                    I&apos;m a developer skilled with a wide range of technologies and frameworks.<br/>
                    I have experience with working in teams and can coordinate well with others.
                </Text>
                <Box
                    width={({ alt }) => alt ? '150px' : '262px'}
                    height={({ alt }) => alt ? '52px' : '64px'}
                    borderRadius={"50px"}
                    fontSize={({ alt }) => alt ? '1.5rem' : '2rem'}
                    fontWeight={"600"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    margin={({ alt, form }) => (alt || form) ? '0' : '0 0 80px'}
                    background={({ alt }) => alt ? 'linear-gradient(270deg, #ff622e 0%, #B133FF 100%)' : 'linear-gradient(270deg, #00DBD8 0%, #B133FF 100%)'}
                    cursor={"pointer"}
                    transition={"0.5 ease"}
                    position={"relative"}
                    overflow={"hidden"}
                    opacity={({ disabled }) => disabled ? '.5' : '1'}
                >
                    <Box 
                    border={"none"}
                    borderRadius={"50px"}
                    display={"flex"}
                    position={"absolute"}
                    top={"0"}
                    left={"0"}
                    width={"100%"}
                    height={"100%"}
                    background={({ alt }) => alt ? 'linear-gradient(270deg, #F46737 0%, #945DD6 100%)' : 'linear-gradient(270deg, #13ADC7 0%, #945DD6 100%)'}
                    opacity={({ disabled }) => disabled ? '.5' : '1'}
                    transition={"0.5 ease"}
                    fontSize={({ alt }) => alt ? '1rem' : '1.5rem'}
                    fontWeight={"600"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    cursor={"pointer"}
                    color={"white"}
                    boxShadow={({ disabled }) => disabled ? 'inset 0px 2px 1px rgba(46, 49, 55, 0.15), inset 0px 0px 4px rgba(20, 20, 55, 0.3)' : 'none'}
                    onClick={() => window.location = "#about"}>Learn More</Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Hero