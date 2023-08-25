//import React from 'react'
import styled from "styled-components"
import mountain from '../assets/mountain1.1.jpg'
import { CircularProgress, CircularProgressLabel, Flex, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react";
import { useState } from "react";

const Button = styled.button`
background-color: lightgreen ;
color: black;
font-size: auto;
padding: 10px;
border-radius: 5px;
margin: 10px 0px;
cursor: pointer;
transition:  0.25s;
border-radius: 8px;
border: 2px solid transparent;
border-color: black;
width: 200px
`;

const Img = styled.img`
border-radius: 50%; 
width: 400px;
height: auto;
`

const time = 0

function displayTime() {
    if (time == 0) {
        return ("00:00")
    }
}


const FocusMode = () => {
    const [value, setValue] = useState(0)
    const handleChange = (value: any) => setValue(value)



    var [a, setA] = useState(1)
    var n = 10

    const circle = () => {
        n = a + 5
        setA(n)
        // console.log(n)
    }

    return (
        <div className="mx:auto text-center flex flex-col justify-center bg-green-200 bg-opacity-0 text-white">
            <br />
            <p className="text-xl">focus mode</p>
            <ul>
                <div className="flex justify-center p-20 mx:auto text-center">
                    <ul>
                        <li>
                            insert picture
                            <Img src={mountain} />
                        </li>
                        <br />
                        page doesnt work yet
                        <li>
                            <CircularProgress value={a} color='purple.400' size={'120px'}>
                                <CircularProgressLabel></CircularProgressLabel>
                            </CircularProgress>
                        </li>
                    </ul>

                </div>
                <li>Set time ___</li>
                <li className="bg-white bg-opacity-40 mx-80">
                    <Flex w={'90%'} color={"black"}>
                        <NumberInput maxW='100px' mr='2rem' value={value} onChange={handleChange} max={90}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <Slider
                            flex='1'
                            focusThumbOnChange={false}
                            value={value}
                            onChange={handleChange}
                            max={90}
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb fontSize='sm' boxSize='32px' children={value} />
                        </Slider>
                    </Flex>
                </li>
                <li className="text-xl">{displayTime()}</li>
                <li><Button className="hover:bg-green-200" onClick={() => circle()}>Click to change cirle</Button></li>
            </ul>
        </div>
    )
}

export default FocusMode