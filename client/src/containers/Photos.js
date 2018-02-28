import Masonry from 'react-masonry-component';
import React, { Component } from 'react';
import Photo from '../presentational/Photo.js'
import defaultImg from '../img/370x228.jpg';

export default class Photos extends Component {
  addDefaultSrc(ev){
    ev.target.src = defaultImg;
  }

  render() {
    let images = [];
    if(this.props.photos !== undefined) {
      images = this.props.photos.map((img, index) => {
        return (
          <Photo index={index} title={img.title} url={img.url}
          deletePhoto={this.props.deletePhoto}
          addDefaultSrc={this.addDefaultSrc.bind(this)} />
        );
      });
    }
    var masonryOptions = {
      transitionDuration: 0
    };

    return (
      <Masonry
        className={'my-gallery-class'} // default ''
        elementType={'ul'} // default 'div'
        options={masonryOptions} // default {}
        disableImagesLoaded={false} // default false
        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
      >
        {images}
      </Masonry>
    );
  }
}
