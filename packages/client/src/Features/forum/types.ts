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

export type Comment = {
  id: number;
  parentId: number | null;
  content: string;
  owner: {
    firstName: string;
    lastName: string;
    avatar: string | null;
  }
}

export type TTopic = TTopicPreview & {
  comments: Comment[];
};

export type ForumState = {
  topics?: TTopicPreview[];
  currentTopic?: TTopic | null;
};
