import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';

export default function OverlayImage() {
  const [imagePath, setImagePath] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  useEffect(() => {
    ipcRenderer.on('image', (event, alt: string, path: string) => {
      setImageAlt(alt);
      setImagePath(path);
    });
  });

  return (
    <div>
      <img src={imagePath} alt={imageAlt} />
    </div>
  );
}
