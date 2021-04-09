import React from 'react';
import { Link } from 'react-router-dom';

const { ipcRenderer } = require('electron');

export default function OverlaySettings() {
  const handleOpacityClick = (opacity: number) => {
    ipcRenderer.send('set-opacity', opacity);
  };

  const handleShowOverlay = () => {
    ipcRenderer.send('show-overlay');
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <br />
      <h2>Overlay settings</h2>
      <br />
      <button type="button" onClick={handleShowOverlay}>
        Show Overlay
      </button>
      <br />
      <div>
        <h3>Opacity</h3>
        <button
          className="opacityBtn"
          type="button"
          onClick={() => handleOpacityClick(0.2)}
        >
          20%
        </button>
        <button
          className="opacityBtn"
          type="button"
          onClick={() => handleOpacityClick(0.5)}
        >
          50%
        </button>
        <button
          className="opacityBtn"
          type="button"
          onClick={() => handleOpacityClick(1)}
        >
          100%
        </button>
      </div>
    </div>
  );
}
