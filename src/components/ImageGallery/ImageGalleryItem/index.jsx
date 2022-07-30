import styles from './imageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({
  largeImageURL,
  smallImgUrl,
  tags,
  onImageClick,
}) => {
  return (
    <li
      className={styles.ImageGalleryItem}
      onClick={() => onImageClick(largeImageURL, tags)}
    >
      <img
        src={smallImgUrl}
        alt={tags}
        className={styles.ImageGalleryItem_image}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  smallImgUrl: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
