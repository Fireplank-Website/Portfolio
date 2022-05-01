import {
    Box,
    Container,
    Stack,
    Text,
    Link,
    useColorModeValue,
    Button
  } from '@chakra-ui/react';
  import { useRouter } from 'next/router';

export default function Footer() {
    const router = useRouter();
    const usedPos = router.pathname == "/" ? "absolute" : "fixed";
    return (
      <Box
        zIndex={999}
        position={usedPos}
        padding="10px 10px 0px 10px"
        bottom={0}
        width="100%"
        bg={useColorModeValue('gray.100', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}>
        <Container
          as={Stack}
          maxW={'100%'}
          py={4}
          direction="row"
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Stack direction={'row'} spacing={6}>
            <Button variant={"ghost"} onClick={() => window.location = "/"}>Home</Button>
          </Stack>
          <Text>© 2022 FirePlank. All rights reserved</Text>
        </Container>
      </Box>
    );
  }