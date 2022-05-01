import { Heading, Box, Text } from "@chakra-ui/react"

const Hero = () => {
    return (
        <Box className="section" ml={{ base: 'none', md: '11rem' }}>
            <Box className="section-container">
                <Heading
                    fontSize={["2.5rem", "3rem", "3.5rem"]}
                    lineHeight={["2.5rem", "3rem", "3.5rem"]}
                    className="section-header"
                >
                    Welcome to<br />
                    My <Heading as="span"
                    fontWeight={800}
                    fontFamily={["monospace"]}
                    fontSize={["2.5rem", "3rem", "3.5rem"]}
                    lineHeight={["2.5rem", "3rem", "3.5rem"]}
                    bgGradient='linear-gradient(270deg, #00DBD8 0%, #B133FF 100%)'
                    transition={"0.5 ease"}
                    backgroundClip="text"
                    textColor="transparent"
                    width={"max-content"} 
                    maxW="100%"
                    >Personal Portfolio</Heading>
                </Heading>
                <Text
                    fontSize={["1rem", "1.1rem", "1.2rem", "1.3rem", "1.4rem", "1.5rem", "1.6rem", "1.7rem", "1.8rem", "1.9rem", "2rem"]}
                    lineHeight={"2.5rem"}
                    fontWeight={300}
                    pb="2rem"
                    color="gray.400"
                >
                    I&apos;m a full stack developer, currently working at Your Mom inc.
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