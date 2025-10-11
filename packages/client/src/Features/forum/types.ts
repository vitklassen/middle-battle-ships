export type TTopic = {
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

export type ForumState = {
  topics?: TTopic[];
};
