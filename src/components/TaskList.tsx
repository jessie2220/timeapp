import { DeleteIcon, EditIcon, StarIcon } from '@chakra-ui/icons'
import {
  Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, CloseButton, Container, Divider, Flex, FormControl, FormLabel, HStack, Icon, IconButton, Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Progress,
  Radio,
  RadioGroup,
  Stack, Tab, TabList,
  TabPanel, TabPanels, Tabs, Text, Textarea, VStack, useColorModeValue, useDisclosure,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'

const TaskList = () => {

  // ~~~~~~~~~~~~~~~~~~~ hooks ~~~~~~~~~~~~~~~~~~~~~
  const [incompleteTaskList, setIncompleteTaskList] = useState<any>([])
  const [completeTaskList, setCompleteTaskList] = useState<any>([])
  const [input, setInput] = useState('')
  const [description, setDescription] = useState('')
  const [editInput, setEditInput] = useState('')
  const [editID, setEditID] = useState('')
  const [radioDifficulty, setRadioDifficulty] = useState('')
  const [displayAlert, setDisplayAlert] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [XP, setXP] = useState(0)
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  // ~~~~~~~~~~~~~~~~ modal hook ~~~~~~~~~~~~~~~~~~~
  const { isOpen, onOpen, onClose } = useDisclosure()


  // ~~~~~~~~~~~~~~~ input consts ~~~~~~~~~~~~~~~~~~
  const inputLengthMax = 70
  const descriptionLengthMax = 250
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



  const addTask = (event: any) => {
    event.preventDefault()

    if (radioDifficulty === '') {
      setAlertText('You must choose a difficulty.')
      setDisplayAlert(true)
      return
    } else {
      setDisplayAlert(false)
    }

    const setID = Math.floor(Math.random() * (1000000 - 10) ) + 10
    console.log('id:   ' + setID)

    if (input.length > 0 && input.length < inputLengthMax && description.length < descriptionLengthMax) {
      setIncompleteTaskList((prevState: any) => [...prevState, { input, difficulty: radioDifficulty, id: setID, description }])
      setDisplayAlert(false)
    }

    if (input.length > inputLengthMax) {
      setAlertText('Too many title characters! Please input fewer characters.')
      setDisplayAlert(true)
    }

    if (input.length === 0) {
      setAlertText('Not enough title characters! Please input at least one character.')
      setDisplayAlert(true)
    }

    if (description.length > descriptionLengthMax) {
      setAlertText('Too many description characters! Please input fewer characters.')
      setDisplayAlert(true)
    }


    console.log("task list :  " +  JSON.stringify(incompleteTaskList))

    setInput('')
    setDescription('')
    setRadioDifficulty('')
  }

  
  const completeTask = (input: any, index: any, difficulty:any, id:any, description: any) => {

    setCompleteTaskList((prevState: any) => [...prevState, { input, difficulty: difficulty, id: id, description }])
    // setCompleteTaskList((prevState: any) => [...prevState, { task, difficulty: difficulty}])

    deleteTask(index)

    // incompleteTaskList[index] = { isChecked: false }

    if (difficulty === 'red.500') {
      setXP(XP + 30)
    } else if (difficulty === 'orange.500') {
      setXP(XP + 10)
    } else  {
      setXP(XP + 5)
    }
  }


  const editTask = (id: any, event:any) => {
    event.preventDefault();


    console.log("editing  :  " + id + "  :  " + editInput)

    if (editInput.length > 0 && editInput.length < 50) {
      const arrCopy = [...incompleteTaskList]
      
      let index = arrCopy.findIndex(function(task) {
        if (id === task.id) return true
      })

      console.log(`index :  ${index}`)
      
      arrCopy[index].input = editInput
      setIncompleteTaskList(arrCopy)
      setDisplayAlert(false)
    }

    if (editInput.length > 50) {
      setDisplayAlert(true)
    }

    setEditInput('')
    setEditID('')
    onClose()
  }


  const cancelEdit = () => {
    setEditInput('')
    onClose()
  }


  const deleteTask = (index: any) => {
    const arrCopy = [...incompleteTaskList]
    arrCopy.splice(index, 1)
    setIncompleteTaskList(arrCopy)
  }


  function triggerDisplayAlert(text: string) {

    return displayAlert ? (
      <Alert status='error' mt={4} color={useColorModeValue('red', 'red.200')}>
        <AlertIcon />
        <Box>
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription w={'100%'}>
            {text}
            {/* Too many title characters! Please input fewer characters. */}
          </AlertDescription>
        </Box>
        <CloseButton
          alignSelf='flex-start'
          position='absolute'
          right={1}
          top={1}
          onClick={() => setDisplayAlert(false)}
        />
      </Alert>
    ) : (
      <div></div>
    )
  }

  const EditModal = () => {

    const initialRef = useRef(null)

    return (
      <>

        {/* <IconButton bg={'yellow.500'} icon={<EditIcon />} aria-label={""} onClick={onOpen} /> */}

        <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={() => cancelEdit()}
          isCentered
          preserveScrollBarGap
          motionPreset='none'
        >
          <ModalOverlay />
          <ModalContent mx={8} bg={useColorModeValue('bgLight.100', 'bgDark.900')}>
            <ModalCloseButton />
            <ModalBody py={4}>
              <FormControl>
                <FormLabel textAlign={'center'}>Update Task</FormLabel>
                <form onSubmit={(event) => editTask(editID, event)}>
                  <Input ref={initialRef} placeholder='Update task' value={editInput} onChange={event => setEditInput(event.target.value)} />
                </form>
              </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={'center'}>
              <Button colorScheme='blue' w={20} mr={4} onClick={(event) => editTask(editID, event)}>
                Save
              </Button>
              <Button w={20} onClick={() => cancelEdit()}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  const DifficultyCircle = (props: any) => (
    <Icon viewBox='0 0 200 200' {...props}>
      <path
        fill='currentColor'
        d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
      />
    </Icon>
  )

  const addAndEdit = (id:any) => {
    if (editID === '') {
      setEditID(id)
    }
    onOpen()
  }



  return (
    <Box bg={{ base: useColorModeValue('rgba(255,255,255,0.1)', 'rgba'), md: useColorModeValue('rgba(255,255,255,0)', 'rgba(0,0,0,0)') }}>

      <div className='text-white flex justify-center text-center mt-6'>
        <p>XP BAR</p>
      </div>
      <Flex color={'red'} w={'100%'} justifyContent={'center'}>
        <Progress colorScheme='pink' value={XP} w={700} hasStripe isAnimated max={100} />
      </Flex>

      <Flex w='100%' h='100vh' flexDir='column' mt='5%' color={useColorModeValue('bgDark.900', 'white')}>
        <Container w='100%' maxH={{ base: '100%', lg: 1800 }} bg={useColorModeValue('rgba(255,255,255,0.3)', 'rgba(0,0,0,0.6)')} rounded={{ base: '', lg: '3xl' }} p={8} maxW={'5xl'}>
          <Text fontWeight='700' fontSize='30' textAlign='center'>Tasks</Text>
          <Divider borderWidth={'1px'} />
          <form onSubmit={addTask}>
            <FormControl>
              <Flex justifyContent={'center'} color={useColorModeValue('bgDark.900', 'white')} mt={4}>
                <VStack>
                  <Text fontWeight='700' fontSize='20' textAlign='center'>Difficulty</Text>
                  <RadioGroup onChange={setRadioDifficulty} value={radioDifficulty}>
                    <Stack spacing={20} direction='row' mt={2}>
                      <Radio colorScheme='green' value='green.500'>
                        Easy
                      </Radio>
                      <Radio colorScheme='orange' value='orange.500'>
                        Medium
                      </Radio>
                      <Radio colorScheme='red' value='red.500'>
                        Hard
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </VStack>
              </Flex>
              <Flex mt='2%'>
                {/* variant='flushed' */}
                <Input placeholder='Title' w='100%' value={input} color={useColorModeValue('bgDark.900', 'white')} _placeholder={{ color: 'inherit' }} onChange={event => setInput(event.target.value)} />
                <Button ml='5' bg='blue.400' onClick={addTask}>Add task</Button>
              </Flex>
              <Textarea mt={4} color={useColorModeValue('bgDark.900', 'white')} _placeholder={{ color: 'inherit' }} placeholder='Description (optional)' resize={'none'} value={description} onChange={event => setDescription(event.target.value)} />
              {triggerDisplayAlert(alertText)}
            </FormControl>
          </form>
          <Divider borderWidth={'1px'} mt={4} />
          <Tabs mt='2%' w='100%' align='center' isFitted>
            <TabList>
              <Tab>Active</Tab>
              <Tab>Completed</Tab>
              {/* <Tab>Expired</Tab> */}
            </TabList>
            {/* <TabPanels> */}
            <TabPanels overflowY={'scroll'} overscrollBehavior={'outside'} maxH={{ base: '60vh', lg: 1400 }}>
              <TabPanel>
                {incompleteTaskList.map((task: any, index: number) => (

                  <VStack mt={2}>
                    <Flex flexDir={'row'} mb={2} w='100%'>
                      <Container w={'100%'} textAlign={'left'} maxW={'100%'}>

                        <HStack>
                          <DifficultyCircle color={task.difficulty} />
                          <Container w={'100%'} textAlign={'left'} maxW={'100%'} wordBreak={'break-all'}>
                            {task.input}
                          </Container>
                        </HStack>

                        <Container w={'100%'} textAlign={'left'} maxW={'100%'} wordBreak={'break-all'} mt={2}>
                          {task.description}
                        </Container>

                        <HStack w={'100%'} my={2} mt={4} justifyContent={'center'} spacing={{ base: '10px', lg: '10px' }} h={8}>
                          <IconButton aria-label={''} bg={'green.600'} icon={<StarIcon />} onClick={() => completeTask(task.input, index, task.difficulty, task.id, task.description)} ></IconButton>
                          <Divider orientation='vertical' />
                          
                          <IconButton bg={'yellow.500'} icon={<EditIcon />} aria-label={""} onClick={() => addAndEdit(task.id)} />
                          <EditModal />

                          <Divider orientation='vertical' />
                          <IconButton aria-label={''} bg={'red.600'} icon={<DeleteIcon />} onClick={() => deleteTask(index)} ></IconButton>
                        </HStack>
                      </Container>
                    </Flex>
                    <Divider />
                  </VStack>

                ))}
              </TabPanel>
              <TabPanel>
                {completeTaskList.map((task: any) => (
                  <>
                    <VStack>
                      <Flex w={'100%'} flexDir={'row'} my={4}>
                        <HStack>
                          <DifficultyCircle color={task.difficulty} />
                          <Container w={'100%'} textAlign={'left'} maxW={'100%'} wordBreak={'break-all'}>
                            {task.input}
                          </Container>
                        </HStack>
                      </Flex>
                      <Container w={'100%'} textAlign={'left'} maxW={'100%'} wordBreak={'break-all'} mt={2}>
                        {task.description}
                      </Container>
                    </VStack>
                    <Divider />
                  </>
                ))}
              </TabPanel>
              {/* <TabPanel>
                  Expired here
                </TabPanel> */}
            </TabPanels>
          </Tabs>
        </Container>
      </Flex>

      <div className="lg:h-screen"></div>
    </Box>
  )
}

export default TaskList