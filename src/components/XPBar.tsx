// import React from 'react'

import { Box, Flex, Progress } from "@chakra-ui/react"
import { readUID, readXPAmount } from "../functions"
import { useEffect, useState } from "react"
import { getXPFromDatabase } from "../config/config"

const calculateColor = (xp: number) => {
    // Calculate color based on XP value
    const colors = [
        "lightblue",
        "darkblue",
        "lightgreen",
        "darkgreen",
        "red",
        "orange",
    ]

    if (xp > 600) return "gold";

    const index = Math.floor((xp / 1000) * (colors.length - 1))

    return colors[index]
}

const XPBar = () => {
    const [XP, setXP] = useState(0)


    useEffect(() => {
        const fetchXP = async () => {

            let totalXP: number = await getXPFromDatabase(readUID() as string)

            // Set the XP bar state
            setXP(totalXP)
        }

        fetchXP()

    }, [])

    return (
        <>
            <div className="text-white flex justify-center text-center">
                <Box
                    fontSize="2xl"
                    color={calculateColor(XP)}
                    transition="color 0.2s"
                    sx={{
                        "@keyframes pulsateOpacity": {
                            "0%": {
                                opacity: 0.7,
                            },
                            "50%": {
                                opacity: 1,
                            },
                            "100%": {
                                opacity: 0.7,
                            },
                        },
                        animation: "pulsateOpacity 2s infinite",
                    }}
                >
                    Level {Math.floor(XP / 100)}
                </Box>
            </div>
            <Flex w={"100%"} justifyContent={"center"} mt={2}>
                <Progress
                    sx={{
                        // "& > div:first-child": {
                        "& > div:first-of-type": {
                            transitionProperty: "width",
                        },
                    }}
                    colorScheme="pink"
                    value={XP % 100}
                    w={700}
                    hasStripe
                    isAnimated
                    max={100}
                />
            </Flex>
        </>
    )
}

export default XPBar