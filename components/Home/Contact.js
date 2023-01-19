import { Box, Button, Heading, Icon, Input, Text, Textarea, useColorMode, useColorModeValue } from "@chakra-ui/react";
import styles from "../../styles/Contact.module.css";
import { AiOutlineArrowRight, AiOutlineMail } from "react-icons/ai";
import { useState } from 'react';
import React, { useEffect } from "react";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { RiMailSendLine } from "react-icons/ri";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [info, setInfo] = useState('');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const hcaptchaRef = React.createRef();

    // check if light theme chakra
    const lightTheme = useColorModeValue(true, false);

    // take is loading off if clicked off captcha box
    useEffect(() => {
        if (isLoading) {
            window.addEventListener('click', () => {
                setIsLoading(false);
            });
        }

        return () => {
            window.removeEventListener('click', () => {
                setIsLoading(false);
            });
        }
    }, [isLoading]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        // Execute the reCAPTCHA when the form is submitted
        hcaptchaRef.current.execute();
    };
      
      const onCAPTCHAChange = (token) => {
        // If the reCAPTCHA code is null or undefined indicating that
        // the reCAPTCHA was expired then return early
        if(!token) {
            setIsLoading(false);
            return;
        }

        let data = {
            name,
            email,
            message,
            token
        }

        fetch('/api/contact', {
            method: 'POST',
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            if (res.status === 200) {
                setError(false);
                setName('');
                setEmail('');
                setMessage('');
                setInfo('Message has been successfully sent!');
            } else {
                console.log('Response failed!');
                setError(true);
                setInfo(res.message);
            }
            setIsLoading(false);
        })

        // Reset the CAPTCHA so that it can be executed again if user 
        // submits another email.
        hcaptchaRef.current.reset();
    }

    return (
        <Box className={`section ${styles.padding}`} ml={{ base: 'none', md: '11rem' }} id="contact" maxW={"95%"} maxH="95%">
            <Box className="section-container">
                <Heading
                fontSize={["2.5rem", "3rem", "3.5rem"]}
                lineHeight={["2.5rem", "3rem", "3.5rem"]}
                className="section-header">
                    Contact
                </Heading>
            </Box>

            <motion.div className="contact__container container grid" initial={{ opacity: 0 }} whileInView={{ opacity: 1}} transition={{ duration: 1, ease: 'easeInOut' }} viewport={{ once: true }}>
                <div className="contact__content">
                <Heading as="h3" size="lg" className="contact__title">Talk to Me</Heading>

                    <div className="contact__info">
                        <Box className="contact__card" boxShadow={useColorModeValue("0 2px 16px hsla(219, 48%, 8%, .1)", "")} backgroundColor={useColorModeValue("white", "")}>
                            <Icon as={RiMailSendLine} size={40} className="contact__card-icon" />
                            <h3 className="contact__card-title">Email</h3>
                            <span className="contact__card-data">contact@fireplank.xyz</span>
                            <a href="mailto:contact@fireplank.xyz" target="_blank" rel="noreferrer" className="contact__button">
                                Write me <AiOutlineArrowRight />
                            </a>
                        </Box>

                        <Box className="contact__card" boxShadow={useColorModeValue("0 2px 16px hsla(219, 48%, 8%, .1)", "")} backgroundColor={useColorModeValue("white", "")}>
                            <Icon as={FaDiscord} size={40} className="contact__card-icon"/>
                            <h3 className="contact__card-title">Discord</h3>
                            <span className="contact__card-data">FirePlank#2995</span>
                            <a href="https://discord.com/users/655020762796654592" target="_blank" rel="noreferrer" className="contact__button">
                                Message me <AiOutlineArrowRight />
                            </a>
                        </Box>

                        <Box className="contact__card" boxShadow={useColorModeValue("0 2px 16px hsla(219, 48%, 8%, .1)", "")} backgroundColor={useColorModeValue("white", "")}>
                            <Icon as={FaTwitter} size={40} className="contact__card-icon"/>
                            <h3 className="contact__card-title">Twitter</h3>
                            <span className="contact__card-data">@fireplank</span>
                            <a href="https://twitter.com/fireplank" target="_blank" rel="noreferrer" className="contact__button">
                                Check me out <AiOutlineArrowRight />
                            </a>
                        </Box>
                    </div>
                </div>

                <div className="contact__content">
                    <Heading as="h3" size="lg" className="contact__title">Send me a message</Heading>

                    <form className="contact__form" onSubmit={handleSubmit}>
                        <div className="contact__form-div">
                            <label htmlFor="" className={`${lightTheme ? 'light-mode' : 'contact__form-tag'}`}>Name</label>
                            {/* <Input variant='' placeholder='Outline' /> */}
                            <input type="text" placeholder ="name" className={`${lightTheme ? 'light-mode-input' : 'contact__form-input'}`} required onChange={(e) => setName(e.target.value)} maxLength={50} />
                        </div>

                        <div className="contact__form-div">
                            <label htmlFor="" className={`${lightTheme ? 'light-mode' : 'contact__form-tag'}`}>Email</label>
                            <input type="email" placeholder="email" className={`${lightTheme ? 'light-mode-input' : 'contact__form-input'}`} required onChange={(e) => setEmail(e.target.value)} maxLength={254} />
                        </div>

                        <div className="contact__form-div contact__form-area">
                            <label htmlFor="" className={`${lightTheme ? 'light-mode' : 'contact__form-tag'}`}>Message</label>
                            <textarea name="" id="" cols="30" rows="10" placeholder="message" className={`${lightTheme ? 'light-mode-input' : 'contact__form-input'}`} required onChange={(e) => setMessage(e.target.value)} maxLength={500} />
                        </div>
                        <Box paddingTop="0.5rem">
                            <HCaptcha
                                size="invisible"
                                ref={hcaptchaRef}
                                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
                                onVerify={onCAPTCHAChange}
                            />
                        </Box>
                        <Box display={"flex"} alignItems={"center"}>
                            <Button leftIcon={<AiOutlineMail />} colorScheme='green' variant='solid' isLoading={isLoading} loadingText='Sending' type='submit'>
                                Send Message
                            </Button>
                            <Text ml="1rem" color={error ? 'red' : 'lightgreen'}>{info}</Text>
                        </Box>
                    </form>
                </div>
            </motion.div>
        </Box>
    )
}
export default Contact;