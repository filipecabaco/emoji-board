import { Socket } from 'phoenix'
import { changeAction, startAction } from './actions/boardActions'

export function connect(store){
  const opts = {
    transport: require('websocket').w3cwebsocket,
    params: {id: window.name}
  }
  let socket = new Socket('ws://localhost:4000/socket', opts)
  socket.onError( () => console.log("there was an error with the connection!") )
  socket.onClose( () => console.log("the connection dropped") )
  socket.connect()

  let channel = socket.channel('emoji:*')
  channel.on('emoji:joined', msg => console.log(socket))
  channel.on('emoji:draw', msg => store.dispatch(changeAction(msg)))
  channel.on('emoji:start', msg => store.dispatch(startAction()))

  channel.join()
  .receive('ok', () => console.log('Connected :D ') )
  .receive('error', ({reason}) => console.log('Failed join :( ', reason) )
  .receive('timeout', () => console.log('Networking issue. Still waiting... :| '))
}