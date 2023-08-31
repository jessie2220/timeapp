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
  TabPanel, TabPanels, Tabs, Text, VStack, useColorModeValue, useDisclosure,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'

const TaskList = () => {
  const [incompleteTaskList, setIncompleteTaskList] = useState<any>([])
  const [completeTaskList, setCompleteTaskList] = useState<any>([])
  const [input, setInput] = useState('')
  const [editInput, setEditInput] = useState('')
  const [radioDifficulty, setRadioDifficulty] = useState('')

  const [displayAlert, setDisplayAlert] = useState(false)
  const [radioDisplayAlert, setRadioDisplayAlert] = useState(false)

  const [XP, setXP] = useState(0)


  const { isOpen, onOpen, onClose } = useDisclosure()



  const addTask = (event: any) => {
    event.preventDefault()

    if (radioDifficulty === '') {
      setRadioDisplayAlert(true)
      return
    } else {
      setRadioDisplayAlert(false)
    }

    const setID = Math.floor(Math.random() * (1000000 - 10) ) + 10
    console.log('id:   ' + setID)


    if (input.length > 0 && input.length < 200) {
      setIncompleteTaskList((prevState: any) => [...prevState, { input, difficulty: radioDifficulty, id: setID }])
      setDisplayAlert(false)
    }

    if (input.length > 200) {
      setDisplayAlert(true)
    }

    console.log("task list :  " +  JSON.stringify(incompleteTaskList))

    setInput('')
    setRadioDifficulty('')
  }

  
  const completeTask = (input: any, index: any, difficulty:any, id:any) => {

    setCompleteTaskList((prevState: any) => [...prevState, { input, difficulty: difficulty, id: id }])
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
    event.preventDefault()

    console.log("editing  :  " + id + "  :  " + editInput)

    if (editInput.length > 0 && editInput.length < 200) {
      const arrCopy = [...incompleteTaskList]
      
      let index = arrCopy.findIndex(function(task) {
        if (id === task.id) return true
      })

      console.log(`index :  ${index}`)
      
      arrCopy[index].input = editInput
      setIncompleteTaskList(arrCopy)
      setDisplayAlert(false)
    }

    if (editInput.length > 200) {
      setDisplayAlert(true)
    }

    setEditInput('')
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


  function triggerDisplayAlert() {

    return displayAlert ? (
      <Alert status='error' mt={4} color={useColorModeValue('red', 'red.200')}>
        <AlertIcon />
        <Box>
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription w={'100%'}>
            Too many characters! Please input fewer characters.
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

  function triggerRadioAlert() {

    return radioDisplayAlert ? (
      <Alert status='error' mt={4} color={useColorModeValue('red', 'red.200')}>
        <AlertIcon />
        <Box>
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription w={'100%'}>
            You must choose a difficulty.
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

  // function EditableControls() {
  //   const {
  //     isEditing,
  //     getSubmitButtonProps,
  //     getCancelButtonProps,
  //     getEditButtonProps,
  //   } = useEditableControls()

  //   return isEditing ? (
  //     <ButtonGroup justifyContent='center' size='sm'>
  //       <IconButton bg={useColorModeValue('bgLight.100', 'bgDark.900')} icon={<CheckIcon />} aria-label={""} {...getSubmitButtonProps()}  />
  //       <IconButton bg={useColorModeValue('bgLight.100', 'bgDark.900')} icon={<CloseIcon />} aria-label={""} {...getCancelButtonProps()} />
  //     </ButtonGroup>
  //   ) : (
  //     <Flex justifyContent='center'>
  //       <IconButton bg={'yellow.500'} icon={<EditIcon />} aria-label={""} {...getEditButtonProps()} />
  //     </Flex>
  //   )
  // }

  const EditModal = (task: any) => {

    const initialRef = useRef(null)

    return (
      <>

        <IconButton bg={'yellow.500'} icon={<EditIcon />} aria-label={""} onClick={onOpen} />

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
                <form onSubmit={(event) => editTask(task.id, event)}>
                  <Input ref={initialRef} placeholder='Update task' value={editInput} onChange={event => setEditInput(event.target.value)} />
                </form>
              </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={'center'}>
              <Button colorScheme='blue' w={20} mr={4} onClick={(event) => editTask(task.id, event)}>
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


  return (
    <Box bg={{ base: useColorModeValue('rgba(255,255,255,0.1)', 'rgba'), md: useColorModeValue('rgba(255,255,255,0)', 'rgba(0,0,0,0)') }}>
      {/* <div className="flex flex-col mx-auto px-8 lg:px-40"> */}

      {/* mx:auto text-center justify-center */}
      {/* <div className='bg-black bg-opacity-0 p-4 mx:auto justify-center text-black rounded-2xl h-[2000px] mb-24'> */}
      {/* <div className='text-[#7926ff] font-bold md:text-3xl mb-4'>TASK LIST</div> */}

      {/* <Input focusBorderColor='black' placeholder='Enter new task' color='red' _placeholder={{ opacity: 0.4, color: 'inherit' }}/> */}
      {/* <Input
          mt={2}
          color={'black'}
          focusBorderColor='black'
          placeholder="Select Date and Time"
          size="md"
          type="datetime-local"
        /> */}

      <div className='text-white flex justify-center text-center mt-4'>
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
                <Input placeholder='Create a task' w='100%' value={input} color={useColorModeValue('bgDark.900', 'white')} _placeholder={{ color: 'inherit' }} onChange={event => setInput(event.target.value)} />
                <Button ml='5' bg='blue.400' onClick={addTask}>Add task</Button>
              </Flex>
              {triggerDisplayAlert()}
              {triggerRadioAlert()}
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

                        {/* <Editable
                            textAlign='left'
                            fontSize='2xl'
                            placeholder={editInput}
                            isPreviewFocusable={false}
                            onChange={() => editTask(index)}
                            onSubmit={() => console.log(editInput)}
                          >
                            <Container w={'100%'} textAlign={'left'} maxW={'100%'} wordBreak={'break-all'}>
                              <EditablePreview />
                            </Container>

                            <Input as={EditableInput} value={editInput} onChange={event => setEditInput(event.target.value)} /> */}

                        <HStack>
                          <DifficultyCircle color={task.difficulty} />
                          <Container w={'100%'} textAlign={'left'} maxW={'100%'} wordBreak={'break-all'}>
                            {task.input}
                          </Container>
                        </HStack>


                        <HStack w={'100%'} my={2} mt={4} justifyContent={'center'} spacing={{ base: '10px', lg: '10px' }} h={8}>
                          <IconButton aria-label={''} bg={'green.600'} icon={<StarIcon />} onClick={() => completeTask(task.input, index, task.difficulty, task.id)} ></IconButton>
                          <Divider orientation='vertical' />
                          {/* <EditableControls /> */}
                          {/* <IconButton bg={'yellow.500'} icon={<EditIcon />} aria-label={""} onClick={() => <InitialFocus />} /> */}
                          <EditModal id={task.id} />
                          {/* {EditModal(task.id)} */}
                          <Divider orientation='vertical' />
                          <IconButton aria-label={''} bg={'red.600'} icon={<DeleteIcon />} onClick={() => deleteTask(index)} ></IconButton>
                        </HStack>
                        {/* </Editable> */}
                      </Container>
                    </Flex>
                    <Divider />
                  </VStack>

                ))}
              </TabPanel>
              <TabPanel>
                {completeTaskList.map((task: any) => (
                  <>
                  {console.log(completeTaskList)}
                    <Flex w={'100%'} flexDir={'row'} my={4}>
                      {/* <Container maxW={'100%'}>
                          <Text key={task} align={'left'} textAlign={'left'}>{task}</Text>
                        </Container> */}
                      <HStack>
                        <DifficultyCircle color={task.difficulty} />
                        <Container w={'100%'} textAlign={'left'} maxW={'100%'} wordBreak={'break-all'}>
                          {task.input}
                        </Container>
                      </HStack>
                    </Flex>
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



      {/* </div> */}


      <div className="lg:h-screen"></div>
      {/* </div> */}
    </Box>
  )
}

export default TaskList