import styles from './button.module.css';
import PropTypes from 'prop-types';

const LoadMoreBtn = ({ loadMoreClick }) => {
  return (
    <button type="button" className={styles.Button} onClick={loadMoreClick}>
      Load more
    </button>
  );
};

LoadMoreBtn.propTypes = {
  loadMoreClick: PropTypes.func.isRequired,
};

export default LoadMoreBtn;
