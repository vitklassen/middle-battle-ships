export type TTopicPreview = {
  id: number;
  title: string;
  content: string;
  commentCount: number;
  owner: {
    firstName: string;
    lastName: string;
    avatar: string | null;
  };
};

export type Reaction = {
  code: number;
  count: number;
}

export type TComment = {
  id: number;
  parentId: number | null;
  content: string;
  createdAt: string;
  owner: {
    firstName: string;
    lastName: string;
    avatar: string | null;
  },
  reactions?: Reaction[];
}

export type TTopic = TTopicPreview & {
  comments: TComment[];
};

export type ForumState = {
  topics?: TTopicPreview[];
  currentTopic?: TTopic | null;
};
