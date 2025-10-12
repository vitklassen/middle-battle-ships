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
  second_name: string;
  avatar: null;
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
    first_name: string;
    second_name: string;
    avatar: string | null;
  };
  Reactions?: Array<{ code: number; count: number; }>
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
