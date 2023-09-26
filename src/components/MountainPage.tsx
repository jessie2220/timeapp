// import React from 'react'
import { Container, Flex, VStack } from "@chakra-ui/react"
import Mountain from "./Mountain"
import XPBar from "./XPBar"

function MountainPage() {
  return (
    <Flex justifyContent={"center"} padding={"30px"} pb={'230px'}>
        <VStack>
            <XPBar />
            <Container>
                <Mountain />
            </Container>
        </VStack>
    </Flex>
  )
}

export default MountainPage