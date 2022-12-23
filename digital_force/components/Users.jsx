import { Box, Text, Input, Flex, Image } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';

const Users = ({ users, changeChatUser }) => {
    const [bg,setBg] = useState(false)
    return (
        <Box overflowY="scroll" bg="gray.100" pos="fixed" left="0" h="100vh" w="25vw">
            <Input display="block" mx='auto' my="1.5rem" w="75%" borderRadius="1.3rem" placeholder="Search" p=".8rem 1.5rem" 
                fontSize="1rem" fontWeight="bold" bg="gray.300" variant='unstyled' 
            />
            {
                users && users.map((item) => (


                    <Flex alignItems="center" p=".8rem 0 0 1.2rem"  _hover={{ bg: "gray.300" }} 
                        borderBottom="1px solid gray.900" cursor="pointer" key={item._id}
                    >
                        <Image
                            borderRadius='full'
                            boxSize='25px'
                            src='https://cdn.iconscout.com/icon/free/png-128/profile-233-436968.png'
                            alt='Dummy placeholder'
                        />
                        <Text textTransform="uppercase" fontWeight="bold" color="darkblue" p="14px 1rem"
                            onClick={() => changeChatUser(item._id,item.firstName)}
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