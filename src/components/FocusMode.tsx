import { useState, useEffect, useRef, PropsWithChildren } from "react"
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
  AlertDialog,
  useDisclosure,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Text,
} from "@chakra-ui/react"
import { getXPFromDatabase, updateXPAmount } from "../config/config"
import { readDisplayName, readEmail, readImageURL, readUID } from "../functions"

const CircleTimer = ({
  timerValue,
  onTimerComplete,
}: PropsWithChildren<{ timerValue: number; onTimerComplete: () => void }>) => {
  const [timeLeft, setTimeLeft] = useState(timerValue)
  const [isRunning, setIsRunning] = useState(false)

  const animationRef = useRef<number | null>(null)

  // Update timeLeft when timerValue prop changes
  useEffect(() => {
    setTimeLeft(timerValue)
  }, [timerValue])

  useEffect(() => {
    let startTime: number | null = null;

    const updateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const deltaTime = timestamp - startTime

      if (isRunning && timeLeft > 0) {
        setTimeLeft((prevTime: number) => {
          const updatedTime = prevTime - Math.floor(deltaTime / 1000)
          if (updatedTime <= 0) {
            setIsRunning(false)
            setTimeout(() => onTimerComplete(), 700)
            
            return 0
          }
          return updatedTime
        })
      }

      animationRef.current = requestAnimationFrame(updateProgress)
    }

    if (isRunning) {
      animationRef.current = requestAnimationFrame(updateProgress)
    }

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null; // Set it to null when animation is canceled
      }
    }
  }, [isRunning, timeLeft, onTimerComplete])

  const startTimer = () => {
    setIsRunning(true)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(timerValue)
  }

  return (
    <div>
      <Box textAlign="center" mt={4}>
        <CircularProgress
          value={(timerValue - timeLeft) * (100 / timerValue)}
          color="purple.400"
          trackColor= {useColorModeValue('bgDark.900', 'white')}
          size= "400px"
          thickness="4px"
        >
          <CircularProgressLabel color={useColorModeValue('bgDark.900', 'white')}>{secondsToMinutes(timeLeft)}</CircularProgressLabel>
        </CircularProgress>
      </Box>
      <Stack justifyContent="center" direction={{base: "column", sm: "row"}} my={8}>
        {!isRunning ?

          timeLeft ?
            <Button onClick={startTimer} disabled={isRunning} colorScheme="blue" w={40}>
              Start
            </Button>
            :
            <Button onClick={resetTimer} disabled={isRunning} colorScheme="green" w={40}>
              Reset
            </Button>

          :
          <Button onClick={resetTimer} disabled={!isRunning} colorScheme="red" w={40}>
            Cancel
          </Button>}
      </Stack>
    </div>
  )
}

function secondsToMinutes(seconds:any) {
    seconds = Number(seconds)
    var h = Math.floor(seconds / 3600)
    var m = Math.floor(seconds % 3600 / 60)
    var s = Math.floor(seconds % 3600 % 60)

    var hDisplay = h > 0 ? h + (h == 1 ? "" : "") : ""
    var mDisplay = m >= 0 && m < 10 && h > 0 ? (h > 0 ? ":" : "") + "0" + (m <= 0 ? "0" : m) : (h > 0 ? ":" : "") + m
    var sDisplay = s > 0 ? (m > -1 ? ":" : "") + (s < 10 ? "0" + s : s) : ""
    return hDisplay + mDisplay + sDisplay
}

const FocusMode = () => {
  const minMinutes = 1
  const maxMinutes = 90
  const [value, setValue] = useState(minMinutes)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [addedXP, setAddedXP] = useState(0)

  const handleChange = (valueAsNumber: number) => {
    setValue(valueAsNumber)
  }

  const AlertBox = () => {
    const ref = useRef(null)
    return (
      <>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={ref}
          onClose={onClose}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent bg={useColorModeValue('bgLight.100', 'bgDark.900')}>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Focus Successful
              </AlertDialogHeader>
  
              <AlertDialogBody>
              You earned {addedXP} XP!
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={ref} opacity={0} cursor={'auto'}>
                  
                </Button>
                <Button colorScheme='blue' onClick={onClose} ml={3}>
                  Exit
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }

  async function handleTimerComplete() {

    let totalXP: any = await getXPFromDatabase(readUID() as string)
    let localAddedXP = value
    setAddedXP(value)
    sessionStorage.setItem("XPAmount", (parseInt(totalXP) + localAddedXP).toString())
    updateXPAmount(readUID() as string, readDisplayName() as string, readEmail() as string, readImageURL() as string)


    onOpen()

    // alert("Timer completed! You earned " + addedXP + " XP!")
  }

  return (
    <Box
      bg={{ base: useColorModeValue("rgba(255,255,255,0.3)", "rgba(0,0,0,0.6)"), lg: useColorModeValue("rgba(0,0,0,0)", "rgba(0,0,0,0)") }}
    >
      <Flex
        w="100%"
        h="100vh"
        flexDir="column"
        mt={{ base: "", lg: "5%" }}
        color={useColorModeValue("bgDark.900", "white")}
      >
        <Container
          w="100%"
          bg={{ base: '', lg: useColorModeValue("rgba(255,255,255,0.3)", "rgba(0,0,0,0.6)") }}
          rounded={{ base: "", lg: "3xl" }}
          pb={16}
          maxW={{ base: "100%", lg: "50%" }}
        >
          <div className="mx-auto text-center flex flex-col justify-center text-white">

            <Text fontWeight="700" fontSize="30" textAlign="center" color={useColorModeValue("bgDark.900", "bgLight.100")} my={4}>
              Focus Mode
            </Text>

            <p>Info icon</p>

            <CircleTimer
              timerValue={value * 60}
              onTimerComplete={handleTimerComplete}
            />


            <Text fontWeight="400" fontSize="20" textAlign="center" color={useColorModeValue("bgDark.900", "bgLight.100")} mt={6}>
              Set time in minutes
            </Text>

            <Container>
              <Flex w="100%" color="white">
                <Slider
                  flex="1"
                  focusThumbOnChange={false}
                  value={value}
                  onChange={handleChange}
                  max={maxMinutes}
                  min={minMinutes}
                  colorScheme="green"
                  color={useColorModeValue("bgDark.900", "bgLight.100")}
                >
                  <SliderMark value={5} mt={6} ml={-2.4} fontSize={"sm"}>
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
                  <SliderTrack bgColor={useColorModeValue("bgDark.900", "")}>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb fontSize="sm" boxSize="32px" children={value} color={useColorModeValue('textDark.900', 'bgDark.900')} bg={useColorModeValue('bgDark.900', 'white')} />
                </Slider>
              </Flex>
            </Container>
            <AlertBox />
            {/* <div className="h-screen"></div> */}
          </div>
        </Container>
      </Flex>
    </Box>
  )
}

export default FocusMode