import React, { useEffect, useState } from 'react';
import { ipcRenderer, IpcRendererEvent } from 'electron';

export default function OverlayImage() {
  const [imagePath, setImagePath] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  useEffect(() => {
    ipcRenderer.on(
      'image',
      (event: IpcRendererEvent, alt: string, path: string) => {
        event.preventDefault();
        setImageAlt(alt);
        setImagePath(path);
      }
    );
  });

  return (
    <div>
      <img src={imagePath} alt={imageAlt} />
    </div>
  );
}
