import { post } from "axios";
import React, { useEffect, useState } from 'react';
import styled from "styled-components";

const fontSize = 1;
const canvasHeight = window.innerHeight - 4;
const canvasWidth = window.innerWidth - 4;

const Emoji = () => {
  const [ws] = useState(connect())
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: canvasWidth },
        height: { ideal: canvasHeight }
      }
    }).then(function (stream) {
      getVideo().srcObject = stream;
      getVideo().play();
    }).catch(function (err) {
      console.error("Error 😩... ", err);
    });

    getCanvas().font = `${fontSize}px Arial`;
    getCanvas().clearRect(0, 0, canvasWidth, canvasHeight);
    return () => ws.close()
  }, [])

  const takePicture = () => {
    console.log("Snap! 📷")
    var context = getSnapshot().getContext("2d");
    getSnapshot().width = canvasWidth;
    getSnapshot().height = canvasHeight;
    context.drawImage(getVideo(), 0, 0, canvasWidth, canvasHeight);

    getSnapshot().toBlob(fileUpload);
    getSnapshot().getContext("2d").clearRect(0, 0, canvasHeight, canvasWidth);
  }

  return (
    <ContainerStyle>
      <CanvasStyle
        onClick={takePicture}
        id="canvas"
        width={canvasWidth}
        height={canvasHeight}
      />
      <SnapshotStyle id="snapshot" />
      <video />
    </ContainerStyle>
  );
}



const connect = () => {
  var connection = new WebSocket(`ws://localhost:4000/ws`);

  connection.onopen = () => console.log("Connected 👍");
  connection.onerror = () => console.log("Error 💀");
  connection.onclose = () => console.log("Bye bye 👋")
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


function getCanvas() {
  return document.getElementById("canvas") && document.getElementById("canvas").getContext("2d", { alpha: true, desynchronized: true });
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

const ContainerStyle = styled.div`
text-align: center;
video{
  display: none;
}
`
const CanvasStyle = styled.canvas`
border: 2px dashed #ffdb80;
background: white;
`

const SnapshotStyle = styled.canvas`
display: none;
`
export default Emoji;