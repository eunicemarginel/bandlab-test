const songs = [
    {
      name: 'New Wave Kit',
      url: 'https://cdn.glitch.com/3fbe69b3-3f37-400c-b091-3c0b436ecb3f%2Fnew-wave-kit.ogg?v=1597079706818'
    }, 
    {
      name: 'Synth Organ',
      url: 'https://cdn.glitch.com/3fbe69b3-3f37-400c-b091-3c0b436ecb3f%2Fsynth-organ.ogg?v=1597079755404'
    }
  ];

// Ensures #songs is rendered before executing the function to avoid #songs being null
setTimeout(function() {
    songs.forEach((song, index) => {
        let div = document.createElement('div'),
        playButton = document.createElement('button'),
        songName = document.createElement('h3');
    
        div.className = "song";
        playButton.id = `play${index}`;
    
        playButton.innerHTML = '▶';
        songName.innerHTML = song.name;
    
        div.appendChild(playButton);
        div.appendChild(songName);
        document.getElementById('songs').appendChild(div);
        playButton.onclick = (event) => play(event, index, `play${index}`);
    });
}, 0);

  function play(event, index, id) {
    const context = new AudioContext();  
    fetch(songs[index].url)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        const source = context.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(context.destination);
        source.start();
        const playButton = document.getElementById(id);
        playButton.innerHTML = "◼︎"
        playButton.onclick = () => stop(playButton, index, source); 
        source.onended = () => stop(playButton, index, source);
    });
  }
  
  function stop(playButton, index, source) {
      playButton.innerHTML = "►"
      source.stop(0);
      playButton.onclick = (event) => play(event, index, `play${index}`);
  };
  
  