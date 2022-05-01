import React, { useEffect, useRef } from 'react';
import { IconButton } from '@chakra-ui/react';
import { BiArrowToTop } from 'react-icons/bi';
import { motion } from 'framer-motion';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const scrollButton = useRef();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 150) {
        setIsVisible(true);
    } else {
        setIsVisible(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    scrollButton.current.blur();
  };

  return (
    <IconButton
        as={motion.button}
        animate={{ opacity: isVisible ? 1 : 0, bottom: isVisible ? `7rem` :  "-4rem"}}
        aria-label="Back to Top"
        icon={<BiArrowToTop />}
        size="lg"
        colorScheme="purple"
        border="2px solid"
        ref={scrollButton}
        onClick={handleClick}
        position="fixed"
        bottom="-5rem"
        right="2rem"
        zIndex="1"
    />
  );
};

export default ScrollToTop;