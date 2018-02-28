import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import ModalAddButton from './ModalAddButton';
import Photos from './Photos';
import { connect } from 'react-redux';
import { getUserPhotos, deletePhoto } from '../actions.js';

class Board extends Component {
  componentWillMount() {
    this.props.dispatch(getUserPhotos(this.props.user.userToken));
  }

  // componentDidUpdate(nextProps) {
  //   if (this.props.userPhotos !== nextProps.userPhotos) {
  //     this.props.dispatch(getUserPhotos(this.props.user.userToken));
  //   }
  // }
  componentWillReceiveProps(nextProps) {
    // console.log("Is it this?");
    if (this.props.userPhotos !== nextProps.userPhotos) {
      this.props.dispatch(getUserPhotos(this.props.user.userToken));
    }
  }

  deletePhoto(title) {
    this.props.dispatch(deletePhoto(title, this.props.user.userToken));
  }

  render() {
    return (
      <Grid>
        <div>
          <h2>My Board</h2>
          <ModalAddButton />
        </div>
        <div>
          <Photos photos={this.props.userPhotos} deletePhoto={this.deletePhoto.bind(this)} />
        </div>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  const { user, userPhotos } = state;
  return { user, userPhotos };
}

export default connect(mapStateToProps)(Board);
