import {
  Box,
  Flex,
  HStack,
  Icon,
  Link,
  useColorModeValue,
  Text,
  Button,
  useColorMode,
} from '@chakra-ui/react';
import { BsMoonFill, BsSun, BsInfoCircle } from 'react-icons/bs';
import { FaProjectDiagram, FaGithub, FaTwitter } from 'react-icons/fa';
import { MdBiotech } from 'react-icons/md';
import styles from '../styles/Nav.module.css';
import NextLink from 'next/link';
const LinkItems = [
  { name: 'Projects', icon: FaProjectDiagram, path: '#projects' },
  { name: 'Technologies', icon: MdBiotech, path: '#tech' },
  { name: 'About', icon: BsInfoCircle, path: '#about' },
];

const NavLink = ({ children, href }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={href}>
    {children}
  </Link>
);

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="0.2s ease"
      bg={useColorModeValue('gray.100', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w="11rem"
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          FirePlank
        </Text>
      </Flex>
      {LinkItems.map((link, index) => (
        <NavItem className={styles.unselectable} unselectable="on" key={link.name} icon={link.icon} id={index}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link href={LinkItems[rest.id].path} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const NavWithSidebar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} boxShadow='lg' width="100%">
      <SidebarContent
        position="fixed"
        zIndex={998}
        boxShadow="xl"
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Box h={16} width="full">
        <Box mt="3" mr="4" float="right">
          <a href="https://github.com/FirePlank" target="_blank" rel="noopener noreferrer">
            <Button leftIcon={<FaGithub />} mr="1rem" aria-label="github button">
              Github
            </Button>
          </a>
          <a href="https://twitter.com/FirePlank" target="_blank" rel="noopener noreferrer">
            <Button colorScheme='twitter' leftIcon={<FaTwitter />} mr="1rem" aria-label="twitter button">
              Twitter
            </Button>
          </a>
          <Button onClick={toggleColorMode} aria-label="change theme button">
              {colorMode === 'light' ? <BsMoonFill /> : <BsSun />}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} boxShadow='lg'>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}>
            <NavLink key={1} href="/">Home</NavLink>
          </HStack>
        </HStack>

        <Flex alignItems={'center'}>
        <Button leftIcon={<FaGithub />} mr="1rem" aria-label="github button">
            Github
          </Button>
          <a href="https://twitter.com/FirePlank" target="_blank" rel="noopener noreferrer">
            <Button colorScheme='twitter' leftIcon={<FaTwitter />} mr="1rem" aria-label="twitter button">
              Twitter
            </Button>
          </a>
          <Button onClick={toggleColorMode} aria-label="change theme button">
              {colorMode === 'light' ? <BsMoonFill /> : <BsSun />}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export { Nav, NavWithSidebar }