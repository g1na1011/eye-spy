import React from 'react';
import { Link } from 'react-router-dom';
import { ipcRenderer } from 'electron';

// import { HomeScreenSize } from '../home';

export default function OverlaySettings() {
  // useEffect(() => {
  //   ipcRenderer.send('change-window-size', HomeScreenSize.SMALL);
  // });

  const handleBackClick = async () => {
    ipcRenderer.send('close-overlay-windows');
  };

  const handleOpacityClick = (opacity: number) => {
    ipcRenderer.send('set-opacity', opacity);
  };

  const handleShowOverlay = () => {
    ipcRenderer.send('show-overlays');
  };

  const handleHideOverlay = () => {
    ipcRenderer.send('hide-overlays');
  };

  return (
    <div className="wrapper">
      <Link to="/">
        <button className="backBtn" type="button" onClick={handleBackClick}>
          ←
        </button>
      </Link>
      <br />
      <h2>Overlay Settings</h2>
      <br />
      <div className="hideShowBtns">
        <button
          className="overlayBtn"
          type="button"
          onClick={handleShowOverlay}
        >
          Show Overlay Window(s)
        </button>
        <button
          className="overlayBtn"
          type="button"
          onClick={handleHideOverlay}
        >
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
