import { Box, Button, Heading, Input, Text, Textarea } from "@chakra-ui/react";
import styles from "../../styles/Contact.module.css";
import { useState } from 'react';
import React, { useEffect } from "react";
import HCaptcha from '@hcaptcha/react-hcaptcha';

const Card = ({ card }) => {
    return (
        <Box 
            borderRadius={"10px"}
            boxShadow="3px 3px 20px rgba(80, 78, 78, 0.5)"
            textAlign={"center"}
            width="100%"
        >
            {card}
        </Box>
    )
}

function remrange(start, end) {
    return new Array(end - start).fill().map((d, i) => `${i + start}rem`);
}

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [info, setInfo] = useState('');
    const [error, setError] = useState(false);
    const hcaptchaRef = React.createRef();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        // Execute the reCAPTCHA when the form is submitted
        hcaptchaRef.current.execute();
      };
      
      const onCAPTCHAChange = (token) => {
        // If the reCAPTCHA code is null or undefined indicating that
        // the reCAPTCHA was expired then return early
        if(!token) {
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
        })

        // Reset the CAPTCHA so that it can be executed again if user 
        // submits another email.
        hcaptchaRef.current.reset();
      }

    return (
        <Box className="section" ml={{ base: 'none', md: '11rem' }} id="contact" maxW={"95%"} maxH="95%">
            <Box className="section-container">
                <Heading
                fontSize={["2.5rem", "3rem", "3.5rem"]}
                lineHeight={["2.5rem", "3rem", "3.5rem"]}
                paddingBottom="1rem"
                className="section-header">
                    Contact
                </Heading>
                <Box 
                borderRadius={"10px"}
                boxShadow="3px 3px 20px rgba(80, 78, 78, 0.5)"
                textAlign={"center"}
                width="24.5rem"
                >
                    <div className={styles.container}>
                        <form className={styles.main} onSubmit={handleSubmit}>
                            <Box className={styles.inputGroup}>
                                <Text fontWeight={600} fontSize={["ml", "xl"]} htmlFor='name'>Name</Text>
                                <Input height="1.75rem" paddingInlineStart={"0.3rem"} borderRadius={"5px"} type="text" required value={name} placeholder="name" onChange={(e)=>{setName(e.target.value)}}  size={["sm", "md"]}/> 
                            </Box>
                            <Box className={styles.inputGroup}>
                                <Text fontWeight={600} fontSize={["ml", "xl"]} htmlFor='email'>Email</Text>
                                <Input  height="1.75rem" paddingInlineStart={"0.3rem"} borderRadius={"5px"} placeholder="email" required type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}  size={["sm", "md"]}/> 
                            </Box>
                            <Box className={styles.inputGroup}>
                                <Text fontWeight={600} fontSize={["ml", "xl"]} htmlFor='message' paddingBottom={"0.2rem"}>Message</Text>
                                <Textarea paddingInlineStart={"0.3rem"} borderRadius={"5px"} type="text" required placeholder="message" value={message} onChange={(e)=>{setMessage(e.target.value)}}  size={["sm", "md"]}/> 
                            </Box>
                            <Box paddingTop="0.5rem">
                                <HCaptcha
                                    size="invisible"
                                    ref={hcaptchaRef}
                                    sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
                                    onVerify={onCAPTCHAChange}
                                />
                            </Box>
                            <Button className="h-captcha" marginTop={"0.5rem"} type="submit">Submit</Button>
                            <Text marginBottom={"1rem"} color={error ? 'red' : 'lightgreen'}>{info}</Text>
                        </form>
                    </div>
                </Box>
            </Box>
        </Box>
    )
}
export default Contact