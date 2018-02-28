import React, { Component } from 'react';
import ModalAddWindow from './ModalAddWindow';
import { Button } from 'react-bootstrap';

export default class ModalAddButton extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    }
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  showModal() {
    this.setState({
      open: true
    });
  }

  closeModal() {
    this.setState({
      open: false
    });
  }

  render() {
    return(
      <div className="modalButton">
        <Button bsStyle="danger" onClick={this.showModal}>Add Photo</Button>
        <ModalAddWindow closeModal={this.closeModal} showModal={this.showModal} open={this.state.open} />
      </div>
    );
  }
}
