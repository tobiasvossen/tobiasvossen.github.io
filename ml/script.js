const video = document.getElementById('video');
const config = {
  audio: false,
  video: {
    facingMode: 'user'
  }
};

let net;
let webcam;

async function initialize() {
  document.getElementById('top').innerText = "Loading MobileNet...";
  net = await mobilenet.load();
  document.getElementById('top').innerText = "MobileNet ready";
  document.getElementById("start").disabled = false;
}

async function start() {
  webcam = await tf.data.webcam(video, config);
  document.getElementById('top').innerText = "Webcam open";
  document.getElementById("start").disabled = true;
  document.getElementById("stop").disabled = false;
  while (true) {
    const img = await webcam.capture();
    const result = await net.classify(img);

    document.getElementById('pred').innerText = `Prediction: ${result[0].className}`;
    document.getElementById('prob').innerText = `Probability: ${result[0].probability}`;

    img.dispose();
    await tf.nextFrame();
  }
}

function stop() {
  webcam.stop();
  document.getElementById('top').innerText = "Webcam closed";
  document.getElementById("stop").disabled = true;
  document.getElementById("start").disabled = false;
}

document.getElementById("start").addEventListener("click", function() { 
  start();
});

document.getElementById("stop").addEventListener("click", function() {
  stop();
});

initialize();