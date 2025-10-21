import { LeaderboardItem } from '../Components/LeaderBoard/types';

export interface Iargs {
  // затычка ленивой типизации
  [key: string]: string;
}

export type GetProfileResponse = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string | null;
  email: string;
  theme: 'false' | 'true',
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
  yandex_id: number;
  first_name: string;
  second_name: string;
  avatar: null;
  createdAt: string;
}

export type GetTopicsResponse = Array<Topic>;

export type CreateTopicRequest = {
  title: string;
  content: string;
}

export type GetTopicRequest = {
  id: number;
}

export type Comment = {
  id: number;
  parent_id: number | null;
  content: string;
  createdAt: string;
  User: {
    yandex_id: number;
    first_name: string;
    second_name: string;
    avatar: string | null;
  };
  Reactions?: Array<{ code: number, count: number, is_owner: boolean }>
}

export type GetTopicResponse = Topic & {
  comments: Comment[];
}

export type AddCommentRequest = {
  content: string;
  topicId: number;
  commentId?: number;
}

export type AddReactionRequest = {
  comment_id: number;
  code: string;
}

export type EditTopicRequest = {
  topicId: number;
  title?: string;
  content?: string;
}

export type DeleteCommentRequest = {
  topicId: number;
  commentId: number;
}
