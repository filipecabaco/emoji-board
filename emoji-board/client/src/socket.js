// import { changeAction, startAction } from './actions/boardActions'

export function connect(store){
  var connection = new WebSocket(`ws://localhost:4000/ws?id=${window.name}`)

  const opts = {
    params: {id: window.name}
  }

  connection.onopen = () => console.log('Connected :D ')
  connection.onerror = () => console.log("there was an error with the connection!")
  connection.onmessage = (message) => {
    try {
      const json = JSON.parse(message.data)
      console.log(json)
      //store.dispatch(changeAction(msg))
      //store.dispatch(startAction())
    } catch (e) {
      throw e
    }
  }
}