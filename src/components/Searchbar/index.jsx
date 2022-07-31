import { useState } from 'react';
import CreditsApi from 'components/CreditsApi';
import { BsSearch as SearchIcon } from 'react-icons/bs';
import styles from './searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [searchquery, setSearchquery] = useState('');

  const handleQueryChange = event => {
    setSearchquery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchquery.trim() === '') {
      return alert('Insert text first');
    }
    onSubmit(searchquery);
    setSearchquery('');
  };

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
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
