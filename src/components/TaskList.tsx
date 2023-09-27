import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  CloseButton,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"

import { useEffect, useRef, useState } from "react"
import { firestoreDB, getXPFromDatabase, updateXPAmount } from "../config/config"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore"
import { readDisplayName, readEmail, readImageURL, readUID } from "../functions"
import XPBar from "./XPBar";

const TaskList = () => {
  // ~~~~~~~~~~~~~~~~~~~ hooks ~~~~~~~~~~~~~~~~~~~~~
  const [loading, setLoading] = useState(false)
  const [taskListItems, setTaskListItems] = useState<any>([])
  const [input, setInput] = useState("")
  const [description, setDescription] = useState("")
  const [editInput, setEditInput] = useState("")
  const [editID, setEditID] = useState("")
  const [radioDifficulty, setRadioDifficulty] = useState("")
  const [displayAlert, setDisplayAlert] = useState(false)
  const [alertText, setAlertText] = useState("")
  const [XP, setXP] = useState(0)
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // ~~~~~~~~~~~~~~~~ modal hook ~~~~~~~~~~~~~~~~~~~
  const { isOpen, onOpen, onClose } = useDisclosure()

  // ~~~~~~~~~~~~~~~ input consts ~~~~~~~~~~~~~~~~~~
  const inputLengthMax = 70
  const descriptionLengthMax = 250
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  const addTask = async (event: any) => {
    event.preventDefault()

    if (radioDifficulty === "") {
      setAlertText("You must choose a difficulty.")
      setDisplayAlert(true)
      return
    } else {
      setDisplayAlert(false)
    }

    setLoading(true)

    const setID = Math.floor(Math.random() * (1000000 - 10)) + 10
    // console.log("id:   " + setID);

    if (
      input.length > 0 &&
      input.length < inputLengthMax &&
      description.length < descriptionLengthMax
    ) {
      try {
        const date = new Date().toLocaleString('en-GB')

        // Access the 'tasks' collection in Firestore
        const tasksCollection = collection(firestoreDB, "tasks")

        // Add the task to Firestore
        const docRef = await addDoc(tasksCollection, {
          input,
          difficulty: radioDifficulty,
          id: setID,
          description,
          status: "pending",
          username: readEmail(),
          startDate: date,
          endDate: "",
        })
        setDisplayAlert(false)

        // Log the Firestore document reference
        console.log("Document written with ID: ", docRef.id)

        // Add the task to your local state or update it as needed
        setTaskListItems((prevState: any) => [
          ...prevState,
          {
            input,
            difficulty: radioDifficulty,
            id: setID,
            description,
            status: "pending",
            startDate: date,
            endDate: "",
          },
        ])
      } catch (error) {
        console.error("Error adding task to Firestore: ", error)
      }
    }

    // Handle other validation checks and alerts here as before
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

    setInput("")
    setDescription("")
    setRadioDifficulty("")
    setLoading(false)
  }

  const setXpBar = (difficulty: string) => {
    let totalXP: any = sessionStorage.getItem("XPAmount")
    let addedXP = 0

    if (difficulty === "red.500") {
      setXP(XP + 30)
      addedXP = 30
    } else if (difficulty === "orange.500") {
      setXP(XP + 10)
      addedXP = 10
    } else {
      setXP(XP + 5)
      addedXP = 5
    }

    sessionStorage.setItem("XPAmount", (parseInt(totalXP) + addedXP).toString())
    updateXPAmount(readUID() as string, readDisplayName() as string, readEmail() as string, readImageURL() as string)
  }

  const completeTask = async (
    input: any,
    difficulty: any,
    id: any,
  ) => {
    try {
      const endDate = new Date().toLocaleString('en-GB')
      // Update the task status to "complete" in Firestore
      const tasksCollection = collection(firestoreDB, "tasks") // Make sure it matches your Firestore collection name
      const taskQuery = query(
        tasksCollection,
        where("input", "==", input), // Assuming 'input' is a unique identifier for your tasks
        where("difficulty", "==", difficulty), // Include other unique identifiers if needed
        where("id", "==", id)
      );
      const taskSnapshot = await getDocs(taskQuery)

      if (!taskSnapshot.empty) {
        const taskDoc = taskSnapshot.docs[0] // Assuming there's only one matching task
        const taskRef = doc(firestoreDB, "tasks", taskDoc.id)

        // Update the task status to "complete"
        await updateDoc(taskRef, { status: "complete", endDate: endDate })
      } else {
        console.log("Task not found in Firestore")
      }

      setTaskListItems((prevState: any) => {
        // Map over the current state and update the entry with matching 'id'
        return prevState.map((task: any) => {
          if (task.id === id) {
            return {
              ...task,
              status: "complete",
              endDate: endDate,
            }
          }
          return task
        })
      })

      setXpBar(difficulty)
      console.log('completed task')
    } catch (error) {
      console.error("Error updating task status in Firestore:", error)
    }
  }

  const deleteTask = async (
    input: any,
    index: any,
    difficulty: any,
    id: any,
  ) => {
    try {
      // Delete the task in Firestore
      const tasksCollection = collection(firestoreDB, "tasks"); // Make sure it matches your Firestore collection name
      const taskQuery = query(
        tasksCollection,
        where("input", "==", input), // Assuming 'input' is a unique identifier for your tasks
        where("difficulty", "==", difficulty), // Include other unique identifiers if needed
        where("id", "==", id)
      )
      const taskSnapshot = await getDocs(taskQuery)

      if (!taskSnapshot.empty) {
        const taskDoc = taskSnapshot.docs[0]; // Assuming there's only one matching task
        const taskRef = doc(firestoreDB, "tasks", taskDoc.id)

        const arrCopy = [...taskListItems]
        arrCopy.splice(index, 1)
        setTaskListItems(arrCopy)


        // Delete the task from firestore
        await deleteDoc(taskRef)
        document.location.reload()
        console.log("Document deleted with ID: ", id)
      } else {
        console.log("Task not found in Firestore")
      }

      // setTaskListItems((prevState: any) => {
      //   // Map over the current state and delete the entry with matching 'id'
      //   return prevState.map((task: any, index: any) => {
      //     if (task.id === id) {
      //       return {
      //         ...task,
      //         status: "complete",
      //       };
      //     }
      //   });
      // });

    } catch (error) {
      console.error("Error deleting task in Firestore:", error)
    }
  }

  useEffect(() => {
    // Access the 'tasks' collection in Firestore
    const tasksCollection = collection(firestoreDB, "tasks")

    // Define the username to filter tasks
    const usernameToFilter = readEmail() // Replace with the actual username

    // Fetch all tasks from Firestore
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          query(tasksCollection, where("username", "==", usernameToFilter))
        )
        const taskData: {
          [x: string]: string
          id: string
        }[] = [];
        querySnapshot.forEach((doc) => {
          taskData.push({ id: doc.id, ...doc.data() })
        });
        setTaskListItems(taskData)

        // Calculate total XP based on task difficulties
        // let totalXP = 0;
        // taskData.forEach((task) => {
        //   if (task.status === "completed") {            
        //     switch (task.difficulty) {
        //       case "red.500":
        //         totalXP += 30;
        //         break;
        //       case "orange.500":
        //         totalXP += 10;
        //         break;
        //       default:
        //         totalXP += 5;
        //         break;
        //     }
        //   }
        // });


        // const dbRef = ref(getDatabase())
        // get(child(dbRef, 'users/' + readUID() + "/XPAmount")).then((snapshot) => {
        //     if (snapshot.exists()) {
        //         totalXP = snapshot.val()
        //     }
        // })

        let totalXP: number = await getXPFromDatabase(readUID() as string)

        // Set the XP bar state
        setXP(totalXP)

      } catch (error) {
        console.error("Error fetching tasks from Firestore:", error)
      }
    }

    fetchData() // Fetch tasks when the component mounts

    return () => {
      // Cleanup logic if needed (e.g., unsubscribing from real-time updates)
    }
  }, [XP]) // The empty dependency array ensures this effect runs once on mount


  const editTask = async (
    id: any,
    event: any,
  ) => {
    try {
      event.preventDefault()
      // Update the task input in Firestore

      if (editInput.length > 0 && editInput.length < inputLengthMax) {
        const tasksCollection = collection(firestoreDB, "tasks") // Make sure it matches your Firestore collection name
        const taskQuery = query(
          tasksCollection,
          where("id", "==", id)
        );
        const taskSnapshot = await getDocs(taskQuery)

        if (!taskSnapshot.empty) {
          const taskDoc = taskSnapshot.docs[0] // Assuming there's only one matching task
          const taskRef = doc(firestoreDB, "tasks", taskDoc.id)

          // Update the task status to "complete"
          await updateDoc(taskRef, { input: editInput })
        } else {
          console.log("Task not found in Firestore")
        }

        setTaskListItems((prevState: any) => {
          // Map over the current state and update the entry with matching 'id'
          return prevState.map((task: any) => {
            if (task.id === id) {
              return {
                ...task,
                input: editInput,
              }
            }
            return task
          })
        })

        console.log("Document edited with ID: ", id)
        setDisplayAlert(false)
      }

      if (editInput.length > inputLengthMax) {
        setAlertText('Too many title characters! Please input fewer characters.')
        setDisplayAlert(true);
      }

      setEditInput("")
      setEditID("")
      onClose()
    } catch (error) {
      console.error("Error updating task status in Firestore:", error)
    }
  };

  const cancelEdit = () => {
    setEditInput("")
    onClose()
  }

  // const deleteTask = (index: any) => {
  //   const arrCopy = [...taskListItems];
  //   arrCopy.splice(index, 1);
  //   setTaskListItems(arrCopy);
  // };

  function triggerDisplayAlert(text: string) {
    return displayAlert ? (
      <Alert status="error" mt={4} color={useColorModeValue("red", "red.200")}>
        <AlertIcon />
        <Box>
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription w={"100%"}>
            {text}
            {/* Too many title characters! Please input fewer characters. */}
          </AlertDescription>
        </Box>
        <CloseButton
          alignSelf="flex-start"
          position="absolute"
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
          motionPreset="none"
        >
          <ModalOverlay />
          <ModalContent
            mx={8}
            bg={useColorModeValue("bgLight.100", "bgDark.900")}
          >
            {/* <ModalCloseButton /> */}
            <ModalBody py={4}>
              <FormControl>
                <FormLabel textAlign={"center"}>Update Task</FormLabel>
                <form onSubmit={(event) => editTask(editID, event)}>
                  <Input
                    ref={initialRef}
                    placeholder="Edit Title"
                    value={editInput}
                    onChange={(event) => setEditInput(event.target.value)}
                  />
                </form>
              </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Button
                colorScheme="blue"
                w={20}
                mr={4}
                onClick={(event) => editTask(editID, event)}
              >
                Save
              </Button>
              <Button w={20} onClick={() => cancelEdit()}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  const DifficultyCircle = (props: any) => (
    <Icon viewBox="0 0 200 200" {...props}>
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  )

  const addAndEdit = (id: any) => {
    if (editID === "") {
      setEditID(id)
    }
    onOpen()
  }

  // console.log(taskListItems);

  const taskList = () =>
    taskListItems.length > 0 ? (
      <Tabs mt="2%" w="100%" align="center" isFitted>
        <TabList>
          <Tab
            _hover={{
              borderColor: "blue.500"
            }}>
            Active
          </Tab>
          <Tab
            _hover={{
              borderColor: "blue.500"
            }}>
            Complete
          </Tab>
          {/* <Tab>Expired</Tab> */}
        </TabList>
        {/* <TabPanels> */}
        <TabPanels
          overflowY={"scroll"}
          overscrollBehavior={"outside"}
          maxH={{ base: "60vh", lg: "80vh" }}
        >
          <TabPanel>
            {taskListItems
              .filter((task: any) => task.status === "pending")
              .map((task: any, index: number) => (
                <VStack key={index} mt={2}>
                  <Flex flexDir={"row"} mb={2} w="100%">
                    <Container w={"100%"} textAlign={"left"} maxW={"100%"}>
                      <HStack>
                        <DifficultyCircle color={task.difficulty} />
                        <Container
                          w={"100%"}
                          textAlign={"left"}
                          maxW={"100%"}
                          wordBreak={"break-all"}
                        >
                          {task.input}
                        </Container>
                      </HStack>

                      <Container
                        w={"100%"}
                        textAlign={"left"}
                        maxW={"100%"}
                        wordBreak={"break-all"}
                        mt={2}
                      >
                        {task.description}
                      </Container>

                      <HStack
                        w={"100%"}
                        my={2}
                        mt={4}
                        justifyContent={"center"}
                        spacing={{ base: "10px", lg: "10px" }}
                        h={8}
                      >
                        <IconButton
                          aria-label={""}
                          bg={"green.600"}
                          icon={<CheckIcon />}
                          _hover={{
                            bg: "green.500"
                          }}
                          onClick={() =>
                            completeTask(
                              task.input,
                              task.difficulty,
                              task.id,
                            )
                          }
                        ></IconButton>

                        <Divider orientation="vertical" borderColor={useColorModeValue("black", "")} />

                        <IconButton
                          bg={"yellow.500"}
                          _hover={{
                            bg: "yellow.400"
                          }}
                          icon={<EditIcon />}
                          aria-label={""}
                          onClick={() => addAndEdit(task.id)}
                        />
                        <EditModal />

                        <Divider orientation="vertical" borderColor={useColorModeValue("black", "")} />

                        <IconButton
                          aria-label={""}
                          bg={"red.600"}
                          _hover={{
                            bg: "red.500"
                          }}
                          icon={<DeleteIcon />}
                          onClick={() => 
                            deleteTask(
                              task.input,
                              index,
                              task.difficulty,
                              task.id,
                            )
                          }
                        ></IconButton>
                      </HStack>

                      {task.startDate}
                    </Container>
                  </Flex>
                  <Divider borderColor={useColorModeValue("black", "")} />
                </VStack>
              ))}
          </TabPanel>
          <TabPanel>
            {taskListItems
              .filter((task: any) => task.status === "complete")
              .map((task: any) => (
                <>
                  <VStack key={task.index} pb={2}>
                    <Flex w={"100%"} flexDir={"row"} my={2}>
                      <HStack>
                        <DifficultyCircle color={task.difficulty} />
                        <Container
                          w={"100%"}
                          textAlign={"left"}
                          maxW={"100%"}
                          wordBreak={"break-all"}
                        >
                          {task.input}
                        </Container>
                      </HStack>
                    </Flex>
                    <Container
                      w={"100%"}
                      textAlign={"left"}
                      maxW={"100%"}
                      wordBreak={"break-all"}
                    >
                      {task.description}
                    <VStack pt={4}>
                      <Box>Start: {task.startDate}</Box>
                      <Box>Complete: {task.endDate}</Box>
                    </VStack>
                    </Container>
                  </VStack>
                  <Divider borderColor={useColorModeValue("black", "")} />
                </>
              ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    ) : (
      <></>
    )

  return (
    <Box
      pb={'200px'}
      bg={{ base: useColorModeValue("rgba(255,255,255,0.4)", "rgba(0,0,0,0.7)"), lg: useColorModeValue("rgba(0,0,0,0)", "rgba(0,0,0,0)")}}
      fontWeight={'500'}
      >
      <Flex
        w="100%"
        h="100vh"
        flexDir="column"
        mt={{ base: "", lg: "5%" }}
        mb={{ base: "", lg: "15%" }}
        color={useColorModeValue("bgDark.900", "white")}
      >
        <Container
          w="100%"
          bg={{ base: '', lg: useColorModeValue("rgba(255,255,255,0.6)", "rgba(0,0,0,0.8)")}}
          rounded={{ base: "", lg: "3xl" }}
          p={8}
          maxW={{ base: "100%", lg: "70%" }}
        >
          <XPBar xp={XP} />
          <Divider borderWidth={"1px"} mt={8} borderColor={useColorModeValue("black", "")} />
          <Text fontWeight="700" fontSize="30" textAlign="center" my={4}>
            Tasks
          </Text>
          {/* <Divider borderWidth={"1px"} borderColor={useColorModeValue("black", "")} /> */}
          <form onSubmit={addTask}>
            <FormControl>
              <Flex
                justifyContent={"center"}
                color={useColorModeValue("bgDark.900", "white")}
                mt={4}
              >
                <Flex>
                  <RadioGroup
                    onChange={setRadioDifficulty}
                    value={radioDifficulty}
                  >
                    <Stack spacing={{ base: 10, md: 20}} direction="row" my={2}>
                      <Radio colorScheme="green" value="green.500" borderColor={useColorModeValue("black", "gray")} _hover={{ borderColor: useColorModeValue("blue.400", "blue.400") }}>
                        Easy
                      </Radio>
                      <Radio colorScheme="orange" value="orange.500" borderColor={useColorModeValue("black", "gray")} _hover={{ borderColor: useColorModeValue("blue.400", "blue.400") }}>
                        Medium
                      </Radio>
                      <Radio colorScheme="red" value="red.500" borderColor={useColorModeValue("black", "gray")} _hover={{ borderColor: useColorModeValue("blue.400", "blue.400") }}>
                        Hard
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Flex>
              </Flex>
              <Flex mt="2%">
                {/* variant='flushed' */}
                <Input
                  placeholder="Title"
                  w="100%"
                  value={input}
                  color={useColorModeValue("bgDark.900", "white")}
                  _placeholder={{ color: "inherit" }}
                  onChange={(event) => setInput(event.target.value)}
                  borderColor={useColorModeValue("black", "gray")}
                  borderWidth={'1px'}
                  _hover={{ borderColor: useColorModeValue("blue.400", "blue.400") }}
                />
                <Button
                  sx={{ width: "90px" }}
                  ml="5"
                  bg="blue.400"
                  onClick={addTask}
                  _hover={{
                    bg: "blue.500"
                  }}
                >
                  {loading ? (
                    <CircularProgress
                      isIndeterminate
                      size="40px"
                      color="blue.300"
                    />
                  ) : (
                    <p>Add Task</p>
                  )}
                </Button>
              </Flex>
              <Textarea
                mt={4}
                color={useColorModeValue("bgDark.900", "white")}
                borderColor={useColorModeValue("black", "gray")}
                _hover={{ borderColor: useColorModeValue("blue.400", "blue.400") }}
                borderWidth={'1px'}
                _placeholder={{ color: "inherit" }}
                placeholder="Description (optional)"
                resize={"none"}
                value={description}
                id="description"
                onChange={(event) => setDescription(event.target.value)}
              />
              {triggerDisplayAlert(alertText)}
            </FormControl>
          </form>
          {/* <Divider borderWidth={"1px"} mt={6} borderColor={useColorModeValue("black", "")} /> */}
          {taskList()}
        </Container>
      </Flex>

      {/* <div className="lg:h-screen"></div> */}
    </Box>
  )
}

export default TaskList