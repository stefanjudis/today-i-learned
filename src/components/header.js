import React, { Component } from 'react';
import Modal from 'react-modal';
import './header.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class Header extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <header>
        <nav className="c-header__nav">
          Today I learned
          <button
            type="button"
            className="c-header__button o-btn"
            onClick={this.openModal}
          >
            Set up your own!
          </button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2 ref={subtitle => (this.subtitle = subtitle)}>Hello</h2>
            <button onClick={this.closeModal}>close</button>
            <div>You want to let's set this up for your learning journey!</div>
            <ul>
              <li>Fork clone this repo</li>
              <li>Run npm install</li>
              <li>Run npm run setup to get your content ready</li>
              <li>Deploy seemlessly to netlify</li>
              <li>
                <strong>Start learning</strong>
              </li>
            </ul>
          </Modal>
        </nav>
      </header>
    );
  }
}

export default Header;
