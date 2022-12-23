import { Server } from 'socket.io'

// console.log(global)
global.onLineUsers = new Map();

// api end point socket
const ioHandler = (req, res) => {
  // console.log(res.socket.server.io)
  if (!res.socket.server.io) {
    console.log('*First use, starting socket.io')

    const io = new Server(res.socket.server)

    io.on('connection', socket => {
      global.chatSocket = socket;
      // socket.broadcast.emit('a user connected')
      socket.on('add-user',(mongoId)=>{
        // when user is login we store his mongoId and socketId
        onLineUsers.set(mongoId,socket.id);
        console.log(onLineUsers)
      });

    socket.on('send-message',(info)=>{
      // info contains to,from and message - to and from are mongoId of sender and receiver
      console.log("lets- check",info)
      const checkOnline = onLineUsers.get(info.to);
      // we store mongoId and socketId as a key value pairs in map checkOnline give us socketId
      if(checkOnline){
        console.log(checkOnline,info)
        socket.to(checkOnline).emit('message-recieve',info.msg)
      }
    })
    })

    res.socket.server.io = io
  } else {
    console.log('socket.io already running')
  }
  res.end()
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default ioHandler