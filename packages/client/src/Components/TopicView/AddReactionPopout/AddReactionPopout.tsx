import { RefObject, useState } from 'react';
import { Card } from '../../../Common/Blocks/Card';
import { Popout } from '../../../Common/Blocks/Popout';
import styles from './AddReactionPopout.module.css';
import { addReaction } from '../../../Features/forum';

const reactions = [0x1F600, 0x1F64F];

type Props = {
    anchor: RefObject<HTMLElement>;
    setClosed: VoidFunction;
    onSelectReaction: (code: number) => void;
}

export const AddReactionPopout = ({ anchor, setClosed, onSelectReaction }: Props) => (
  <Popout anchor={anchor} setClosed={setClosed}>
    <Card className={styles.container}>
      {Array(20).fill(0).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <span key={index} className={styles.item} onClick={() => onSelectReaction(reactions[0] + index)}>
          {`${String.fromCodePoint(reactions[0] + index)}`}
        </span>
      ))}
    </Card>
  </Popout>
);
