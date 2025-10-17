export type TTopicPreview = {
  id: number;
  title: string;
  content: string;
  commentCount: number;
  createdAt: string;
  owner: {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string | null;
  };
};

export type Reaction = {
  code: number;
  count: number;
  isOwner: boolean;
}

export type TComment = {
  id: number;
  parentId: number | null;
  content: string;
  createdAt: string;
  owner: {
    id: number;
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
