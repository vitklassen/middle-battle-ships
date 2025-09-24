/* eslint-disable react/no-array-index-key */
import { PositionData } from './types';
import styles from './GeoPopup.module.css';
import { Button } from '../../Common/Blocks/Button';

type Props = {
  data: PositionData
  onResetData: (arg: null) => void
}

export const GeoPopup: React.FC<Props> = ({ data, onResetData }) => (
  <div className={styles.root}>
    <div className={styles.content}>
      {data.message.split('sep').map((item, index) => (<p className={styles.message} key={index}>{item}</p>))}
      <Button onClick={() => onResetData(null)} type="button" size="medium">Закрыть</Button>
    </div>
  </div>
);
