import { Box, Text, Input, Flex, Image } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';

const Users = ({ users, changeChatUser }) => {
    const [bg,setBg] = useState(false)
    return (
        <Box bg="gray.100" pos="fixed" left="0" h="100vh" w="25vw">
            <Input display="block" mx='auto' my="1.5rem" w="75%" borderRadius="1.3rem" placeholder="Search" p=".8rem 1.5rem" 
                fontSize="1rem" fontWeight="bold" bg="gray.300" variant='unstyled' 
            />
            {
                users && users.map((item) => (


                    <Flex p=".8rem 0 0 1.2rem"  _hover={{ bg: "gray.300" }} 
                        borderBottom="1px solid gray.900" cursor="pointer" key={item._id}
                    >
                        <Image
                            borderRadius='full'
                            boxSize='40px'
                            src='https://bit.ly/dan-abramov'
                            alt='Dan Abramov'
                        />
                        <Text fontWeight="bold" color="darkblue" p="14px 1rem"
                            onClick={() => changeChatUser(item._id)}
                        >
                            {item.firstName}
                        </Text>

                    </Flex>


                ))
            }
        </Box>
    )
}

export default Users