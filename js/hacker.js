const otherCanvas = document.getElementById("numberCanvas");
const otherCTX = otherCanvas.getContext("2d");

otherCanvas.width = window.innerWidth;
otherCanvas.height = window.innerHeight;

const gifContainer = document.createElement("div");
document.body.appendChild(gifContainer);
gifContainer.style.position = "fixed";
gifContainer.style.pointerEvents = "none"; // Prevents interference with user input

const maxGifs = 5; // Maximum number of GIFs to display at once
const gifDuration = 3000; // Duration a GIF stays visible (in ms)
const gifDelay = 100; // Delay between each new GIF appearing (in ms)
const gifs = [];
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
class GifParticle {
  constructor() {
    this.x = getRandomNumber(0 + 50, window.innerWidth - 300);
    this.y = getRandomNumber(0 + 50, window.innerHeight - 500);
    this.size = Math.random() * 200 + 50; // Random size between 50px and 150px
    this.opacity = 1; // Initial opacity
    this.element = document.createElement("img"); // Use <img> element for GIFs
    this.element.src = `images/hacker${Math.round(Math.random() * 4 + 1)}.gif`; // Replace with the path to your GIF
    this.element.style.position = "absolute";
    this.element.style.width = `${this.size}px`;
    this.element.style.height = `${this.size}px`;
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
    this.element.style.opacity = `${this.opacity}`; // Initial visibility
    gifContainer.appendChild(this.element);
  }

  show() {
    this.element.style.opacity = "1"; // Make the GIF fully visible
  }

  hide() {
    this.opacity = Math.max(0, this.opacity - 0.01); // Gradually reduce opacity
    this.element.style.opacity = `${this.opacity}`;
    if (this.opacity <= 0) {
      this.element.remove(); // Remove the element from DOM when fully faded
    }
  }
  
  hide2() {

      this.element.remove(); // Remove the element from DOM when fully faded
  }
}

function showGifs() {
  for (let i = 0; i < maxGifs; i++) {
    setTimeout(() => {
      const gif = new GifParticle();
      gif.show();
      gifs.push(gif);

      // Gradually fade out the GIFs after duration
      const fadeInterval = setInterval(() => {
        gif.hide();
        if (gif.opacity <= 0) {
          clearInterval(fadeInterval); // Stop fading when invisible
        }
      }, 20);

      // Restart the cycle after all GIFs have faded out
      if (i === maxGifs - 1) {
        setTimeout(showGifs, gifDuration + 1000);
      }
    }, i * gifDelay);
  }
  let greenDownloadButton = new GifParticle();
  greenDownloadButton.element.style.width = `${300}px`;
  greenDownloadButton.element.src = `images/greenDownload.png`;
  greenDownloadButton.show();
  setTimeout(() => {
    greenDownloadButton.hide2();
  }, gifDuration+1500);
}

// Start the GIF cycle
showGifs();
