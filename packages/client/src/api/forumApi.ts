import apiInstance from './fetch';
import {
  AddCommentRequest,
  AddReactionRequest,
  Comment,
  CreateTopicRequest, GetTopicRequest, GetTopicResponse, GetTopicsResponse, Topic,
} from './types';

export class ForumApi {
  getTopics(cookie?: string) {
    return apiInstance.get<GetTopicsResponse>('/api/topics', {
      headers: { cookie },
    });
  }

  createTopic(request: CreateTopicRequest, cookie?: string) {
    return apiInstance.post<Topic>('/api/topics', {
      data: request,
      headers: { cookie },
    });
  }

  getTopic(request: GetTopicRequest, cookie?: string) {
    return apiInstance.get<GetTopicResponse>(`/api/topics/${request.id}`, {
      headers: { cookie },
    });
  }

  addComment(request: AddCommentRequest, cookie?: string) {
    return apiInstance.post<Comment>(`/api/topics/${request.topicId}/comment`, {
      data: { comment_id: request.commentId, content: request.content },
      headers: {
        cookie,
      },
    });
  }

  addReaction(request: AddReactionRequest, cookie?: string) {
    return apiInstance.post('/api/reactions', {
      data: request,
      headers: {
        cookie,
      },
    });
  }

  deleteReaction(request: AddReactionRequest, cookie?: string) {
    return apiInstance.delete('/api/reactions', {
      data: request,
      headers: {
        cookie,
      },
    });
  }
}

const forumApi = new ForumApi();

export default forumApi;
