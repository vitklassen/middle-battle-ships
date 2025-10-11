import { LeaderboardItem } from '../Components/LeaderBoard/types';

export type GetProfileResponse = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string | null;
  email: string;
};

export type GetAppID = {
  service_id: string;
};

export type leaderBoardParams = {
  ratingFieldName: string;
  limit: number;
  cursor: number;
};

type userParamsData = Pick<
  LeaderboardItem['data'],
  'id' | 'firstName' | 'lastName' | 'email' | 'avatar' | 'otherField'
>;

export type userParams = Pick<leaderBoardParams, 'ratingFieldName'> & {
  data: userParamsData;
  teamName: string;
};

export type Topic = {
  id: number;
  title: string;
  content: string;
  comments_count: string;
  first_name: string;
  last_name: string;
  avatar: null;
}

export type GetTopicsResponse = Array<Topic>;

export type CreateTopicRequest = {
  title: string;
  content: string;
}
