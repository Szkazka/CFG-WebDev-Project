document.addEventListener("DOMContentLoaded", function() {
    // Function to shuffle and randomize stanzas
    function shuffleAndRandomizeStanzas() {
      //change heading
      document.querySelector('#mainBanner').setAttribute('hidden',true)
      document.querySelector('#shuffledBanner').removeAttribute('hidden')


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
      const minY = 40;
      const maxX = shuffleArea.offsetWidth;
      const maxY = shuffleArea.offsetHeight;
  
      const usedCoordinates = []; // Array to store used coordinates
  
      stanzasHU.forEach(function(stanza) {
        randomizeStanza(stanza, usedCoordinates, minX, minY, maxX, maxY, 30);
        poemContainer.appendChild(stanza);
        // Add click event listener to each stanza
        stanza.addEventListener('click', function(){
            stanzaClickHandler(stanza)
        });
      });
  
      stanzasENG.forEach(function(stanza) {
        randomizeStanza(stanza, usedCoordinates, minX, minY, maxX, maxY, 30);
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
    function randomizeStanza(stanza, usedCoordinates, minX, minY, maxX, maxY, margin) {
      const stanzaWidth = stanza.offsetWidth + margin * 2;
      const stanzaHeight = stanza.offsetHeight + margin * 2;
      
  
      let randomX, randomY;
    
      do {
        randomX = Math.random() * (maxX - minX - stanzaWidth) + minX;
        randomY = Math.random() * (maxY - minY - stanzaHeight) + minY;
               
  
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
        const stanzas = document.querySelectorAll('#stanzaENG1, #stanzaENG2, #stanzaENG3, #stanzaENG4');
        
        stanzas.forEach(stanza => {
            stanza.removeEventListener('click', stanzaClickHandler);
            stanza.removeAttribute('style')
            stanza.classList.add('poemENG') 
            stanza.style.display = 'flex'
            stanza.style.transform = 'none'
            stanza.style.margin = ''
        });
        const poemEngClass = document.querySelectorAll('.poemENG');
        poemEngClass.forEach(poemEngClass => {
          poemEngClass.style.marginLeft = '';
          poemEngClass.style.marginBottom = '';
        })
      const parent = document.querySelector('.shuffleArea');
      parent.style.display = 'block'
      const stanzaEng1 = document.getElementById('stanzaENG1');
      const stanzaEng2 = document.getElementById('stanzaENG2');
      const stanzaEng3 = document.getElementById('stanzaENG3');
      const stanzaEng4 = document.getElementById('stanzaENG4');

      // Move child3 to the end
      parent.appendChild(stanzaEng1);
      parent.appendChild(stanzaEng2);
      parent.appendChild(stanzaEng3);
      parent.appendChild(stanzaEng4);
    }

    
    // Function to handle stanza click event
     function stanzaClickHandler(stanza) {
        // You can define the behavior when a stanza is clicked here
        stanza.classList.toggle('bold');
        let totalStanzas = document.querySelectorAll('#stanzaHU1, #stanzaHU2, #stanzaHU3, #stanzaHU4');
        let boldStanzas = document.querySelectorAll('.bold').length;
        // Check if all stanzas are now bold
        if (boldStanzas === totalStanzas.length) {
            const video = document.querySelector('.videoContainer')
            video.style.display = 'flex'
            const banner = document.getElementById('shuffledBanner')
            banner.style.display = 'none'
            totalStanzas.forEach(function(stanza){
              stanza.setAttribute('hidden',true)
            })
            undoShuffleAndRandomizeStanzas()
            const parent = document.querySelector('.shuffleArea');
            
            const englishBanner = document.querySelector('#englishBanner');
            parent.insertBefore(englishBanner,parent.firstChild)
            englishBanner.removeAttribute('hidden') 
        }
    }    
  });