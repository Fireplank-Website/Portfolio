import { Box, Divider } from "@chakra-ui/react"

const SectionDivider = () => {
  return (
    <Box ml="11rem">
        <Divider
        ml="6rem"
        display={"flex"}
        flexDir={"column"}
        width="20%"
        height={"2px"}
        borderRadius={"10px"}
        bgColor="#fff"
        bg={(props) => props.colorAlt ? 
            'linear-gradient(270deg, #F46737 0%, #945DD6 100%)' :
            'linear-gradient(270deg, #13ADC7 0%, #945DD6 100%)'}
        margin={(props) => props.divider ? "4rem 0" : "" }
        mb="40px"
        />
    </Box>
  )
}
export default SectionDivider