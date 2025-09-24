import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { PageInitArgs } from './types';
import { useStore } from '../Store';

type PageProps = {
  initPage: (data: PageInitArgs) => Promise<unknown>
}

export const usePage = ({ initPage }: PageProps) => {
  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    initPage({ dispatch, state: store.getState() });
  }, []);
};
