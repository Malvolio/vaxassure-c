import React, { FC } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

export const Photograph: FC<{ onSave: (d: string) => void }> = ({ onSave }) => {
  const maxImage = {
    width: 300,
    height: 375,
  };
  return (
    <div className="page">
      <h2>Photograph</h2>
      <div style={maxImage}>
        <Camera
          idealResolution={{ width: 300, height: 375 }}
          onTakePhotoAnimationDone={onSave}
          imageType="jpg"
        />
      </div>
      <p className="instructions">Take a photograph of the patient.</p>
    </div>
  );
};
