import React, { useState, useEffect, useCallback } from "react";
import { PrevButton, NextButton } from "./CarouselButtons";
import useEmblaCarousel from "embla-carousel-react";
import "../styles/Carousel.module.css";
import { Box, Text, useColorMode } from "@chakra-ui/react";

const EmblaCarousel = ({ slides }) => {
    const { colorMode } = useColorMode();

    const [viewportRef, embla] = useEmblaCarousel({
        dragFree: true,
        containScroll: "trimSnaps"
    });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
    const onSelect = useCallback(() => {
        if (!embla) return;
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
    }, [embla]);

    useEffect(() => {
        if (!embla) return;
        embla.on("select", onSelect);
        onSelect();
    }, [embla, onSelect]);
    return (
        <Box className="embla" width={'90%'}>
        <div className="embla__viewport" ref={viewportRef}>
            <div className="embla__container">
            {slides.map((element, index) => (
                <Box className="embla__slide" key={index} minW={["20%", "25%"]}>
                <div className="embla__slide__inner">
                <Text
                    paddingLeft={index == 0 ? "2rem" : ""}
                    as="h4"
                    fontWeight={"bold"}
                    fontSize={{ base: '1.2rem', lg: '1.5rem' }}
                    letterSpacing={"0.02em"}
                    display={"flex"}
                    background={colorMode === "light" ? "linear-gradient(121.57deg, #4a4a4a 10%, rgba(0, 0, 0, 0.66) 30.15%);" : "linear-gradient(121.57deg, #FFFFFF 10%, rgba(255, 255, 255, 0.66) 30.15%);"}
                    backgroundClip={"text"}
                    fill="transparent"
                    marginBottom={"8px"}
                    >
                        {element.year}
                    </Text>
                    <Text
                    paddingLeft={index == 0 ? "2rem" : ""}
                    fontSize={{ base: '0.85rem', lg: '1rem' }}
                    letterSpacing={"0.02em"}
                    color={colorMode === "light" ? "gray.600" : "whiteAlpha.800"}
                    >
                        {element.text}
                    </Text>
                </div>
                </Box>
            ))}
            </div>
        </div>
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </Box>
    );
};

export default EmblaCarousel;
