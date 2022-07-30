import { Component } from 'react';
import styles from './modal.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyEscape);
  }

  onKeyEscape = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onClickOverlay = e => {
    if (e.target.tagName !== 'IMG') {
      this.props.onClose();
    }
  };

  render() {
    const { url, alt } = this.props;
    const { onClickOverlay } = this;
    return (
      <div className={styles.Overlay} onClick={onClickOverlay}>
        <div className={styles.Modal}>
          <img src={url} alt={alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
