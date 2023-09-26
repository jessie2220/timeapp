//import React from 'react'
import { Box, Container, VStack, useColorModeValue } from '@chakra-ui/react'
import { getFirstName, readDisplayName, readEmail, readImageURL } from '../functions'
import styled from 'styled-components'


const Img = styled.img`
border-radius: 50%; 
width: auto;
height: auto;
`


const AccountDisplay = () => {

    return (
        <>
            <Container p={20} bg={useColorModeValue('bgLight.100', 'bgDark.900')} textAlign={'center'} flexDir={'column'} rounded={'3xl'} mt={'15%'}>
                <div className='text-center'>
                    <Box fontWeight="700" fontSize="30">Hello {getFirstName()}</Box>
                </div>
                <VStack mt={12} spacing={8}>
                    <p>Account info:</p>
                    <p>Name: {readDisplayName()}</p>
                    <p>Email: {readEmail()}</p>
                    <Img src={readImageURL()} />
                </VStack>
            </Container>



            <div className='h-screen'></div>
        </>
    )
}

export default AccountDisplay