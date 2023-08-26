import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Checkbox, CloseButton, Editable, EditablePreview, Flex, FormControl, IconButton, Input,
  Progress,
  Select, Tab, TabList,
  TabPanel, TabPanels, Tabs, Text,
} from '@chakra-ui/react'
import { useState } from 'react'

const TaskList = () => {
  const [incompleteTaskList, setIncompleteTaskList] = useState<any>([])
  const [completeTaskList, setCompleteTaskList] = useState<any>([])
  const [input, setInput] = useState('')

  const [displayAlert, setDisplayAlert] = useState(false)

  const addTask = (event: any) => {
    event.preventDefault()
    if (input.length > 0 && input.length < 100) {
      setIncompleteTaskList((prevState: any) => [...prevState, { input, isChecked: false }])
      setDisplayAlert(false)
    }

    if (input.length > 100) {
      setDisplayAlert(true)
    }

    setInput('')
  }

  const updateTask = (index: any, checked: any) => {

    const arrCopy = [...incompleteTaskList]
    // arrCopy[index] = { input: task, isChecked: true }
    // console.log(checked)
    arrCopy[index].isChecked = checked
    setIncompleteTaskList(arrCopy)
  }

  // const reUpdateTask = (index: any, checked: any) => {
  //   // const arrCopy = [...incompleteTaskList]
  //   // arrCopy[index] = { input: task, isChecked: false }
  //   // setIncompleteTaskList(arrCopy)

  //   const arrCopy = [...incompleteTaskList]
  //   arrCopy[index].isChecked = false
  //   setIncompleteTaskList(arrCopy)
  // }

  const completeTask = (task: any, index: any) => {

    setCompleteTaskList((prevState: any) => [...prevState, task])

    deleteTask(index)


    // incompleteTaskList[index] = { isChecked: false }
  }

  const editTask = (index:any) => {
    console.log('edit task    ' + index)
  }

  const deleteTask = (index: any) => {
    const arrCopy = [...incompleteTaskList]
    arrCopy.splice(index, 1)
    setIncompleteTaskList(arrCopy)
  }

  function triggerDisplayAlert() {

    return displayAlert ? (
      <Alert status='error' mt={4} color={'red'}>
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


  return (
    <div className="flex flex-col mx-auto px-8 lg:px-40 mt-4">

      {/* mx:auto text-center justify-center */}
      <div className='bg-black bg-opacity-60 p-4 mx:auto justify-center text-black rounded-2xl'>
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
          <Progress colorScheme='pink' value={20} w={500} hasStripe isAnimated max={100} />
        </Flex>

        <Flex w='100%' h='100vh'>
          <Flex w='100%' h='100vh' flexDir='column' ml='10%' mt='5%' mr='10%' color='white'>
            <Text fontWeight='700' fontSize='30' textAlign='center'>Tasks</Text>
            <form onSubmit={addTask}>
              <FormControl>
                <Flex mt='2%'>
                  {/* variant='flushed' */}
                  <Input placeholder='Add task' w='100%' value={input} onChange={event => setInput(event.target.value)} />
                  <Button ml='5' bg='blue.400' onClick={addTask}>Add task</Button>
                </Flex>
                {triggerDisplayAlert()}
                <Select placeholder='Select difficulty?' mt={4} color={'gray.400'}>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </Select>
              </FormControl>
            </form>
            <Tabs mt='2%' w='100%' align='center' isFitted>
              <TabList>
                <Tab>Active</Tab>
                <Tab>Completed</Tab>
                <Tab>Expired</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {incompleteTaskList.map((task: any, index: number) => (
                    // <>
                    // <TaskItem key={index} text={task}/>
                    // {console.log("Index in map   " + index + "  :  " + task)}
                    // </>

                    // task.isChecked ?

                    //   // <>
                    //   //   <Checkbox flexDir={'row'} mb={8} w='100%' colorScheme='red' onChange={(e) => updateTask(index, e.target.checked)} isChecked={task.isChecked}>
                    //   //     <Flex w={'100%'} flexDir={'row'}>
                    //   //       <Text key={index} align={'left'} textAlign={'left'}>{task.input}</Text>
                    //   //       <IconButton aria-label={''} bg={'yellow.500'} pos='absolute' right={14} icon={<EditIcon />} onClick={() => deleteTask(index)} ></IconButton>
                    //   //       <IconButton aria-label={''} bg={'red.600'} pos='absolute' right={0} icon={<DeleteIcon />} onClick={() => deleteTask(index)} ></IconButton>
                    //   //     </Flex>
                    //   //   </Checkbox>
                    //   //   {/* {console.log(task.input + '  :  ' + task.isChecked)} */}
                    //   // </>

                    //   <>
                    //     <Checkbox flexDir={'row'} mb={8} w='100%' colorScheme='green' onChange={(e) => reUpdateTask(index, e.target.checked)} isChecked={task.isChecked}>
                    //       <Flex w={'100%'} flexDir={'row'}>
                    //         <Text key={index} align={'left'} textAlign={'left'}>{task.input}</Text>
                    //         {/* <IconButton aria-label={''} bg={'green.600'} pos='absolute' right={0} icon={<CheckIcon />} onClick={() => completeTask(task.input, index, task.isChecked)} ></IconButton> */}
                    //       </Flex>
                    //     </Checkbox>
                    //     {/* {console.log(task.input + '  :  ' + task.isChecked)} */}
                    //   </>

                    //   :

                    //   <>
                    //     <Checkbox flexDir={'row'} mb={8} w='100%' colorScheme='red' onChange={(e) => updateTask(index, e.target.checked)} isChecked={task.isChecked}>
                    //       <Flex w={'100%'} flexDir={'row'}>
                    //         <Text key={index} align={'left'} textAlign={'left'}>{task.input}</Text>
                    //         <IconButton aria-label={''} bg={'green.600'} pos='absolute' right={28} icon={<CheckIcon />} onClick={() => completeTask(task.input, index)} ></IconButton>
                    //         <IconButton aria-label={''} bg={'yellow.500'} pos='absolute' right={14} icon={<EditIcon />} onClick={() => deleteTask(index)} ></IconButton>
                    //         <IconButton aria-label={''} bg={'red.600'} pos='absolute' right={0} icon={<DeleteIcon />} onClick={() => deleteTask(index)} ></IconButton>
                    //       </Flex>
                    //     </Checkbox>
                    //     {/* {console.log(task.input + '  :  ' + task.isChecked)} */}
                    //   </>

                    <>
                      <Checkbox flexDir={'row'} mb={8} w='100%' colorScheme='blue' onChange={(e) => updateTask(index, e.target.checked)} isChecked={task.isChecked}>
                        <Flex w={'100%'} flexDir={'row'}>
                          <Editable key={index} textAlign={'left'}>
                            <EditablePreview />
                            {task.input}
                          </Editable>
                          <IconButton aria-label={''} bg={'green.600'} pos='absolute' right={28} icon={<CheckIcon />} onClick={() => completeTask(task.input, index)} ></IconButton>
                          <IconButton aria-label={''} bg={'yellow.500'} pos='absolute' right={14} icon={<EditIcon />} onClick={() => editTask(index)} ></IconButton>
                          <IconButton aria-label={''} bg={'red.600'} pos='absolute' right={0} icon={<DeleteIcon />} onClick={() => deleteTask(index)} ></IconButton>
                        </Flex>
                      </Checkbox>
                    </>

                  ))}
                </TabPanel>
                <TabPanel>
                  {completeTaskList.map((task: string) => (
                    <>
                      <Flex w={'100%'} flexDir={'row'}>
                        <Text key={task} align={'left'} textAlign={'left'}>{task}</Text>
                      </Flex>
                    </>
                  ))}
                </TabPanel>
                <TabPanel>
                  Expired here
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Flex>


      </div>


      <div className="h-screen"></div>
    </div>
  )
}




// const TaskItem = (task:any, index:any) => {

//   return (
//     // <>
//     // <Checkbox flexDir={'row'} mb={8} w='100%' colorScheme='green'>
//     //   <Flex w={'100%'} flexDir={'row'}>
//     //     <Text key={index} align={'left'}>{task.text}</Text>
//     //     <IconButton aria-label={''} bg={'red.600'} pos='absolute' right={0} icon={<DeleteIcon />} onClick={() => deleteTask(index.key)} ></IconButton>
//     //   </Flex>
//     // </Checkbox>
//     // {console.log("Index in task   " + index)}
//     // </>
//   )
// }

export default TaskList