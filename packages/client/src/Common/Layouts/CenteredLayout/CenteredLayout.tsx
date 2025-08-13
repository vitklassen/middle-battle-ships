import { PropsWithChildren } from 'react';

import clsx from 'clsx';
import styles from './CenteredLayout.module.css';

type Props = {
  className?: string
}

export function CenteredLayout({
  children,
  className,
}: PropsWithChildren<Props>) {
  return <div className={clsx(styles.root, className)}>{children}</div>;
}
