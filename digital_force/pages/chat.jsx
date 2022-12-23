import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import ChatBody from '../components/ChatBody';
import Cover from '../components/Cover';
import Users from '../components/Users';
import { useRouter } from 'next/navigation';
export default ({users}) => {
  const [currentUser,setCurrentUser] = useState(undefined)
  const [chatUser,setChatUser] = useState(undefined)
  const router = useRouter()

  const socket = useRef(null)
  useEffect(async()=>{
    let user = await JSON.parse(localStorage.getItem('userInfo'))

    if(user && user._id){
      setCurrentUser(user._id);
    }else{
        router.push('/login')
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

  }, [currentUser]) 

  //  this is handle by chatbody components
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