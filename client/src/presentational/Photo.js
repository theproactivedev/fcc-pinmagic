import React from 'react';
import { Button } from 'react-bootstrap';

const Photo = ({title, url, deletePhoto, addDefaultSrc, isUserAuthenticated}) => {
  return (
    <li className="img">
      <img onError={addDefaultSrc} src={url} alt={title} />
      <p>{title}
      {isUserAuthenticated &&
        <Button className="float-right" bsStyle="danger" bsSize="small" onClick={() => {deletePhoto(title)}}>Delete</Button>
      }
      </p>

    </li>
  );
};

export default Photo;
