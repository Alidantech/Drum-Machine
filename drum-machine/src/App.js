import React, { useState, useEffect } from 'react';
import './App.css';

const drumPadsData = [
  { id: 'Heater-1', key: 'Q', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', name: 'Heater 1' },
  { id: 'Heater-2', key: 'W', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', name: 'Heater 2' },
  { id: 'Heater-3', key: 'E', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', name: 'Heater 3' },
  { id: 'Heater-4', key: 'A', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', name: 'Heater 4' },
  { id: 'Clap', key: 'S', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', name: 'Clap' },
  { id: 'Open-HH', key: 'D', src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', name: 'Open-HH' },
  { id: 'Kick-n\'-Hat', key: 'Z', src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', name: 'Kick-n\'-Hat' },
  { id: 'Kick', key: 'X', src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', name: 'Kick' },
  { id: 'Closed-HH', key: 'C', src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', name: 'Closed-HH' }
];

const DrumPad = ({ padId, keyTrigger, src, name, onClick }) => (
  <div className="col">
    <div className="drum-pad btn btn-primary" id={padId} onClick={onClick}>
      {keyTrigger}
      <audio className="clip" id={keyTrigger} src={src} />
    </div>
  </div>
);

function App() {
  const [volume, setVolume] = useState(0.5);
  const [displayText, setDisplayText] = useState('Drum Machine');

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const handlePadClick = (padId) => {
    const drumPad = drumPadsData.find((pad) => pad.id === padId);
    if (drumPad) {
      playAudio(drumPad.key);
      setDisplayText(drumPad.name);
    }
  };

  const handleKeyDown = (event) => {
    const drumPad = drumPadsData.find((pad) => pad.key === event.key.toUpperCase());
    if (drumPad) {
      playAudio(drumPad.key);
      setDisplayText(drumPad.name);
    }
  };

  const playAudio = (keyTrigger) => {
  const audioElement = document.getElementById(keyTrigger);
  if (audioElement && audioElement.paused) {
    audioElement.currentTime = 0;
    audioElement.volume = volume;
    audioElement.play().catch((error) => {
      console.error('Failed to play audio:', error);
    });
  }
};


  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div id="drum-machine" className="container text-center">
      <div className="row">
        {drumPadsData.map((pad) => (
          <DrumPad
            key={pad.id}
            padId={pad.id}
            keyTrigger={pad.key}
            src={pad.src}
            name={pad.name}
            onClick={() => handlePadClick(pad.id)}
          />
        ))}
      </div>
      <div className="row">
        <div className="col">
          <div id="display" className="mb-4">
            {displayText}
          </div>
        </div>
        <div className="col">
          <div className="form-group my-4">
            <label htmlFor="volumeRange">Volume</label>
            <input
              type="range"
              id="volumeRange"
              className="form-control-range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
