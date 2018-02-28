import React, { Component } from 'react';
import Photos from '../containers/Photos';
import { connect } from 'react-redux';
import { getAllPhotos } from '../actions.js';

class Home extends Component {
  componentWillMount() {
    this.props.dispatch(getAllPhotos());
  }

  render() {
    return (
      <div className="container">
        <h1>Pin Magic</h1>
        <p>Share here your magical moments in your life. Be yourself.</p>
        <Photos photos={this.props.allPhotos} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { allPhotos } = state;
  return { allPhotos };
}

export default connect(mapStateToProps)(Home);
