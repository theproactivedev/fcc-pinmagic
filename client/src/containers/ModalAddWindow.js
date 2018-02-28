import React, { Component } from 'react';
import { Modal, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { addPhoto } from '../actions.js';
import { connect } from 'react-redux';

class ModalAddWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgUrl: "",
      imgTitle: ""
    };

    this.handleImgUrlChange = this.handleImgUrlChange.bind(this);
    this.handleImgTitleChange = this.handleImgTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleImgUrlChange(e) {
    this.setState({imgUrl: e.target.value});
  }

  handleImgTitleChange(e) {
    this.setState({imgTitle: e.target.value});
  }

  handleSubmit() {
    this.props.dispatch(addPhoto({
      url: this.state.imgUrl,
      title: this.state.imgTitle
    }, this.props.user.userToken));
    this.props.closeModal();
  }

  render() {
    return (
      <div>
        <Modal show={this.props.open} onHide={this.props.closeModal}>

          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup>
                <ControlLabel>Image URL</ControlLabel>
                <input type="url" name="imgUrl" className="form-control" value={this.state.imgUrl} onChange={this.handleImgUrlChange} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Image Title</ControlLabel>
                  <input type="text" name="imgTitle" className="form-control" value={this.state.imgTitle} onChange={this.handleImgTitleChange} />
              </FormGroup>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.handleSubmit}>Add Photo</Button>
          </Modal.Footer>

        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, isUserAuthenticated } = state;
  return { user, isUserAuthenticated };
}

export default connect(mapStateToProps)(ModalAddWindow);
