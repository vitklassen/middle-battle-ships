import {
  Comment, GetTopicResponse, GetTopicsResponse, Topic,
} from '../../api/types';
import { TComment, TTopic, TTopicPreview } from './types';

export function mapTopic(topic: Topic): TTopicPreview {
  return {
    id: topic.id,
    content: topic.content,
    title: topic.title,
    createdAt: topic.createdAt,
    commentCount: Number(topic.comments_count),
    owner: {
      firstName: topic.first_name,
      lastName: topic.second_name,
      avatar: topic.avatar,
    },
  };
}

export function mapComment(comment: Comment): TComment {
  return {
    id: comment.id,
    parentId: comment.parent_id,
    content: comment.content,
    createdAt: comment.createdAt,
    owner: {
      firstName: comment.User.first_name,
      lastName: comment.User.second_name,
      avatar: comment.User.avatar,
    },
    reactions: comment.Reactions,
  };
}

export function mapGetTopicsResponse(response: GetTopicsResponse): TTopicPreview[] {
  return response.map(mapTopic);
}

export function mapGetTopicResponse(response: GetTopicResponse): TTopic {
  return {
    ...mapTopic(response),
    comments: response.comments.map(mapComment),
  };
}
