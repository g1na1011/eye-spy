import React from 'react';
import { Link } from 'react-router-dom';
import { ipcRenderer } from 'electron';

export default function OverlaySettings() {
  const handleOpacityClick = (opacity: number) => {
    ipcRenderer.send('set-opacity', opacity);
  };

  const handleShowOverlay = () => {
    ipcRenderer.send('show-overlay');
  };

  const handleHideOverlay = () => {
    ipcRenderer.send('hide-overlay');
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <br />
      <h2>Overlay settings</h2>
      <br />
      <div className="buttonWrapper">
        <button
          className="overlayBtn"
          type="button"
          onClick={handleShowOverlay}
        >
          Show Overlay Window(s)
        </button>
        <button type="button" onClick={handleHideOverlay}>
          Hide Overlay Window(s)
        </button>
      </div>
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
