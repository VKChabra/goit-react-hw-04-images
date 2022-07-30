import styles from './credits.module.css';

const CreditsApi = () => {
  return (
    <div className={styles.creditsBlock}>
      <a href="https://pixabay.com/">
        <img
          src="https://pixabay.com/static/img/public/leaderboard_b.png"
          alt="pixabay api"
          width="200"
        />
      </a>
    </div>
  );
};

export default CreditsApi;
