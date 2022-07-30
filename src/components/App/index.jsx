import { Component } from 'react';
import fetchImages from 'services/Api.js';
import Searchbar from 'components/Searchbar';
import Loader from 'components/Loader';
import ImageGallery from 'components/ImageGallery';
import LoadMoreBtn from 'components/Button';
import Modal from 'components/Modal';
import styles from './app.module.css';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    error: null,
    status: 'idle',
    loading: false,
    url: null,
    alt: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.fetchSearchQuery();
      return;
    }
  }

  fetchSearchQuery = async () => {
    const { searchQuery, page } = this.state;

    try {
      this.setState({ loading: true });
      const { hits, totalHits } = await fetchImages(searchQuery, page);

      if (hits.length === 0) {
        this.setState({
          status: 'rejected',
          loading: false,
          error: 'Nothing was found for your query, try something else',
        });
      } else {
        this.setState(({ images }) => ({
          images: [...images, ...hits],
          status: 'resolved',
          loading: false,
          totalHits,
        }));
      }
    } catch (error) {
      this.setState({
        status: 'rejected',
        loading: false,
        error: await fetchImages(searchQuery, page),
      });
    }
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, images: [] });
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  openModal = (url, alt) => this.setState({ url, alt });

  closeModal = () => this.setState({ url: null, alt: null });

  render() {
    const { handleFormSubmit, loadMore, openModal, closeModal } = this;
    const { status, error, loading, images, totalHits, url, alt } = this.state;
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={handleFormSubmit} />
        {status === 'idle' && (
          <h2 className={styles.Idle}>Please enter search query</h2>
        )}
        {status === 'rejected' && <h1 className={styles.Error}>{error}</h1>}
        {status === 'resolved' && (
          <div className={styles.Resolved}>
            <ImageGallery images={images} onImageClick={openModal} />
            {!loading && status === 'resolved' && images.length < totalHits && (
              <LoadMoreBtn loadMoreClick={loadMore} />
            )}
            {url && <Modal url={url} alt={alt} onClose={closeModal} />}
          </div>
        )}
        {loading && <Loader />}
      </div>
    );
  }
}
