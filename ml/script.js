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

    document.getElementById('pred').innerText = `Prediction: ${result[0].className}`;
    document.getElementById('prob').innerText = `Probability: ${result[0].probability}`;

    img.dispose();
    await tf.nextFrame();
  }
}

function stop_video() {
  running = false;
  webcam.stop();
  document.getElementById('top').innerText = "Webcam closed";
}

document.getElementById("stop").addEventListener("click", function(button) {
  stop_video();
  button.disabled = true;
});

app();