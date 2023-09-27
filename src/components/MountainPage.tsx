// import React from 'react'
import { Container, Flex, VStack } from "@chakra-ui/react"
import Mountain from "./Mountain"
import XPBar from "./XPBar"
import { useEffect, useState } from "react"
import { getXPFromDatabase } from "../config/config"
import { readUID } from "../functions"

function MountainPage() {
  const [XP, setXP] = useState(0)

  useEffect(() => {

    async function getXP() {

      let totalXP: number = await getXPFromDatabase(readUID() as string)
  
      // Set the XP bar state
      setXP(totalXP)
    }

    getXP()
    
  }, [])

  return (
    <Flex justifyContent={"center"} padding={"30px"} pb={'230px'}>
        <VStack>
            <XPBar xp={XP} />
            <Container>
                <Mountain />
            </Container>
        </VStack>
    </Flex>
  )
}

export default MountainPage