import { Box, Button, Divider, Grid, Heading, HStack, Image, Link, Text } from "@chakra-ui/react"
import { projects } from "../../constants/constants"

function remrange(start, end) {
    return new Array(end - start).fill().map((d, i) => `${i + start}rem`);
}

const Project = ({ project }) => {
    return (
        <Box 
            borderRadius={"10px"}
            boxShadow="3px 3px 20px rgba(80, 78, 78, 0.5)"
            textAlign={"center"}
            width={remrange(15,30)}
        >
            <Image
                width={"100%"}
                height={"100%"}
                overflow={"hidden"}
                src={project.image}
                alt="project image"
            />
            <Text
                fontWeight={500}
                letterSpacing="2px"
                color="blue.300"
                padding=".5rem 0"
                fontSize={(props) => props.title ? '3rem' : '2rem'}
            >
                {project.title}
            </Text>
            <Box
                width={"50px"}
                height={"3px"}
                margin="20px auto"
                border="0"
                bgColor="#fff"
                borderRadius={"10px"}
        bg={(props) => props.colorAlt ? 
            'linear-gradient(270deg, #F46737 0%, #945DD6 100%)' :
            'linear-gradient(270deg, #13ADC7 0%, #945DD6 100%)'}
            />
            <Text
                width={"90%"}
                margin="1rem"
                opacity={0.8}
                fontStyle="2rem"
                lineHeight={"24px"}
                textAlign="justify"
            >
                {project.description}
            </Text>
            <hr color="orange" style={{ margin: '1rem' }}/>
            <Box
            display={"flex"}
            justifyContent={"space-around"}
            padding="1rem"
            >
                {project.tags.map((tag, i) => (
                    <Text key={`tag${i}`} color="gray.400" pl={"0.4rem"} pr="0.4rem" fontSize={["0.5rem", "0.6rem", "0.8rem", "1rem"]}>{tag}</Text>
                ))}
            </Box>
            <Box justifyContent={project.visit === "" ? "center" : "space-between"} display={"flex"} padding="0 2rem 1rem 2rem">
                <a href={project.source} target="_blank" rel="noopener noreferrer">
                    <Button colorScheme='orange' size='md' mt="1rem">Source</Button>
                </a>
                {project.visit !== "" && 
                    <a href={project.visit}>
                        <Button colorScheme='orange' size='md' mt="1rem">&nbsp;Visit&nbsp;</Button>
                    </a>
                }
            </Box>
        </Box>
    )
}

const Projects = () => {

    return (
        <Box className="section" id="projects" maxW={"90%"} ml={{ base: 'none', md: '11rem' }}>
            <Box className="section-container">
                <Heading
                fontSize={["2.5rem", "3rem", "3.5rem"]}
                lineHeight={["2.5rem", "3rem", "3.5rem"]}
                className="section-header">
                    Projects
                </Heading>
            </Box>
            <Grid
                templateColumns="repeat(auto-fill, 350px)"
                gap="1rem"
                padding="3rem"
                placeItems={"center"}>
                    {projects.map((project, i) => (
                      <Project key={`project${i}`} project={project}/>
                    ))}
                </Grid>
        </Box>
    )
}
export default Projects