let player;

    function onYouTubeIframeAPIReady() {
      player = new YT.Player('player', {
        height: '315',
        width: '560',
        videoId: '5j2ZUmKhdKQ', // Replace VIDEO_ID with your YouTube video ID
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    }

    function onPlayerReady(event) {
      // You can perform actions when the player is ready
    }

    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.ENDED) {
        // Perform the action you want to happen after the video has finished
        const video = document.querySelector('#player')
        video.style.display = 'none'
        const img = document.createElement('img');
        img.src = './József attila arcai.webp'
        img.style.width = '560px'
        img.style.height = '315px'
        const container = document.querySelector('h2');
        container.appendChild(img)
      }
    }