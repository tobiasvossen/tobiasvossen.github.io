const video = document.getElementById('video');
const config = {
  audio: false,
  video: {
    facingMode: 'user'
  }
};

var webcam;
var running = true;

async function app() {
  document.getElementById('top').innerText = "Loading MobileNet...";
  let net = await mobilenet.load();
  document.getElementById('top').innerText = "MobileNet ready";

  webcam = await tf.data.webcam(video, config);
  while (running) {
    const img = await webcam.capture();
    document.getElementById('top').innerText = "Webcam open";
    const result = await net.classify(img);

    document.getElementById('bottom').innerText = `
      Prediction: ${result[0].className}\n
      Probability: ${result[0].probability}
    `;

    // Dispose the tensor to release the memory.
    img.dispose();
    await tf.nextFrame();
  }
}

function stop_video() {
  running = false;
  webcam.stop();
  document.getElementById('top').innerText = "Webcam closed";
  document.getElementById('bottom').innerText = "No prediction";
}

document.getElementById("stop").addEventListener("click", function(button) {
  stop_video();
  button.disabled = true;
});

app();