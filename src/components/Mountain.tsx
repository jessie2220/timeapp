import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { styled } from "styled-components";
import mountain from "../assets/mountain1.1.jpg";

// Eventually you can get a selection screen in the profile 
// for the user to select their character... Add some in assets
import character from "../assets/game1.png";
import { readXPAmount } from "../functions";

const Img = styled.img`
  border-radius: 10%;
  transition: transform 0.5s ease;
`;

// interface MountainProps {
//   xp: number
// }


// function Mountain({ xp }: MountainProps) {

function Mountain() {
  const mountainHeight = 1000
  const [personVerticalPosition, setPersonVerticalPosition] = useState(0)
  const [personHorizontalPosition, setPersonHorizontalPosition] = useState(0)
  const xp = readXPAmount()

  useEffect(() => {
    // Calculate the vertical position to move the person up
    const verticalPosition = (xp / 10000) * mountainHeight
    setPersonVerticalPosition(verticalPosition)

    // Calculate the horizontal position using a sinusoidal movement
    const horizontalPosition = Math.sin((xp / 320) * Math.PI * 2) * -100;
    setPersonHorizontalPosition(horizontalPosition);
  }, [xp])

  const personStyle: React.CSSProperties = {
    position: "absolute",
    transition: "left 0.5s ease", // Add transition for smooth movement
    left: `calc(50% + ${personHorizontalPosition}px)`,
    bottom: `${personVerticalPosition}px`,
    width: "50px",
    animation: "moveUp 4s linear infinite",
  }

  const mountainStyle: React.CSSProperties = {
    width: "500px",
  }

  return (
    <Flex justifyContent={"center"} padding={"30px"}>
      <div style={{ position: "relative" }}>
        <Img src={mountain} alt="Mountain" style={mountainStyle} />
        <Img src={character} alt="Person" style={personStyle} /> 
      </div>
    </Flex>
  )
}

export default Mountain
