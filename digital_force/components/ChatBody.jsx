import React, { useEffect, useState } from 'react'
import { Box, Input, Button, Text,Flex } from '@chakra-ui/react'
import axios from 'axios';

const ChatBody = ({ chatUser, currentUser,socket }) => {
    const [text, setText] = useState('');
    const [userMsg, setUserMsg] = useState([])
    const [arrivalMessage,setArrivalMessage] = useState(undefined)
    useEffect(() => {
        async function getUser() {
            let data = await axios.post('http://localhost:3000/api/message/getMessage', {
                from: currentUser,
                to: chatUser
            })
            setUserMsg(data.data)
        }
        getUser()
    }, [chatUser])
    // console.log(userMsg)


    const addText = async () => {

        socket.current.emit('send-message',{
            from:currentUser,
            to:chatUser,
            msg:text
        })
        await axios.post('http://localhost:3000/api/message/addMessage', {
            from: currentUser,
            to: chatUser,
            message: text
        })

        let updated = [...userMsg, { self: true, message: text }];
        setUserMsg(updated);

    }

    useEffect(() => {
        if (socket.current) {
            socket.current.on("message-recieve", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setUserMsg((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);


    return (
        <Box ml="25vw" w="75vw" >
            <Box p='2rem 3rem' overflowY="scroll"  h="85vh" w="75vw" bg="gray.900">
                {userMsg.length > 0 && userMsg.map((item, i) => (
                    <Flex  m=".4rem 0"  key={i} justifyContent={item.self?"flex-end":'flex-start'} >
                        <Text borderRadius="1rem" p="5px 1rem" bg={item.self?"gray.400":"gray.200"}  >
                            {item.message}
                        </Text>
                    </Flex>
                ))}
            </Box>
            <Flex p="1rem"  gap=".4rem" bg="gray.600" >
                <Input placeholder="Enter here" pl="1.5rem" 
                    fontSize="1rem" fontWeight="bold"  borderRadius="none" bg="gray.300" 
                    variant='unstyled' value={text} 
                    onChange={(e) => setText(e.target.value)}
                />
                <Button borderRadius="none" colorScheme="blue" onClick={addText} >send</Button>
            </Flex>
        </Box>
    )
}

export default ChatBody