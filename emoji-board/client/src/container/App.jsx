import * as React from "react";
import { post } from "axios";
import styles from "./App.css";

const fontSize = 1;
const canvasSize = 800;

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(function(stream) {
    getVideo().srcObject = stream;
    getVideo().play();
  })
  .catch(function(err) {
    console.error("Error in 📷!", err);
  });

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: null };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.connect();
  }

  componentDidMount() {
    getCanvas().font = `${fontSize}px Arial`;
    getCanvas().clearRect(0, 0, canvasSize, canvasSize);
  }

  render() {
    return (
      <div className={styles.container}>
        <button onClick={this.takePicture}>Take Photo!</button>
        <canvas
          ref="canvas"
          id="canvas"
          width={canvasSize}
          height={canvasSize}
        />
        <canvas ref="snapshot" id="snapshot" className={styles.snapshot} />
        <video />
      </div>
    );
  }

  takePicture() {
    var context = getSnapshot().getContext("2d");
    getSnapshot().width = canvasSize;
    getSnapshot().height = canvasSize;
    context.drawImage(getVideo(), 0, 0, canvasSize, canvasSize);

    getSnapshot().toBlob(fileUpload);
    getSnapshot()
      .getContext("2d")
      .clearRect(0, 0, canvasSize, canvasSize);
  }

  connect() {
    var connection = new WebSocket(`ws://localhost:4000/ws`);

    connection.onopen = () => console.log("Connected 👍");
    connection.onerror = () => console.log("Error 💀");
    connection.onmessage = message => {
      const data = JSON.parse(message.data);
      switch (data.type) {
        case "draw":
          data.content.map(drawCell);
          break;
        case "clean":
          getCanvas().clearRect(0, 0, canvasSize, canvasSize);
          break;
        default:
          break;
      }
    };
  }

  onFormSubmit(e) {
    e.preventDefault();
    fileUpload(this.state.file);
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }
}

function getCanvas() {
  return document.querySelector("canvas").getContext("2d");
}
function getVideo() {
  return document.querySelector("video");
}
function getSnapshot() {
  return document.getElementById("snapshot");
}

function drawCell({ height, width, alpha }) {
  getCanvas().globalAlpha = alpha;
  getCanvas().fillText("😄", fontSize * width, fontSize * height);
}

function fileUpload(file) {
  const url = "http://localhost:4000/upload";
  const formData = new FormData();
  formData.append("file", file);
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  return post(url, formData, config);
}
