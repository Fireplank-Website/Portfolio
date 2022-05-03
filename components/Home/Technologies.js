import { Box, Grid, Heading, Icon, Text } from "@chakra-ui/react"
import { DiReact, DiDatabase } from "react-icons/di"
import { MdDesignServices } from "react-icons/md"
import { AiFillQuestionCircle } from "react-icons/ai"

const Technologies = () => {
  return (
    <Box className="section" id="tech" maxW={"90%"} ml={{ base: 'none', md: '11rem' }} mb="2rem">
        <Box className="section-container">
            <Heading
                fontSize={["2.5rem", "3rem", "3.5rem"]}
                lineHeight={["2.5rem", "3rem", "3.5rem"]}
                className="section-header"
                mb="2rem"
            >
                Technologies
            </Heading>
            <Text
            fontSize={["1rem", "1.1rem", "1.2rem", "1.3rem", "1.4rem", "1.5rem", "1.6rem", "1.7rem", "1.8rem", "1.9rem", "2rem"]}
            lineHeight={"2.5rem"}
            fontWeight={300}
            pb="2rem"
            color="gray.400">
                I&apos;ve worked with a variety of technologies and frameworks, and done several projects with them.
            </Text>
            <Grid
            templateColumns="repeat(auto-fill, 220px)"
            gap="1rem"
            placeItems={"center"}>
                <Box
                maxW={{ sm: '203px', md: '320px' }}
                marginBottom={{ base: 'none', sm: '14px' }}
                display={"flex"}
                flexDirection="column"
                >
                    <Icon as={DiReact} w="3rem" h="3rem"/>
                    <Text className="list-title">Frontend</Text>
                    <Text className="list-paragraph">
                        Experience with React, Next.js and more
                    </Text>
                </Box>
                <Box
                maxW={{ sm: '203px', md: '320px' }}
                marginBottom={{ base: 'none', sm: '14px' }}
                display={"flex"}
                flexDirection="column"
                >
                    <Icon as={DiDatabase} w="3rem" h="3rem"/>
                    <Text className="list-title">Backend</Text>
                    <Text className="list-paragraph">
                        Experience with Node, Postgres, MySQL, MongoDB and more
                    </Text>
                </Box>
                <Box
                maxW={{ sm: '203px', md: '320px' }}
                marginBottom={{ base: 'none', sm: '14px' }}
                display={"flex"}
                flexDirection="column"
                >
                    <Icon as={MdDesignServices} w="3rem" h="3rem"/>
                    <Text className="list-title">UI/UX</Text>
                    <Text className="list-paragraph">
                        Experience with tools like Figma
                    </Text>
                </Box>
                <Box
                maxW={{ sm: '203px', md: '320px' }}
                marginBottom={{ base: 'none', sm: '14px' }}
                display={"flex"}
                flexDirection="column"
                >
                    <Icon as={AiFillQuestionCircle} w="3rem" h="3rem"/>
                    <Text className="list-title">Other</Text>
                    <Text className="list-paragraph">
                        Experience with frameworks like Discord.py, Tensorflow and more
                    </Text>
                </Box>
            </Grid>
        </Box>
    </Box>
  )
}
export default Technologies