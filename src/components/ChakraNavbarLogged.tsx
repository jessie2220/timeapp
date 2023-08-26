'use client'

import {
    Box,
    Flex,
    Button,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    IconButton,
    HStack,
    Drawer,
    DrawerOverlay,
    DrawerHeader,
    DrawerContent,
    DrawerBody,
    VStack,
    Menu,
    MenuButton,
    Avatar,
    MenuList,
    Center,
    MenuDivider,
    MenuItem,
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { GrGoogle } from 'react-icons/Gr'
import { PiMountainsFill } from 'react-icons/Pi'
import { signOutWithGoogle } from './Hero'
import { getFirstName, readImageURL } from '../functions'

// interface Props {
//   children: React.ReactNode
// }

const NavLink = (link: any) => {

    return (
        <>
            <Box
                as="a"
                px={2}
                py={1}
                color={useColorModeValue('black', 'white')}
                rounded={'md'}
                _hover={{
                    textDecoration: 'none',
                    bg: useColorModeValue('gray.400', 'gray.200'),
                }}
                href={link.address}>
                {link.children}
            </Box>
        </>
    )
}

const SideBarLink = (link: any) => {

    return (
        <>
            <Box
                as="a"
                px={2}
                py={1}
                color={useColorModeValue('black', 'white')}
                rounded={'md'}
                _hover={{
                    textDecoration: 'none',
                    bg: useColorModeValue('gray.400', 'gray.400'),
                }}
                href={link.address}>
                {link.children}
            </Box>
        </>
    )
}

const NewMenuItem = (name:any) => {

    return (
        <>
            <MenuItem
                color={useColorModeValue('black', 'white')}
                bg={useColorModeValue('white', 'black')}
                _hover={{
                    textDecoration: 'none',
                    bg: useColorModeValue('gray.400', 'gray.400'),
                }}
            >
                {name.children}
            </MenuItem>
        </>
    )
}

const Links = [
    { name: 'Tasks', address: '/' },
    { name: 'Focus', address: './focus' },
    { name: 'Analytics', address: './analytics' },
    { name: 'Account', address: './account' }
]


const ChakraNavbarLogged = (props: any) => {
    const { colorMode, toggleColorMode } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Box bg={useColorModeValue('rgba(255,255,255,0)', 'rgba(0,0,0,0)')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>


                    <HStack spacing={4} alignItems={'center'}>
                        <IconButton
                            size={'md'}
                            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                            aria-label={'Open Menu'}
                            display={{ md: 'none' }}
                            onClick={isOpen ? onClose : onOpen}
                        />
                        <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader borderBottomWidth='1px'>
                                    <Button
                                        variant={'solid'}
                                        colorScheme={'gray'}
                                        size={'sm'}
                                        mr={4}
                                        leftIcon={<PiMountainsFill />}>
                                        LOGO
                                    </Button>
                                </DrawerHeader>
                                <DrawerBody>
                                    <Stack>
                                        {Links.map((link: any) => (
                                            <SideBarLink key={link.name} address={link.address}>{link.name}</SideBarLink>
                                        ))}
                                    </Stack>
                                </DrawerBody>
                            </DrawerContent>
                        </Drawer>
                        <Button
                            variant={'solid'}
                            colorScheme={'gray'}
                            size={'sm'}
                            mr={4}
                            leftIcon={<PiMountainsFill />}>
                            LOGO
                        </Button>
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link: any) => (
                                <NavLink key={link.name} address={link.address}>{link.name}</NavLink>
                            ))}
                        </HStack>
                    </HStack>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={4}>
                            <Button
                                variant={'solid'}
                                colorScheme={'gray'}
                                size={'sm'}
                                mt={1}
                                onClick={() => signOutWithGoogle(props)}
                                leftIcon={<GrGoogle />}>
                                Sign out
                            </Button>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>


                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={readImageURL()}
                                    />
                                </MenuButton>
                                <MenuList alignItems={'center'} bg={useColorModeValue('white', 'black')}>
                                    <br />
                                    <Center>
                                        <Avatar
                                            size={'2xl'}
                                            src={readImageURL()}
                                        />
                                    </Center>
                                    <br />
                                    <Center>
                                        <p>{getFirstName()}</p>
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                    <NewMenuItem>Account</NewMenuItem>
                                    <NewMenuItem>Logout</NewMenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

export default ChakraNavbarLogged