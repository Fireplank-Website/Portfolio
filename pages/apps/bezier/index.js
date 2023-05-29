import { Box,
  Button,
  HStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import Modal from "../../../components/Modal";
import { BsChevronDown, BsQuestionCircle } from "react-icons/bs";
import Head from "next/head";

export default function BezierCurve() {
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  const [screenWidth, setWidth] = useState(400);
  const [screenHeight, setHeight] = useState(300);
  const handleResize = () => {
    setWidth(Math.min(Math.round(window.innerWidth * 0.9), 900));
    setHeight(Math.round(window.innerHeight * 0.4));
    setPoints(calculatePoints(Math.min(Math.round(window.innerWidth * 0.9), 900), Math.round(window.innerHeight * 0.4)));
  };
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const [playSpeed, setPlaySpeed] = useState(1);
  const [animationPlaying, setAnimationPlaying] = useState(false);

  const calculatePoints = (width, height) => {
    const x1 = width * 0.05;
    const y1 = height * 0.95;
    const x2 = width * 0.25;
    const y2 = height * 0.05;
    const x3 = width * 0.75;
    const y3 = height * 0.05;
    const x4 = width * 0.95;
    const y4 = height * 0.95;
    return [[x1, y1], [x2, y2], [x3, y3], [x4, y4]];
  };

  const [points, setPoints] = useState(calculatePoints(screenWidth, screenHeight));

  const [selectedPoint, setSelectedPoint] = useState(null);
  const [t, setT] = useState(0.5);
  const [draggedPointIndex, setDraggedPointIndex] = useState(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
  
    // Draw grid
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    context.lineWidth = 1;
    context.strokeStyle = "gray";
  
    // Draw vertical lines
    for (let x = 0; x <= width; x += 30) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
    }
  
    // Draw horizontal lines
    for (let y = 0; y <= height; y += 30) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }
  
    // Draw points
    points.forEach(([x, y], index) => {
      // Draw point
      context.fillStyle = "orange";
      context.beginPath();
      context.arc(x, y, 6, 0, 2 * Math.PI);
      context.fill();
  
      // Draw connecting lines
      context.strokeStyle = "orange";
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(points[0][0], points[0][1]);
      points.forEach(([px, py]) => {
        context.lineTo(px, py);
      });
      context.stroke();
  
      // Draw point index
      context.fillStyle = "black";
      context.font = "12px sans-serif";
      context.fillText(index+1, x + 8, y - 8);
    });

    // draw the bezier curve mathematically
    context.strokeStyle = "green";
    context.lineWidth = 3;
    context.beginPath();
    const [p0, p1, p2, p3] = points;
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const x =
        Math.pow(1 - t, 3) * p0[0] +
        3 * Math.pow(1 - t, 2) * t * p1[0] +
        3 * (1 - t) * Math.pow(t, 2) * p2[0] +
        Math.pow(t, 3) * p3[0];
      const y =
        Math.pow(1 - t, 3) * p0[1] +
        3 * Math.pow(1 - t, 2) * t * p1[1] +
        3 * (1 - t) * Math.pow(t, 2) * p2[1] +
        Math.pow(t, 3) * p3[1];
      context.lineTo(x, y);
    }
    context.stroke();

    // add dot for each line segment at t
    context.fillStyle = "blue";
    context.strokeStyle = "blue";
    context.lineWidth = 2;
    context.beginPath();
    
    for (let i = 0; i < points.length - 1; i++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[i + 1];
      const dx = x2 - x1;
      const dy = y2 - y1;
      context.lineTo(x1 + dx * t, y1 + dy * t);
    }
    context.stroke();
    // add dots
    context.beginPath();
    context.arc(
      points[0][0] + (points[1][0] - points[0][0]) * t,
      points[0][1] + (points[1][1] - points[0][1]) * t,
      5, 0, 2 * Math.PI
    );
    context.fill();
    context.beginPath();
    context.arc(
      points[1][0] + (points[2][0] - points[1][0]) * t,
      points[1][1] + (points[2][1] - points[1][1]) * t,
      5, 0, 2 * Math.PI
    );
    context.fill();
    context.beginPath();
    context.arc(
      points[2][0] + (points[3][0] - points[2][0]) * t,
      points[2][1] + (points[3][1] - points[2][1]) * t,
      5, 0, 2 * Math.PI
    );
    context.fill();

    // add new dots for the newly made lines
    context.fillStyle = "red";
    context.strokeStyle = "red";
    context.lineWidth = 2;
    context.beginPath();
    context.arc(
      points[0][0] + (points[1][0] - points[0][0]) * t + (points[1][0] + (points[2][0] - points[1][0]) * t - (points[0][0] + (points[1][0] - points[0][0]) * t)) * t,
      points[0][1] + (points[1][1] - points[0][1]) * t + (points[1][1] + (points[2][1] - points[1][1]) * t - (points[0][1] + (points[1][1] - points[0][1]) * t)) * t,
      5, 0, 2 * Math.PI
    );
    context.fill();
    context.beginPath();
    context.arc(
      points[1][0] + (points[2][0] - points[1][0]) * t + (points[2][0] + (points[3][0] - points[2][0]) * t - (points[1][0] + (points[2][0] - points[1][0]) * t)) * t,
      points[1][1] + (points[2][1] - points[1][1]) * t + (points[2][1] + (points[3][1] - points[2][1]) * t - (points[1][1] + (points[2][1] - points[1][1]) * t)) * t,
      5, 0, 2 * Math.PI
    );
    context.fill();
    // connect the two dots
    context.beginPath();
    context.moveTo(
      points[0][0] + (points[1][0] - points[0][0]) * t + (points[1][0] + (points[2][0] - points[1][0]) * t - (points[0][0] + (points[1][0] - points[0][0]) * t)) * t,
      points[0][1] + (points[1][1] - points[0][1]) * t + (points[1][1] + (points[2][1] - points[1][1]) * t - (points[0][1] + (points[1][1] - points[0][1]) * t)) * t
    );
    context.lineTo(
      points[1][0] + (points[2][0] - points[1][0]) * t + (points[2][0] + (points[3][0] - points[2][0]) * t - (points[1][0] + (points[2][0] - points[1][0]) * t)) * t,
      points[1][1] + (points[2][1] - points[1][1]) * t + (points[2][1] + (points[3][1] - points[2][1]) * t - (points[1][1] + (points[2][1] - points[1][1]) * t)) * t
    );
    context.stroke();
    // add dot that follows t between the now created line between the two dots
    context.fillStyle = "green";
    context.strokeStyle = "green";
    context.lineWidth = 2;
    context.beginPath();
    context.arc(
      points[0][0] + (points[1][0] - points[0][0]) * t + (points[1][0] + (points[2][0] - points[1][0]) * t - (points[0][0] + (points[1][0] - points[0][0]) * t)) * t
      + (points[1][0] + (points[2][0] - points[1][0]) * t + (points[2][0] + (points[3][0] - points[2][0]) * t - (points[1][0] + (points[2][0] - points[1][0]) * t)) * t
      - (points[0][0] + (points[1][0] - points[0][0]) * t + (points[1][0] + (points[2][0] - points[1][0]) * t - (points[0][0] + (points[1][0] - points[0][0]) * t)) * t)) * t,
      points[0][1] + (points[1][1] - points[0][1]) * t + (points[1][1] + (points[2][1] - points[1][1]) * t - (points[0][1] + (points[1][1] - points[0][1]) * t)) * t
      + (points[1][1] + (points[2][1] - points[1][1]) * t + (points[2][1] + (points[3][1] - points[2][1]) * t - (points[1][1] + (points[2][1] - points[1][1]) * t)) * t
      - (points[0][1] + (points[1][1] - points[0][1]) * t + (points[1][1] + (points[2][1] - points[1][1]) * t - (points[0][1] + (points[1][1] - points[0][1]) * t)) * t)) * t,
      7, 0, 2 * Math.PI
    );
    context.fill();
  }, [points, t]);

  const handleMouseDown = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const index = points.findIndex(([px, py]) => {
      const dx = px - x;
      const dy = py - y;
      return dx * dx + dy * dy <= 250; // increase the radius to 25 pixels
    });
    if (index !== -1) {
      setSelectedPoint(index);
    }
  };
  
  const handleMouseMove = (event) => {
    if (selectedPoint !== null) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setPoints((prevPoints) =>
        prevPoints.map((point, index) =>
          index === selectedPoint ? [x, y] : point
        )
      );
    }
  };
  
  const handleMouseUp = () => {
    setSelectedPoint(null);
  };

  const getPointIndex = (x, y) => {
    const index = points.findIndex(([px, py]) => {
      const dx = px - x;
      const dy = py - y;
      return dx * dx + dy * dy <= 250; // increase the radius to 25 pixels
    });
    return index;
  };

  const handleTouchStart = (event) => {
    const { clientX, clientY } = event.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const pointIndex = getPointIndex(x, y);
    if (pointIndex !== -1) {
      setDragging(true);
      setDraggedPointIndex(pointIndex);
      window.addEventListener('touchmove', handleTouchMovePreventDefault, { passive: false });
    }
  };

  const handleTouchMovePreventDefault = (event) => {
    event.preventDefault();
  };

  const handleTouchMove = (event) => {
    if (dragging) {
      const { clientX, clientY } = event.touches[0];
      const rect = canvasRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const newPoints = [...points];
      newPoints[draggedPointIndex] = [x, y];
      setPoints(newPoints);
    }
  };
  
  const handleTouchEnd = () => {
    setDragging(false);
    setDraggedPointIndex(-1);
    window.removeEventListener('touchmove', handleTouchMovePreventDefault);
  };

  const playAnimation = () => {
    setAnimationPlaying(true);
    // increment t until animation is paused
    const interval = setInterval(() => {
      setT((prevT) => {
        if (prevT >= 1) {
          return 0;
        }
        return prevT + 0.008 * playSpeed;
      });
    }, 30);
    intervalRef.current = interval;
  };

  const handleReset = () => {
    setPoints(calculatePoints(screenWidth, screenHeight));
    setT(0.5);
    intervalRef.current && clearInterval(intervalRef.current);
    setAnimationPlaying(false);
  };

  const getSpeed = () => {
    switch (playSpeed) {
      case 0.5:
        return "Slow";
      case 1:
        return "Normal";
      case 2:
        return "Fast";
      default:
        return "Normal";
    }
  }

  return (
    <Box justifyContent={"center"} alignItems={"center"} display={"flex"} flexDirection={"column"} marginTop={5}>
      <Head>
        <title>Bézier Playground - FirePlank</title>
        <meta property="og:url" content="https://fireplank.xyz/apps/bezier" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Bézier Curve Playground" />
        <meta name="description" content="a bezier playground that allows you to create and visualize bezier curves using de casteljau's algorithm." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="portfolio, fireplank, tech, technology" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HStack spacing={[3,5]} marginBottom={3}>
        <Box>
          <Button onClick={() => { 
            if (animationPlaying) {
              clearInterval(intervalRef.current);
              setAnimationPlaying(false);
            } else playAnimation();
          }} marginRight={[1,2]}>{animationPlaying ? "Pause" : "Play"}</Button>
          <Menu>
            <MenuButton as={Button} marginRight={[1,2]} rightIcon={<BsChevronDown />}>
                Speed: {getSpeed()}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setPlaySpeed(2)}>Fast</MenuItem>
              <MenuItem onClick={() => setPlaySpeed(1)}>Normal</MenuItem>
              <MenuItem onClick={() => setPlaySpeed(0.5)}>Slow</MenuItem>
            </MenuList>
          </Menu>
          <Button onClick={handleReset} bgColor="red.400" _hover={{ bg: "red.500" }}>Reset</Button>
        </Box>
        <Slider aria-label='slider-ex-1' value={t * 100} width={150} onChange={(value) => setT(Math.round(value) / 100)}>
          <SliderMark value={50}>
            t: {Math.round(t * 100) / 100}
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Modal
          title="How to use" 
          icon={<BsQuestionCircle/>} 
          body={`This app demonstrates and visualizes the bezier curve using the De Casteljau's algorithm. You can drag the points to change the shape of the bezier curve.
  
          The slider is used to change the value of t. It's used to calculate the position of the point on the curve. The value can be between 0 and 1.
  
          Press the play button to see how the curve is constructed using the De Casteljau's algorithm.`}
        />
      </HStack>
      <canvas
        ref={canvasRef}
        width={screenWidth}
        height={screenHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </Box>
  );
}