// import React from 'react'
import styled from 'styled-components';
import { isLoggedIn } from '../functions'
import { signInWithGoogle } from './Hero';

'use client'

import {
  Box,
  Heading,
  Container,
  Text,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'

const Button = styled.button`
color: white;
font-size: auto;
padding: 10px;
border-radius: 5px;
margin: 10px 0px;
cursor: pointer;
transition:  0.25s;
border-radius: 8px;
width: 100%
`;

const Hero1st = (props:any) => {
  return (
      <>
          <Container maxW={'8xl'} h={'calc(94vh)'} p={20} mt={'12%'}>
              <Stack
                  as={Box}
                  textAlign={'center'}
                  color={useColorModeValue('textLight.100', 'textDark.900')}
                  bg={useColorModeValue("bgLight.100", "bgDark.900")}
                  rounded={'3xl'}
                  shadow={'mainShadow'}
                  spacing={{ base: 8, md: 14 }}
                  py={{ base: 10, md: 26 }}
                  px={{ base: 10, md: 26 }}
                  >
                  <Heading
                      fontWeight={700}
                      fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                      lineHeight={'110%'}
                  >
                      Gamified to-do list
                  </Heading>
                  <Text
                    fontWeight={700}
                    fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}
                    mt={{ base: -5, md: -10 }}
                  >
                    with powerful features.
                  </Text>
                  <Text
                  fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}
                  >
                    Start your journey of self discipline and productivity with [name of app (trek?)].
                  </Text>
                  <Container w={{base:'150px', sm:'200px'}}>
                    <Button className='shadow-md bg-gradient-to-r from-green-400 to-primary-500 hover:from-pink-500 hover:to-yellow-500 font-medium' onClick={() => signInWithGoogle(props)} disabled={isLoggedIn()}>Sign in with Google</Button>
                  </Container>
              </Stack>
          </Container>
      </>
  )
}

export default Hero1st