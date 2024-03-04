document.addEventListener("DOMContentLoaded", function() {
    // Function to shuffle and randomize stanzas
    function shuffleAndRandomizeStanzas() {
      const poemContainer = document.querySelector('.poem');
      const stanzasHU = Array.from(poemContainer.querySelectorAll('.poemHU > div'));
      const stanzasENG = Array.from(poemContainer.querySelectorAll('.poemENG > div'));
  
      // Shuffle the stanzas
      shuffleArray(stanzasHU);
      shuffleArray(stanzasENG);
  
      // Define the boundaries of the area for randomization (example: 25% to 75% of window width and height)
      const minX = window.innerWidth * 0.25;
      const minY = window.innerHeight * 0.25;
      const maxX = window.innerWidth * 0.75;
      const maxY = window.innerHeight * 0.75;
  
      const usedCoordinates = []; // Array to store used coordinates
  
      stanzasHU.forEach(function(stanza) {
        randomizeStanza(stanza, usedCoordinates, minX, minY, maxX, maxY);
        poemContainer.appendChild(stanza);
      });
  
      stanzasENG.forEach(function(stanza) {
        randomizeStanza(stanza, usedCoordinates, minX, minY, maxX, maxY);
        poemContainer.appendChild(stanza);
      });
    }
  
    // Function to shuffle array
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  
    // Function to randomize stanza position and rotation within a specific area
    function randomizeStanza(stanza, usedCoordinates, minX, minY, maxX, maxY) {
      const stanzaWidth = stanza.offsetWidth;
      const stanzaHeight = stanza.offsetHeight;
  
      let randomX, randomY;
      do {
        randomX = Math.random() * (maxX - minX) + minX;
        randomY = Math.random() * (maxY - minY) + minY;
  
        // Check if the current coordinates collide with any used coordinates
        var collision = usedCoordinates.some(coord => {
          return (
            randomX < coord.x + coord.width &&
            randomX + stanzaWidth > coord.x &&
            randomY < coord.y + coord.height &&
            randomY + stanzaHeight > coord.y
          );
        });
      } while (collision); // Repeat until no collision is detected
  
      const randomRotation = Math.random() * 360; // Random rotation angle
  
      stanza.style.position = "absolute";
      stanza.style.left = randomX + "px";
      stanza.style.top = randomY + "px";
      stanza.style.transform = "rotate(" + randomRotation + "deg)";
  
      // Add the current coordinates to the usedCoordinates array
      usedCoordinates.push({
        x: randomX,
        y: randomY,
        width: stanzaWidth,
        height: stanzaHeight
      });
    }
  
    // Attach click event listener to the poem container
    const poemContainer = document.querySelector('.poem');
    poemContainer.addEventListener('click', shuffleAndRandomizeStanzas);
  });
  