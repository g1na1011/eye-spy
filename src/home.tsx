import React, { useState } from 'react';

const Home = () => {
  const [images, setImages] = useState([]);

  const onChange = async (e: any) => {
    const files: any = Array.from(e.target.files);
    setImages(files);
  };

  return (
    <div>
      <div>
        <div>upload image here:</div>
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
    </div>
  );
};

export default Home;
