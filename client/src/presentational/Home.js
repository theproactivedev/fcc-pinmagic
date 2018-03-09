import React, { Component } from 'react';
import Photos from '../containers/Photos';
import { connect } from 'react-redux';
import { getAllPhotos } from '../actions.js';
import { ClipLoader } from 'react-spinners';

class Home extends Component {
  componentWillMount() {
    this.props.dispatch(getAllPhotos());
  }

  render() {
    return (
      <div className="container home">

      <div className="spinner">
        <ClipLoader
          color={'#3c3c3d'}
          loading={this.props.isFetching}
        />
      </div>

      {!this.props.isFetching &&
        <Photos isUserAuthenticated={false} photos={this.props.allPhotos} />
      }

      </div>
    );
  }
}

function mapStateToProps(state) {
  const { allPhotos, isFetching } = state;
  return { allPhotos, isFetching };
}

export default connect(mapStateToProps)(Home);
