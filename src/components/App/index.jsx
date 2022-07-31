import { useState, useEffect } from 'react';
import fetchImages from 'services/Api.js';
import Searchbar from 'components/Searchbar';
import Loader from 'components/Loader';
import ImageGallery from 'components/ImageGallery';
import LoadMoreBtn from 'components/Button';
import Modal from 'components/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './app.module.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ alt: '', url: '' });
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const fetchSearchQuery = async () => {
      try {
        setLoading(true);
        const { hits, totalHits } = await fetchImages(searchQuery, page);
        if (hits.length === 0) {
          setLoading(false);
          notifyError('Nothing was found for your query, try something else');
        } else {
          setLoading(false);
          setImages(prevImages => [...prevImages, ...hits]);
          setTotalHits(totalHits);
        }
      } catch (error) {
        notifyError(error);
        setLoading(false);
      }
    };
    fetchSearchQuery();
  }, [page, searchQuery]);

  const idleMarkup = () => (
    <h2 className={styles.Idle}>Please enter search query first</h2>
  );

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (url, alt) => {
    setModal({ url, alt });
  };

  const closeModal = () => {
    setModal({ url: '', alt: '' });
  };

  const notifyError = message =>
    toast.error(message, {
      autoClose: 2500,
    });

  const { url, alt } = modal;
  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      {!searchQuery && idleMarkup()}
      <div className={styles.Resolved}>
        <ImageGallery images={images} onImageClick={openModal} />
        {!loading && images.length < totalHits && (
          <LoadMoreBtn loadMoreClick={loadMore} />
        )}
        {url && <Modal url={url} alt={alt} onClose={closeModal} />}
      </div>
      {loading && <Loader />}
      <ToastContainer />
    </div>
  );
};
