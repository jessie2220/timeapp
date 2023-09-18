// //import React from 'react'
// import styled from "styled-components"
// import mountain from '../assets/mountain1.1.jpg'
// import { CircularProgress, CircularProgressLabel, Flex, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react";
// import { useState } from "react";

// const Button = styled.button`
// background-color: lightgreen ;
// color: black;
// font-size: auto;
// padding: 10px;
// border-radius: 5px;
// margin: 10px 0px;
// cursor: pointer;
// transition:  0.25s;
// border-radius: 8px;
// border: 2px solid transparent;
// border-color: black;
// width: 200px
// `;

// const Img = styled.img`
// border-radius: 50%; 
// width: 400px;
// height: auto;
// `


// const FocusMode = () => {

//     const minMinutes = 5
//     const maxMinutes = 90
//     const [value, setValue] = useState(minMinutes)
//     const handleChange = (value: any) => setValue(value)


//     var [a, setA] = useState(1)
//     var n = 10

//     const circle = () => {
//         n = a + 5
//         setA(n)
//         // console.log(n)
//     }

//     return (
//         <div className="mx:auto text-center flex flex-col justify-center bg-green-200 bg-opacity-0 text-white">
//             <br />
//             <p className="text-xl">focus mode</p>
//             <ul>
//                 <div className="flex justify-center p-20 mx:auto text-center">
//                     <ul>
//                         <li>
//                             <Img src={mountain} />
//                         </li>
//                         <br />
//                         page doesnt work yet
//                         <li>
//                             <CircularProgress value={a} color='purple.400' size={'120px'}>
//                                 <CircularProgressLabel></CircularProgressLabel>
//                             </CircularProgress>
//                         </li>
//                     </ul>

//                 </div>
//                 <li>Set time example</li>
//                 <li className="bg-white bg-opacity-40 mx-80">
//                     <Flex w={'90%'} color={"black"}>
//                         <NumberInput maxW='100px' mr='2rem' value={value} onChange={handleChange} max={maxMinutes} min={minMinutes}>
//                             <NumberInputField />
//                             <NumberInputStepper>
//                                 <NumberIncrementStepper />
//                                 <NumberDecrementStepper />
//                             </NumberInputStepper>
//                         </NumberInput>
//                         <Slider
//                             flex='1'
//                             focusThumbOnChange={false}
//                             value={value}
//                             onChange={handleChange}
//                             max={maxMinutes}
//                             min={minMinutes}
//                         >
//                             <SliderTrack>
//                                 <SliderFilledTrack />
//                             </SliderTrack>
//                             <SliderThumb fontSize='sm' boxSize='32px' children={value} />
//                         </Slider>
//                     </Flex>
//                 </li>
//                 <li className="text-xl">{value}</li>
//                 <li><Button className="hover:bg-green-200" onClick={() => circle()}>Click to change circle</Button></li>
//             </ul>
//         </div>
//     )
// }

// export default FocusMode


import { useState, useEffect, useRef, PropsWithChildren } from "react";
import {
  CircularProgress,
  CircularProgressLabel,
  Box,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Container,
  SliderMark,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

const CircleTimer = ({
  timerValue,
  onTimerComplete,
}: PropsWithChildren<{ timerValue: number; onTimerComplete: () => void }>) => {
  const [timeLeft, setTimeLeft] = useState(timerValue);
  const [isRunning, setIsRunning] = useState(false);

  const animationRef = useRef<number | null>(null);

  // Update timeLeft when timerValue prop changes
  useEffect(() => {
    setTimeLeft(timerValue);
  }, [timerValue]);

  useEffect(() => {
    let startTime: number | null = null;

    const updateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const deltaTime = timestamp - startTime;

      if (isRunning && timeLeft > 0) {
        setTimeLeft((prevTime: number) => {
          const updatedTime = prevTime - Math.floor(deltaTime / 1000);
          if (updatedTime <= 0) {
            setIsRunning(false);
            onTimerComplete();
            return 0;
          }
          return updatedTime;
        });
      }

      animationRef.current = requestAnimationFrame(updateProgress);
    };

    if (isRunning) {
      animationRef.current = requestAnimationFrame(updateProgress);
    }

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null; // Set it to null when animation is canceled
      }
    };
  }, [isRunning, timeLeft, onTimerComplete]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(timerValue);
  };

  return (
    <div>
      <Box textAlign="center">
        <CircularProgress
          value={(timerValue - timeLeft) * (100 / timerValue)}
          color="purple.400"
          trackColor= {useColorModeValue('white', 'bgDark.900')}
          size= "400px"
        >
          <CircularProgressLabel>{secondsToMinutes(timeLeft)}</CircularProgressLabel>
        </CircularProgress>
      </Box>
      <Stack justifyContent="center" direction={{base: "column", sm: "row"}} mt={16}>
        <Button onClick={startTimer} disabled={isRunning} colorScheme="blue" w={40}>
          Start
        </Button>
        <Button onClick={resetTimer} disabled={!isRunning} w={40}>
          Reset
        </Button>
      </Stack>
    </div>
  );
};

function secondsToMinutes(seconds:any) {
    seconds = Number(seconds);
    var h = Math.floor(seconds / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? "" : "") : "";
    var mDisplay = m >= 0 && m < 10 && h > 0 ? (h > 0 ? ":" : "") + "0" + (m <= 0 ? "0" : m) : (h > 0 ? ":" : "") + m;
    var sDisplay = s > 0 ? (m > -1 ? ":" : "") + (s < 10 ? "0" + s : s) : "";
    return hDisplay + mDisplay + sDisplay; 
}



const FocusMode = () => {
  const minMinutes = 1;
  const maxMinutes = 90;
  const [value, setValue] = useState(minMinutes);

  const handleChange = (valueAsNumber: number) => {
    setValue(valueAsNumber);
  };

  const handleTimerComplete = () => {

    // Here you can add XP - you can add terribly but quickly by adding a task and make the name just "focus", with the XP.
    let totalXP: any = sessionStorage.getItem("XPAmount")
    let addedXP = value * 0.4
    sessionStorage.setItem("XPAmount", (parseInt(totalXP) + addedXP).toString() )


    alert("Timer completed! You earned " + addedXP + " XP!");
  };

  return (
    <div className="mx-auto text-center flex flex-col justify-center bg-green-200 bg-opacity-0 text-white">
      <br />
      <p className="text-xl text-black">Focus Mode</p>
      <p>Earn Some XP by focusing</p>
      <ul>
        <div className="flex justify-center p-10 mx-auto text-center">
          <ul>
            <li>
              {/* Display the CircleTimer component */}
              <CircleTimer
                timerValue={value * 60}
                onTimerComplete={handleTimerComplete}
              />
            </li>
          </ul>
        </div>
        <li>Set time in minutes</li>
        <Container mt={4}>
          <Flex w="100%" color="white">
            {/* <NumberInput
              maxW="100px"
              mr="2rem"
              value={value}
              onChange={(newValue) => handleChange(parseInt(newValue))}
              max={maxMinutes}
              min={minMinutes}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput> */}
            <Slider
              flex="1"
              focusThumbOnChange={false}
              value={value}
              onChange={handleChange}
              max={maxMinutes}
              min={minMinutes}
            >
                <SliderMark value={5} mt={6} ml={-2.5} fontSize={"sm"}>
                    5
                </SliderMark>
                <SliderMark value={30} mt={6} ml={-2.5} fontSize={"sm"}>
                    30
                </SliderMark>
                <SliderMark value={60} mt={6} ml={-2.5} fontSize={"sm"}>
                    60
                </SliderMark>
                <SliderMark value={90} mt={6} ml={-2.5} fontSize={"sm"}>
                    90
                </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb fontSize="sm" boxSize="32px" children={value} color={useColorModeValue('textLight.100', 'textDark.900')} bg= {useColorModeValue('white', 'bgDark.900')} />
            </Slider>
          </Flex>
          </Container>
      </ul>
      <div className="h-screen"></div>
    </div>
  );
};

export default FocusMode;
