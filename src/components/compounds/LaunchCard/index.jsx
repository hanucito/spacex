import dayjs from "dayjs";
import { useMemo } from "react";
import { useHistory } from "react-router";
import favoriteIcon from '../../../assets/favorite.svg';
import notFavoriteIcon from '../../../assets/non-favorite.svg';

import styles from './styles.module.scss';

export default function LaunchCard({ launch, favorite = false, toggleFavorite }) {
  const history = useHistory();

  const rocketImageUri = useMemo(() => launch.rocket.flickr_images[0], [launch]);
  const date = useMemo(() => dayjs(launch.launch_date_utc).format('MMMM D, YYYY'), [launch]);

  return (
    <div className={styles.card} onClick={ev => history.push(`launch/${launch.mission_name}`)}>
      <div className={styles.image} style={{
        backgroundImage: `url(${rocketImageUri})`,
      }} />
      <div className={styles.content}>
        <div className={styles.name}>{launch.rocket.rocket_name}</div>
        <div className={styles.description}>{launch.rocket.description}</div>
        <div className={styles.date}>{date}</div>
        <img
          src={favorite ? favoriteIcon : notFavoriteIcon}
          alt="Favorite"
          className={styles.favorite}
          onClick={ev => {
            ev.preventDefault();
            ev.stopPropagation();
            toggleFavorite();
          }}
        />
      </div>
    </div>
  );
};
