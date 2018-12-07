import * as React from 'react'
import { post } from 'axios'

const fontSize = 1.5

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: null }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.connect()
    this.canvasSize=10000
  }

  componentDidMount() {
    document.getElementById("drawingCanvas").getContext('2d').font = `${fontSize}px Arial`
    document.getElementById("drawingCanvas").getContext('2d').clearRect(0, 0, this.canvasSize, this.canvasSize)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <input type="file" onChange={this.onChange} />
          <button type="submit">Upload</button>
        </form>
        <canvas ref='drawingCanvas' id='drawingCanvas' width={this.canvasSize} height={this.canvasSize} />
      </div>
    )
  }

  connect() {
    var connection = new WebSocket(`ws://localhost:4000/ws`)

    connection.onopen = () => console.log('Connected :D ')
    connection.onerror = () => console.log("there was an error with the connection!")
    connection.onmessage = (message) => {
      const data = JSON.parse(message.data)
      switch (data.type) {
        case "draw":
          this.drawLine(data.content)
          break;
        case "clean":
          document
          .getElementById("drawingCanvas")
          .getContext('2d')
          .clearRect(0, 0, this.canvasSize, this.canvasSize)
          break;
        default:
          break;
      }

    }
  }

  onFormSubmit(e) {
    e.preventDefault()
    fileUpload(this.state.file)
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] })
  }

  drawLine(line) {
    line.map(this.drawCell)
  }

  drawCell({ height, width, alpha }) {
    document.getElementById("drawingCanvas").getContext('2d').globalAlpha = alpha
    document.getElementById("drawingCanvas").getContext('2d').fillText('😄', fontSize * width, fontSize * height)
  }
}


function fileUpload(file) {
  const url = 'http://localhost:4000/upload';
  const formData = new FormData();
  formData.append('file', file)
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  return post(url, formData, config)
}
export default App;
