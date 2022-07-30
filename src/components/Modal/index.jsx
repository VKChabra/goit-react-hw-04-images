import { useEffect } from 'react';
import styles from './modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ url, alt, onClose }) => {
  useEffect(() => {
    const onKeyEscape = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyEscape);

    return () => {
      window.removeEventListener('keydown', onKeyEscape);
    };
  }, [onClose]);

  const onClickOverlay = e => {
    if (e.target.tagName !== 'IMG') {
      onClose();
    }
  };

  return (
    <div className={styles.Overlay} onClick={onClickOverlay}>
      <div className={styles.Modal}>
        <img src={url} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
