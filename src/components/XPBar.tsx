// import React from 'react'

import { Box, Flex, Progress, useColorModeValue } from "@chakra-ui/react"

const calculateColor = (xp: number) => {
    // Calculate color based on XP value
    const colors = [
        // useColorModeValue("red", "purple"),
        // "rgba(0,0,0,1)",
        "gray",
        "beige",
        "azure",
        "lightgreen",
        "ForestGreen",
        "darkturquoise",
        "dodgerblue",
        "darkviolet",
        "fuchsia",
        "crimson",
    ]

    if (xp >= 1000) return "gold";

    const index = Math.floor(xp / 100)

    return colors[index]
}

const calculateLevel = ( xp: number) => {

    if (xp >= 1000) return "Max Level";

    return ('Level ' + Math.floor(xp / 100))
}

const calculateMaxLevelBorder = ( xp: number) => {

    if (xp >= 1000) return "4px";

    return '0px'
}

const calculateMaxLevel = ( xp: number) => {

    if (xp >= 1000) return 100;

    return xp % 100
}

const XPBar = (XP: any) => {

    return (
        <Box bg={useColorModeValue('rgba(37,38,38,1)', '')} p={4} rounded={'2xl'}>
            <div className="text-white flex justify-center text-center">
                <Box
                    fontSize="4xl"
                    color={calculateColor(XP.xp)}
                    transition="color 0.2s"
                    border={calculateMaxLevelBorder(XP.xp)}
                    borderColor={calculateColor(XP.xp)}
                    p={2}
                    mb={6}
                    rounded={'3xl'}

                    // sx={{
                    //     "@keyframes pulsateOpacity": {
                    //         "0%": {
                    //             opacity: 0.7,
                    //         },
                    //         "50%": {
                    //             opacity: 1,
                    //         },
                    //         "100%": {
                    //             opacity: 0.7,
                    //         },
                    //     },
                    //     animation: "pulsateOpacity 2s infinite",
                    // }}
                >
                    {calculateLevel(XP.xp)}
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
                    value={calculateMaxLevel(XP.xp)}
                    w={700}
                    hasStripe
                    isAnimated
                    max={100}
                />
            </Flex>
        </Box>
    )
}

export default XPBar