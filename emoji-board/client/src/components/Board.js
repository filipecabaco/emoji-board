import * as React from 'react'
import { connect } from 'react-redux'
import { post } from 'axios'

const fontSize = 1.5

class Board extends React.Component{
  constructor(props) {
    super(props);
    this.state = { file: null }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  onFormSubmit(e){
    e.preventDefault()
    this.fileUpload(this.state.file)
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }

  fileUpload(file){
    const url = 'http://emoji-server:4000/upload';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return  post(url, formData,config)
  }
  componentDidMount(){
    this.canvas = this.getCanvasContext()
    this.canvas.font=`${fontSize}px Arial`
  }

  componentDidUpdate(){
    this.canvas = this.getCanvasContext()
    this.canvas.font=`${fontSize}px Arial`
  }

  render(){
    const { content } = this.props
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <input type="file" onChange={this.onChange} />
          <button type="submit">Upload</button>
        </form>
        <canvas ref='drawingCanvas' id='drawingCanvas' width={window.innerWidth} height={window.innerHeight}>
        {content && this.drawCells(content, this.refs.drawingCanvas)}
        </canvas>
      </div>
    )
  }

  drawCells({content}, target) {
    this.cleanCanvas()
    content.forEach(c => {
      this.drawCell(c, target)
    })
  }

  drawCell({height, width, alpha}){
    this.canvas.globalAlpha = alpha
    const drawXCord = fontSize * width
    const drawYCord = fontSize * height
    this.canvas.fillText('😄', drawXCord, drawYCord)
  }

  cleanCanvas(){
    const canvas = this.refs.drawingCanvas
    if(canvas){
      this.canvas.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  getCanvasContext(){
    const canvas = this.refs.drawingCanvas
    if(!canvas) { throw new Error("Canvas not here") }
    return canvas.getContext('2d')
  }
}

const mapStateToProps = (state) => ({
  content: state.boardReducer.content,
  clean: state.boardReducer.clean,
})

export default connect(mapStateToProps)(Board)