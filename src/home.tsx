import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ipcRenderer } from 'electron';

import figmaExportImage from '../assets/images/figmaExport.png';
import figmaFrameImage from '../assets/images/figmaFrame.png';

export enum HomeScreenSize {
  LARGE = 'large',
  SMALL = 'small',
}

const Home = () => {
  const [images, setImages] = useState([] as File[]);

  useEffect(() => {
    ipcRenderer.send('change-window-size', HomeScreenSize.LARGE);
  });

  const onChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const files: File[] = Array.from(target.files as FileList);
    setImages(files);
  };

  const createOverlay = () => {
    images.forEach((image) => {
      ipcRenderer.send('set-overlay-image', image.name, image.path);
    });
  };

  const resetImages = () => {
    setImages([]);
  };

  return (
    <div className="wrapper">
      <h2 className="homeTitle">eye spy</h2>
      {images.length > 0 ? (
        <div className="overlayHomeSection">
          <div className="fileSection">
            {images.map((image: File) => (
              <img
                className="overlayPreview"
                key={image.name}
                src={image.path}
                alt={image.name}
              />
            ))}
          </div>
          <Link to="/settings">
            <button
              className="createOverlay"
              onClick={createOverlay}
              type="button"
            >
              {images.length > 1 ? 'Create overlays!' : 'Create overlay!'}
            </button>
          </Link>
          <span
            className="resetButton"
            onClick={resetImages}
            onKeyDown={resetImages}
            role="button"
            tabIndex={0}
          >
            Reset
          </span>
        </div>
      ) : (
        <>
          <div className="uploadInstructions">
            <div>how to use the tool:</div>
            <ol>
              <li>
                <div>select the desired Figma frame you want to use</div>
                <img
                  className="figmaImage"
                  src={figmaFrameImage}
                  alt="figma_frame_example"
                />
              </li>
              <li>
                <div>
                  export the selected Figma frame in jpg or png format
                  (upper-right hand corner in Figma)
                </div>
                <img
                  className="figmaImage"
                  src={figmaExportImage}
                  alt="figma_export_example"
                />
              </li>
              <li>
                upload the exported file below (note: multiple images will open
                multiple windows)
              </li>
              <li>drag and position the window over your current work</li>
              <li>compare work with specs</li>
              <li>fix code as needed</li>
            </ol>
          </div>
          <h3>upload image(s):</h3>
          <input
            accept="image/png, image/jpeg, image/jpg"
            id="file-selector"
            multiple
            onChange={onChange}
            type="file"
          />
        </>
      )}
    </div>
  );
};

export default Home;
