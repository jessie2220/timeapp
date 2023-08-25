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
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { GrGoogle } from 'react-icons/Gr'
import { PiMountainsFill } from 'react-icons/Pi'
import { signInWithGoogle } from './Hero'
import { isLoggedIn } from '../functions'

interface Props {
  children: React.ReactNode
}

const NavLink = (props: Props) => {
  const { children } = props

  return (
    <Box
      as="a"
      px={2}
      py={1}
      color={useColorModeValue('white', 'black')}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}>
      {children}
    </Box>
  )
}


const Links = ['About?']


const ChakraNavbar = (props:any) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Box bg={useColorModeValue('rgba(255,255,255,0)', 'rgba(255,255,255,0)')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={2} alignItems={'center'}>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <Button
              variant={'solid'}
              colorScheme={'gray'}
              size={'sm'}
              mr={4}
              leftIcon={<PiMountainsFill />}>
              LOGO
            </Button>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
                // <Button
                // variant={'solid'}
                // colorScheme={'gray'}
                // size={'sm'}
                // >
                // <NavLink key={link}>{link}</NavLink>
                // </Button>
              ))}
            </HStack>
          </HStack>




          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={2}>
              <Button
                variant={'solid'}
                colorScheme={'gray'}
                size={'sm'}
                mt={1}
                onClick={() => signInWithGoogle(props)} disabled={isLoggedIn()}
                leftIcon={<GrGoogle />}>
                Sign in with google
              </Button>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default ChakraNavbar