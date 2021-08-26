import {  ChakraProvider, extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import  SignIn  from './components/SignIn';
import {Chat} from './components/Chat'; 
import { useMemo, useState } from 'react';
import {SocketContext, SocketContextValue} from './context/SocketContext'
import {ProtectedRoute} from './components/ProtectedRoute'
import {Profile} from './components/Profile'
import { io } from "socket.io-client"
const socket = io("ws://localhost:3002");

const theme = extendTheme({}, withDefaultColorScheme({ colorScheme: 'facebook' }));

function App() {
  const [user, setUser] = useState('')

// socket.on('newConnenction', (data) => {
// 					console.log('new Connenction send from server to client ',data.data,data.id)
// 				})

  const socketContextValue: SocketContextValue = {
    connect: (userName: string) => {
      socket.emit('enter', { userName })
      setUser(userName)
    },
    socket,
    user
  }

  return (
    <ChakraProvider theme={theme}>
      <SocketContext.Provider value={socketContextValue}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route path='/sign-in' component={SignIn}/>
            <ProtectedRoute path='/profile' component={Profile}/>
          </Switch>
        </BrowserRouter>
      </SocketContext.Provider>
    </ChakraProvider>
  )
}

export default App;
