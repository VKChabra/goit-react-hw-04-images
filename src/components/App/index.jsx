import { useState, useEffect } from 'react';
import fetchImages from 'services/Api.js';
import Searchbar from 'components/Searchbar';
import Loader from 'components/Loader';
import ImageGallery from 'components/ImageGallery';
import LoadMoreBtn from 'components/Button';
import Modal from 'components/Modal';
import styles from './app.module.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchquery, setSearchquery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(null);
  const [alt, setAlt] = useState(null);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (searchquery === '') {
      return;
    }
    const fetchSearchQuery = async () => {
      try {
        setLoading(true);
        const { hits, totalHits } = await fetchImages(searchquery, page);
        if (hits.length === 0) {
          setLoading(false);
          setError('Nothing was found for your query, try something else');
          setStatus('rejected');
        } else {
          setLoading(false);
          setImages(prevImages => [...prevImages, ...hits]);
          setTotalHits(totalHits);
          setStatus('resolved');
        }
      } catch (error) {
        setLoading(false);
        setError(await fetchImages(searchquery, page));
        setStatus('rejected');
      }
    };
    fetchSearchQuery();
  }, [page, searchquery]);

  const handleFormSubmit = searchQuery => {
    setSearchquery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (url, alt) => {
    setUrl(url);
    setAlt(alt);
  };

  const closeModal = () => {
    setUrl(null);
    setAlt(null);
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === 'idle' && (
        <h2 className={styles.Idle}>Please enter search query</h2>
      )}
      {status === 'rejected' && !loading && (
        <h1 className={styles.Error}>{error}</h1>
      )}
      {status === 'resolved' && (
        <div className={styles.Resolved}>
          <ImageGallery images={images} onImageClick={openModal} />
          {!loading && images.length < totalHits && (
            <LoadMoreBtn loadMoreClick={loadMore} />
          )}
          {url && <Modal url={url} alt={alt} onClose={closeModal} />}
        </div>
      )}
      {loading && <Loader />}
    </div>
  );
};
