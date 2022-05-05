import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import styles from "../../styles/Contact.module.css";
import { useState } from 'react';
import React from "react";
import HCaptcha from '@hcaptcha/react-hcaptcha';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [info, setInfo] = useState('');
    const [token, setToken] = useState('');
    const hcaptchaRef = React.createRef();
    const [error, setError] = useState(false);

    const handleVerificationSuccess = (token, ekey) => {
        setToken(token);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

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
                setInfo('Message failed to send. Please try again later.');
            }
        })
    }
    return (
        <Box className="section" ml={{ base: 'none', md: '11rem' }} id="contact" maxW={"95%"}>
            <Box className="section-container">
                <Heading
                fontSize={["2.5rem", "3rem", "3.5rem"]}
                lineHeight={["2.5rem", "3rem", "3.5rem"]}
                className="section-header">
                    Contact
                </Heading>
                <div className={styles.container}>
                    <form className={styles.main}>
                        <Box className={styles.inputGroup}>
                            <label htmlFor='name'>Name</label>
                            <Input type="text" required value={name} placeholder="name" onChange={(e)=>{setName(e.target.value)}}  size={["sm", "md"]}/> 
                        </Box>
                        <Box className={styles.inputGroup}>
                            <label htmlFor='email'>Email</label>
                            <Input placeholder="email" required type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}  size={["sm", "md"]}/> 
                        </Box>
                        <Box className={styles.inputGroup}>
                            <label htmlFor='message'>Message</label>
                            <Input type="text" required placeholder="message" value={message} onChange={(e)=>{setMessage(e.target.value)}}  size={["sm", "md"]}/> 
                        </Box>
                        <HCaptcha
                            ref={hcaptchaRef}
                            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
                            onVerify={(token,ekey) => handleVerificationSuccess(token, ekey)}
                        />
                        <Button type="submit" onClick={(e)=>{handleSubmit(e)}}>Submit</Button>
                        <Text color={error ? 'lightred' : 'lightgreen'}>{info}</Text>
                    </form>
                </div>
            </Box>
        </Box>
    )
}
export default Contact