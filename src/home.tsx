import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [images, setImages] = useState([]);

  const onChange = async (e: any) => {
    const files: any = Array.from(e.target.files);
    setImages(files);
  };

  return (
    <div className="homeWrapper">
      <div>
        <h2 className="homeTitle">eye spy</h2>
        <div className="uploadInstructions">
          <div>how to use the tool:</div>
          <ol>
            <li>
              export the selected Figma artboard in jpg or png format (upper
              right in Figma)
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
        <h3 className="uploadText">upload image(s):</h3>
        <input
          accept="image/png, image/jpeg, image/jpg"
          id="file-selector"
          multiple
          onChange={onChange}
          type="file"
        />
      </div>
      <div>
        {images.map((image: any) => (
          <img key={image.name} src={image.path} alt={image.name} />
        ))}
      </div>
      <Link to="/settings">Go to overlay settings</Link>
    </div>
  );
};

export default Home;
