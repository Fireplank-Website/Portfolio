import { NavWithSidebar, Nav } from './Nav'
import { useRouter } from 'next/router';
import styles from '../styles/Layout.module.css'
import Footer from './Footer'
import ScrollToTop from './Home/ScrollToTop';
import Hero from './Home/Hero';
import { Box } from '@chakra-ui/react';
import SectionDivider from './Home/SectionDivider';
import Projects from './Home/Projects';
import Technologies from './Home/Technologies';
import TimeLine from './Home/TimeLine';
import Contact from './Home/Contact';

const Layout = ({children}) => {
    const router = useRouter();
    const usedNav = router.pathname == "/" ? <NavWithSidebar/> : <Nav/>;
    const homeBody = router.pathname == "/" ? [
        <Hero key="hero"/>,
        <SectionDivider key="divider1"/>,
        <Projects key="projects"/>,
        <SectionDivider key="divider2"/>,
        <Technologies key="tech"/>,
        <SectionDivider key="divider3"/>,
        <TimeLine key="timeline" />,
        <SectionDivider key="divider4"/>,
        <Contact key="contact"/>
    ] : <></>;

    return (
        <Box>
            {usedNav}
            <div className={styles.container}>
                <main className={styles.main}>
                    {children}
                </main>
            </div>
            {homeBody}
            <ScrollToTop/>
            <Box mb="400px"/>
            <Footer/>
        </Box>
    )
}

export default Layout