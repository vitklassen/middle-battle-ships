import { GetTopicsResponse, Topic } from '../../api/types';
import { TTopic } from './types';

export function mapTopic(topic: Topic): TTopic {
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

export function mapGetTopicsResponse(response: GetTopicsResponse): TTopic[] {
  return response.map(mapTopic);
}
