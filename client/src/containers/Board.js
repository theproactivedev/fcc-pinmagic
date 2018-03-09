import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import ModalAddButton from './ModalAddButton';
import Photos from './Photos';
import { connect } from 'react-redux';
import { getUserPhotos, deletePhoto } from '../actions.js';
import { ClipLoader } from 'react-spinners';

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
        <div className="spinner">
          <ClipLoader
            color={'#3c3c3d'}
            loading={this.props.isFetching}
          />
        </div>
        {!this.props.isFetching &&
          <Photos isUserAuthenticated={true} photos={this.props.userPhotos} deletePhoto={this.deletePhoto.bind(this)} />
        }
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  const { user, userPhotos, isFetching } = state;
  return { user, userPhotos, isFetching };
}

export default connect(mapStateToProps)(Board);
