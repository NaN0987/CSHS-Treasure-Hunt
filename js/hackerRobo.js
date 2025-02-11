const gifContainer = document.createElement("div");
document.body.appendChild(gifContainer);
gifContainer.style.position = "fixed";
gifContainer.style.pointerEvents = "none"; // Prevents interference with user input
gifContainer.id = "gifContainer"

const maxGifs = 5; // Maximum number of GIFs to display at once
const gifDuration = 8000; // Duration a GIF stays visible (in ms)
const gifDelay = 100; // Delay between each new GIF appearing (in ms)
const gifs = [];

const imagePaddingLeft = 20;
const imagePaddingRight = 20;
const imagePaddingUp = 20;
const imagePaddingDown = 20;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class GifParticle {
  constructor() {
    this.x = getRandomNumber(imagePaddingLeft, window.innerWidth - imagePaddingRight);
    this.y = getRandomNumber(imagePaddingUp, window.innerHeight - imagePaddingDown);
    this.size = Math.random() * 400 + 50; // Random size between 50px and 150px
    this.opacity = 1; // Initial opacity
    this.element = document.createElement("img"); // Use <img> element for GIFs
    this.element.src = `images/first/robo${Math.round(Math.random() * 4 + 1)}.gif`; // Replace with the path to your GIF
    this.element.style.position = "absolute";
    this.element.style.width = `${this.size}px`;
    this.element.style.height = `${this.size}px`;
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
    this.element.style.opacity = `${this.opacity}`; // Initial visibility
    this.element.style.transform = "translate(-50%, -50%)"
    gifContainer.appendChild(this.element);
  }

  show() {
    this.element.style.opacity = "1"; // Make the GIF fully visible
  }

  hide() {
    this.opacity = Math.max(0, this.opacity - 0.005); // Gradually reduce opacity
    this.element.style.opacity = `${this.opacity}`;
    if (this.opacity <= 0) {
      this.element.remove(); // Remove the element from DOM when fully faded
    }
  }
  
  endThyself() {
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
      gif.updateInterval = setInterval(() => {
        gif.hide();
        if (gif.opacity <= 0) {
          clearInterval(gif.updateInterval); // Stop fading when invisible
        }
      }, 20);
      
      // Automatically delete images after gifDuration has elapsed
      setTimeout(() => {
        clearInterval(gif.updateInterval)
        gif.endThyself()
        delete gif
      }, gifDuration + 1000)

      // Restart the cycle after all GIFs have faded out
      if (i === maxGifs - 1) {
        setTimeout(showGifs, gifDuration + 1000);
      }
    }, i * gifDelay);
  }
}

// Start the GIF cycle
setTimeout(showGifs, gifDuration)
