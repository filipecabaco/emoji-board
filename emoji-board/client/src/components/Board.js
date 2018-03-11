import * as React from 'react'
import { connect } from 'react-redux'
import { post } from 'axios'

const fontSize = 1.5
const mapStateToProps = (state) => ({
    content: state.boardReducer.content,
    clean: state.boardReducer.clean,
  })

class Board extends React.Component{
  constructor(props) {
    super(props);
    this.state ={ file:null }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    })
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

  render(){
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <input type="file" onChange={this.onChange} />
          <button type="submit">Upload</button>
        </form>
        <canvas ref='drawingCanvas' id='drawingCanvas' width={window.innerWidth} height={window.innerHeight}>
        {this.props.clean ? this.cleanCanvas() : this.drawCells(this.props.content, this.refs.drawingCanvas)}
        </canvas>
      </div>
    )
  }

  cleanCanvas(){
    const canvas = this.refs.drawingCanvas
    if(!canvas) {return ''}
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  drawCells({type, content}, target) {
    switch (type) {
      case "image":
        content.forEach(c => this.drawCell(c, target))
        break;

      case "video":
        content.forEach(c => this.drawCell(c, target))
        break;
      default:
        break;
    }
  }

  drawCell({height, width, alpha}){
    const canvas = this.refs.drawingCanvas
    if(!canvas) {return}
    const context = canvas.getContext('2d')
    context.font=`${fontSize}px Arial`
    context.globalAlpha = alpha
    const drawXCord = Math.floor(fontSize * width)
    const drawYCord = Math.floor(fontSize * height)
    context.fillText('😄', drawXCord, drawYCord)
  }


}

export default connect(mapStateToProps)(Board)