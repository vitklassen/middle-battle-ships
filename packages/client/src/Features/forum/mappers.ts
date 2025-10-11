import { GetTopicResponse, GetTopicsResponse, Topic } from '../../api/types';
import { TTopic, TTopicPreview } from './types';

export function mapTopic(topic: Topic): TTopicPreview {
  return {
    id: topic.id,
    content: topic.content,
    title: topic.title,
    commentCount: Number(topic.comments_count),
    owner: {
      firstName: topic.first_name,
      lastName: topic.last_name,
      avatar: topic.avatar,
    },
  };
}

export function mapGetTopicsResponse(response: GetTopicsResponse): TTopicPreview[] {
  return response.map(mapTopic);
}

export function mapGetTopicResponse(response: GetTopicResponse): TTopic {
  return {
    ...mapTopic(response),
    comments: response.comments.map((comment) => ({
      id: comment.id,
      parentId: comment.parent_id,
      content: comment.content,
      owner: {
        firstName: comment.first_name,
        lastName: comment.last_name,
        avatar: comment.avatar,
      },
    })),
  };
}
