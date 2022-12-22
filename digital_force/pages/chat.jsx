import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import ChatBody from '../Components/ChatBody';
import Cover from '../Components/Cover';
import Users from '../Components/Users';
export default ({users}) => {
  const [currentUser,setCurrentUser] = useState(undefined)
  const [chatUser,setChatUser] = useState(undefined)

  const socket = useRef(null)
  useEffect(()=>{
    if(localStorage.getItem("userId")){
      setCurrentUser(localStorage.getItem("userId"))
    }
  },[])
  useEffect(() => {
    fetch('/api/socket').finally(() => {
      socket.current = io()

      socket.current.on('connect', () => {
        console.log('connect')
        socket.current.emit('hello')
      })

      socket.current.on('disconnect', () => {
        console.log('disconnect')
      })

      socket.current.emit('add-user',currentUser)


    })

  }, [currentUser]) // Added [] as useEffect filter so it will be executed only once, when component is mounted

  const changeChatUser = (newUser)=>{
    setChatUser(newUser)
  }
  return (
    <>
    <Users changeChatUser={changeChatUser} users={users}/>
    {
      chatUser?<ChatBody chatUser={chatUser} currentUser={currentUser} socket={socket}/>:(<Cover />)
    }
    
    </>
  )
}

export async function getServerSideProps(ctx) {

  // request posts from api
  // let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/user`);
  let response = await fetch(`http://localhost:3000/api/allUser`);
  // extract the data
  let users = await response.json();

  return {
    props: {
      users
    },
  };
}