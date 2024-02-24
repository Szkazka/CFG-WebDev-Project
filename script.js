document.addEventListener("DOMContentLoaded", function() {
    // Function to shuffle and randomize stanzas
    function shuffleAndRandomizeStanzas() {
      const poemContainer = document.querySelector('.poem');
      const shuffleArea = document.querySelector('.shuffleArea');

       // Create array from the stanzas
      const stanzasHU = Array.from(poemContainer.querySelectorAll('.poemHU > div'));
      const stanzasENG = Array.from(poemContainer.querySelectorAll('.poemENG > div'));
  
      // Shuffle the stanzas
      shuffleArray(stanzasHU);
      shuffleArray(stanzasENG);
  
      // Define the boundaries of the area for randomization (example: 25% to 75% of window width and height)
      const minX = 0;
      const minY = 0;
      const maxX = shuffleArea.offsetWidth;
      const maxY = shuffleArea.offsetHeight;
  
      const usedCoordinates = []; // Array to store used coordinates
  
      stanzasHU.forEach(function(stanza) {
        randomizeStanza(stanza, usedCoordinates, minX, minY, maxX, maxY);
        poemContainer.appendChild(stanza);
        // Add click event listener to each stanza
        stanza.addEventListener('click', function(){
            stanzaClickHandler(stanza)
        });
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
  
      const randomRotation = Math.random() * 60; // Random rotation angle
  
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

    function undoShuffleAndRandomizeStanzas() {
        // Remove event listeners from stanzas // Reset CSS styles for stanzas
        const stanzas = document.querySelectorAll('.poem > div');
        stanzas.forEach(stanza => {
            stanza.removeEventListener('click', stanzaClickHandler);
            stanza.removeAttribute('style');
           if (stanza.className === 'bold') {
            stanza.classList.toggle('bold');
           }
            console.log(stanza)
        });
    }

    
    // Function to handle stanza click event
     function stanzaClickHandler(stanza) {
        // You can define the behavior when a stanza is clicked here
        stanza.classList.toggle('bold');
        let totalStanzas = document.querySelectorAll('#stanzaHU1, #stanzaHU2, #stanzaHU3, #stanzaHU4').length;
        let boldStanzas = document.querySelectorAll('.bold').length;
        // Check if all stanzas are now bold
        if (boldStanzas === totalStanzas) {
            const video = document.getElementsByTagName('iframe')[0]
            video.removeAttribute('hidden')
            const banner = document.querySelector('h1')
            banner.setAttribute('hidden', true)
            poemContainer.setAttribute('hidden',true)
            undoShuffleAndRandomizeStanzas()    
        }
    }    
  });