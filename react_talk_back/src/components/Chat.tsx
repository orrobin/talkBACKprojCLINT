import { Center,Stack,Heading,Text, Box, Input, Textarea,Button, List, ListItem, Container, InputGroup, InputRightElement, list, Divider } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { SocketContext } from "../context/SocketContext"
import {Message} from '../models/Message'
import {User} from '../models/user'

export function Chat() {
    const socketContext = useContext(SocketContext)
    const [connectedUsers, setconnectedUsers] = useState<User[]>([])
    const [messages ,setMessages] = useState<Message[]>([])
    const [text, setText] = useState('')
    
    useEffect(() => {
        socketContext.socket.on('new-message-server', (newMessage: Message) => {
            setMessages([...messages, newMessage]
            )
        })
        socketContext.socket.on("newConnenction", (data: User[]) => {
            setconnectedUsers(data);
            console.log(data)
        })
    }, [])



    const sendMessage = () => {
        setText('')
        socketContext.socket.emit('new-message', { message: text })
    }

    const onTextAreaKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // If "Enter" was pressed
        if (event.keyCode === 13)
            sendMessage()
    }

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp)
        const hours = getTwoDigits(date.getHours())
        const minutes = getTwoDigits(date.getMinutes())
        const seconds = getTwoDigits(date.getSeconds())

        return `${hours}:${minutes}:${seconds}`
    }

    const getTwoDigits = (n: number) => {
        return n < 10 ? '0' + n : n
    }

    return (
        <Container height="100vh" display="flex"  padding="10px 0" maxW="container.md">
            <Stack  display="flex" flexDir="column"  height="100%" padding="10px">
                <Text>
                    Connected Users:
                </Text>
                <List>
                    {connectedUsers.map((user,index) => (
                        <ListItem key={index}>
                                <Box>
                                    <Text>
                                        {user.userName}
                                    </Text>
                                </Box>
                        </ListItem>
                    ))}
                </List>
                <span>

                </span>
            </Stack>
            <Stack borderLeft="1px solid darkGrey" paddingLeft="5px" flex="1" >
                <Heading textAlign='center'>Chat page</Heading>   
                <List 
                    spacing={4} 
                    height="100%"
                    overflowY='auto'
                    boxShadow='xs'
                    p='2'
                    rounded='lg'
                >
                    {messages.map((message, index) => (
                        <>
                            {message.userName === socketContext.user
                            ?
                                <ListItem key={index} display='flex' justifyContent='flex-start'>
                                    <Box>
                                        <Text fontSize='x-small' ms='1'>
                                            {"me, " + formatDate(message.date)}
                                        </Text>
                                        <Box rounded='lg' boxShadow='xs' p='2' mt='1' backgroundColor='green.300' display='inline-block'>
                                            {message.content}
                                        </Box>
                                    </Box>
                                </ListItem>
                            :
                                <ListItem key={index} display='flex' justifyContent='flex-end'> 
                                    <Box>
                                        <Text fontSize='x-small' ms='1'>
                                            {message.userName + ", " + formatDate(message.date)}
                                        </Text>
                                        <Box rounded='lg' boxShadow='xs' p='2' mt='1' backgroundColor='blue.300' display='inline-block'>
                                            {message.content}
                                        </Box>
                                    </Box>
                                </ListItem>
                            }
                            <br/>
                        </>
                    ))}                       
                </List>
                <InputGroup size="md">
                    <Input 
                        placeholder="Put your Text here"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onKeyDown={onTextAreaKeyPress}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={sendMessage} colorScheme="blue">
                            Send
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Stack>
        </Container>
    )
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                