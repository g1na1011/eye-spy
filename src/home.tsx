import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import figmaExportImage from '../assets/images/figmaExport.png';
import figmaFrameImage from '../assets/images/figmaFrame.png';

const Home = () => {
  const [images, setImages] = useState([]);

  const onChange = async (e: any) => {
    const files: any = Array.from(e.target.files);
    setImages(files);
  };

  return (
    <div className="homeWrapper">
      <h2 className="homeTitle">eye spy</h2>
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
              export the selected Figma frame in jpg or png format (upper-right
              hand corner in Figma)
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
      {images.map((image: any) => (
        <img key={image.name} src={image.path} alt={image.name} />
      ))}

      <Link to="/settings">Go to overlay settings</Link>
    </div>
  );
};

export default Home;
