import { post } from "axios";
import * as React from "react";
import styles from "./Emoji.css";

const fontSize = 1;
const canvasHeight = window.innerHeight - 4;
const canvasWidth = window.innerWidth - 4;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: { ideal: canvasWidth },
          height: { ideal: canvasHeight }
        }
      })
      .then(function(stream) {
        getVideo().srcObject = stream;
        getVideo().play();
      })
      .catch(function(err) {
        console.error("Error in 📷!", err);
      });
    const ws = this.connect();
    this.state = { ws };
  }

  componentWillUnmount() {
    this.state.ws.close();
  }

  componentDidMount() {
    getCanvas().font = `${fontSize}px Arial`;
    getCanvas().clearRect(0, 0, canvasWidth, canvasHeight);
  }

  render() {
    return (
      <div className={styles.container}>
        <div>
          <canvas
            onClick={this.takePicture}
            ref="canvas"
            id="canvas"
            className={styles.canvas}
            width={canvasWidth}
            height={canvasHeight}
          />
        </div>

        <canvas ref="snapshot" id="snapshot" className={styles.snapshot} />
        <video />
      </div>
    );
  }

  takePicture() {
    var context = getSnapshot().getContext("2d");
    getSnapshot().width = canvasWidth;
    getSnapshot().height = canvasHeight;
    context.drawImage(getVideo(), 0, 0, canvasWidth, canvasHeight);

    getSnapshot().toBlob(fileUpload);
    getSnapshot()
      .getContext("2d")
      .clearRect(0, 0, canvasHeight, canvasWidth);
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
          getCanvas().clearRect(0, 0, canvasHeight, canvasWidth);
          break;
        default:
          break;
      }
    };
    return connection;
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
