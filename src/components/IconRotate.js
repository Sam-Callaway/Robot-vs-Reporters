import React, { useState, useEffect, useRef } from 'react';

function RotatedImage({ src, degrees }) {
  const [rotatedSrc, setRotatedSrc] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      canvas.width = image.width;
      canvas.height = image.height;

      ctx.save();
      ctx.translate(image.width / 2, image.height / 2);
      ctx.rotate((degrees * Math.PI) / 180);
      ctx.drawImage(image, -image.width / 2, -image.height / 2);
      ctx.restore();

      setRotatedSrc(canvas.toDataURL());
    };
    image.src = src;
  }, [src, degrees]);

  return <img src={rotatedSrc} alt="Rotated" ref={canvasRef} />;
}