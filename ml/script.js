let net;
const video = document.getElementById('video');

async function app() {
  console.log('Loading MobileNet...');
  net = await mobilenet.load();
  console.log('Successfully loaded MobileNet.');

  const webcam = await tf.data.webcam(video);
  while (true) {
    const img = await webcam.capture();
    const result = await net.classify(img);

    document.getElementById('console').innerText = `
      prediction: ${result[0].className}\n
      probability: ${result[0].probability}
    `;

    // Dispose the tensor to release the memory.
    img.dispose();
    await tf.nextFrame();
  }
}

app();