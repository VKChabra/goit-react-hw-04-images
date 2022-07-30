import { ThreeDots } from 'react-loader-spinner';
import styles from './loader.module.css';

const Loader = () => {
  return (
    <div className={styles.Loader}>
      <ThreeDots width="100" radius="9" color="#4fa94d" />
    </div>
  );
};

export default Loader;
