import React from 'react';
import { Button } from 'react-bootstrap';

const Photo = ({index, title, url, deletePhoto, addDefaultSrc}) => {
  return (
    <li className="img" key={index}>
      <img onError={addDefaultSrc} src={url} alt={title} />
      <div className="overlay">
        <div className="text">
        <p>{title}</p>
        <Button bsStyle="danger" bsSize="small" onClick={() => {deletePhoto(title)}}>Delete image</Button>
        </div>
      </div>
    </li>
  );
};

export default Photo;
