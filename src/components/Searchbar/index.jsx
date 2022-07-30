import { Component } from 'react';
import CreditsApi from 'components/CreditsApi';
import { BsSearch as SearchIcon } from 'react-icons/bs';
import styles from './searchbar.module.css';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleQueryChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return alert('Insert text first');
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    const { handleSubmit, handleQueryChange } = this;
    return (
      <header className={styles.Searchbar}>
        <CreditsApi />
        <form onSubmit={handleSubmit} className={styles.Form}>
          <button type="submit" className={styles.Button}>
            <SearchIcon size="14" />
          </button>
          <input
            className={styles.Input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleQueryChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
