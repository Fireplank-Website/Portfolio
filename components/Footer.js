import {
  Box,
  chakra,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaTwitter, FaGithub } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { LinkItems } from '../constants/constants';

const currentYear = new Date().getFullYear();

const SocialButton = ({
  children,
  label,
  href,
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

export default function LargeWithNewsletter() {
  const router = useRouter();
  const usedPos = router.pathname == "/" ? "absolute" : "fixed";
  const bg = useColorModeValue('gray.50', 'gray.900');
  const color = useColorModeValue('gray.700', 'gray.200');
  if (router.pathname.startsWith("/apps")) {
    return null;
  }

  return (
    <Box
      bg={bg}
      color={color}
      width="100%"
      zIndex={999}
      position={usedPos}
      bottom={0}
      >
      <Container as={Stack} maxW={'100%'} py={10} marginLeft="1rem">
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
          spacing={8}>
          <Stack spacing={6}>
            <Image alt="fireplank logo" src="/images/fireplank.png" w="3rem" h="3rem"/>
            <Text fontSize={'sm'}>
              © {currentYear} FirePlank. All rights reserved
            </Text>
            <Stack direction={'row'} spacing={6}>
              <a href='https://twitter.com/FirePlank' target="_blank" rel="noopener noreferrer">
                <SocialButton isExternal label={'Twitter'}>
                  <FaTwitter />
                </SocialButton>
              </a>
              <a href='https://github.com/FirePlank' target="_blank" rel="noopener noreferrer">
                <SocialButton isExternal label={'Github'}>
                  <FaGithub />
                </SocialButton>
              </a>
              <SocialButton isExternal label={'Mail'} href={'mailto:contact@fireplank.xyz'}>
                <AiOutlineMail />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Content</ListHeader>
            {LinkItems.map((link, index) => (
              <Link key={`footer${index}`} href={link.path}>{link.name}</Link>
            ))}
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <Link isExternal href="https://hcaptcha.com/privacy">Privacy Policy</Link> and
            <Link isExternal href="https://hcaptcha.com/terms">Terms of Service</Link> apply.
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
