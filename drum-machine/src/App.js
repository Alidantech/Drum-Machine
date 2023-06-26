import React, { useState } from 'react';
import './App.css';

const DrumPad = ({ id, src, text, onClick }) => (
  <div className="drum-pad btn btn-secondary" id={`drum-pad-${id}`} onClick={onClick}>
    {text}
    <audio className="clip" id={id} src={src}></audio>
  </div>
);

const App = () => {
  const [displayText, setDisplayText] = useState('');
  const [volume, setVolume] = useState(0.5);

  const handlePadClick = (event) => {
  const audio = event.target.querySelector('audio');
  if (!audio.paused) {
    audio.currentTime = 0;
  }
  audio.volume = volume;
  audio.play();
  setDisplayText(event.target.id);
};

const handleKeyDown = (event) => {
  const drumPad = document.getElementById(`drum-pad-${event.key.toUpperCase()}`);
  if (drumPad) {
    const audio = drumPad.querySelector('audio');
    if (!audio.paused) {
      audio.currentTime = 0;
    }
    audio.volume = volume;
    audio.play();
    setDisplayText(drumPad.id);
  }
};

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div id="drum-machine" className="container well">
      <div id="display" className="display-4 mb-4">{displayText}</div>
      <div className="volume-bar">
        <label htmlFor="volume">Volume</label>
        <div className="input-group">
          <input
            type="range"
            id="volume"
            className="form-range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
          <span className="volume-icon"><i className="fas fa-volume-up"></i></span>
        </div>
      </div>
      <div id="drum-pads" className="row">
        <div className="col-md-4">
          <DrumPad id="Heater 1" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" text="Q" onClick={handlePadClick} />
        </div>
        <div className="col-md-4">
          <DrumPad id="Heater 2" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" text="W" onClick={handlePadClick} />
        </div>
        <div className="col-md-4">
          <DrumPad id="Heater 3" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" text="E" onClick={handlePadClick} />
        </div>
        <div className="col-md-4">
          <DrumPad id="Heater 4" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" text="A" onClick={handlePadClick} />
        </div>
        <div className="col-md-4">
          <DrumPad id="Clap" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" text="S" onClick={handlePadClick} />
        </div>
        <div className="col-md-4">
          <DrumPad id="Open-HH" src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" text="D" onClick={handlePadClick} />
        </div>
        <div className="col-md-4">
          <DrumPad id="Kick-n'-Hat" src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" text="Z" onClick={handlePadClick} />
        </div>
        <div className="col-md-4">
          <DrumPad id="Kick" src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" text="X" onClick={handlePadClick} />
        </div>
        <div className="col-md-4">
          <DrumPad id="Closed-HH" src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" text="C" onClick={handlePadClick} />
        </div>
      </div>
    </div>
  );
};

export default App;
